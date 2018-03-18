<template>
<div id="project-overview">
  <Menu class="menu" mode="horizontal" theme="light" @on-select="clickTag" active-name="1">
    <MenuItem class="menu-item" name="1">
    <Icon type="bookmark" size=18></Icon>
    All
    </MenuItem>
    <MenuItem class="menu-item" name="2">
    <Icon type="bookmark" size=18></Icon>
    Yearly
    </MenuItem>
    <MenuItem class="menu-item" name="3">
    <Icon type="bookmark" size=18></Icon>
    Monthly
    </MenuItem>
    <MenuItem class="menu-item" name="4">
    <Icon type="bookmark" size=18></Icon>
    Weekly
    </MenuItem>
    <MenuItem class="menu-item" name="5">
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
</div>
</template>

<script type="text/javascript">
import componentCard from './component-card.vue'

export default {
  name: 'project-overview',
  created () {
    this.computePercent()
    this.clickTag('1')
  },
  data () {
    return {
      count: {
        total: 0,
        done: 0,
        doing: 0
      },
      datas: [
        {
          timestamp: 1,
          show: true,
          type: '2',
          percent: 0,
          date: '2017.3.1',
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
          type: '3',
          percent: 0,
          date: '2017.9.1',
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
          type: '4',
          percent: 0,
          date: '2018.2.12',
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
          type: '3',
          percent: 0,
          date: '2018.3.4',
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
          type: '3',
          percent: 0,
          date: '2018.1.12',
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
          type: '3',
          percent: 0,
          date: '2018.3.15',
          title: '实习相关事项',
          content: '内容',
          plans: []
        },
        {
          timestamp: 7,
          show: true,
          type: '5',
          percent: 0,
          date: '2018.5.1',
          title: '毕设安排',
          content: '内容',
          plans: []
        }
      ],
      currentType: '1',
      spinShow: false
    }
  },
  components: {
    componentCard
  },
  methods: {
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
      this.spinShow = true
      var _total = 0
      var _done = 0
      var _doing = 0
      if (name === '1') {
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
      let _this = this
      setTimeout(() => {
        _this.spinShow = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.menu {
  z-index: 5;
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
