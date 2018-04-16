<template>
<div class="layout">
  <Layout>

    <Header>
      <componentNavTop></componentNavTop>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <componentNavLeft activeName="11"></componentNavLeft>
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
                <componentTeam :team="team" type="1"></componentTeam>
              </div>
            </Panel>

            <Panel>
              <span class="div-count" style="color:#1c2438;"> Joined ({{ joinedTeams.length }})</span>

              <div class="div-team" slot="content" v-for="team in joinedTeams" :key="team.id">
                <componentTeam :team="team" type="0"></componentTeam>
              </div>
            </Panel>
          </Collapse>

        </Content>
      </Layout>

    </Layout>

    <componentFooter></componentFooter>

    <BackTop></BackTop>

  </Layout>
</div>
</template>

<script>
import componentNavTop from './component-nav-top.vue'
import componentNavLeft from './component-nav-left.vue'
import componentFooter from './component-footer.vue'
import componentTeam from './component-team.vue'
import teamworkApi from '../api/teamworkApi'

export default{
  name: 'teamwork-overview',
  created () {
    this.getInfo()
    this.getTeams()
  },
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
      spinShow: false,
      managedTeams: [],
      joinedTeams: []
    }
  },
  components: {
    componentNavTop,
    componentNavLeft,
    componentFooter,
    componentTeam
  },
  methods: {
    getInfo () {
      this.info = this.$store.state.user.userInfo
    },
    getTeams () {
      this.spinShow = false
      let _this = this
      teamworkApi.viewTeams(this.info.id).then(function (response) {
        if (response.status === 200) {
          if (response.data.result === true) {
            _this.managedTeams = response.data.data.managedTeams
            _this.joinedTeams = response.data.data.joinedTeams
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
    }
  }
}
</script>

<style scoped>
.div-team {
  margin-bottom: 20px;
}

.div-count {
  font-size  : 16px;
  margin-left: 10px;
  font-weight: bold;
  color      : #2d8cf0;
}

</style>
