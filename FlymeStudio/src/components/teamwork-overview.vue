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
                <Team :team="team" type="1"></Team>
              </div>
            </Panel>

            <Panel>
              <span class="div-count" style="color:#1c2438;"> Joined ({{ joinedTeams.length }})</span>

              <div class="div-team" slot="content" v-for="team in joinedTeams" :key="team.id">
                <Team :team="team" type="0"></Team>
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
import topNav from './component-nav-top.vue'
import leftNav from './component-nav-left.vue'
import componentFooter from './component-footer.vue'
import Team from './component-team.vue'
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
    topNav,
    leftNav,
    componentFooter,
    Team
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
