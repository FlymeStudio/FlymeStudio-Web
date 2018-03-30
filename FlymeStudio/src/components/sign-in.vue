<template>
<div class="layout">
  <Layout>

    <Header class="header">
      <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">

        <div class="layout-logo" @click="clickFlyme"></div>
        <div class="layout-title">Flyme Studio</div>

        <div class="layout-nav">
          <MenuItem name="0-1">
          <Icon class="item-icon" type="person-add" size=18></Icon>
          Sign up
          </MenuItem>
          <MenuItem name="0-2">
          <Icon type="unlocked" size=18></Icon>
          Retrieve
          </MenuItem>
        </div>

      </Menu>
    </Header>

    <Content class="content">
      <Form class="form" ref="formItem" :model="formItem" :rules="ruleItem">

        <FormItem class="form-item" prop="id">
          <Input type="text" v-model="formItem.id" placeholder="Tel or email" size="large" clearable>
          <Icon type="person" slot="prepend" size=18></Icon>
          </Input>
        </FormItem>

        <FormItem class="form-item" prop="password">
          <Input type="password" v-model="formItem.password" placeholder="Password" size="large" clearable>
          <Icon type="android-lock" slot="prepend" size=18></Icon>
          </Input>
        </FormItem>

        <FormItem class="form-item-btn">
          <Button class="btn-item" type="primary" @click="handleSubmit('formItem')" style="margin-right:15px;" :loading="loading">Sign in</Button>
          <Button class="btn-item" @click="handleReset('formItem')" style="margin-left:15px;">Reset</Button>
        </FormItem>

      </Form>
    </Content>

    <componentFooter></componentFooter>

  </Layout>
</div>
</template>

<script>
import componentFooter from './component-footer.vue'
import accountApi from '../api/accountApi'

export default {
  name: 'signIn',
  data () {
    return {
      formItem: {
        id: '',
        password: ''
      },
      ruleItem: {
        id: [
          {
            required: true,
            message: 'Please fill in the account.',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  components: {
    componentFooter
  },
  methods: {
    clickTopNav: function (name) {
      switch (name) {
        case '0-1':
          this.clickRegister()
          break
        case '0-2':
          this.clickRetrieve()
          break
        default:
      }
    },
    clickFlyme: function () {
      window.open('https://www.flyme.cn/')
    },
    clickRegister: function () {
      this.$router.push('/signUp')
    },
    clickRetrieve: function () {
      this.$router.push('/retrieve')
    },
    signIn: function () {
      this.loading = true
      let _this = this
      // TEST START
      setTimeout(() => {
        let userInfo = {
          tel: '13608089849',
          name: '曾宇',
          email: '1213814232@qq.com',
          password: '123456',
          messages: [
            {
              id: '1',
              type: 1,
              fromTel: '13600000001',
              fromName: '刘卓旻',
              teamName: 'System support',
              teamId: '00001'
            },
            {
              id: '2',
              type: 2,
              fromTel: '13600000002',
              fromName: '余学海',
              teamName: 'Overseas firmware',
              teamId: '00002'
            }
          ]
        }
        _this.$store.dispatch('doSignIn', userInfo)
        _this.$Notice.success({
          title: 'Sign in successful.',
          desc: ''
        })
        _this.$router.push('/home')
      }, 1000)
      // TEST END
      accountApi.signIn(this.formItem.id, this.formItem.password)
        .then(function (response) {
          if (response.data.result === true) {
            let userInfo = {
              tel: response.data.id,
              name: response.data.name,
              email: response.data.email,
              password: _this.formItem.password,
              messages: response.data.messages
            }
            _this.$store.dispatch('doSignIn', userInfo)
            _this.$Notice.success({
              title: 'Sign in successful.',
              desc: ''
            })
            _this.$router.push('/home')
          } else {
            _this.$Notice.error({
              title: 'Sign in failed.',
              desc: ''
            })
            _this.loading = false
          }
        })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.signIn()
        } else {
          this.$Notice.error({
            title: 'Information is incorrect.',
            desc: ''
          })
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>
.content {
  height               : 100%;
  min-height           : 1000px;
  margin               : 0;
  background-color     : #1788e8;
  background-image     : url("../assets/banner.jpg");
  background-position  : center bottom;
  background-repeat    : no-repeat;
  background-attachment: fixed;
  background-size      : cover;
}

.form {
  width      : auto;
  height     : auto;
  position   : absolute;
  margin-top : 180px;
  margin-left: 10%;
  display    : block;
}

.form-item {
  width: 240px;
}

.form-item-btn {
  text-align: center;
}

.btn-item {
  width     : 100px;
  margin-top: 20px;
  font-size : 15px;
}
</style>
