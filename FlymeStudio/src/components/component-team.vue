<template>
<Card>
  <div slot="title" style="color:#2b85e4;">
    <Icon class="icon-item" type="ios-people" size="24"></Icon>
    <span class="span-team-name">{{ teamData.name }}</span>
  </div>

  <Alert type="success">
    <Tooltip content="Export projects">
      <componentExportProjects :type="teamType" :teamRes="teamData"></componentExportProjects>
    </Tooltip>
    <Tooltip content="Export summaries">
      <Button v-if="teamType == 1" class="btn-team" type="primary" shape="circle" icon="archive" @click="exportSummaries(teamData.id)"></Button>
      <Button v-else class="btn-team" type="primary" shape="circle" icon="archive" disabled></Button>
    </Tooltip>
    <Tooltip content="Invite people">
      <componentInvite :dataId="teamData.id" :dataName="teamData.name"></componentInvite>
    </Tooltip>
    <Tooltip content="Disband team">
      <Button v-if="teamData.administratorId == info.id" class="btn-team" type="error" shape="circle" icon="android-warning" @click="disbandTeam(teamData.id, teamData.name)"></Button>
      <Button v-else class="btn-team" type="warning" shape="circle" icon="android-warning" disabled></Button>
    </Tooltip>
  </Alert>

  <div>
    <div class="div-menu-item">
      <Icon class="icon-item" type="pound" size="18"></Icon>
      <span class="span-item">{{ teamData.id }}</span>
    </div>
  </div>
  <div>
    <div class="div-menu-item">
      <Icon class="icon-item" type="star" size="18" style="color:#ff9900;"></Icon>
      <span class="span-item">{{ teamData.administratorName }}</span>
    </div>
  </div>

  <Collapse>
    <Panel>
      <span class="div-count"><Icon class="icon-item" type="chatbubbles" size="18"></Icon> Member ({{ teamData.members.length }})</span>

      <div class="div-members" slot="content">
        <componentMembers :type="teamType" :teamSrc="teamData"></componentMembers>
      </div>
    </Panel>
  </Collapse>

  <!-- modal-disband -->
  <Modal class="modal-disband" width="80%" v-model="modalDisband" title="Warning" :mask-closable="false" :closable="false" ok-text="Remove" cancel-text="Cancel" loading @on-ok="disband()">
    <Alert type="warning" show-icon>
      <p>Are you sure to disband {{ currentDisband.teamName }}({{ currentDisband.teamId }}) ?</p>
      <p>After disbanding the team, you should sign in again.</p>
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
import componentExportProjects from './component-export-projects.vue'
import componentInvite from './component-invite.vue'
import componentMembers from './component-members.vue'

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
      info: {
        id: 0,
        num: '',
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      password: '',
      /** disband **/
      currentDisband: {
        teamId: '',
        teamName: ''
      },
      modalDisband: false
    }
  },
  components: {
    componentExportProjects,
    componentInvite,
    componentMembers
  },
  methods: {
    getInfo () {
      this.info = this.$store.state.user.userInfo
    },
    exportSummaries (teamId) {
      this.$Message.error('Function is not available.')
    },
    disbandTeam (teamId, teamName) {
      this.currentDisband = {
        teamId: teamId,
        teamName: teamName
      }
      this.modalDisband = true
    },
    disband (teamId) {
      if (this.password !== this.info.password) {
        this.$Notice.error({
          title: 'Password is incorrect.',
          desc: ''
        })
        setTimeout(() => {
          this.password = ''
          this.modalDisband = false
        }, 1000)
        return
      }
      let _this = this
      teamworkApi.disband(this.currentDisband.teamId).then(function (response) {
        if (response.status === 200) {
          if (response.data.result === true) {
            _this.$Notice.success({
              title: 'Disband successful.',
              desc: ''
            })
            _this.$router.push('/')
          } else {
            _this.$Notice.error({
              title: 'Disband failed.',
              desc: ''
            })
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
        }
        _this.modalDisband = false
      }).catch(function (error) {
        _this.$Notice.error({
          title: 'HTTP request error.',
          desc: ''
        })
        _this.modalDisband = false
        console.log(error)
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
  width      : 100%;
  height     : auto;
  padding    : 5px;
  display    : flex;
  align-items: center;
}

.span-item {
  height     : 100%;
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

.modal {
  z-index: 7;
}
/** modal-desband **/
.modal-disband {
  position: absolute;
  z-index : 10;
}

.modal-disband p {
  font-size: 18px;
  color    : red;
}
</style>
