<template>
<Card>
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
      <ButtonInvite :dataId="teamData.id" :dataName="teamData.name"></ButtonInvite>
    </Tooltip>
    <Tooltip content="Disband team">
      <Button v-if="teamData.administratorTel == info.tel" class="btn-team" type="error" shape="circle" icon="android-warning" @click="disband(teamData.id)"></Button>
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
  <Modal>

  </Modal>

</Card>
</template>

<script>
// import teamworkApi from '../api/teamworkApi'
import ButtonInvite from './component-btn-invite.vue'
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
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      /** export **/
      modalExportProjects: false,
      modalExportSummaries: false,
      /** disband **/
      modalDisband: false
    }
  },
  components: {
    ButtonInvite,
    componentMembers
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
    disband (teamId) {
      this.$Message.error('Function not available.')
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
  width: 100%;
  height: auto;
  padding: 5px;
  display: flex;
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

/** modal-export **/

/** modal-desband **/

</style>
