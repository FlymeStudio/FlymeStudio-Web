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

          <!-- spin -->
          <Spin class="spin" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          <Collapse>

            <Panel>
              <span class="div-count" style="color:#1c2438;"> Managed ({{ managedTeams.length }})</span>

              <div class="div-team" slot="content" v-for="team in managedTeams" :key="team.id">
                <Card>
                  <div slot="title" style="color:#2b85e4;">
                    <Icon class="icon-item" type="ios-people" size="24"></Icon>
                    <span class="span-team-name">{{ team.name }}</span>
                  </div>

                  <Alert type="success">
                    <Tooltip content="Export projects">
                      <Button class="btn-team" type="primary" shape="circle" icon="archive" @click="exportProjects(team.id)"></Button>
                    </Tooltip>
                    <Tooltip content="Export summaries">
                      <Button class="btn-team" type="primary" shape="circle" icon="archive" @click="exportSummaries(team.id)"></Button>
                    </Tooltip>
                    <Tooltip content="Invite people">
                      <Button class="btn-team" type="info" shape="circle" icon="android-person-add" @click="invite(team.id)"></Button>
                    </Tooltip>
                    <Tooltip content="Disband team">
                      <Button v-if="team.administratorTel == info.tel" class="btn-team" type="error" shape="circle" icon="android-warning" @click="disband(team.id)"></Button>
                      <Button v-else class="btn-team" type="warning" shape="circle" icon="android-warning" disabled></Button>
                    </Tooltip>
                  </Alert>

                  <div class="div-menu-item">
                    <Icon class="icon-item" type="pound" size="18"></Icon>
                    <span class="span-item">{{ team.id }}</span>
                  </div>
                  <div class="div-menu-item">
                    <Icon class="icon-item" type="star" size="18" style="color:#ff9900;"></Icon>
                    <span class="span-item">{{ team.administratorName }}</span>
                  </div>

                  <Collapse>
                    <Panel>
                      <span class="div-count"><Icon class="icon-item" type="chatbubbles" size="18"></Icon> Member ({{ team.members.length }})</span>

                      <div class="div-members" slot="content">
                        <div class="div-member" v-for="member in team.members" :key="member.tel">
                          <Icon v-if="member.permission == 2" class="icon-member" type="person" size="18" style="color:#ff9900;"></Icon>
                          <Icon v-else-if="member.permission == 1" class="icon-member" type="person" size="18" style="color:#19be6b;"></Icon>
                          <Icon v-else class="icon-member" type="person" size="18" style="color:#2d8cf0;"></Icon>
                          <span class="span-name">{{ member.name }}</span>
                          <Icon class="icon-member" type="ios-telephone" size="18"></Icon>
                          <span class="span-tel">{{ member.tel }}</span>
                          <div class="btns">
                            <Tooltip content="View projects">
                              <Button class="btn-member" size="small" type="info" shape="circle" icon="clipboard" @click="viewProjects(member.tel, member.name, member.email)"></Button>
                            </Tooltip>
                            <Tooltip content="View summaries">
                              <Button class="btn-member" size="small" type="info" shape="circle" icon="document-text" @click="viewSummaries(member.tel, member.name, member.email)"></Button>
                            </Tooltip>
                            <Tooltip content="Set permission">
                              <Button v-if="team.administratorTel == info.tel" class="btn-member" size="small" type="warning" shape="circle" icon="key" @click="setPermission(team.id, member.tel)" style="margin-left:10px;"></Button>
                              <Button v-else class="btn-member" size="small" type="warning" shape="circle" icon="key" disabled style="margin-left:10px;"></Button>
                            </Tooltip>
                            <Tooltip content="Remove member">
                              <Button v-if="member.tel != info.tel && member.permission == 0" class="btn-member" size="small" type="error" shape="circle" icon="close-round" @click="removeMember(team.id, member.tel, member.name)"></Button>
                              <Button v-else class="btn-member" size="small" type="error" shape="circle" icon="close-round" disabled></Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </Card>
              </div>
            </Panel>

            <Panel>
              <span class="div-count" style="color:#1c2438;"> Joined ({{ joinedTeams.length }})</span>

              <div class="div-team" slot="content" v-for="team in joinedTeams" :key="team.id">
                <Card>
                  <div slot="title" style="color:#2b85e4;">
                    <Icon class="icon-item" type="ios-people" size="24"></Icon>
                    <span class="span-team-name">{{ team.name }}</span>
                  </div>

                  <Alert type="success">
                    <Tooltip content="Export projects">
                      <Button class="btn-team" type="primary" shape="circle" icon="archive" disabled></Button>
                    </Tooltip>
                    <Tooltip content="Export summaries">
                      <Button class="btn-team" type="primary" shape="circle" icon="archive" disabled></Button>
                    </Tooltip>
                    <Tooltip content="Invite people">
                      <Button class="btn-team" type="info" shape="circle" icon="android-person-add" @click="invite(team.id)"></Button>
                    </Tooltip>
                    <Tooltip content="Set permission">
                      <Button class="btn-team" type="warning" shape="circle" icon="key" disabled></Button>
                    </Tooltip>
                    <Tooltip content="Disband team">
                      <Button class="btn-team" type="warning" shape="circle" icon="android-warning" disabled></Button>
                    </Tooltip>
                  </Alert>

                  <div class="div-menu-item">
                    <Icon class="icon-item" type="pound" size="18"></Icon>
                    <span class="span-item">{{ team.id }}</span>
                  </div>
                  <div class="div-menu-item">
                    <Icon class="icon-item" type="star" size="18" style="color:#ff9900;"></Icon>
                    <span class="span-item">{{ team.administratorName }}</span>
                  </div>

                  <Collapse>
                    <Panel>
                      <span class="div-count"><Icon class="icon-item" type="chatbubbles" size="18"></Icon> Member ({{ team.members.length }})</span>

                      <div class="div-members" slot="content">
                        <div class="div-member" v-for="member in team.members" :key="member.tel">
                          <Icon v-if="member.permission == 2" class="icon-member" type="person" size="18" style="color:#ff9900;"></Icon>
                          <Icon v-else-if="member.permission == 1" class="icon-member" type="person" size="18" style="color:#19be6b;"></Icon>
                          <Icon v-else class="icon-member" type="person" size="18" style="color:#2d8cf0;"></Icon>
                          <span class="span-name">{{ member.name }}</span>
                          <Icon class="icon-member" type="ios-telephone" size="18"></Icon>
                          <span class="span-tel">{{ member.tel }}</span>

                          <div class="btns">
                            <Tooltip content="View projects">
                              <Button class="btn-member" size="small" type="info" shape="circle" icon="clipboard" disabled></Button>
                            </Tooltip>
                            <Tooltip content="View summaries">
                              <Button class="btn-member" size="small" type="info" shape="circle" icon="document-text" disabled></Button>
                            </Tooltip>
                            <Tooltip content="Set permission">
                              <Button class="btn-member" size="small" style="margin-left:10px;" type="warning" shape="circle" icon="key" disabled></Button>
                            </Tooltip>
                            <Tooltip content="Remove member">
                              <Button class="btn-member" size="small" type="error" shape="circle" icon="close-round" disabled></Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </Card>
              </div>
            </Panel>
          </Collapse>

          <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalViewProjects">

            <Layout style="margin-top:20px;">

              <Spin class="spin" fix v-if="spinModal">
                <Icon class="icon-spin" type="load-c" size=50></Icon>
              </Spin>

              <Header class="layout-header-bar" theme="dark">
                <Icon type="clipboard" size=18 style="margin-right:10px;"></Icon><span>Project</span>
                <Icon type="person" size=18 style="margin:auto 10px auto 30px;"></Icon><span>{{ currentView.name }}</span>
                <Icon type="ios-telephone" size=18 style="margin:auto 10px auto 30px;"></Icon><span>{{ currentView.tel }}</span>
                <Icon type="email" size=18 style="margin:auto 10px auto 30px;"></Icon><span>{{ currentView.email }}</span>
              </Header>

              <Layout>

                <Sider style="z-index:6;" width="100">
                  <Menu active-name="0" theme="dark" width="auto" @on-select="clickProjectsTag">
                    <MenuItem class="menu-item" name="0"><span>All</span>
                    </MenuItem>
                    <MenuItem class="menu-item" name="1"><span>Yearly</span>
                    </MenuItem>
                    <MenuItem class="menu-item" name="2"><span>Monthly</span>
                    </MenuItem>
                    <MenuItem class="menu-item" name="3"><span>Weekly</span>
                    </MenuItem>
                    <MenuItem class="menu-item" name="4"><span>Daily</span>
                    </MenuItem>
                  </Menu>
                </Sider>

                <Sider style="background:#fff">

                  <Collapse v-model="collapseProjects">

                    <Panel name="Total">

                      <!-- title -->
                      <span class="data-count" style="color:#2d8cf0;"> Total ({{ count.total }})</span>

                      <!-- content -->
                      <div slot="content">
                        <Alert class="alert-title" v-for="data in currentProjects" v-if="data.show == true" :key="data.timestamp" @click="chooseProject(data)">
                          {{ data.title }}
                        </Alert>
                      </div>
                    </Panel>

                    <Panel name="Done">

                      <!-- title -->
                      <span class="data-count" style="color:#19be6b;"> Done ({{ count.done }})</span>

                      <!-- content -->
                      <div slot="content">
                        <Alert class="alert-title" v-for="data in currentProjects" v-if="data.show == true && data.percent == 100" :key="data.timestamp" @click="chooseProject(data)">
                          {{ data.title }}
                        </Alert>
                      </div>

                    </Panel>

                    <Panel name="Doing">

                      <!-- title -->
                      <span class="data-count" style="color:#ed3f14;"> Doing ({{ count.doing }})</span>

                      <!-- content -->
                      <div slot="content">
                        <Alert class="alert-title" v-for="data in currentProjects" v-if="data.show == true && data.percent != 100" :key="data.timestamp" @click="chooseProject(data)">
                          {{ data.title }}
                        </Alert>

                      </div>

                    </Panel>

                  </Collapse>

                </Sider>

                <Content>
                </Content>

              </Layout>

            </Layout>
          </Modal>

          <Modal v-model="modalViewSummaries">

          </Modal>

          <!-- confirm -->
          <Modal class="modal-remove" v-model="modalRemoveMember" title="Confirm" :mask-closable="false" :closable="false" ok-text="Remove" cancel-text="Cancel" loading @on-ok="remove()">
            <Alert type="warning" show-icon>
              <p>Are you sure to remove {{ currentRemove.name }}({{ currentRemove.tel }}) from team?</p>
              <template slot="desc">
                <p>If yes, input the password to check your identity:</p>
                <Input style="margin-top:20px;" type="password" v-model="password" size="large" placeholder="Password" clearable>
                </Input>
              </template>
            </Alert>
          </Modal>
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
import teamworkApi from '../api/teamworkApi'

