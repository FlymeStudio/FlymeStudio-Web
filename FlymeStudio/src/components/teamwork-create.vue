<template>
<div class="layout">
  <Layout>

    <Header>
      <topNav></topNav>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <leftNav activeName="13"></leftNav>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">

          <!-- spin -->
          <Spin class="spin" fix v-if="spinShow">
            <Icon class="icon-spin" type="load-c" size=50></Icon>
          </Spin>

          <Alert class="alert">

            <!-- agreement -->
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
                    <span class="span-list">Manager has right to remove any member from the team.</span>
                  </li>
                  <li class="li-agreement">
                    <span class="span-list">Manager has right to disband the team.</span>
                  </li>
                </ol>
                <RadioGroup v-model="agreementCreate">
                  <Radio class="radio-agreement" label="0">
                      <span>Disagree</span>
                  </Radio>
                  <Radio class="radio-agreement" label="1">
                      <span>Agree</span>
                  </Radio>
                </RadioGroup>
              </template>
            </Alert>

            <!-- create -->
            <Input class="input-create" v-model="createName" placeholder="Team name" clearable></Input>
            <Button class="btn-create" type="primary" disabled v-if="agreementCreate == 0">Submit</Button>
            <Button class="btn-create" type="primary" v-else @click="submit()">Submit</Button>

          </Alert>

          <!-- confirm -->
          <Modal class="modal-confirm" v-model="modalCreate" title="Confirm" :mask-closable="false" :closable="false" ok-text="Create" cancel-text="Cancel" loading @on-ok="create()">
            <p>Input the password to check your identity:</p>
            <Input style="margin-top:20px;" type="password" v-model="password" size="large" placeholder="Password" clearable>
            </Input>
          </Modal>
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
  name: 'teamwork-create',
  created () {
    this.getInfo()
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
      agreementCreate: '0',
      createName: '',
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
    getInfo () {
      let name = this.$store.state.user.userInfo.name
      if (name === null) {
        this.$router.push('/')
      } else {
        this.info = this.$store.state.user.userInfo
      }
    },
    submit () {
      var regex = /^([a-zA-Z0-9\u4e00-\u9fa5\s]){2,10}$/
      if (!regex.test(this.createName)) {
        this.$Notice.error({
          title: 'Invalid team name.',
          desc: ''
        })
        this.createName = ''
      } else {
        this.modalCreate = true
      }
    },
    create () {
      if (this.password !== this.info.password) {
        this.$Notice.error({
          title: 'Password is incorrect.',
          desc: ''
        })
        return
      }
      let _this = this
      // TEST START
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Create team successful.',
          desc: ''
        })
        _this.modalCreate = false
      }, 1000)
      // TEST END
      teamworkApi.create(this.info.tel, this.createName).then(function (response) {
        if (response.data.result === true) {
          _this.$Notice.success({
            title: 'Create team successful.',
            desc: ''
          })
        } else {
          _this.$Notice.error({
            title: 'Create team failed.',
            desc: ''
          })
        }
        _this.password = ''
        _this.modalCreate = false
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
