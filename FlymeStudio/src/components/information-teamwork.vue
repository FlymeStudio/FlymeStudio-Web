<template>
<div class="layout">
  <Layout>
    <Header>
      <topNav></topNav>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="2"></leftNav>
      </Sider>
      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
          <Spin style="z-index:10;" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          <Menu class="menu" mode="horizontal" theme="light" active-name="0" @on-select="clickTag">
            <MenuItem class="menu-item" name="0">
            <Icon type="ios-people" size=20></Icon>
            My team
            </MenuItem>
            <MenuItem class="menu-item" name="1">
            <Icon type="plus-circled" size=20></Icon>
            Create team
            </MenuItem>
          </Menu>

          <Layout>
            <Content :style="{padding: '15px 0', minHeight: '280px', background: '#fff'}">

              <div v-show="currentType == 0">
                <Alert class="alert-my">

                </Alert>
              </div>

              <div v-show="currentType == 1">
                <Alert class="alert-create">
                  <Alert type="warning" style="color:red;">
                    <span class="span-agreement">Agreement</span>
                    <template slot="desc">
                      <ol>
                        <li class="li-agreement">
                          <span class="span-list">After creating a team, you will be the manager of the team.</span>
                        </li>
                        <li class="li-agreement">
                          <span class="span-list">As the manager of the team, you can view all projects and summaries of each member.</span>
                        </li>
                        <li class="li-agreement">
                          <span class="span-list">Manager can export a report about projects or summaries of any member.</span>
                        </li>
                        <li class="li-agreement">
                          <span class="span-list">Manager has right to remove member from the team.</span>
                        </li>
                      </ol>
                      <RadioGroup v-model="agreement">
                        <Radio class="radio-agreement" label="0">
                            <span>Disagree</span>
                        </Radio>
                        <Radio class="radio-agreement" label="1">
                            <span>Agree</span>
                        </Radio>
                      </RadioGroup>
                    </template>
                  </Alert>
                  <Input class="input-create" v-model="teamName" placeholder="Team name" clearable></Input>
                  <Button class="btn-create" type="primary" disabled v-if="agreement == 0">Create</Button>
                  <Button class="btn-create" type="primary" v-else @click="submit()">Submit</Button>
                </Alert>
              </div>

              <Modal class="modal-confirm" v-model="modalCreate" title="Confirm" :mask-closable="false" :closable="false" ok-text="Create" cancel-text="Cancel" loading @on-ok="create()">
                <p>Input the password to check your identity:</p>
                <Input style="margin-top:20px;" type="password" v-model="password" size="large" placeholder="Password" clearable>
                </Input>
              </Modal>
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
import topNav from './component-topnav.vue'
import leftNav from './component-leftnav.vue'
import componentFooter from './component-footer.vue'
import informationApi from '../api/informationApi'

export default{
  name: 'information-teamwork',
  created () {
    this.clickTag('0')
  },
  data () {
    return {
      spinShow: false,
      currentType: '0',
      agreement: '0',
      teamName: '',
      password: '',
      modalCreate: false
    }
  },
  components: {
    topNav,
    leftNav,
    componentFooter
  },
  methods: {
    clickTag: function (name) {
      this.currentType = name
    },
    submit () {
      var regex = /^([a-zA-Z0-9\u4e00-\u9fa5]){2,10}$/
      if (!regex.test(this.teamName)) {
        this.$Notice.error({
          title: 'Invalid team name.',
          desc: ''
        })
        this.teamName = ''
      } else {
        this.modalCreate = true
      }
    },
    create () {
      let _this = this
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Create team successful.',
          desc: ''
        })
        _this.modalCreate = false
      }, 1000)
      informationApi.createTeam(this.password, this.teamName).then(function (response) {
        if (response.data.result === true) {
          _this.$Notice.success({
            title: 'Create team successful.',
            desc: ''
          })
          _this.modalCreate = false
        } else {
          _this.$Notice.error({
            title: 'Create team failed.',
            desc: ''
          })
          _this.modalCreate = false
        }
      })
    }
  }
}
</script>

<style scoped>
.menu{
  z-index:5;
}

.alert-create {
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

.input-create {
  width     : 200px;
  margin-top: 50px;
  display   : block;
}

.btn-create {
  width     : 100px;
  margin-top: 30px;
  display   : block;
  font-size : 14px;
}

.modal-confirm {
  position: absolute;
  z-index : 10;
}

.modal-confirm p {
  font-size: 18px;
  color    : red;
}
</style>
