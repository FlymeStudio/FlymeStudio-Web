<template>
<div>
  <div class="div-member" v-for="member in teamData.members" :key="member.id">
    <Icon v-if="member.permission == 2" class="icon-member" type="person" size="18" style="color:#ff9900;"></Icon>
    <Icon v-else-if="member.permission == 1" class="icon-member" type="person" size="18" style="color:#19be6b;"></Icon>
    <Icon v-else class="icon-member" type="person" size="18" style="color:#2d8cf0;"></Icon>
    <span class="span-name">{{ member.name }}</span>
    <Icon class="icon-member" type="pound" size="18"></Icon>
    <span class="span-tel">{{ member.num }}</span>
    <div class="btns">
      <Tooltip content="View projects">
        <Button v-if="teamType == 1" class="btn-member" size="small" type="info" shape="circle" icon="clipboard" @click="viewProjects(member.id, member.name, member.num)"></Button>
        <Button v-else class="btn-member" size="small" type="info" shape="circle" icon="clipboard" disabled></Button>
      </Tooltip>
      <Tooltip content="View summaries">
        <Button v-if="teamType == 1" class="btn-member" size="small" type="info" shape="circle" icon="document-text" @click="viewSummaries(member.id, member.name, member.num)"></Button>
        <Button v-else class="btn-member" size="small" type="info" shape="circle" icon="document-text" disabled></Button>
      </Tooltip>
      <Tooltip content="Set permission">
        <Button v-if="teamData.administratorId == info.id && member.id != info.id" class="btn-member" size="small" type="warning" shape="circle" icon="key" @click="setMemberPermission(member.name, member.id)" style="margin-left:10px;"></Button>
        <Button v-else class="btn-member" size="small" type="warning" shape="circle" icon="key" disabled style="margin-left:10px;"></Button>
      </Tooltip>
      <Tooltip content="Remove member">
        <Button v-if="teamType == 1 && member.id != info.id && member.permission == 0" class="btn-member" size="small" type="error" shape="circle" icon="close-round" @click="removeMember(member.id, member.name)"></Button>
        <Button v-else class="btn-member" size="small" type="error" shape="circle" icon="close-round" disabled></Button>
      </Tooltip>
    </div>
  </div>

  <!-- spin -->
  <Spin class="spin" fix v-if="spinShow">
    <Icon class="icon-spin" type="load-c" size=50></Icon>
  </Spin>

  <!-- modal-view-projects -->
  <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalViewProjects" ok-text="Ok" cancel-text="Cancel" @on-ok="clearContent()" @on-cancel="clearContent()">

    <Layout style="margin-top:20px;">

      <Spin class="spin" fix v-if="spinViewProjects">
        <Icon class="icon-spin" type="load-c" size=50></Icon>
      </Spin>

      <Header class="layout-header-bar" theme="dark">
        <Icon type="clipboard" size=18 style="margin-right:10px;"></Icon><span>Project</span>
        <Icon type="person" size=18 style="margin:auto 10px auto 30px;"></Icon><span>{{ currentView.name }}</span>
        <Icon type="pound" size=18 style="margin:auto 10px auto 30px;"></Icon><span>{{ currentView.num }}</span>
      </Header>

      <Layout>

        <Sider style="z-index:6;" width="100">
          <Menu theme="dark" width="auto" :active-name="activeProjectsTag" @on-select="clickProjectsTag">
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
                <div class="div-content-title" v-for="data in currentProjects" v-if="data.show == true" :key="data.id" @click="chooseProject(data)">
                  <Alert>{{ data.title }}</Alert>
                </div>
              </div>
            </Panel>

            <Panel name="Done">

              <!-- title -->
              <span class="data-count" style="color:#19be6b;"> Done ({{ count.done }})</span>

              <!-- content -->
              <div slot="content">
                <div class="div-content-title" v-for="data in currentProjects" v-if="data.show == true" :key="data.id" @click="chooseProject(data)">
                  <Alert>{{ data.title }}</Alert>
                </div>
              </div>

            </Panel>

            <Panel name="Doing">

              <!-- title -->
              <span class="data-count" style="color:#ed3f14;"> Doing ({{ count.doing }})</span>

              <!-- content -->
              <div slot="content">
                <div class="div-content-title" v-for="data in currentProjects" v-if="data.show == true" :key="data.id" @click="chooseProject(data)">
                  <Alert>{{ data.title }}</Alert>
                </div>
              </div>

            </Panel>

          </Collapse>

        </Sider>

        <Content>
          <div class="div-content" v-if="currentProject != null && currentProject != {}">
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

            <mavon-editor class="detail-content" v-model="currentProject.content" :subfield="subfieldProject" :defaultOpen="defaultOpenProject" :toolbarsFlag="toolbarsFlagProject"></mavon-editor>

            <div class="div-plans">
              <Alert class="alert-plans" v-for="item in currentProject.plans" :key="item.id">
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
  <Modal class-name="vertical-center-modal" class="modal-permission" width="80%" v-model="modalSetPermission" title="Setting" :mask-closable="false" :closable="false" ok-text="Set" cancel-text="Cancel" loading @on-ok="setPermission()">
    <Alert type="info" style="color:red;">
      <span class="span-permission">Permission</span>
      <template slot="desc">
        <ol>
          <li class="li-permission">
            <span class="span-list">Manager can export a report about members' projects or summaries.</span>
          </li>
          <li class="li-permission">
            <span class="span-list">Manager can view members' all projects and summaries.</span>
          </li>
          <li class="li-permission">
            <span class="span-list">Manager has right to remove a member from the team.</span>
          </li>
        </ol>
        <RadioGroup v-model="currentPermission.permission">
          <Radio class="radio-permission" label="0">
              <span>Member</span>
          </Radio>
          <Radio class="radio-permission" label="1">
              <span>Manager</span>
          </Radio>
        </RadioGroup>
      </template>
    </Alert>
    <p>Are you sure to set permission of {{ currentPermission.name }}({{ currentPermission.num }}) in {{ currentPermission.teamName }}?</p>
  </Modal>

  <!-- modal-remove = -->
  <Modal class-name="vertical-center-modal" class="modal-remove" v-model="modalRemoveMember" title="Confirm" :mask-closable="false" :closable="false" ok-text="Remove" cancel-text="Cancel" loading @on-ok="remove()">
    <Alert type="warning" show-icon>
      <p>Are you sure to remove {{ currentRemove.name }}({{ currentRemove.num }}) from {{ currentRemove.teamName }}({{ currentRemove.teamId }}) ?</p>
      <template slot="desc">
      <p>If yes, input the password to check your identity:</p>
      <Input style="margin-top:20px;" type="password" v-model="password" size="large" placeholder="Password" clearable>
      </Input>
    </template>
    </Alert>
  </Modal>
