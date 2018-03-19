<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">
          <div class="layout-logo" @click="clickFlyme"></div>
          <div class="layout-title">Flyme Studio</div>
          <div class="layout-nav">
            <MenuItem name="1">
            <Icon class="item-icon" type="person" size=18></Icon>
            <span v-if="info.messages.length == 0" class="span-item">
              {{ info.name }}
            </span>
            <span v-else class="span-item">
              <Badge dot>{{ info.name }}</Badge>
            </span>
            </MenuItem>
            <MenuItem name="2">
            <Icon class="item-icon" type="help" size=18></Icon>
            <span class="span-item">Help</span>
            </MenuItem>
            <MenuItem name="3">
            <Icon class="item-icon" type="log-out" size=18></Icon>
            <span class="span-item">Sign out</span>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
          <Menu class="menu" theme="light" width="auto" @on-select="clickLeftNav" active-name="11" :open-names="['0', '10', '20']">
            <Submenu name="0">
              <template slot="title">
                <Icon type="person" size=18></Icon>
                  <span class="span-menu-item">Information</span>
              </template>
              <MenuItem name="1">Overview</MenuItem>
              <MenuItem name="2">Teamwork</MenuItem>
              <MenuItem name="3">Modify</MenuItem>
            </Submenu>
            <Submenu name="10">
              <template slot="title">
                <Icon type="clipboard" size=18></Icon>
                  <span class="span-menu-item">Project</span>
              </template>
              <MenuItem name="11">Overview</MenuItem>
              <MenuItem name="12">Create</MenuItem>
              <MenuItem name="13">Search</MenuItem>
            </Submenu>
            <Submenu name="20">
              <template slot="title">
                <Icon type="document-text" size=18></Icon>
                  <span class="span-menu-item">Summary</span>
              </template>
              <MenuItem name="21">Overview</MenuItem>
              <MenuItem name="22">Create</MenuItem>
              <MenuItem name="23">Search</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px'}">
          <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
            <Spin style="z-index:10;" fix v-if="spinShow">
              <Icon class="icon-spin" type="load-c" size=50></Icon>
            </Spin>

            <Menu class="menu" mode="horizontal" theme="light" @on-select="clickTag" active-name="0">
              <MenuItem class="menu-item" name="0">
              <Icon type="bookmark" size=18></Icon>
              All
              </MenuItem>
              <MenuItem class="menu-item" name="1">
              <Icon type="bookmark" size=18></Icon>
              Yearly
              </MenuItem>
              <MenuItem class="menu-item" name="2">
              <Icon type="bookmark" size=18></Icon>
              Monthly
              </MenuItem>
              <MenuItem class="menu-item" name="3">
              <Icon type="bookmark" size=18></Icon>
              Weekly
              </MenuItem>
              <MenuItem class="menu-item" name="4">
              <Icon type="bookmark" size=18></Icon>
              Daily
              </MenuItem>
            </Menu>
            <Layout>
              <Content :style="{padding: '15px 0', minHeight: '280px', background: '#fff'}">
                <Spin fix v-if="spinShow">
                  <Icon class="icon-spin" type="load-c" size=50></Icon>
                </Spin>
                <Collapse>
                  <Panel name="Total" size="large">
                    <span class="data-count" style="color:#2d8cf0;"> Total ({{ count.total }})</span>
                    <div class="data-div" slot="content" v-for="data in datas" v-if="data.show == true" :key="data.timestamp">
                      <componentCard :dataRes="data"></componentCard>
                    </div>
                  </Panel>

                  <Panel name="Done">
                    <span class="data-count" style="color:#19be6b;"> Done ({{ count.done }})</span>
                    <div class="data-div" slot="content" v-for="data in datas" v-if="data.show == true && data.percent == 100" :key="data.timestamp">
                      <componentCard :dataRes="data"></componentCard>
                    </div>
                  </Panel>

                  <Panel name="Doing">
                    <span class="data-count" style="color:#ed3f14;"> Doing ({{ count.doing }})</span>
                    <div class="data-div" slot="content" v-for="data in datas" v-if="data.show == true && data.percent != 100" :key="data.timestamp">
                      <componentCard :dataRes="data"></componentCard>
                    </div>
                  </Panel>
                </Collapse>
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
import componentFooter from './component-footer.vue'
import accountApi from '../api/accountApi'
// import informationApi from '../api/informationApi'
import componentCard from './component-card.vue'

