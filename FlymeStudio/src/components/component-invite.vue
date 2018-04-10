<template>
<div>
  <Button class="btn-team" type="info" shape="circle" icon="android-person-add" @click="modalInvite = true"></Button>

  <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalInvite" ok-text="Ok" cancel-text="Cancel" @on-ok="clear()" @on-cancel="clear()">
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
</div>
</template>

<script>
import teamworkApi from '../api/teamworkApi'

export default {
  name: 'component-invite',
  created () {
    this.getInfo()
  },
  props: [
    'dataId',
    'dataName'
  ],
  data () {
    return {
      info: {
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      /** invite **/
      inviteTeam: {
        teamId: this.dataId,
        teamName: this.dataName
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
          key: 'tel'
        },
        {
          title: 'Name',
          key: 'name'
        }
      ],
      dataUser: [],
      spinInvite: false,
      modalInvite: false
    }
  },
  methods: {
    getInfo () {
      this.info = this.$store.state.user.userInfo
    },
    search () {
      var regex = /^([a-zA-Z0-9\u4e00-\u9fa5\s]){2,10}$/
      if (!regex.test(this.searchContent)) {
        this.$Notice.error({
          title: 'Please input content.',
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
      teamworkApi.searchUser(this.searchContent).then(function (response) {
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
      this.searchContent = ''
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
    }
  }
}
</script>

<style scoped>
.btn-team {
  margin   : auto 5px;
  font-size: 20px;
}

.vertical-center-modal {
  display        : flex;
  align-items    : center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.div-invite {}

.div-invite-title {
  font-size  : 16px;
  margin     : 10px auto 15px 0;
  font-weight: bold;
  color      : red;
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
</style>
