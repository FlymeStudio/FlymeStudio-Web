<template>
<div id="plan-overview">
  <Menu class="menu" mode="horizontal" theme="light" @on-select="clickTag">
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
          <span class="card-count" style="color:#2d8cf0;"> Total ({{ count.total }})</span>
          <div class="card-div" slot="content" v-for="card in cards" v-if="card.show == true" :key="card.key">
            <componentCard :cardData="card"></componentCard>
          </div>
        </Panel>

        <Panel name="Done">
          <span class="card-count" style="color:#19be6b;"> Done ({{ count.done }})</span>
          <div class="card-div" slot="content" v-for="card in cards" v-if="card.show == true && card.percent == 100" :key="card.key">
            <componentCard :cardData="card"></componentCard>
          </div>
        </Panel>

        <Panel name="Doing">
          <span class="card-count" style="color:#ed3f14;"> Doing ({{ count.doing }})</span>
          <div class="card-div" slot="content" v-for="card in cards" v-if="card.show == true && card.percent != 100" :key="card.key">
            <componentCard :cardData="card"></componentCard>
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
  name: 'plan-overview',
  created () {
    this.clickTag('1')
  },
  data () {
    return {
      count: {
        total: 0,
        done: 0,
        doing: 0
      },
      cards: [
        {
          key: 1,
          type: '2',
          percent: 100,
          date: '2017.3.1',
          title: '2017年度计划',
          content: '内容。。。',
          plans: [
            {
              index: 0,
              tag: 'plan',
              goal: '健身'
            },
            {
              index: 1,
              tag: 'plan',
              goal: '考驾照'
            },
            {
              index: 2,
              tag: 'plan',
              goal: '秋招'
            }
          ],
          show: true
        },
        {
          key: 2,
          type: '3',
          percent: 6,
          date: '2017.9.1',
          title: '2017年9月报告',
          content: '内容。。。\nddddddddddd\naaaaaaaaa',
          plans: [
            {
              index: 0,
              tag: '秋招',
              goal: '复习'
            },
            {
              index: 1,
              tag: '开学',
              goal: '选班委'
            }
          ],
          show: true
        },
        {
          key: 3,
          type: '4',
          percent: 93,
          date: '2018.2.12',
          title: '2018春节活动',
          content: '内容。。。',
          plans: [
            {
              index: 0,
              tag: '旅游',
              goal: '深圳'
            },
            {
              index: 1,
              tag: '旅游',
              goal: '香港'
            }
          ],
          show: true
        },
        {
          key: 4,
          type: '3',
          percent: 47,
          date: '2018.3.4',
          title: '2018开学准备',
          content: '内容',
          plans: [
            {
              index: 0,
              tag: '实习',
              goal: '初期报告'
            }
          ],
          show: true
        },
        {
          key: 5,
          type: '3',
          percent: 100,
          date: '2018.1.12',
          title: '放假安排',
          content: '## 1.\n- plans1\n- plans2\n- plans3\n- plans4\n---\n**paragraphy**\n---\n## 2.\nlong content: aaaaaaaaaaaaaa\n---\n > int a = 1\n\n### h3: title3\np4',
          plans: [
            {
              index: 0,
              tag: '年前',
              goal: '在家休息'
            },
            {
              index: 1,
              tag: '年后',
              goal: '出行游玩'
            }
          ],
          show: true
        },
        {
          key: 6,
          type: '3',
          percent: 18,
          date: '2018.3.15',
          title: '实习相关事项',
          content: '内容',
          plans: [],
          show: true
        },
        {
          key: 7,
          type: '5',
          percent: 62,
          date: '2018.5.1',
          title: '毕设安排',
          content: '内容',
          plans: [],
          show: true
        }
      ],
      spinShow: true
    }
  },
  components: {
    componentCard
  },
  methods: {
    clickTag: function (name) {
      this.spinShow = true
      let _total = 0
      let _done = 0
      let _doing = 0
      if (name === '1') {
        _total = this.cards.length
        for (let i = 0; i < this.cards.length; i++) {
          this.cards[i].show = true
          if (this.cards[i].percent === 100) {
            _done++
          } else {
            _doing++
          }
        }
      } else {
        for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].type === name) {
            _total++
            this.cards[i].show = true
            if (this.cards[i].percent === 100) {
              _done++
            } else {
              _doing++
            }
          } else {
            this.cards[i].show = false
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
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.menu {
  z-index: 5;
}

.menu-item {
  text-align: center;
}

.icon-spin {
  animation: ani-demo-spin 1s linear infinite;
}

.card-count {
  font-size  : 14px;
  margin-left: 10px;
  font-weight: bold;
}

.card-div {
  height : auto;
  width  : 270px;
  display: inline-block;
  margin : 10px;
}

.card-top {
  width      : 100%;
  align-items: center;
  margin     : auto 0;
  display    : flex;
  display    : -webkit-flex;
}

.card-circle {
  font-size  : 14px;
  font-weight: bold;
  display    : inline-block;
}

.card-date {
  width      : auto;
  margin-left: 20px;
  font-size  : 16px;
}

.card-detail {
  float   : right;
  position: relative;
  margin  : auto 0 auto auto;
  cursor  : pointer;
}

.card-title {
  width      : 100%;
  text-align : center;
  border-top : 1px solid #ccc;
  margin-top : 5px;
  padding-top: 5px;
  font-weight: bold;
  font-size  : 18px;
}

.card-content {
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
