<template>
<div class="layout">
  <Layout>

    <Header>
      <topNav></topNav>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="12"></leftNav>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">

          <!-- spin -->
          <Spin class="spin" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          <!-- content -->
          <Alert class="alert">

            <!-- spin -->
            <Spin class="spin" fix v-if="spinShow">
              <Icon class="icon-spin" type="load-c" size=50></Icon>
            </Spin>

            <!-- agreement -->
            <Alert type="warning" style="color:red;">
              <span class="span-agreement">Agreement</span>
              <template slot="desc">
                <ol>
                  <li class="li-agreement">
                    <span class="span-list">After join a team, you will be the member of the team.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">As the member of the team, the team manager can view your all projects and summaries.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">Manager can export a report about your projects or summaries.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">Manager has right to remove you from the team.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">Manager has right to disband the team.</span>
                  </li>
                </ol>
                <RadioGroup v-model="agreementJoin">
                  <Radio class="radio-agreement" label="0">
                      <span>Disagree</span>
                  </Radio>
                  <Radio class="radio-agreement" label="1">
                      <span>Agree</span>
                  </Radio>
                </RadioGroup>
              </template>
            </Alert>

            <!-- join -->
            <div class="div-search">
              <Input class="input-search" v-model="searchContent" placeholder="Team id or name" clearable></Input>
              <Button class="btn" type="primary" shape="circle" icon="ios-search" @click="search()">Search</Button>
              <Button class="btn" type="info" shape="circle" icon="android-close" @click="clear()">Clear</Button>
              <Button class="btn" type="success" shape="circle" icon="android-add" disabled v-if="agreementJoin == 0">Join</Button>
              <Button class="btn" type="success" shape="circle" icon="android-add" v-else @click="join()">Join</Button>
              <Table class="table-search" highlight-row border :columns="columnsTeam" :data="dataTeam" @on-current-change="changeSelection" no-data-text="No data"></Table>
            </div>

          </Alert>
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
import teamworkApi from '../api/teamworkApi'

export default{
  name: 'teamwork-join',
  created () {
    this.getInfo()
  },
  data () {
    return {
      spinShow: false,
      info: {
        tel: '13608089849',
        name: 'user',
        email: ''
      },
      searchContent: '',
      agreementJoin: '0',
      currentData: {},
      columnsTeam: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'Id',
          // width: 120,
          key: 'id'
        },
        {
          title: 'Name',
          // width: 200,
          key: 'name'
        },
        {
          title: 'Manager',
          // width: 100,
          key: 'manager'
        },
        {
          title: 'Count',
          width: 80,
          key: 'count'
        }
      ],
      dataTeam: []
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
    getInfo () {
      this.info.name = '曾宇' // test
      this.info.email = '1213814232@qq.com' // test
    },
    search () {
      var regex = /^([a-zA-Z0-9\u4e00-\u9fa5\s]){2,10}$/
      if (!regex.test(this.searchContent)) {
        this.$Notice.error({
          title: 'Invalid team name.',
          desc: ''
        })
        this.searchContent = ''
        return
      }
      this.spinShow = true
      let _this = this
      setTimeout(() => {
        _this.dataTeam = [
          {
            id: '00001',
            name: 'System support',
            manager: '李永达',
            count: '11'
          },
          {
            id: '00002',
            name: 'Overseas firmware',
            manager: '段启智',
            count: '8'
          },
          {
            id: '00003',
            name: 'System test',
            manager: '张三',
            count: '9'
          }
        ]
        _this.spinShow = false
      }, 1000)
      teamworkApi.search(this.searchContent).then(function (response) {
        if (response.data.result === true) {
          _this.dataTeam = response.data.dataTeam
          _this.spinShow = false
        } else {
          _this.$Notice.error({
            title: 'Search failed.',
            desc: ''
          })
          _this.spinShow = false
        }
      })
    },
    changeSelection (currentRow, oldCurrentRow) {
      this.currentData = currentRow
    },
    clear () {
      this.dataTeam = []
    },
    join () {
      this.spinShow = true
      let _this = this
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Send message successful.',
          desc: 'Please waitting for manager to check.'
        })
        _this.spinShow = false
      }, 1000)
      teamworkApi.join(this.info.tel, this.currentData.id).then(function (response) {
        if (response.data.result === true) {
          _this.$Notice.success({
            title: 'Send message successful.',
            desc: 'Please waitting for manager to check.'
          })
        } else {
          _this.$Notice.error({
            title: 'Join failed.',
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
.alert {
  padding: 16px;
}

.span-agreement {
  width      : 100%;
  font-size  : 22px;
  font-weight: bold;
  text-align : center;
  display    : block;
}

.li-agreement {
  color    : red;
  font-size: 18px;
  margin   : 20px;
}

.span-list {}

.radio-agreement {
  font-size: 16px;
}

.div-search {
  margin-top: 50px;
}

.input-search {
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
