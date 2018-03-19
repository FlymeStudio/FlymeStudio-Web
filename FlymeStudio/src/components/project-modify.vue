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
        <Spin style="z-index:10;" fix v-if="spinShow">
          <Icon class="icon-spin" type="load-c" size=50></Icon>
        </Spin>

        <div class="div-row">
          <Icon class="icon-item" type="bookmark" size=18></Icon>
          <span class="span-item">Modify type</span>
        </div>
        <div class="div-row">
          <div class="div-col">
            <Alert class="alert-item">
              <Input class="select-type" type="text" placeholder="Title" readonly size="large" v-model="defaultValue.type" />
            </Alert>
          </div>
          <div class="div-col">
            <Alert class="alert-item" type="error">
              <Select class="select-type" v-model="modifyValue.type" size="large" placeholder="Type">
              <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </select>
            </Alert>
          </div>
        </div>

        <div class="div-row">
          <Icon class="icon-item" type="calendar" size=18></Icon>
          <span class="span-item">Modify date</span>
        </div>
        <div class="div-row">
          <div class="div-col">
            <Alert class="alert-item">
              <DatePicker class="datePicker" type="date" size="large" v-model="defaultValue.date" format="yyyy-MM-dd" readonly/>
            </Alert>
          </div>
          <div class="div-col">
            <Alert class="alert-item" type="error">
              <DatePicker class="datePicker" type="date" size="large" v-model="modifyValue.date" placeholder="Date" confirm/>
            </Alert>
          </div>
        </div>

        <div class="div-row">
          <Icon class="icon-item" type="pin" size=18></Icon>
          <span class="span-item">Modify title</span>
        </div>
        <div class="div-row">
          <div class="div-col">
            <Alert class="alert-item">
              <Input class="input-title" type="text" v-model="defaultValue.title" placeholder="Title" readonly size="large" />
            </Alert>
          </div>
          <div class="div-col">
            <Alert class="alert-item" type="error">
              <Input class="input-title" type="text" v-model="modifyValue.title" placeholder="Title" clearable size="large" />
            </Alert>
          </div>
        </div>

        <div class="div-row">
          <Icon class="icon-item" type="social-markdown" size=18></Icon>
          <span class="span-item">Modify content</span>
        </div>
        <div class="div-row">
          <div class="div-col">
            <Alert class="alert-item">
              <mavon-editor class="mavonEditor" v-model="defaultValue.content" :subfield="subfieldDefault" :defaultOpen="defaultOpenDefault" :placeholder="placeholderDefault" :toolbarsFlag="toolbarsFlagDefault" :toolbars="toolbarsDefault" :editable="false"></mavon-editor>
            </Alert>
          </div>
          <div class="div-col">
            <Alert class="alert-item" type="error">
              <mavon-editor class="mavonEditor" v-model="modifyValue.content" :subfield="subfieldModify" :defaultOpen="defaultOpenModify" :placeholder="placeholderModify" :toolbarsFlag="toolbarsFlagModify" :toolbars="toolbarsModify"></mavon-editor>
            </Alert>
          </div>
        </div>

        <div class="div-row">
          <Icon class="icon-item" type="flag" size=18></Icon>
          <span class="span-item">Modify plans</span>
        </div>
        <div class="div-row">
          <div class="div-col">
            <Alert class="alert-plans" type="info" v-for="item in defaultValue.plans" :key="item.timestamp">
              <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
              <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
              <div class="div-plan">
                <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
                <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
              </div>
            </Alert>
          </div>
          <div class="div-col">
            <Alert class="alert-plans" type="error" v-for="item in modifyValue.plans" :key="item.timestamp">
              <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
              <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
              <div class="div-plan">
                <Input class="tag-tag" type="text" v-model="item.tag"></Input>
                <Input class="input-goal" type="text" v-model="item.goal"></Input>
                <Button class="btn-edit" type="ghost" shape="circle" icon="minus" @click="deletePlan(item.timestamp)"></Button>
              </div>
            </Alert>
            <Alert class="alert-plans" type="success">
              <div class="div-plan">
                <Input class="edit-tag" type="text" clearable placeholder="Tag" v-model="editTag"></Input>
                <Input class="edit-goal" type="text" clearable placeholder="Goal" v-model="editGoal"></Input>
                <Button class="btn-edit" type="ghost" shape="circle" icon="plus" @click="addPlan()"></Button>
              </div>
            </Alert>
          </div>
        </div>

        <div class="div-row">
          <div class="div-btn">
            <Button class="btn-item" @click="reset()" size="large">Reset</Button>
          </div>
        </div>
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
  name: 'project-modify',
  created () {
    this.getInfo()
    this.initData()
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
      dataSrc: {},
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
      defaultValue: {
        type: '',
        date: '',
        title: '',
        content: '',
        plans: []
      },
      modifyValue: {
        type: '',
        date: '',
        title: '',
        content: '',
        plans: []
      },
      subfieldDefault: false,
      defaultOpenDefault: 'edit',
      placeholderDefault: '',
      toolbarsFlagDefault: true,
      toolbarsDefault: {
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        navigation: true, // 导航目录
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      subfieldModify: false,
      defaultOpenModify: 'edit',
      placeholderModify: 'Content',
      toolbarsFlagModify: true,
      toolbarsModify: {
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
    initData () {
      this.dataSrc = this.$route.params.dataSrc
      console.log('param: ' + this.$route.params.dataSrc)
      this.defaultValue.type = this.parseType()
      this.defaultValue.date = this.dataSrc.date
      this.defaultValue.title = this.dataSrc.title
      this.defaultValue.content = this.dataSrc.content
      this.defaultValue.plans = this.dataSrc.plans
      for (var i = 0; i < this.defaultValue.plans.length; i++) {
        this.modifyValue.plans.push(this.defaultValue.plans[i])
      }
    },
    parseType () {
      switch (this.dataSrc.type) {
        case '1':
          return 'Yearly'
        case '2':
          return 'Monthly'
        case '3':
          return 'Weekly'
        case '4':
          return 'Daily'
        default:
          return 'Null'
      }
    },
    deletePlan (timestamp) {
      for (var i = 0; i < this.modifyValue.plans.length; i++) {
        if (this.modifyValue.plans[i].timestamp === timestamp) {
          this.modifyValue.plans.splice(i, 1)
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
      this.modifyValue.plans.push(plan)
      this.editTag = ''
      this.editGoal = ''
    },
    reset () {
      this.modifyValue.type = ''
      this.modifyValue.date = ''
      this.modifyValue.title = ''
      this.modifyValue.content = ''
      this.modifyValue.plans = []
    },
    modify () {
      let _this = this
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Modify successful.',
          desc: ''
        })
        _this.reset()
      }, 1000)
      projectApi.modify(this.modifyValue.timestamp, this.modifyValue.type, this.modifyValue.date, this.modifyValue.title, this.modifyValue.content, this.modifyValue.plans).then(function (response) {
        if (response.data.result === true) {
          _this.$Notice.success({
            title: 'Save successful.',
            desc: ''
          })
          _this.handleReset('modifyValue')
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

.div-row {
  display      : flex;
  margin-bottom: 10px;
}

.div-col {
  width  : 50%;
  display: inline-block;
  margin : 5px 10px;
}

.icon-item {
  width     : 18px;
  text-align: center;
}

.span-item {
  margin-left: 10px;
  font-size  : 16px;
}

.alert-item {
  padding: 16px;
}

.select-type {
  width       : 100%;
  max-width   : 160px;
  margin-right: 20px;
  z-index     : 7;
  display     : inline-block;
}

.datePicker {
  width    : 100%;
  max-width: 160px;
  z-index  : 7;
}

.input-title {
  width    : 100%;
  max-width: 240px;
}

.mavonEditor {
  height : 600px;
  width  : 100%;
  z-index: 5;
}

.input-chooser {
  font-size    : 18px;
  margin-right : 5px;
  margin-bottom: 10px;
}

.alert-plans {
  padding-right: 16px;
}

.div-plan {
  display: flex;
}

.detail-progress {
  font-size    : 16px;
  color        : #1788e8;
  margin-bottom: 10px;
  margin-right : -40px;
  display      : block;
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
  width : 100px;
  margin: 0 10px;
}

.div-btn {
  width : auto;
  margin: 20px 0 20px auto;
  float : right;
}
</style>
