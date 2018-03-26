<template>
  <Card>
    <!-- spin -->
    <Spin class="spin" fix v-if="spinShow">
      <Icon class="icon-spin" type="load-c" size=50></Icon>
    </Spin>

    <div slot="title" style="color:#2b85e4;">
      <Icon class="icon-item" type="ios-people" size="24"></Icon>
      <span class="span-team-name">{{ teamData.name }}</span>
    </div>

    <Alert type="success">
      <Tooltip content="Export projects">
        <Button v-if="teamType == 1" class="btn-team" type="primary" shape="circle" icon="archive" @click="exportProjects(teamData.id)"></Button>
        <Button v-else class="btn-team" type="primary" shape="circle" icon="archive" disabled></Button>
      </Tooltip>
      <Tooltip content="Export summaries">
        <Button v-if="teamType == 1" class="btn-team" type="primary" shape="circle" icon="archive" @click="exportSummaries(teamData.id)"></Button>
        <Button v-else class="btn-team" type="primary" shape="circle" icon="archive" disabled></Button>
      </Tooltip>
      <Tooltip content="Invite people">
        <Button class="btn-team" type="info" shape="circle" icon="android-person-add" @click="invite(teamData.id, teamData.name)"></Button>
      </Tooltip>
      <Tooltip content="Disband team">
        <Button v-if="teamData.administratorTel == info.tel" class="btn-team" type="error" shape="circle" icon="android-warning" @click="disband(teamData.id)"></Button>
        <Button v-else class="btn-team" type="warning" shape="circle" icon="android-warning" disabled></Button>
      </Tooltip>
    </Alert>

    <div class="div-menu-item">
      <Icon class="icon-item" type="pound" size="18"></Icon>
      <span class="span-item">{{ teamData.id }}</span>
    </div>
    <div class="div-menu-item">
      <Icon class="icon-item" type="star" size="18" style="color:#ff9900;"></Icon>
      <span class="span-item">{{ teamData.administratorName }}</span>
    </div>

    <Collapse>
      <Panel>
        <span class="div-count"><Icon class="icon-item" type="chatbubbles" size="18"></Icon> Member ({{ teamData.members.length }})</span>

        <div class="div-members" slot="content">
          <div class="div-member" v-for="member in teamData.members" :key="member.tel">
            <Icon v-if="member.permission == 2" class="icon-member" type="person" size="18" style="color:#ff9900;"></Icon>
            <Icon v-else-if="member.permission == 1" class="icon-member" type="person" size="18" style="color:#19be6b;"></Icon>
            <Icon v-else class="icon-member" type="person" size="18" style="color:#2d8cf0;"></Icon>
            <span class="span-name">{{ member.name }}</span>
            <Icon class="icon-member" type="ios-telephone" size="18"></Icon>
            <span class="span-tel">{{ member.tel }}</span>
            <div class="btns">
              <Tooltip content="View projects">
                <Button v-if="teamType == 1" class="btn-member" size="small" type="info" shape="circle" icon="clipboard" @click="viewProjects(member.tel, member.name, member.email)"></Button>
                  <Button v-else class="btn-member" size="small" type="info" shape="circle" icon="clipboard" disabled></Button>
              </Tooltip>
              <Tooltip content="View summaries">
                <Button v-if="teamType == 1" class="btn-member" size="small" type="info" shape="circle" icon="document-text" @click="viewSummaries(member.tel, member.name, member.email)"></Button>
                  <Button v-else class="btn-member" size="small" type="info" shape="circle" icon="document-text" disabled></Button>
              </Tooltip>
              <Tooltip content="Set permission">
                <Button v-if="teamData.administratorTel == info.tel" class="btn-member" size="small" type="warning" shape="circle" icon="key" @click="setPermission(teamData.id, member.tel)" style="margin-left:10px;"></Button>
                <Button v-else class="btn-member" size="small" type="warning" shape="circle" icon="key" disabled style="margin-left:10px;"></Button>
              </Tooltip>
              <Tooltip content="Remove member">
                <Button v-if="teamType == 1 && member.tel != info.tel && member.permission == 0" class="btn-member" size="small" type="error" shape="circle" icon="close-round" @click="removeMember(teamData.id, member.tel, member.name)"></Button>
                <Button v-else class="btn-member" size="small" type="error" shape="circle" icon="close-round" disabled></Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>

    <!-- modal-invite -->
    <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalInvite" ok-text="Ok" cancel-text="Cancel">
      <Layout>

        <Spin class="spin" fix v-if="spinInvite">
          <Icon class="icon-spin" type="load-c" size=50></Icon>
        </Spin>

      <div class="div-invite">
        <div class="div-invite-title">Invite user to join to {{ inviteTeam.teamName }}({{ inviteTeam.teamId }}):</div>
        <Input class="input-invite" v-model="searchContent" placeholder="User tel or name" clearable></Input>
        <Button class="btn" type="primary" shape="circle" icon="ios-search" @click="search()">Search</Button>
        <Button class="btn" type="info" shape="circle" icon="android-close" @click="clear()">Clear</Button>
        <Button class="btn" type="success" shape="circle" icon="android-add" @click="invitePeople()">Invite</Button>
        <Table class="table-search" highlight-row border :columns="columnsUser" :data="dataUser" @on-current-change="changeSelection" no-data-text="No data"></Table>
      </div>

    </Layout>
    </Modal>

    <!-- modal-disband -->
    <Modal>

    </Modal>

    <!-- modal-view-projects -->
    <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalViewProjects" ok-text="Ok" cancel-text="Cancel" @on-ok="searchContent = ''" @on-cancel="searchContent = ''">

      <Layout style="margin-top:20px;">

        <Spin class="spin" fix v-if="spinViewProjects">
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
                  <div class="div-content-title" v-for="data in currentProjects" v-if="data.show == true" :key="data.timestamp" @click="chooseProject(data)">
                    <Alert>{{ data.title }}</Alert>
                  </div>
                </div>
              </Panel>

              <Panel name="Done">

                <!-- title -->
                <span class="data-count" style="color:#19be6b;"> Done ({{ count.done }})</span>

                <!-- content -->
                <div slot="content">
                  <div class="div-content-title" v-for="data in currentProjects" v-if="data.show == true" :key="data.timestamp" @click="chooseProject(data)">
                    <Alert>{{ data.title }}</Alert>
                  </div>
                </div>

              </Panel>

              <Panel name="Doing">

                <!-- title -->
                <span class="data-count" style="color:#ed3f14;"> Doing ({{ count.doing }})</span>

                <!-- content -->
                <div slot="content">
                  <div class="div-content-title" v-for="data in currentProjects" v-if="data.show == true" :key="data.timestamp" @click="chooseProject(data)">
                    <Alert>{{ data.title }}</Alert>
                  </div>
                </div>

              </Panel>

            </Collapse>

          </Sider>

          <Content>
            <div class="div-content">
              <div class="card-top">
                <i-circle class="card-circle" :size=40 v-if="currentProject.percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
                  <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
                </i-circle>
                <i-circle class="card-circle" :size=40 v-else :percent="currentProject.percent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
                  <span>{{ currentProject.percent }}%</span>
                </i-circle>
                <DatePicker class="card-date" type="date" size="large" v-model="currentProject.date" readonly format="yyyy-MM-dd" />
              </div>

              <p class="detail-title" slot="title">{{ currentProject.title }}</p>

              <mavon-editor class="detail-content" v-model="currentProject.content" :subfield="subfieldProject" :defaultOpen="defaultOpenProject" :toolbarsFlag="toolbarsFlagProject">{{ currentProject.content }}</mavon-editor>

              <div class="div-plans">
                <Alert class="alert-plans" v-for="item in currentProject.plans" :key="item.timestamp">
                  <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
                  <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
                  <div class="div-plan">
                    <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
                    <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
                  </div>
                </Alert>
              </div>
            </div>
          </Content>

        </Layout>

      </Layout>
    </Modal>

    <!-- modal-view-summaries -->
    <Modal v-model="modalViewSummaries">

    </Modal>

    <!-- modal-set-permission -->
    <Modal>

    </Modal>

    <!-- modal-remove = -->
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

  </Card>
