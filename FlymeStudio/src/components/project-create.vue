<template>
<div class="layout">
  <Layout>

    <Header>
      <topNav></topNav>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="22"></leftNav>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">

          <!-- spin -->
          <Spin class="spin" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          <Form ref="formItem" :model="formItem" :rules="ruleItem">

            <!-- type -->
            <FormItem>
              <Icon class="icon-item" type="bookmark" size=18></Icon>
              <span class="span-form">Set type</span>
            </FormItem>

            <FormItem prop="type">
              <Select class="select-type" v-model="formItem.type" size="large" placeholder="Type">
                  <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </select>
            </FormItem>

            <!-- date -->
            <FormItem>
              <Icon class="icon-item" type="calendar" size=18></Icon>
              <span class="span-form">Set date</span>
            </FormItem>

            <FormItem prop="date">
              <DatePicker class="datePicker" type="date" size="large" v-model="formItem.date" placeholder="Date" confirm/>
            </FormItem>

            <!-- title -->
            <FormItem>
              <Icon class="icon-item" type="pin" size=18></Icon>
              <span class="span-form">Set title</span>
            </FormItem>

            <FormItem prop="title">
              <Input class="input-title" type="text" v-model="formItem.title" placeholder="Title" clearable size="large" />
            </FormItem>

            <!-- content -->
            <FormItem>
              <Icon class="icon-item" type="social-markdown" size=18></Icon>
              <span class="span-form">Set content</span>
              <Button class="btn-upload" style="margin-left:40px;" @click="modalUpload = true"><Icon type="upload" size=18></Icon><span class="span-btn">Upload</span></Button>
            </FormItem>

            <FormItem prop="content">
              <mavon-editor class="mavon-editor" v-model="formItem.content" :subfield="subfield" :defaultOpen="defaultOpen" :placeholder="placeholder" :toolbarsFlag="toolbarsFlag" :toolbars="toolbars"></mavon-editor>
            </FormItem>

            <!-- plans -->
            <FormItem>
              <Icon class="icon-item" type="flag" size=18></Icon>
              <span class="span-form">Set plans</span>
            </FormItem>

            <FormItem>
              <Alert class="alert-projects" type="success" v-for="item in formItem.plans" :key="item.timestamp">
                <div class="div-project">
                  <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
                  <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
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

            <!-- button -->
            <FormItem>
              <Button type="primary" class="btn-item" @click="handleSubmit('formItem')" size="large">Save</Button>
              <Button class="btn-item" @click="handleReset('formItem')" size="large">Reset</Button>
            </FormItem>

            <!-- upload -->
            <Modal class="modal-confirm" v-model="modalUpload" title="Upload" :mask-closable="false" :closable="false"  ok-text="Upload" cancel-text="Cancel" loading @on-ok="upload()">
              <input class="input-chooser" type="file" accept=".md" id="chooser">
              <p>The content you upload will cover the origin content.</p>
              <p>Are you sure to upload?</p>
            </Modal>

            <!-- save -->
            <Modal class="modal-confirm" v-model="modalSave" title="Confirm" :mask-closable="false" :closable="false"  ok-text="Save" cancel-text="Cancel" loading @on-ok="save()">
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

<script>
import topNav from './component-nav-top.vue'
import leftNav from './component-nav-left.vue'
import componentFooter from './component-footer.vue'
import projectApi from '../api/projectApi'

export default{
  name: 'project-create',
  created () {
  },
  data () {
    return {
      types: [
        {
          value: '1',
          label: 'Yearly'
        },
        {
          value: '2',
          label: 'Monthly'
        },
        {
          value: '3',
          label: 'Weekly'
        },
        {
          value: '4',
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
      modalSave: false,
      spinShow: false
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
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

.mavon-editor {
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

.div-project {
  display: flex;
}

.tag-tag {
  width  : 100px;
  display: inline-block;
}

.input-goal {
  width  : 100%;
  flex   : 1;
  margin : auto 20px auto 5px;
  display: inline-block;
}

.btn-edit {
  float  : right;
  display: inline-block;
}

.edit-tag {
  width       : 100px;
  margin-right: 4px;
  display     : inline-block;
}

.edit-goal {
  width  : 100%;
  flex   : 1;
  margin : auto 20px auto 5px;
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