export default{
  name: 'teamwork-overview',
  created () {
    this.getInfo()
    this.getTeams()
  },
  data () {
    return {
      password: '',
      info: {
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      spinShow: false,
      spinModal: false,
      managedTeams: [],
      joinedTeams: [],
      currentView: {
        name: '',
        tel: '',
        email: ''
      },
      currentRemove: {
        teamId: '',
        name: '',
        tel: ''
      },
      count: {
        total: 0,
        done: 0,
        doing: 0
      },
      currentTag: '0',
      currentProjects: [],
      currentProject: {},
      collapseProjects: '',
      currentSummaries: [],
      currentSummary: {},
      modalExportProjects: false,
      modalExportSummaries: false,
      modalInvite: false,
      modalDisband: false,
      modalViewProjects: false,
      modalViewSummaries: false,
      modalSetPermission: false,
      modalRemoveMember: false,
      subfieldProject: false,
      defaultOpenProject: 'preview',
      toolbarsFlagProject: false
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
    getInfo () {
      let name = this.$store.state.user.userInfo.name
      if (name === null) {
        this.$router.push('/')
      } else {
        this.info = this.$store.state.user.userInfo
      }
    },
    getTeams () {
      this.spinShow = false
      // TEST START
      this.managedTeams = [
        {
          id: '00001',
          name: 'System support',
          administratorName: '李永达',
          administratorTel: '13612345678',
          members: [
            {
              name: '李永达',
              tel: '13612345678',
              email: '87654321@qq.com',
              permission: 2
            },
            {
              name: '曾宇',
              tel: '13608089849',
              email: '1213814232@qq.com',
              permission: 1
            },
            {
              name: '刘卓旻',
              tel: '13612345679',
              email: '123456789@qq.com',
              permission: 0
            }
          ]
        },
        {
          id: '00003',
          name: 'Test team',
          administratorName: '曾宇',
          administratorTel: '13608089849',
          members: [
            {
              name: '曾宇',
              tel: '13608089849',
              email: '1213814232@qq.com',
              permission: 2
            },
            {
              name: '刘卓旻',
              tel: '13612345679',
              email: '123456789@qq.com',
              permission: 0
            },
            {
              name: '张三',
              tel: '12345678901',
              email: '123455555@qq.com',
              permission: 1
            }
          ]
        }
      ]
      this.joinedTeams = [
        {
          id: '00002',
          name: 'Overseas firmware',
          administratorName: '段启智',
          administratorTel: '13456789012',
          members: [
            {
              tel: '13456789012',
              name: '段启智',
              email: '122222222@qq.com',
              permission: 2
            },
            {
              tel: '13412345678',
              name: '余学海',
              email: '1111111@qq.com',
              permission: 0
            },
            {
              name: '曾宇',
              tel: '13608089849',
              email: '1213814232@qq.com',
              permission: 0
            }
          ]
        }
      ]
      this.spinShow = false
      // TEST END
      let _this = this
      teamworkApi.viewTeams(this.info.tel).then(function (response) {
        if (response.data.result === true) {
          _this.managedTeams = response.data.managedTeams
          _this.joinedTeams = response.data.joinedTeams
        } else {
          _this.$Notice.error({
            title: 'Failed to get data.',
            desc: ''
          })
        }
        _this.spinShow = false
      })
    },
    exportProjects (teamId) {
      this.$Message.error('Function not available.')
    },
    exportSummaries (teamId) {
      this.$Message.error('Function not available.')
    },
    invite (teamId) {
      //
    },
    disband (teamId) {
      this.$Message.error('Function not available.')
    },
    viewProjects (tel, name, email) {
      this.spinShow = true
      this.currentView = {
        name: name,
        tel: tel,
        email: email
      }
      // TEST START
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
      this.clickProjectsTag(this.currentTag)
      setTimeout(() => {
        _this.modalViewProjects = true
        _this.spinShow = false
      }, 2000)
      // TEST END
      let _this = this
      teamworkApi.viewMemberProjects(this.info.tel, tel).then(function (response) {
        if (response.data.result === true) {
          _this.currentProjects = response.data.projects
          _this.computePercent()
          _this.clickProjectsTag(_this.currentTag)
        } else {
          _this.$Notice.error({
            title: 'Failed to get data.',
            desc: ''
          })
        }
        _this.spinShow = false
      })
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
    clickProjectsTag (name) {
      this.collapseProjects = ''
      this.spinModal = true
      this.currentTag = name
      var _total = 0
      var _done = 0
      var _doing = 0
      if (name === '0') {
        _total = this.currentProjects.length
        for (let i = 0; i < this.currentProjects.length; i++) {
          this.currentProjects[i].show = true
          if (this.currentProjects[i].percent === 100) {
            _done++
          } else {
            _doing++
          }
        }
      } else {
        for (let i = 0; i < this.currentProjects.length; i++) {
          if (this.currentProjects[i].type === name) {
            _total++
            this.currentProjects[i].show = true
            if (this.currentProjects[i].percent === 100) {
              _done++
            } else {
              _doing++
            }
          } else {
            this.currentProjects[i].show = false
          }
        }
      }
      this.count = {
        total: _total,
        done: _done,
        doing: _doing
      }
      let _this = this
      setTimeout(() => {
        _this.spinModal = false
      }, 1000)
    },
    chooseProject (data) {
      this.currentProject = data
    },
    viewSummaries (tel, name, email) {
      this.$Message.error('Function not available.')
    },
    setPermission (teamId) {
      this.$Message.error('Function not available.')
    },
    removeMember (teamId, tel, name) {
      this.currentRemove = {
        teamId: teamId,
        name: name,
        tel: tel
      }
      this.modalRemoveMember = true
    },
    remove () {
      if (this.password !== this.info.password) {
        this.$Notice.error({
          title: 'Password is incorrect.',
          desc: ''
        })
        this.password = ''
        return
      }
      let _this = this
      // TEST START
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Remove successful.',
          desc: ''
        })
        for (var i = 0; i < _this.managedTeams.length; i++) {
          if (_this.managedTeams[i].id === _this.currentRemove.teamId) {
            for (var j = 0; j < _this.managedTeams[i].members.length; j++) {
              if (_this.managedTeams[i].members[j].tel === _this.currentRemove.tel) {
                _this.managedTeams[i].members.splice(j, 1)
                _this.currentRemove = []
                _this.password = ''
                _this.modalRemoveMember = false
                break
              }
            }
          }
        }
      }, 2000)
      // TEST END
      teamworkApi.removeMember(this.info.tel, this.currentRemove.tel, this.currentRemove.teamId).then(function (response) {
        if (response.data.result === true) {
          _this.$Notice.success({
            title: 'Remove successful.',
            desc: ''
          })
          _this.currentRemove = []
          _this.password = ''
          _this.getTeams()
        } else {
          _this.$Notice.error({
            title: 'Remove failed.',
            desc: ''
          })
        }
        _this.modalRemoveMember = false
      })
    }
  }
}
</script>

