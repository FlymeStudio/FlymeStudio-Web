<template>
<div>
  <!-- spin -->
  <Spin fix v-if="spinShow">
    <Icon class="icon-spin" type="load-c" size=50></Icon>
  </Spin>

  <Collapse>
    <Panel name="Manage">
      <span class="div-count" style="color:#19be6b;"> Manage ({{ managedTeams.length }})</span>

      <div class="div-members" slot="content" v-for="team in managedTeams" :key="team.id">
        <Card>
          <p slot="title">
            <Icon class="icon-item" type="ios-people" size="18"></Icon>
            <span>{{ team.name }}</span>
          </p>
          <div style="margin:10px;">
            <Icon class="icon-item" type="pound" size="18"></Icon>
            <span>{{ team.id }}</span>
          </div>
          <div style="margin:10px;">
            <Icon class="icon-item" type="star" size="18"></Icon>
            <span>{{ team.manager }}</span>
          </div>

          <Collapse>
            <Panel name="ManagedMembers">
              <span class="div-count"><Icon class="icon-item" type="chatbubbles" size="18"></Icon> Member ({{ team.members.length }})</span>

              <div class="div-members" slot="content">
                <div class="div-member" v-for="member in team.members" :key="member.tel">
                  <Icon class="icon-member" type="person" size="18"></Icon>
                  <span class="span-name">{{ member.name }}</span>
                  <Icon class="icon-member" type="ios-telephone" size="18"></Icon>
                  <span class="span-tel">{{ member.tel }}</span>
                  <div class="btns">
                    <Tooltip content="View projects">
                      <Button class="btn-member" size="small" type="info" shape="circle" icon="clipboard" @click="viewProjects(member.tel, member.name)"></Button>
                    </Tooltip>
                    <Tooltip content="View summaries">
                      <Button class="btn-member" size="small" type="info" shape="circle" icon="document-text" @click="viewSummaries(member.tel, member.name)"></Button>
                    </Tooltip>
                    <Tooltip content="Remove member">
                      <Button class="btn-member" size="small" style="margin-left:10px;" type="error" shape="circle" icon="close-round" @click="removeMember(member.tel, member.name)"></Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </Card>
      </div>
    </Panel>

    <Panel name="Join">
      <span class="div-count" style="color:#ff9900;"> Join ({{ joinedTeams.length }})</span>

      <div class="div-members" slot="content" v-for="team in joinedTeams" :key="team.id">
        <Card>
          <p slot="title">
            <Icon class="icon-item" type="ios-people" size="18"></Icon>
            <span>{{ team.name }}</span>
          </p>
          <div style="margin:10px;">
            <Icon class="icon-item" type="pound" size="18"></Icon>
            <span>{{ team.id }}</span>
          </div>
          <div style="margin:10px;">
            <Icon class="icon-item" type="star" size="18"></Icon>
            <span>{{ team.manager }}</span>
          </div>

          <Collapse>
            <Panel name="ManagedMembers">
              <span class="div-count"><Icon class="icon-item" type="chatbubbles" size="18"></Icon> Member ({{ team.members.length }})</span>

              <div class="div-members" slot="content">
                <div class="div-member" v-for="member in team.members" :key="member.tel">
                  <Icon class="icon-member" type="person" size="18"></Icon>
                  <span class="span-name">{{ member.name }}</span>
                  <Icon class="icon-member" type="ios-telephone" size="18"></Icon>
                  <span class="span-tel">{{ member.tel }}</span>
                </div>
              </div>
            </Panel>
          </Collapse>
        </Card>
      </div>
    </Panel>
  </Collapse>

  <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalProjects">

    <Layout style="margin-top:20px;">
      <Header class="layout-header-bar" theme="dark">
        <Icon type="clipboard" size=18 style="margin-right:10px;"></Icon><span>Project</span>
        <Icon type="person" size=18 style="margin:auto 10px auto 30px;"></Icon><span>{{ currentUser }}</span>
      </Header>
      <Layout>
        <Sider style="z-index:6;" breakpoint="md" collapsible :collapsed-width="60" v-model="isCollapsed">
          <Menu active-name="0" theme="dark" width="auto" :class="menuitemClasses" @on-select="clickProjectsTag">
            <MenuItem class="menu-item" name="0"> All
            </MenuItem>
            <MenuItem class="menu-item" name="1"> Yearly
            </MenuItem>
            <MenuItem class="menu-item" name="2"> Monthly
            </MenuItem>
            <MenuItem class="menu-item" name="3"> Weekly
            </MenuItem>
            <MenuItem class="menu-item" name="4"> Daily
            </MenuItem>
          </Menu>
          <div slot="trigger"></div>
        </Sider>
        <Layout>
          <Content :style="{margin: '25px', background: '#fff', minHeight: '220px'}">
            <div span="12" class="demo-tabs-style2">
              <Tabs type="card">
                <TabPane label="Total">
                  <Collapse>
                    <Panel class="panel-project" v-for="project in currentProjects" :key="project.timestamp" v-if="project.show == true">
                      <span class="detail-title">{{ project.title }}</span>
                      <div slot="content">
                        <div class="card-top">
                          <i-circle class="card-circle" :size=40 v-if="project.percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
                            <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
                          </i-circle>
                          <i-circle class="card-circle" :size=40 v-else :percent="project.percent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
                            <span>{{ project.percent }}%</span>
                          </i-circle>
                          <DatePicker class="card-date" type="date" size="large" v-model="project.date" readonly format="yyyy-MM-dd" />
                        </div>
                        <mavon-editor class="detail-content" v-model="project.content" :subfield="subfieldProject" :defaultOpen="defaultOpenProject" :toolbarsFlag="toolbarsFlagProject">{{ project.content }}</mavon-editor>
                        <div class="div-plans">
                          <Alert class="alert-plans" v-for="item in project.plans" :key="item.timestamp">
                            <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
                            <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
                            <div class="div-plan">
                              <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
                              <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
                            </div>
                          </Alert>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </TabPane>
                <TabPane label="Done">
                  <Collapse>
                    <Panel class="panel-project" v-for="project in currentProjects" :key="project.timestamp" v-if="project.show == true && project.percent == 100">
                      <span class="detail-title">{{ project.title }}</span>
                      <div slot="content">
                        <div class="card-top">
                          <i-circle class="card-circle" :size=40 v-if="project.percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
                            <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
                          </i-circle>
                          <i-circle class="card-circle" :size=40 v-else :percent="project.percent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
                            <span>{{ project.percent }}%</span>
                          </i-circle>
                          <DatePicker class="card-date" type="date" size="large" v-model="project.date" readonly format="yyyy-MM-dd" />
                        </div>
                        <mavon-editor class="detail-content" v-model="project.content" :subfield="subfieldProject" :defaultOpen="defaultOpenProject" :toolbarsFlag="toolbarsFlagProject">{{ project.content }}</mavon-editor>
                        <div class="div-plans">
                          <Alert class="alert-plans" v-for="item in project.plans" :key="item.timestamp">
                            <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
                            <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
                            <div class="div-plan">
                              <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
                              <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
                            </div>
                          </Alert>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </TabPane>
                <TabPane label="Doing">
                  <Collapse>
                    <Panel class="panel-project" v-for="project in currentProjects" :key="project.timestamp" v-if="project.show == true && project.percent != 100">
                      <span class="detail-title">{{ project.title }}</span>
                      <div slot="content">
                        <div class="card-top">
                          <i-circle class="card-circle" :size=40 v-if="project.percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
                            <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
                          </i-circle>
                          <i-circle class="card-circle" :size=40 v-else :percent="project.percent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
                            <span>{{ project.percent }}%</span>
                          </i-circle>
                          <DatePicker class="card-date" type="date" size="large" v-model="project.date" readonly format="yyyy-MM-dd" />
                        </div>
                        <mavon-editor class="detail-content" v-model="project.content" :subfield="subfieldProject" :defaultOpen="defaultOpenProject" :toolbarsFlag="toolbarsFlagProject">{{ project.content }}</mavon-editor>
                        <div class="div-plans">
                          <Alert class="alert-plans" v-for="item in project.plans" :key="item.timestamp">
                            <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
                            <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
                            <div class="div-plan">
                              <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
                              <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
                            </div>
                          </Alert>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </TabPane>
              </Tabs>
            </div>

          </Content>
        </Layout>
      </Layout>

    </Layout>
  </Modal>

  <Modal v-model="modalSummaries">

  </Modal>

  <Modal v-model="modalRemove">

  </Modal>
