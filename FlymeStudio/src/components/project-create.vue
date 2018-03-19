<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">
          <div class="layout-logo" @click="clickFlyme"></div>
          <div class="layout-title">Flyme Studio</div>
          <div class="layout-nav">
            <MenuItem name="1">
            <Icon class="item-icon" type="person" size=18></Icon>
            <span v-if="info.messages.length == 0" class="span-item">
              {{ info.name }}
            </span>
            <span v-else class="span-item">
              <Badge dot>{{ info.name }}</Badge>
            </span>
            </MenuItem>
            <MenuItem name="2">
            <Icon class="item-icon" type="help" size=18></Icon>
            <span class="span-item">Help</span>
            </MenuItem>
            <MenuItem name="3">
            <Icon class="item-icon" type="log-out" size=18></Icon>
            <span class="span-item">Sign out</span>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
          <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav" active-name="12" :open-names="['0', '10', '20']">
            <Submenu name="0">
              <template slot="title">
                <Icon type="person" size=18></Icon>
                  <span class="span-menu-item">Information</span>
              </template>
              <MenuItem name="1">Overview</MenuItem>
              <MenuItem name="2">Teamwork</MenuItem>
              <MenuItem name="3">Modify</MenuItem>
            </Submenu>
            <Submenu name="10">
              <template slot="title">
                <Icon type="clipboard" size=18></Icon>
                  <span class="span-menu-item">Project</span>
              </template>
              <MenuItem name="11">Overview</MenuItem>
              <MenuItem name="12">Create</MenuItem>
              <MenuItem name="13">Search</MenuItem>
            </Submenu>
            <Submenu name="20">
              <template slot="title">
                <Icon type="document-text" size=18></Icon>
                  <span class="span-menu-item">Summary</span>
              </template>
              <MenuItem name="21">Overview</MenuItem>
              <MenuItem name="22">Create</MenuItem>
              <MenuItem name="23">Search</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px'}">
          <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
            <Spin style="z-index:10;" fix v-if="spinShow">
              <Icon class="icon-spin" type="load-c" size=50></Icon>
            </Spin>

            <Form ref="formItem" :model="formItem" :rules="ruleItem">
              <FormItem>
                <Icon class="icon-item" type="bookmark" size=18></Icon>
                <span class="span-form">Set type</span>
              </FormItem>
              <FormItem prop="type">
                <Select class="select-type" v-model="formItem.type" size="large" placeholder="Type">
                  <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </select>
              </FormItem>
              <FormItem>
                <Icon class="icon-item" type="calendar" size=18></Icon>
                <span class="span-form">Set date</span>
              </FormItem>
              <FormItem prop="date">
                <DatePicker class="datePicker" type="date" size="large" v-model="formItem.date" placeholder="Date" confirm/>
              </FormItem>
              <FormItem>
                <Icon class="icon-item" type="pin" size=18></Icon>
                <span class="span-form">Set title</span>
              </FormItem>
              <FormItem prop="title">
                <Input class="input-title" type="text" v-model="formItem.title" placeholder="Title" clearable size="large" />
              </FormItem>
              <FormItem>
                <Icon class="icon-item" type="social-markdown" size=18></Icon>
                <span class="span-form">Set content</span>
                <Button class="btn-upload" style="margin-left:40px;" @click="modalUpload = true"><Icon type="upload" size=18></Icon><span class="span-btn">Upload</span></Button>
              </FormItem>
              <FormItem prop="content">
                <mavon-editor class="mavonEditor" v-model="formItem.content" :subfield="subfield" :defaultOpen="defaultOpen" :placeholder="placeholder" :toolbarsFlag="toolbarsFlag" :toolbars="toolbars"></mavon-editor>
              </FormItem>
              <FormItem>
                <Icon class="icon-item" type="flag" size=18></Icon>
                <span class="span-form">Set plans</span>
              </FormItem>
              <FormItem>
                <Alert class="alert-projects" type="success" v-for="item in formItem.plans" :key="item.timestamp">
                  <div class="div-project">
                    <Tag class="tag-tag" type="dot" color="blue" >{{ item.tag }}</Tag>
                    <Input class="input-goal" type="text" :readonly="true"  v-model="item.goal"></Input>
                    <Button class="btn-edit" type="ghost" shape="circle" icon="minus" @click="deletePlan(item.timestamp)"></Button>
                  </div>
                </Alert>
                <Alert class="alert-projects">
                  <div class="div-project">
                  <Input class="edit-tag" type="text" clearable placeholder="Tag" v-model="editTag"></Input>
                  <Input class="edit-goal" type="text" clearable placeholder="Goal" v-model="editGoal"></Input>
                  <Button class="btn-edit" type="ghost" shape="circle" icon="plus" @click="addPlan()"></Button>
                </div>
                </Alert>
              </FormItem>
              <br>
              <br>
              <br>
              <FormItem>
                <Button type="primary" class="btn-item" @click="handleSubmit('formItem')" size="large">Save</Button>
                <Button class="btn-item" @click="handleReset('formItem')" size="large">Reset</Button>
              </FormItem>

              <Modal class="modal-confirm" v-model="modalUpload" title="Warning" :mask-closable="false" :closable="false" :ok-text="okUpload" :cancel-text="cancel" :loading="loadingUpload" @on-ok="upload()">
                <input class="input-chooser" type="file" accept=".md" id="chooser">
                <p>The content you upload will cover the origin content.</p>
                <p>Are you sure to upload?</p>
              </Modal>

              <Modal class="modal-confirm" v-model="modalSave" title="Confirm" :mask-closable="false" :closable="false" :ok-text="okSave" :cancel-text="cancel" :loading="loadingSave" @on-ok="save()">
                <p>Are you sure to save?</p>
              </Modal>
            </Form>
          </Content>
        </Layout>
      </Layout>
      <componentFooter></componentFooter>
      <BackTop></BackTop>
    </Layout>
  </div>
