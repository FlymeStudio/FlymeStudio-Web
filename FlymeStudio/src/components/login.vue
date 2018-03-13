<template>
<div class="layout">
  <Layout>
    <Header class="header">
      <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">
        <div class="layout-logo" @click="clickFlyme"></div>
        <div class="layout-title">Flyme Studio</div>
        <div class="layout-nav">
          <MenuItem name="0-1">
          <Icon class="item-icon" type="person-add" size="18"></Icon>
          Sign up
          </MenuItem>
          <MenuItem name="0-2">
          <Icon type="unlocked" size="18"></Icon>
          Retrieve
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Content class="content">
      <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem class="form-item" prop="id">
          <Input type="text" v-model="formInline.id" placeholder="Tel or email" size="large" clearable>
          <Icon type="person" slot="prepend" size="18"></Icon>
          </Input>
        </FormItem>
        <FormItem class="form-item" prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password" size="large" clearable>
          <Icon type="android-lock" slot="prepend" size="18"></Icon>
          </Input>
        </FormItem>
        <FormItem class="form-item-btn">
          <Button class="btn-item" type="primary" @click="handleSubmit('formInline')" style="margin-right:15px;">Sign in</Button>
          <Button class="btn-item" @click="handleReset('formInline')" style="margin-left:15px;">Reset</Button>
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
  name: 'login',
  data () {
    return {
      formInline: {
        id: '',
        password: ''
      },
      ruleInline: {
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
      }
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
      this.$router.push('/register')
    },
    clickRetrieve: function () {
      this.$router.push('/retrieve')
    },
    github: function () {
      window.open('https://github.com/frogfans')
    },
    login: function () {
      this.$Message.success('Sign in successful!')
      this.$router.push('/home')
      let _this = this
      accountApi.login(this.id, this.password)
        .then(function (response) {
          if (response.data.result === true) {
            _this.$Message.success('Sign in successful!')
            // let loginInfo = {
            //   id: _this.id,
            //   password: _this.password
            // }
            // _this.$store.dispatch('doLogin', loginInfo)
            _this.$router.push('/home')
          } else {
            _this.$Message.error('Sign in failed!')
          }
        })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          this.$Message.error('Information is incorrect!')
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