</div>
</template>

<script>
import teamworkApi from '../api/teamworkApi'

export default {
  name: 'component-members',
  created () {
    this.getInfo()
  },
  props: [
    'type',
    'teamSrc'
  ],
  data () {
    return {
      info: {
        id: 0,
        num: '',
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      password: '',
      teamType: this.type,
      teamData: this.teamSrc,
      spinShow: false,
      /** view **/
      currentView: {
        id: '',
        name: '',
        num: ''
      },
      count: {
        total: 0,
        done: 0,
        doing: 0
      },
      spinViewProjects: false,
      subfieldProject: false,
      defaultOpenProject: 'preview',
      toolbarsFlagProject: false,
      activeProjectsTag: '0',
      collapseProjects: '',
      currentProjects: [],
      currentProject: {},
      currentSummaries: [],
      currentSummary: {},
      modalViewProjects: false,
      modalViewSummaries: false,
      /** permission **/
      currentPermission: {
        teamId: '',
        teamName: '',
        id: '',
        name: '',
        num: '',
        permission: '0'
      },
      modalSetPermission: false,
      /** remove **/
      currentRemove: {
        teamId: '',
        id: '',
        name: '',
        num: ''
      },
      modalRemoveMember: false
    }
  },
  methods: {
    getInfo () {
      this.info = this.$store.state.user.userInfo
    },
    viewProjects (id, name, num) {
      this.spinShow = true
      this.currentView = {
        id: id,
        name: name,
        num: num
      }
      let _this = this
      teamworkApi.viewMemberProjects(id).then(function (response) {
        if (response.status === 200) {
          if (response.data.result === true) {
            _this.currentProjects = response.data.data
            for (var i = 0; i < _this.currentProjects.length; i++) {
              _this.currentProjects[i].date = new Date(_this.currentProjects[i].date)
            }
            _this.computePercent()
            _this.clickProjectsTag(_this.activeProjectsTag)
            _this.modalViewProjects = true
          } else {
            _this.$Notice.error({
              title: 'Failed to get data.',
              desc: ''
            })
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
        }
        _this.spinShow = false
      }).catch(function (error) {
        _this.$Notice.error({
          title: 'HTTP request error.',
          desc: ''
        })
        _this.spinShow = false
        console.log(error)
      })
    },
    computePercent () {
      if (this.currentProjects === null) {
        return
      }
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
      this.activeProjectsTag = name
      var _total = 0
      var _done = 0
      var _doing = 0
      if (this.currentProjects !== null) {
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
      this.spinViewProjects = true
      this.currentProject = data
      let _this = this
      setTimeout(() => {
        _this.spinViewProjects = false
      }, 1000)
    },
    clearContent () {
      this.clickProjectsTag('0')
      this.count = {
        total: 0,
        done: 0,
        doing: 0
      }
      this.currentProject = {}
    },
    viewSummaries (id, name, num) {
      this.$Message.error('Function is not available.')
    },
    setMemberPermission (name, id) {
      this.currentPermission = {
        teamId: this.teamData.id,
        teamName: this.teamData.name,
        name: name,
        id: id,
        permission: 0
      }
      this.modalSetPermission = true
    },
    setPermission () {
      let _this = this
      teamworkApi.setPermission(this.currentPermission.teamId, this.currentPermission.id, this.currentPermission.permission).then(function (response) {
        if (response.status === 200) {
          if (response.data.result === true) {
            for (var j = 0; j < _this.teamData.members.length; j++) {
              if (_this.teamData.members[j].id === _this.currentPermission.id) {
                _this.teamData.members[j].permission = _this.currentPermission.permission
                _this.currentPermission = {}
                break
              }
            }
            _this.$Notice.success({
              title: 'Set successful.',
              desc: ''
            })
          } else {
            _this.$Notice.error({
              title: 'Set failed.',
              desc: ''
            })
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
        }
        _this.modalSetPermission = false
      }).catch(function (error) {
        _this.$Notice.error({
          title: 'HTTP request error.',
          desc: ''
        })
        _this.modalSetPermission = false
        console.log(error)
      })
    },
    removeMember (id, name) {
      this.currentRemove = {
        teamId: this.teamData.id,
        teamName: this.teamData.name,
        name: name,
        id: id
      }
      this.modalRemoveMember = true
    },
    remove () {
      if (this.password !== this.info.password) {
        this.$Notice.error({
          title: 'Password is incorrect.',
          desc: ''
        })
        setTimeout(() => {
          this.password = ''
          this.modalRemoveMember = false
        }, 1000)
        return
      }
      let _this = this
      teamworkApi.remove(this.currentRemove.teamId, this.currentRemove.id).then(function (response) {
        if (response.status === 200) {
          if (response.data.result === true) {
            _this.$Notice.success({
              title: 'Remove successful.',
              desc: ''
            })
            _this.currentRemove = []
            _this.password = ''
          } else {
            _this.$Notice.error({
              title: 'Remove failed.',
              desc: ''
            })
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
        }
        _this.modalRemoveMember = false
      }).catch(function (error) {
        _this.$Notice.error({
          title: 'HTTP request error.',
          desc: ''
        })
        _this.modalRemoveMember = false
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

.modal {
  z-index: 7;
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
.modal-permission{
  position: absolute;
  z-index : 10;
}

.modal-permission p {
  font-size: 18px;
  color    : red;
}

.span-permission {
  width      : 100%;
  font-size  : 22px;
  font-weight: bold;
  text-align : center;
  display    : block;
}

.li-permission {
  color    : red;
  font-size: 18px;
  margin   : 20px;
}

.span-list {}

.radio-permission {
  font-size: 16px;
}

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
