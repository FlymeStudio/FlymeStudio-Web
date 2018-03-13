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
                <i-circle class="card-circle" :size="40" v-if="card.percent == 100" :percent="card.percent" stroke-color="#5cb85c">
                  <Icon type="ios-checkmark-empty" size="50" style="color:#5cb85c"></Icon>
                </i-circle>
                <i-circle class="card-circle" :size="40" v-else percent="card.percent" style="font-size:14px;">
                  <span class="demo-Circle-inner">{{ card.percent }}%</span>
                </i-circle>
                <p class="card-title" slot="title">{{ card.title }}</p>
              </div>
              <pre class="card-content">{{ card.content }}</pre>
            </Card>
          </div>
        </Panel>

        <Panel name="Done">
          <span class="card-count" style="color:#19be6b;"> Done ({{ count.done }})</span>
          <div class="card-div" slot="content" v-for="card in cards" :key="card.key">
            <Card>
              <p class="card-title" slot="title">{{ card.title }}</p>
              <pre class="card-content">{{ card.content }}</pre>
            </Card>
          </div>
        </Panel>

        <Panel name="Doing">
          <span class="card-count" style="color:#ed3f14;"> Doing ({{ count.doing }})</span>
          <div class="card-div" slot="content" v-for="card in cards" :key="card.key">
            <Card>
              <p class="card-title" slot="title">{{ card.title }}</p>
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
          title: 't1',
          content: 'hfasf[\nsfasfaf\naffaf\nafasfaf\nfafaf\nafasfaf\n\n\nfasfafa\n'
        },
        {
          key: 2,
          percent: 6,
          title: 't2',
          content: 'affaf\nafasfaf\nfafaf\nafa'
        },
        {
          key: 3,
          percent: 93,
          title: 't3',
          content: 'hfasf[\nsfasfaf\naffaf\nafaaffaf\nafasfaf\nfafaf\nafasfaf\nfafaf\nafasfaf\n\n\nfasfafa\n'
        },
        {
          key: 4,
          percent: 47,
          title: 't4',
          content: 'affaf\nafasfaf\nfafaf\nafaaffaf\nafasfaf\nfafaf\nafaaffaf\nafasfaf\nfafaf\nafaaffaf\nafasfaf\nfafaf\nafaaffaf\nafasfaf\nfafaf\nafaaffaf\nafasfaf\nfafaf\nafaaffaf\nafasfaf\nfafaf\nafaaffaf\nafasfaf\nfafaf\nafa'
        },
        {
          key: 5,
          percent: 100,
          title: 't1',
          content: 'hfasf[\nsfasfaf\naffaf\nafasfaf\nfafaf\nafasfaf\n\n\nfasfafa\n'
        },
        {
          key: 6,
          percent: 18,
          title: 't2',
          content: 'affaf\nafasfaf\nfafaf\nafa'
        },
        {
          key: 7,
          percent: 62,
          title: 't3',
          content: 'hfasf[\nsfasfaf\naffaf\nafaaffaf\nafasfaf\nfafaf\nafasfaf\nfafaf\nafasfaf\n\n\nfasfafa\n'
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
.menu-item{
  text-align: center;
}

.card-count{
  font-size:14px;
  margin-left:5px;
}

.card-div{
  width:300px;
  display:inline-block;
  margin:10px;
  padding: 5px;
}

.card-circle{
  display: inline-block;
}

.card-title{
  width: 100%;
  text-align: center;
  border-top: 1px solid #ccc;
  margin-top: 5px;
  padding-top: 5px;
}

.card-content{
  height: 150px;
  overflow: hidden;
}
</style>