<style scoped>
.div-team {
  margin-bottom: 20px;
}

.span-team-name {
  margin-left: 10px;
  font-size  : 20px;
  font-weight: bold;
}

.btn-team {
  margin   : auto 5px;
  font-size: 20px;
}

.div-menu-item {
  padding: 5px;
}

.span-item {
  margin     : auto auto auto 5px;
  align-items: center;
  font-size  : 16px;
}

.div-count {
  font-size  : 16px;
  margin-left: 10px;
  font-weight: bold;
  color      : #2d8cf0;
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
/** modal-project **/
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
  width         : auto;
  text-overflow : ellipsis;
  white-space   : nowrap;
  vertical-align: bottom;
  font-weight   : bold;
  text-align    : center;
}

.menu-item i {
  vertical-align: middle;
  font-size     : 16px;
}

.data-count {
  font-size  : 14px;
  margin-left: 10px;
  font-weight: bold;
}

.alert-title {
  margin     : 0;
  cursor     : pointer;
  font-size  : 14px;
  font-weight: bold;
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

.detail-title {
  margin-left: 10px;
  font-size  : 15px;
  font-weight: bold;
  overflow   : hidden;
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

.div-list {}
/** modal summary**/
/** modal remove **/
.modal-remove {
  position: absolute;
  z-index : 10;
}

.modal-remove p {
  font-size: 18px;
  color    : red;
}
</style>
