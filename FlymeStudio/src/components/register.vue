<template>
<div class="layout">
  <Layout>
    <Header class="header">
      <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">
        <div class="layout-logo" @click="clickFlyme"></div>
        <div class="layout-title">Flyme Studio</div>
        <div class="layout-nav">
          <MenuItem name="0-1">
          <Icon type="log-in" size="18"></Icon>
          Sign in
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
        <FormItem class="form-item" prop="name">
          <Input type="text" v-model="formInline.name" placeholder="Username" size="large" clearable>
          <Icon type="person" slot="prepend" size="18"></Icon>
          </Input>
        </FormItem>
        <FormItem class="form-item" prop="tel">
          <Input type="text" v-model="formInline.tel" placeholder="Telephone" size="large" clearable>
          <Icon type="ios-telephone" slot="prepend" size="18"></Icon>
          </Input>
        </FormItem>
        <FormItem class="form-item" prop="email">
          <Input type="text" v-model="formInline.email" placeholder="Email" size="large" clearable>
          <Icon type="email" slot="prepend" size="18"></Icon>
          </Input>
        </FormItem>
        <FormItem class="form-item" prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password" size="large" clearable>
          <Icon type="android-lock" slot="prepend" size="18"></Icon>
          </Input>
        </FormItem>
        <FormItem class="form-item" prop="confirm">
          <Input type="password" v-model="formInline.confirm" placeholder="Confirm" size="large" clearable>
          <Icon type="checkmark" slot="prepend" size="18"></Icon>
          </Input>
        </FormItem>
        <FormItem class="form-item-btn">
          <Button class="btn-item" type="primary" @click="handleSubmit('formInline')" style="margin-right:15px;">Sign up</Button>
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
  name: 'register',
  data () {
    return {
      formInline: {
        name: '',
        tel: '',
        email: '',
        password: '',
        confirm: ''
      },
      ruleInline: {
        name: [
          {
            required: true,
            message: 'Please fill in the username.',
            trigger: 'blur'
          },
          {
            type: 'string',
            pattern: /^[\u4E00-\u9FA5]{2,4}$/,
            message: 'Wrong username!',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            message: 'Please fill in the telephone number.',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]{11}$/,
            message: 'Telephone number is 11 bits.',
            trigger: 'blur'
          },
          {
            pattern: /^(13[0-9]{9})|(14[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})$/,
            message: 'Wrong telephone number.',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Please fill in the email.',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Wrong email.'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password is too short.',
            trigger: 'blur'
          }
        ],
        confirm: [
          {
            required: true,
            message: 'Please fill in the confirm.',
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
          this.clickLogin()
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
    clickLogin: function () {
      this.$router.push('/login')
    },
    clickRetrieve: function () {
      this.$router.push('/retrieve')
    },
    github: function () {
      window.open('https://github.com/frogfans')
    },
    register: function () {
      let _this = this
      this.$Message.success('Sign up successful!')
      this.isResultView = true
      accountApi.register(this.name, this.tel, this.email, this.password).then(function (response) {
        if (response.data.result === true) {
          _this.$Message.success('Sign up successful!')
          _this.isResultView = true
        } else {
          _this.$Message.error('Sign up failed!')
          _this.isResultView = false
          _this.isRegisterCallback = true
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.register()
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
