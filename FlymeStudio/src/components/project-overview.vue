<template>
<div class="layout">
  <Layout>

    <Header>
      <topNav></topNav>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="11"></leftNav>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">

          <Menu class="menu" mode="horizontal" theme="light" @on-select="clickTag" active-name="0">
            <MenuItem class="menu-item" name="0">
            <Icon class="icon-item" type="bookmark" size=20></Icon>
            All
            </MenuItem>
            <MenuItem class="menu-item" name="1">
            <Icon class="icon-item" type="bookmark" size=20></Icon>
            Yearly
            </MenuItem>
            <MenuItem class="menu-item" name="2">
            <Icon class="icon-item" type="bookmark" size=20></Icon>
            Monthly
            </MenuItem>
            <MenuItem class="menu-item" name="3">
            <Icon class="icon-item" type="bookmark" size=20></Icon>
            Weekly
            </MenuItem>
            <MenuItem class="menu-item" name="4">
            <Icon class="icon-item" type="bookmark" size=20></Icon>
            Daily
            </MenuItem>
          </Menu>

          <Layout>
            <Content :style="{padding: '15px 0', minHeight: '280px', background: '#fff'}">
              <!-- spin -->
              <Spin fix v-if="spinShow">
                <Icon class="icon-spin" type="load-c" size=50></Icon>
              </Spin>

              <!-- collapse -->
              <Collapse>

                <Panel name="Total">

                  <!-- title -->
                  <span class="data-count" style="color:#2d8cf0;"> Total ({{ count.total }})</span>

                  <!-- content -->
                  <div class="data-div" slot="content" v-for="data in datas" v-if="data.show == true" :key="data.timestamp">
                  <Card>
                    <div>
                      <div class="card-top">
                        <i-circle v-if="data.percent == 100" class="card-circle" :size=40 :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
                          <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
                        </i-circle>
                        <i-circle v-else class="card-circle" :size=40 :percent="data.percent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
                          <span>{{ data.percent }}%</span>
                        </i-circle>
                        <DatePicker class="card-date" type="date" size="large" v-model="data.date" readonly format="yyyy-MM-dd"/>
                        <span class="card-btn" @click="showModifyModal(data.timestamp)"><Icon type="compose" size="24"></Icon></span>
                        <span class="card-btn" @click="showDetailModal(data.timestamp)"><Icon type="android-open" size="24"></Icon></span>
                      </div>
                      <p class="card-title" slot="title">{{ data.title }}</p>
                    </div>
                    </Card>
                  </div>
                </Panel>

                <Panel name="Done">

                  <!-- title -->
                  <span class="data-count" style="color:#19be6b;"> Done ({{ count.done }})</span>

                  <!-- content -->
                  <div class="data-div" slot="content" v-for="data in datas" v-if="data.show == true && data.percent == 100" :key="data.timestamp">
                    <Card>
                      <div>
                        <div class="card-top">
                          <i-circle v-if="data.percent == 100" class="card-circle" :size=40 :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
                            <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
                          </i-circle>
                          <i-circle v-else class="card-circle" :size=40 :percent="data.percent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
                            <span>{{ data.percent }}%</span>
                          </i-circle>
                          <DatePicker class="card-date" type="date" size="large" v-model="data.date" readonly format="yyyy-MM-dd"/>
                          <span class="card-btn" @click="showModifyModal(data.timestamp)"><Icon type="compose" size="24"></Icon></span>
                          <span class="card-btn" @click="showDetailModal(data.timestamp)"><Icon type="android-open" size="24"></Icon></span>
                        </div>
                        <p class="card-title" slot="title">{{ data.title }}</p>
                      </div>
                      </Card>
                  </div>
                </Panel>

                <Panel name="Doing">

                  <!-- title -->
                  <span class="data-count" style="color:#ed3f14;"> Doing ({{ count.doing }})</span>

                  <!-- content -->
                  <div class="data-div" slot="content" v-for="data in datas" v-if="data.show == true && data.percent != 100" :key="data.timestamp">
                    <Card>
                      <div>
                        <div class="card-top">
                          <i-circle v-if="data.percent == 100" class="card-circle" :size=40 :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
                            <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
                          </i-circle>
                          <i-circle v-else class="card-circle" :size=40 :percent="data.percent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
                            <span>{{ data.percent }}%</span>
                          </i-circle>
                          <DatePicker class="card-date" type="date" size="large" v-model="data.date" readonly format="yyyy-MM-dd"/>
                          <span class="card-btn" @click="showModifyModal(data.timestamp)"><Icon type="compose" size="24"></Icon></span>
                          <span class="card-btn" @click="showDetailModal(data.timestamp)"><Icon type="android-open" size="24"></Icon></span>
                        </div>
                        <p class="card-title" slot="title">{{ data.title }}</p>
                      </div>
                      </Card>
                  </div>
                </Panel>

              </Collapse>

              <!-- modal-detail -->
              <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="detailModal" ok-text="Ok" cancel-text="Cancel">
                <div>

                  <div class="card-top">
                    <i-circle class="card-circle" :size=40 v-if="dataCopy.percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
                      <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
                    </i-circle>
                    <i-circle class="card-circle" :size=40 v-else :percent="dataCopy.percent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
                      <span>{{ dataCopy.percent }}%</span>
                    </i-circle>
                    <DatePicker class="card-date" type="date" size="large" v-model="dataCopy.date" readonly format="yyyy-MM-dd"/>
                  </div>

                  <p class="detail-title" slot="title">{{ dataCopy.title }}</p>

                  <mavon-editor class="detail-content" v-model="dataCopy.content" :subfield="subfieldDetail" :defaultOpen="defaultOpenDetail" :toolbarsFlag="toolbarsFlagDetail">{{ dataCopy.content }}</mavon-editor>

                  <div class="div-plans">
                    <Alert class="alert-plans" v-for="item in dataCopy.plans" :key="item.timestamp">
                      <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
                      <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
                      <div class="div-plan">
                        <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
                        <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
                      </div>
                    </Alert>
                  </div>

                </div>
              </Modal>

              <!-- modal-modify -->
              <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modifyModal" @on-ok="submitModify" loading  ok-text="Modify" cancel-text="Cancel">

                <Form class="form" ref="formItem" :model="formItem">
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
                    <DatePicker class="card-date" type="date" size="large" v-model="formItem.date" placeholder="Date" confirm/>
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
                  </FormItem>
                  <FormItem prop="content">
                    <mavon-editor class="mavon-editor" v-model="formItem.content" :subfield="subfieldModify" :defaultOpen="defaultOpenModify" :placeholder="placeholder" :toolbarsFlag="toolbarsFlagModify" :toolbars="toolbarsModify"></mavon-editor>
                  </FormItem>

                  <FormItem>
                    <Icon class="icon-item" type="flag" size=18></Icon>
                    <span class="span-form">Set plans</span>
                  </FormItem>
                  <FormItem>
                    <Alert class="alert-projects" type="success" v-for="item in formItem.plans" :key="item.timestamp">
                      <Slider class="slider" v-model="item.percent" show-input></Slider>
                      <div class="div-project">
                        <Input class="edit-tag" type="text" clearable placeholder="Tag" v-model="item.tag"></Input>
                        <Input class="edit-goal" type="text" clearable placeholder="Goal" v-model="item.goal"></Input>
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

                </Form>
              </Modal>

            </Content>
          </Layout>
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
  name: 'project-overview',
  created () {
    this.computePercent()
    this.clickTag('0')
  },
  data () {
    return {
      count: {
        total: 0,
        done: 0,
        doing: 0
      },
      datas: [
        {
          timestamp: 1,
          show: true,
          type: '1',
          percent: 0,
          date: '2017-03-01',
          title: '2017年度计划',
          content: '内容。。。',
          plans: [
            {
              timestamp: 0,
              tag: 'project',
              goal: '健身',
              percent: 20
            },
            {
              timestamp: 1,
              tag: 'project',
              goal: '考驾照',
              percent: 100
            },
            {
              timestamp: 2,
              tag: 'project',
              goal: '秋招',
              percent: 100
            }
          ]
        },
        {
          timestamp: 2,
          show: true,
          type: '2',
          percent: 0,
          date: '2017-09-01',
          title: '2017年9月报告',
          content: '内容。。。\nddddddddddd\naaaaaaaaa',
          plans: [
            {
              timestamp: 3,
              tag: '秋招',
              goal: '复习',
              percent: 70
            },
            {
              timestamp: 4,
              tag: '开学',
              goal: '选班委',
              percent: 100
            }
          ]
        },
        {
          timestamp: 3,
          show: true,
          type: '3',
          percent: 0,
          date: '2018-02-12',
          title: '2018春节活动',
          content: '内容。。。',
          plans: [
            {
              timestamp: 5,
              tag: '旅游',
              goal: '深圳',
              percent: 100
            },
            {
              timestamp: 6,
              tag: '旅游',
              goal: '香港',
              percent: 100
            }
          ]
        },
        {
          timestamp: 4,
          show: true,
          type: '2',
          percent: 0,
          date: '2018-03-04',
          title: '2018开学准备',
          content: '内容',
          plans: [
            {
              timestamp: 7,
              tag: '实习',
              goal: '初期报告',
              percent: 0
            }
          ]
        },
        {
          timestamp: 5,
          show: true,
          type: '2',
          percent: 0,
          date: '2018-01-12',
          title: '放假安排',
          content: '## 1.\n- projects1\n- projects2\n- projects3\n- projects4\n---\n**paragraphy**\n---\n## 2.\nlong content: aaaaaaaaaaaaaa\n---\n > int a = 1\n\n### h3: title3\np4',
          plans: [
            {
              timestamp: 8,
              tag: '年前',
              goal: '在家休息',
              percent: 100
            },
            {
              timestamp: 9,
              tag: '年后',
              goal: '出行游玩',
              percent: 100
            }
          ]
        },
        {
          timestamp: 6,
          show: true,
          type: '2',
          percent: 0,
          date: '2018-03-15',
          title: '实习相关事项',
          content: '内容',
          plans: []
        },
        {
          timestamp: 7,
          show: true,
          type: '4',
          percent: 0,
          date: '2018-05-01',
          title: '毕设安排',
          content: '内容',
          plans: []
        }
      ],
      currentType: '0',
      spinShow: false,
      detailModal: false,
      dataCopy: {},
      subfieldDetail: false,
      defaultOpenDetail: 'preview',
      toolbarsFlagDetail: false,
      modifyModal: false,
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
      subfieldModify: true,
      defaultOpenModify: '',
      placeholder: 'Content',
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
      editGoal: ''
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
    computePercent () {
      for (var i = 0; i < this.datas.length; i++) {
        if (this.datas[i].plans.length === 0) {
          this.datas[i].percent = 0
        } else {
          var percent = 0
          for (var j = 0; j < this.datas[i].plans.length; j++) {
            percent += this.datas[i].plans[j].percent
          }
          this.datas[i].percent = Math.round(percent / this.datas[i].plans.length)
        }
      }
    },
    clickTag: function (name) {
      this.currentType = name
      var _total = 0
      var _done = 0
      var _doing = 0
      if (name === '0') {
        _total = this.datas.length
        for (let i = 0; i < this.datas.length; i++) {
          this.datas[i].show = true
          if (this.datas[i].percent === 100) {
            _done++
          } else {
            _doing++
          }
        }
      } else {
        for (let i = 0; i < this.datas.length; i++) {
          console.log('--------------')
          console.log('type:' + this.datas[i].type)
          console.log('title:' + this.datas[i].title)
          if (this.datas[i].type === name) {
            _total++
            this.datas[i].show = true
            if (this.datas[i].percent === 100) {
              _done++
            } else {
              _doing++
            }
          } else {
            this.datas[i].show = false
          }
        }
      }
      this.count = {
        total: _total,
        done: _done,
        doing: _doing
      }
    },
    showModifyModal (timestamp) {
      this.spinShow = true
      for (var i = 0; i < this.datas.length; i++) {
        if (this.datas[i].timestamp === timestamp) {
          // 此拷贝方式破坏了date对象的结构，其中包含的时区设置丢失，所以必须采用date重新创建一次
          // 参考文献[使用JSON序列化实现伪深克隆时Date对象时区问题的解决方案](http://blog.csdn.net/zy13608089849/article/details/79625403)
          this.formItem = JSON.parse(JSON.stringify(this.datas[i]))
          this.formItem.date = new Date(this.formItem.date)
          break
        }
      }
      let _this = this
      setTimeout(() => {
        _this.modifyModal = true
        _this.spinShow = false
      }, 1000)
    },
    showDetailModal (timestamp) {
      this.spinShow = true
      for (var i = 0; i < this.datas.length; i++) {
        if (this.datas[i].timestamp === timestamp) {
          this.dataCopy = this.datas[i]
          break
        }
      }
      let _this = this
      setTimeout(() => {
        _this.detailModal = true
        _this.spinShow = false
      }, 1000)
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
        goal: this.editGoal,
        percent: 0
      }
      this.formItem.plans.push(plan)
      this.editTag = ''
      this.editGoal = ''
    },
    submitModify () {
      let _this = this
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Modify successful.',
          desc: ''
        })
        for (var i = 0; i < _this.datas.length; i++) {
          if (_this.datas[i].timestamp === _this.formItem.timestamp) {
            _this.datas[i] = _this.formItem
            if (_this.datas[i].plans.length === 0) {
              _this.datas[i].percent = 0
            } else {
              var percent = 0
              for (var j = 0; j < _this.datas[i].plans.length; j++) {
                percent += _this.datas[i].plans[j].percent
              }
              _this.datas[i].percent = Math.round(percent / _this.datas[i].plans.length)
            }
            break
          }
        }
        _this.clickTag(_this.currentType)
        _this.modifyModal = false
      }, 1000)
      projectApi.modify(this.formItem.timestamp, this.formItem.type, this.formItem.date, this.formItem.title, this.formItem.content, this.formItem.plans).then(function (response) {
        if (response.data.result === true) {
          _this.$Notice.success({
            title: 'Modify successful.',
            desc: ''
          })
          for (var i = 0; i < _this.datas.length; i++) {
            if (_this.datas[i].timestamp === _this.formItem.timestamp) {
              _this.datas[i] = _this.formItem
              if (_this.datas[i].plans.length === 0) {
                _this.datas[i].percent = 0
              } else {
                var percent = 0
                for (var j = 0; j < _this.datas[i].plans.length; j++) {
                  percent += _this.datas[i].plans[j].percent
                }
                _this.datas[i].percent = Math.round(percent / _this.datas[i].plans.length)
              }
              break
            }
          }
          _this.clickTag(_this.currentType)
          _this.modifyModal = false
        } else {
          _this.$Notice.error({
            title: 'Modify failed.',
            desc: ''
          })
          _this.loadingModify = false
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

.data-count {
  font-size  : 14px;
  margin-left: 10px;
  font-weight: bold;
}

.data-div {
  height          : auto;
  width           : auto;
  display         : inline-block;
  margin          : 20px;
  background-color: #dddee1;
  padding         : 3px;
  border-radius   : 5px;
}
/** card **/
.card-top {
  width         : 100%;
  align-items   : center;
  margin-bottom : 10px;
  padding-bottom: 10px;
  display       : flex;
  display       : -webkit-flex;
  border-bottom : 1px solid #ccc;
}

.card-circle {
  font-size  : 15px;
  font-weight: bold;
  display    : inline-block;
}

.card-date {
  width      : auto;
  margin-left: 5px;
  display    : flex;
}

.card-btn {
  width   : auto;
  float   : right;
  position: relative;
  margin  : auto 0 auto 10px;
  cursor  : pointer;
}

.card-title {
  width      : 100%;
  text-align : center;
  margin-top : 5px;
  padding-top: 5px;
  font-weight: bold;
  font-size  : 18px;
}

.card-content {
  min-width : 100px;
  min-height: 100px;
  width     : auto;
  height    : 120px;
  margin    : 0;
  font-size : 12px;
  z-index   : 5;
}
/** detail **/
.modal {
  z-index: 7;
}

.detail-title {
  width      : 100%;
  text-align : center;
  font-weight: bold;
  font-size  : 22px;
}

.detail-content {
  min-width : 100px;
  min-height: 50px;
  width     : auto;
  height    : auto;
  margin-top: 10px;
  font-size : 16px;
  z-index   : 7;
}

.div-plans {
  margin-top: 20px;
}

.alert-plans {
  padding-right: 5px;
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
  margin : auto 10px auto 5px;
  display: inline-block;
}

.vertical-center-modal {
  display        : flex;
  align-items    : center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
/** modify **/
.form {
  padding: 10px;
}

.span-form {
  width      : auto;
  margin-left: 10px;
  font-size  : 16px;
}

.select-type {
  width       : 160px;
  margin-right: 20px;
  z-index     : 7;
  display     : block;
}

.card-date {
  width  : 160px;
  z-index: 7;
  display: block;
}

.input-title {
  width  : 240px;
  display: block;
}

.mavon-editor {
  height : 400px;
  width  : 100%;
  z-index: 5;
}

.alert-projects {
  padding-right: 16px;
}

.div-project {
  display: flex;
}

.slider{
  margin-bottom:20px;
}

.tag-tag {
  width  : 100px;
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
</style>