</template>

<script type="text/javascript">
import componentFooter from './component-footer.vue'
import accountApi from '../api/accountApi'
// import informationApi from '../api/informationApi'
import projectApi from '../api/projectApi'

export default{
  name: 'project-create',
  created () {
    this.getInfo()
  },
  data () {
    return {
      info: {
        tel: '13608089849',
        name: 'user',
        email: '',
        messages: [
          {
            messageId: '1',
            from: '13600000001',
            teamName: 'System support',
            teamId: '00001'
          },
          {
            messageId: '2',
            from: '13600000002',
            teamName: 'Overseas firmware',
            teamId: '00002'
          }
        ]
      },
      types: [
        {
          value: '0',
          label: 'Yearly'
        },
        {
          value: '1',
          label: 'Monthly'
        },
        {
          value: '2',
          label: 'Weekly'
        },
        {
          value: '3',
          label: 'Daily'
        }
      ],
      formItem: {
        type: '',
        date: '',
        title: '',
        content: '',
        plans: []
      },
      ruleItem: {
        type: [
          {
            required: true,
            message: 'Please select the type.',
            trigger: 'blur'
          }
        ],
        date: [
          {
            required: true,
            type: 'date',
            message: 'Please select the date.',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: 'Please fill in the title.',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: 'Please fill in the content.',
            trigger: 'blur'
          }
        ]
      },
      subfield: true,
      defaultOpen: '',
      placeholder: 'Content',
      toolbarsFlag: true,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      editTag: '',
      editGoal: '',
      modalUpload: false,
      loadingUpload: true,
      okUpload: 'Upload',
      cancel: 'Cancel',
      modalSave: false,
      loadingSave: true,
      okSave: 'Save',
      spinShow: false
    }
  },
  components: {
    componentFooter
  },
  methods: {
    getInfo () {
      this.info.name = '曾宇' // test
      this.info.email = '1213814232@qq.com' // test
    },
    clickTopNav: function (name) {
      switch (name) {
        case '1':
          this.componentId = '1'
          break
        case '2':
          this.clickHelp()
          break
        case '3':
          this.clickSignOut()
          break
        default:
      }
    },
    clickFlyme: function () {
      window.open('https://www.flyme.cn/')
    },
    clickHelp: function () {
      window.open('https://github.com/FlymeStudio/FlymeStudio-Doc/blob/master/introduce.md')
    },
    clickSignOut: function () {
      this.spinShow = true
      let _this = this
      setTimeout(() => {
        _this.spinShow = false
        _this.$Message.success('Sign out successful.')
        _this.$router.push('/signIn')
      }, 1000)
      accountApi.signOut(this.info.tel).then(function (response) {
        setTimeout(() => {
          _this.spinShow = false
          if (response.data.result === true) {
            _this.$Message.success('Sign out successful.')
            _this.$router.push('/signIn')
          } else {
            _this.$Message.error('Sign out failed.')
          }
        }, 1000)
      })
    },
    clickLeftNav: function (name) {
      switch (name) {
        case '1':
          this.$router.push('/information/overview')
          break
        case '2':
          this.$router.push('/information/teamwork')
          break
        case '3':
          this.$router.push('/information/modify')
          break
        case '11':
          this.$router.push('/project/overview')
          break
        case '12':
          this.$router.push('/project/create')
          break
        case '13':
          this.$router.push('/project/search')
          break
        case '21':
          this.$router.push('/summary/overview')
          break
        case '22':
          this.$router.push('/summary/create')
          break
        case '23':
          this.$router.push('/summary/search')
          break
        default:
          this.$router.push('/home')
      }
    },
    upload () {
      var chooser = document.getElementById('chooser').files
      if (chooser.length !== 0) {
        var file = chooser[0]
        var reader = new FileReader()
        let _this = this
        reader.onload = function (event) {
          _this.formItem.content = event.target.result
          _this.$Notice.success({
            title: 'Upload successful.',
            desc: ''
          })
        }
        reader.onerror = function (event) {
          _this.$Notice.error({
            title: 'Upload failed.',
            desc: ''
          })
        }
        reader.onloadend = function (event) {
          setTimeout(() => {
            _this.modalUpload = false
          }, 1000)
        }
        reader.readAsText(file, 'utf-8')
      } else {
        this.modalUpload = false
      }
    },
    deletePlan (timestamp) {
      for (var i = 0; i < this.formItem.plans.length; i++) {
        if (this.formItem.plans[i].timestamp === timestamp) {
          this.formItem.plans.splice(i, 1)
          break
        }
      }
    },
    addPlan () {
      var plan = {
        timestamp: new Date().getTime(),
        tag: this.editTag,
        goal: this.editGoal
      }
      this.formItem.plans.push(plan)
      this.editTag = ''
      this.editGoal = ''
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      var chooser = document.getElementById('chooser')
      chooser.outerHTML = chooser.outerHTML
      this.formItem.plans = []
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modalSave = true
        } else {
          this.$Notice.error({
            title: 'Information is incorrect.',
            desc: ''
          })
        }
      })
    },
    save () {
      let _this = this
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Save successful.',
          desc: ''
        })
        _this.handleReset('formItem')
        _this.modalSave = false
      }, 1000)
      projectApi.create(this.formItem.type, this.formItem.date, this.formItem.title, this.formItem.content, this.formItem.plans).then(function (response) {
        if (response.data.result === true) {
          _this.$Notice.success({
            title: 'Save successful.',
            desc: ''
          })
          _this.handleReset('formItem')
          _this.modalSave = false
        } else {
          _this.$Notice.error({
            title: 'Save failed.',
            desc: ''
          })
          _this.modalSave = false
        }
      })
    }
  }
}
</script>

