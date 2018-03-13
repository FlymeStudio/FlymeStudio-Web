<template>
<div id="plan-overview">
  <Menu mode="horizontal" theme="light" active-name="1" @on-select="clickTag">
    <MenuItem class="menu-item" name="1">
    <Icon type="bookmark" size="18"></Icon>
    All
    </MenuItem>
    <MenuItem class="menu-item" name="2">
    <Icon type="bookmark" size="18"></Icon>
    Yearly
    </MenuItem>
    <MenuItem class="menu-item" name="3">
    <Icon type="bookmark" size="18"></Icon>
    Monthly
    </MenuItem>
    <MenuItem class="menu-item" name="4">
    <Icon type="bookmark" size="18"></Icon>
    Weekly
    </MenuItem>
    <MenuItem class="menu-item" name="5">
    <Icon type="bookmark" size="18"></Icon>
    Daily
    </MenuItem>
  </Menu>
  <Layout>
    <Content :style="{padding: '20px 0', minHeight: '280px', background: '#fff'}">
      <Collapse>
        <Panel name="Total" size="large">
          <span class="card-count" style="color:#2d8cf0;"> Total ({{ count.total }})</span>
          <div class="card-div" slot="content" v-for="card in cards" :key="card.key">
            <Card>
              <div>
                <div class="card-top">
                  <i-circle class="card-circle" :size="40" v-if="card.percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
                    <Icon type="ios-checkmark-empty" size="40" color="#5cb85c"></Icon>
                  </i-circle>
                  <i-circle class="card-circle" :size="40" v-else :percent="card.percent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
                    <span class="demo-Circle-inner">{{ card.percent }}%</span>
                  </i-circle>
                  <span class="card-date">{{ card.date }}</span>
                  <Icon class="card-detail" type="more" size="24"></Icon>
                </div>
                <p class="card-title" slot="title">{{ card.title }}</p>
              </div>
              <pre class="card-content">{{ card.content }}</pre>
            </Card>
          </div>
        </Panel>

        <Panel name="Done">
          <span class="card-count" style="color:#19be6b;"> Done ({{ count.done }})</span>
          <div class="card-div" slot="content" v-for="card in cards" :key="card.key" v-if="card.percent == 100">
            <Card>
              <div>
                <div class="card-top">
                  <i-circle class="card-circle" :size="40" :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
                    <Icon type="ios-checkmark-empty" size="40" color="#5cb85c"></Icon>
                  </i-circle>
                  <span class="card-date">{{ card.date }}</span>
                  <Icon class="card-detail" type="more" size="24"></Icon>
                </div>
                <p class="card-title" slot="title">{{ card.title }}</p>
              </div>
              <pre class="card-content">{{ card.content }}</pre>
            </Card>
          </div>
        </Panel>

        <Panel name="Doing">
          <span class="card-count" style="color:#ed3f14;"> Doing ({{ count.doing }})</span>
          <div class="card-div" slot="content" v-for="card in cards" :key="card.key" v-if="card.percent != 100">
            <Card>
              <div>
                <div class="card-top">
                  <i-circle class="card-circle" :size="40" :percent="card.percent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
                    <span class="demo-Circle-inner">{{ card.percent }}%</span>
                  </i-circle>
                  <span class="card-date">{{ card.date }}</span>
                  <Icon class="card-detail" type="more" size="24"></Icon>
                </div>
                <p class="card-title" slot="title">{{ card.title }}</p>
              </div>
              <pre class="card-content">{{ card.content }}</pre>
            </Card>
          </div>
        </Panel>
      </Collapse>
    </Content>
  </Layout>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'plan-overview',
  data () {
    return {
      count: {
        total: 100,
        done: 60,
        doing: 40
      },
      cards: [
        {
          key: 1,
          percent: 100,
          date: '2017.3.1',
          title: '2017年度计划',
          content: '内容。。。'
        },
        {
          key: 2,
          percent: 6,
          date: '2017.9.1',
          title: '2017年9月报告',
          content: '内容。。。'
        },
        {
          key: 3,
          percent: 93,
          date: '2018.2.12',
          title: '2018春节活动',
          content: '内容。。。'
        },
        {
          key: 4,
          percent: 47,
          date: '2018.3.4',
          title: '2018开学准备',
          content: '内容'
        },
        {
          key: 5,
          percent: 100,
          date: '2018.1.12',
          title: '放假安排',
          content: '内容'
        },
        {
          key: 6,
          percent: 18,
          date: '2018.3.15',
          title: '实习相关事项',
          content: '内容'
        },
        {
          key: 7,
          percent: 62,
          date: '2018.5.1',
          title: '毕设安排',
          content: '内容'
        }
      ]
    }
  },
  methods: {
    clickTag: function (name) {
      switch (name) {
        case '1':
          this.count = {
            total: 100,
            done: 60,
            doing: 40
          }
          break
        case '2':
          this.count = {
            total: 10,
            done: 6,
            doing: 4
          }
          break
        case '3':
          this.count = {
            total: 20,
            done: 12,
            doing: 8
          }
          break
        case '4':
          this.count = {
            total: 30,
            done: 18,
            doing: 12
          }
          break
        case '5':
          this.count = {
            total: 40,
            done: 24,
            doing: 16
          }
          break
        default:
      }
    }
  }
}
</script>

<style scoped>
.menu-item {
  text-align: center;
}

.card-count {
  font-size  : 14px;
  margin-left: 10px;
  font-weight: bold;
}

.card-div {
  width  : 280px;
  display: inline-block;
  margin : 10px;
  padding: 5px;
}

.card-top {
  height     : auto;
  width      : 100%;
  align-items: center;
  margin     : auto 0;
  display    : flex;
}

.card-circle {
  font-size  : 14px;
  font-weight: bold;
  display    : inline-block;
}

.card-date {
  width      : auto;
  margin-left: 10px;
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
}

.card-content {
  height  : 120px;
  overflow: hidden;
}
</style>