export default{
  name: 'project-overview',
  created () {
    this.getInfo()
    this.computePercent()
    this.clickTag('0')
  },
  data () {
    return {
      info: {
        tel: '13608089849',
        name: 'user',
        email: '',
        messages: [
          {
            messageId: '1',
            from: '13600000001',
            teamName: 'System support',
            teamId: '00001'
          },
          {
            messageId: '2',
            from: '13600000002',
            teamName: 'Overseas firmware',
            teamId: '00002'
          }
        ]
      },
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
      spinShow: false
    }
  },
  components: {
    componentFooter,
    componentCard
  },
  methods: {
    getInfo () {
      this.info.name = '曾宇' // test
      this.info.email = '1213814232@qq.com' // test
    },
    clickTopNav: function (name) {
      switch (name) {
        case '1':
          this.componentId = '1'
          break
        case '2':
          this.clickHelp()
          break
        case '3':
          this.clickSignOut()
          break
        default:
      }
    },
    clickFlyme: function () {
      window.open('https://www.flyme.cn/')
    },
    clickHelp: function () {
      window.open('https://github.com/FlymeStudio/FlymeStudio-Doc/blob/master/introduce.md')
    },
    clickSignOut: function () {
      this.spinShow = true
      let _this = this
      setTimeout(() => {
        _this.spinShow = false
        _this.$Message.success('Sign out successful.')
        _this.$router.push('/signIn')
      }, 1000)
      accountApi.signOut(this.info.tel).then(function (response) {
        setTimeout(() => {
          _this.spinShow = false
          if (response.data.result === true) {
            _this.$Message.success('Sign out successful.')
            _this.$router.push('/signIn')
          } else {
            _this.$Message.error('Sign out failed.')
          }
        }, 1000)
      })
    },
    clickLeftNav: function (name) {
      switch (name) {
        case '1':
          this.$router.push('/information/overview')
          break
        case '2':
          this.$router.push('/information/teamwork')
          break
        case '3':
          this.$router.push('/information/modify')
          break
        case '11':
          this.$router.push('/project/overview')
          break
        case '12':
          this.$router.push('/project/create')
          break
        case '13':
          this.$router.push('/project/search')
          break
        case '21':
          this.$router.push('/summary/overview')
          break
        case '22':
          this.$router.push('/summary/create')
          break
        case '23':
          this.$router.push('/summary/search')
          break
        default:
          this.$router.push('/home')
      }
    },
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
    }
  }
}
</script>

<style scoped>
.menu {
  z-index: 5;
}

.span-menu-item{
  font-weight: bold;
  font-size: 16px;
}

.span-item {
  font-size: 16px;
}

.menu-item {
  text-align: center;
}

.data-count {
  font-size  : 14px;
  margin-left: 10px;
  font-weight: bold;
}

.data-div {
  height          : auto;
  width           : 280px;
  display         : inline-block;
  margin          : 20px;
  background-color: #dddee1;
  padding         : 5px;
  border-radius   : 5px;
}

.data-top {
  width      : 100%;
  align-items: center;
  margin     : auto 0;
  display    : flex;
  display    : -webkit-flex;
}

.data-circle {
  font-size  : 14px;
  font-weight: bold;
  display    : inline-block;
}

.data-date {
  width      : auto;
  margin-left: 20px;
  font-size  : 16px;
}

.data-detail {
  float   : right;
  position: relative;
  margin  : auto 0 auto auto;
  cursor  : pointer;
}

.data-title {
  width      : 100%;
  text-align : center;
  border-top : 1px solid #ccc;
  margin-top : 5px;
  padding-top: 5px;
  font-weight: bold;
  font-size  : 18px;
}

.data-content {
  min-width : 100px;
  min-height: 100px;
  width     : auto;
  height    : 200px;
  margin    : 0;
  display   : flex;
  display   : -webkit-flex;
  font-size : 12px;
  overflow  : hidden;
  z-index   : 5;
}
</style>