</template>

<script>
import teamworkApi from '../api/teamworkApi'

export default {
  name: 'component-team',
  created () {
    this.getInfo()
  },
  props: [
    'team',
    'type'
  ],
  data () {
    return {
      teamData: this.team,
      teamType: this.type,
      password: '',
      info: {
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      spinShow: false,
      /** export **/
      spinViewProjects: false,
      modalExportProjects: false,
      modalExportSummaries: false,
      /** invite **/
      inviteTeam: {
        teamId: '0',
        teamName: ''
      },
      searchContent: '',
      currentInvite: {},
      columnsUser: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'Tel',
          // width: 120,
          key: 'tel'
        },
        {
          title: 'Name',
          // width: 200,
          key: 'name'
        }
      ],
      dataUser: [],
      spinInvite: false,
      modalInvite: false,
      /** disband **/
      modalDisband: false,
      /** view **/
      currentView: {
        name: '',
        tel: '',
        email: ''
      },
      count: {
        total: 0,
        done: 0,
        doing: 0
      },
      currentTag: '0',
      subfieldProject: false,
      defaultOpenProject: 'preview',
      toolbarsFlagProject: false,
      collapseProjects: '',
      currentProjects: [],
      currentProject: {},
      currentSummaries: [],
      currentSummary: {},
      modalViewProjects: false,
      modalViewSummaries: false,
      /** permission **/
      modalSetPermission: false,
      /** remove **/
      currentRemove: {
        teamId: '',
        name: '',
        tel: ''
      },
      modalRemoveMember: false
    }
  },
  components: {
    //
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
    exportProjects (teamId) {
      this.$Message.error('Function not available.')
    },
    exportSummaries (teamId) {
      this.$Message.error('Function not available.')
    },
    invite (teamId, teamName) {
      this.inviteTeam = {
        teamId: teamId,
        teamName: teamName
      }
      this.modalInvite = true
    },
    search () {
      var regex = /^([a-zA-Z0-9\u4e00-\u9fa5\s]){2,10}$/
      if (!regex.test(this.searchContent)) {
        this.$Notice.error({
          title: 'Invalid value.',
          desc: ''
        })
        this.searchContent = ''
        return
      }
      this.spinInvite = true
      let _this = this
      // TEST START
      setTimeout(() => {
        _this.dataUser = [
          {
            tel: '13608089849',
            name: '曾宇'
          },
          {
            tel: '13456789012',
            name: '李四'
          }
        ]
        _this.spinInvite = false
      }, 1000)
      // TEST END
      teamworkApi.searchUser(this.info.tel, this.searchContent).then(function (response) {
        if (response.data.result === true) {
          _this.dataUser = response.data.dataUser
          _this.spinInvite = false
        } else {
          _this.$Notice.error({
            title: 'Search failed.',
            desc: ''
          })
          _this.spinInvite = false
        }
      })
    },
    changeSelection (currentRow, oldCurrentRow) {
      this.currentInvite = currentRow
    },
    clear () {
      this.dataUser = []
    },
    invitePeople (tel) {
      this.spinInvite = true
      let _this = this
      // TEST START
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Send message successful.',
          desc: 'Please waitting for user to check.'
        })
        _this.spinInvite = false
      }, 1000)
      // TEST END
      teamworkApi.invite(this.info.tel, this.inviteTeam.teamId, this.currentInvite.tel).then(function (response) {
        if (response.data.result === true) {
          _this.$Notice.success({
            title: 'Send message successful.',
            desc: 'Please waitting for user to check.'
          })
        } else {
          _this.$Notice.error({
            title: 'Invite failed.',
            desc: ''
          })
        }
        _this.spinInvite = false
      })
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
      this.spinViewProjects = true
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
        _this.spinViewProjects = false
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
        this.modalRemoveMember = false
        return
      }
      let _this = this
      // TEST START
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Remove successful.',
          desc: ''
        })
        if (_this.teamData.id === _this.currentRemove.teamId) {
          for (var j = 0; j < _this.teamData.members.length; j++) {
            if (_this.teamData.members[j].tel === _this.currentRemove.tel) {
              _this.teamData.members.splice(j, 1)
              _this.currentRemove = []
              _this.password = ''
              _this.modalRemoveMember = false
              break
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

.modal {
  z-index: 7;
}

/** modal-export **/

/** modal-invite **/

.div-invite {
}

.div-invite-title{
  font-size: 16px;
  margin: 10px auto 15px 0;
  font-weight: bold;
  color: red;
}

.input-invite {
  width: 160px;
}

.btn {
  width      : auto;
  font-weight: bold;
  margin-left: 15px;
}

.table-search {
  margin-top: 20px;
}

/** modal-desband **/

/** modal-project **/
.vertical-center-modal {
  display        : flex;
  align-items    : center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
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
}

.div-content-title{
cursor     : pointer;
font-size  : 14px;
font-weight: bold;
}

.div-content{
  margin: 10px;
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

/** modal-permission **/

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
