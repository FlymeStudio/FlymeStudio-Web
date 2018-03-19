<template>
<div class="layout">
  <Layout>
    <Header>
      <topNav></topNav>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="14"></leftNav>
      </Sider>
      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
          <Spin style="z-index:10;" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          <div class="div-row title-row">
            <Icon class="icon-item" type="archive" size=18></Icon>
            <span class="span-item">Import project</span>
          </div>
          <div class="div-row">
            <div class="div-col">
              <Alert class="alert-item">
                <Input class="select-type" type="text" placeholder="SearchId" size="large" v-model="searchId" />
              </Alert>
            </div>
            <div class="div-col">
              <Alert class="alert-item" type="error">
                <Button type="primary" @click="importProject()" size="large" :loading="loadingImport">Import</Button>
              </Alert>
            </div>
          </div>

          <div class="div-row title-row">
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
                <Select class="select-type" v-model="modifyValue.type" size="large" placeholder="Type" @change>
                  <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </select>
              </Alert>
            </div>
          </div>

          <div class="div-row title-row">
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

          <div class="div-row title-row">
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

          <div class="div-row title-row">
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

          <div class="div-row title-row">
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
            <div class="div-col">
            </div>
            <div class="div-col">
              <Button class="btn-item" @click="reset()" size="large">Reset</Button>
              <Button type="primary" class="btn-item" @click="modify()" size="large">Modify</Button>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
    <componentFooter></componentFooter>
    <BackTop></BackTop>
  </Layout>
</div>
</template>

<script type="text/javascript">
import topNav from './component-topnav.vue'
import leftNav from './component-leftnav.vue'
import componentFooter from './component-footer.vue'
import projectApi from '../api/projectApi'

export default{
  name: 'project-modify',
  created () {
    this.getInfo()
  },
  data () {
    return {
      searchId: 0,
      info: {
        name: '',
        tel: '',
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
      loadingImport: false,
      editTag: '',
      editGoal: '',
      spinShow: false
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
    getInfo () {
      this.info.tel = '13608089849'
      this.info.email = '1213814232@qq.com' // test
    },
    importProject () {
      this.loadingImport = true
      let _this = this
      setTimeout(() => {
        _this.defaultValue = {
          type: '1',
          date: '2018-3-19',
          title: '测试标题',
          content: '测试内容',
          plans: [
            {
              timestamp: 13125125161,
              tag: '测试tag1',
              goal: '测试goal1',
              percent: 80

            },
            {
              timestamp: 13125125172,
              tag: '测试tag2',
              goal: '测试goal2',
              percent: 100
            }
          ]
        }
        _this.modifyValue = JSON.parse(JSON.stringify(_this.defaultValue))
        _this.defaultValue.type = _this.parseType(_this.defaultValue.type)
        _this.$Notice.success({
          title: 'Import successful.',
          desc: ''
        })
        _this.loadingImport = false
      }, 1000)
      projectApi.importProject(this.searchId, this.info.tel, this.info.email).then(function (response) {
        if (response.data.result === true) {
          _this.defaultValue = response.data.defaultValue
          _this.$Notice.success({
            title: 'Import successful.',
            desc: ''
          })
          _this.loadingImport = false
        } else {
          _this.$Notice.error({
            title: 'Import failed.',
            desc: ''
          })
          _this.loadingImport = false
        }
      })
    },
    parseType (type) {
      switch (type) {
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
.span-item {
  font-size: 16px;
}

.div-row {
  display      : flex;
  margin-bottom: 10px;
}

.title-row {
  align-items  : center;
}

.div-col {
  width     : 50%;
  display   : inline-block;
  margin    : 5px 10px;
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
  min-width: 50px;
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
  width     : 100px;
  margin:30px 10px;
}
</style>