</div>
</template>

<script>
export default {
  name: 'component-team-my',
  created () {
    this.getInfo()
  },
  data () {
    return {
      managedTeams: [
        {
          id: '00001',
          name: 'System support',
          manager: '李永达',
          members: [
            {
              tel: '13608089849',
              name: '曾宇'
            },
            {
              tel: '13612345678',
              name: '刘卓旻'
            }
          ]
        }
      ],
      joinedTeams: [
        {
          id: '00002',
          name: 'Overseas firmware',
          manager: '段启智',
          members: [
            {
              tel: '13412345678',
              name: '余学海'
            }
          ]
        }
      ],
      spinShow: false,
      currentType: '0',
      currentUser: '',
      currentProjects: [],
      currentSummaries: [],
      modalProjects: false,
      modalSummaries: false,
      modalRemove: false,
      isCollapsed: false,
      subfieldProject: false,
      defaultOpenProject: 'preview',
      toolbarsFlagProject: false
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    getInfo () {

    },
    viewProjects (tel, name) {
      this.spinShow = true
      this.currentUser = name
      this.currentProjects = [
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
      ]
      this.computePercent()
      let _this = this
      setTimeout(() => {
        _this.modalProjects = true
        _this.spinShow = false
      }, 2000)
    },
    viewSummaries (tel, name) {

    },
    removeMember (tel, name) {

    },
    computePercent () {
      for (var i = 0; i < this.currentProjects.length; i++) {
        if (this.currentProjects[i].plans.length === 0) {
          this.currentProjects[i].percent = 0
        } else {
          var percent = 0
          for (var j = 0; j < this.currentProjects[i].plans.length; j++) {
            percent += this.currentProjects[i].plans[j].percent
          }
          this.currentProjects[i].percent = Math.round(percent / this.currentProjects[i].plans.length)
        }
      }
    },
    clickProjectsTag: function (name) {
      this.currentType = name
      if (name === '0') {
        for (let i = 0; i < this.currentProjects.length; i++) {
          this.currentProjects[i].show = true
        }
      } else {
        for (let i = 0; i < this.currentProjects.length; i++) {
          if (this.currentProjects[i].type === name) {
            this.currentProjects[i].show = true
          } else {
            this.currentProjects[i].show = false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.div-count {
  font-size  : 14px;
  margin-left: 10px;
  font-weight: bold;
}

.div-members {
  height       : auto;
  width        : auto;
  padding      : 3px;
  border-radius: 5px;
}

.div-member {
  height       : auto;
  width        : 100%;
  padding      : 5px;
  margin-bottom: 15px;
  display      : flex;
  border-bottom: 1px solid #ccc;
  align-items  : center;
}

.icon-member {
  width       : 18px;
  text-align  : center;
  margin-left : 0;
  margin-right: 3px;
  float       : left;
}

.span-name {
  width    : 80px;
  float    : left;
  font-size: 16px;
  display  : inline-block;
}

.span-tel {
  width    : 120px;
  float    : left;
  font-size: 16px;
  display  : inline-block;
}

.btns {
  width      : auto;
  height     : auto;
  display    : flex;
  align-items: center;
  margin-left: auto;
  float      : right;
}

.btn-member {
  margin-right: 10px;
}
/** modal **/
.vertical-center-modal {
  display        : flex;
  align-items    : center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.modal {
  z-index: 7;
}

.layout {
  border       : 1px solid #d7dde4;
  background   : #f5f7f9;
  position     : relative;
  border-radius: 4px;
  overflow     : hidden;
}

.layout-header-bar {
  font-size  : 18px;
  font-weight: bold;
  color      : white;
  box-shadow : 0 1px 1px rgba(0,0,0,.1);
}

.menu-item span {
  display       : inline-block;
  overflow      : hidden;
  width         : 69px;
  text-overflow : ellipsis;
  white-space   : nowrap;
  vertical-align: bottom;
  transition    : width 0.2s ease 0.2s;
}

.menu-item i {
  transform     : translateX(0px);
  transition    : font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size     : 16px;
}

.collapsed-menu span {
  width     : 0;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform     : translateX(5px);
  transition    : font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size     : 22px;
}

.panel-project{
  z-index: 5;
}

.detail-title {
  margin-left: 10px;
  font-size  : 15px;
  font-weight: bold;
  overflow: hidden;
}

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

.detail-progress {
  font-size    : 16px;
  color        : #1788e8;
  margin-bottom: 10px;
  margin-right : -40px;
  display      : block;
}

.div-plan {
  display: flex;
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

.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 0;
  background   : #fff;
}

.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-top: 1px solid #3399ff;
}

.demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before {
  content   : '';
  display   : block;
  width     : 100%;
  height    : 1px;
  background: #3399ff;
  position  : absolute;
  top       : 0;
  left      : 0;
}
</style>