<style scoped>
.menu {
  z-index: 5;
}

.span-menu-item{
  font-weight: bold;
  font-size: 16px;
}

.span-item {
  font-size: 16px;
}

.icon-item {
  width     : 18px;
  text-align: center;
}

.span-form {
  margin-left: 10px;
  font-size  : 16px;
}

.select-type {
  width       : 160px;
  margin-right: 20px;
  z-index     : 7;
  display     : block;
}

.datePicker {
  width  : 160px;
  z-index: 7;
  display: block;
}

.input-title {
  width  : 240px;
  display: block;
}

.span-btn {
  margin-left: 5px;
  font-size  : 16px;
}

.mavonEditor {
  height : 600px;
  width  : 100%;
  z-index: 5;
}

.btn-upload {
  height     : auto;
  width      : auto;
  padding    : 3px 10px;
  align-items: center;
}

.input-chooser {
  font-size    : 18px;
  margin-right : 5px;
  margin-bottom: 10px;
}

.alert-projects {
  padding-right: 16px;
}

.div-project{
  display: flex;
}

.tag-tag {
  width     : 100px;
  display: inline-block;
}

.input-goal {
  width    : 100%;
  flex: 1;
  margin: auto 20px auto 5px;
  display: inline-block;
}

.btn-edit {
  float: right;
  display: inline-block;
}

.edit-tag {
  width    : 100px;
  margin-right: 4px;
  display: inline-block;
}

.edit-goal {
  width    : 100%;
  flex: 1;
  margin: auto 20px auto 5px;
  display: inline-block;
}

.btn-item {
  width        : 100px;
  margin-right : 20px;
  margin-bottom: 10px;
}

.modal-confirm {
  position: absolute;
  z-index : 10;
}

.modal-confirm p {
  font-size: 18px;
  color    : red;
}
</style>
