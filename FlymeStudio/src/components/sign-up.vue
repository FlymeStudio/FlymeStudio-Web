<template>
<div class="layout">
  <Layout>

    <Header class="header">
      <Menu class="menu" mode="horizontal" theme="dark" @on-select="clickTopNav">

        <div class="layout-logo" @click="clickFlyme"></div>
        <div class="layout-title">Flyme Studio</div>

        <div class="layout-nav">
          <MenuItem name="0-1">
          <Icon type="log-in" size=18></Icon>
          Sign in
          </MenuItem>
          <MenuItem name="0-2">
          <Icon type="unlocked" size=18></Icon>
          Retrieve
          </MenuItem>
        </div>

      </Menu>
    </Header>

    <Content class="content">
      <Form class="form" ref="formItem" :model="formItem" :rules="ruleItem" v-show="isResultView == false">
        <FormItem class="form-item" prop="num">
          <Input type="text" v-model="formItem.num" placeholder="Staff number" size="large" clearable>
          <Icon type="pound" slot="prepend" size=18></Icon>
          </Input>
        </FormItem>

        <FormItem class="form-item" prop="name">
          <Input type="text" v-model="formItem.name" placeholder="User name" size="large" clearable>
          <Icon type="person" slot="prepend" size=18></Icon>
          </Input>
        </FormItem>

        <FormItem class="form-item" prop="tel">
          <Input type="text" v-model="formItem.tel" placeholder="Phone number" size="large" clearable>
          <Icon type="ios-telephone" slot="prepend" size=18></Icon>
          </Input>
        </FormItem>

        <FormItem class="form-item" prop="email">
          <Input type="text" v-model="formItem.email" placeholder="Email" size="large" clearable>
          <Icon type="email" slot="prepend" size=18></Icon>
          </Input>
        </FormItem>

        <FormItem class="form-item" prop="password">
          <Input type="password" v-model="formItem.password" placeholder="Password" size="large" clearable>
          <Icon type="android-lock" slot="prepend" size=18></Icon>
          </Input>
        </FormItem>

        <FormItem class="form-item" prop="confirm">
          <Input type="password" v-model="formItem.confirm" placeholder="Confirm" size="large" clearable>
          <Icon type="checkmark" slot="prepend" size=18></Icon>
          </Input>
        </FormItem>

        <FormItem class="form-item-btn">
          <Button class="btn-item" type="primary" @click="handleSubmit('formItem')" style="margin-right:15px;" :loading="loading">Sign up</Button>
          <Button class="btn-item" @click="handleReset('formItem')" style="margin-left:15px;">Reset</Button>
        </FormItem>

      </Form>

      <div class="div-result" v-show="isResultView">
        <Icon class="icon-result" type="home" size="35"></Icon>
        <div>Welcome to join <b>Flyme Studio</b>!</div>
      </div>

    </Content>

    <componentFooter></componentFooter>

  </Layout>
</div>
</template>

<script>
import componentFooter from './component-footer.vue'
import accountApi from '../api/accountApi'

export default {
  name: 'signUp',
  data () {
    return {
      isResultView: false,
      formItem: {
        num: '',
        name: '',
        tel: '',
        email: '',
        password: '',
        confirm: ''
      },
      ruleItem: {
        num: [
          {
            required: true,
            message: 'Please fill in the staff number.',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]{1,8}$/,
            message: 'Staff number should be a number and no more than 8 bits.',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: 'The name cannot be empty.',
            trigger: 'blur'
          },
          {
            type: 'string',
            pattern: /^[\u4E00-\u9FA5]{2,4}$/,
            message: 'Illegal name.',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            message: 'Please fill in the phone number.',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]{11}$/,
            message: 'Phone number is 11 bits.',
            trigger: 'blur'
          },
          {
            pattern: /^(13[0-9]{9})|(14[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})$/,
            message: 'Incorrect phone number format.',
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
            message: 'Incorrect email format.'
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
            message: 'The password should be not less than 6 bits.',
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
          this.clickSignIn()
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
    clickSignIn: function () {
      this.$router.push('/signIn')
    },
    clickRetrieve: function () {
      this.$router.push('/retrieve')
    },
    signUp: function () {
      this.loading = true
      let _this = this
      accountApi.signUp(this.formItem.num, this.formItem.name, this.formItem.tel, this.formItem.email, this.formItem.password).then(function (response) {
        if (response.status === 200) {
          if (response.data.result === true) {
            _this.$Notice.success({
              title: 'Sign up successful.',
              desc: ''
            })
            _this.isResultView = true
          } else {
            _this.$Notice.error({
              title: 'Sign up failed.',
              desc: ''
            })
            _this.isResultView = false
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
          _this.isResultView = false
        }
        _this.loading = false
      }).catch(function (error) {
        _this.$Notice.error({
          title: 'HTTP request error.',
          desc: ''
        })
        console.log(error)
        _this.loading = false
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formItem.password === this.formItem.confirm) {
            this.signUp()
          } else {
            this.$Notice.error({
              title: 'Please reconfirm password.',
              desc: ''
            })
            this.formItem.confirm = ''
          }
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

.div-result {
  margin-top : 180px;
  margin-left: 10%;
  width      : auto;
  display    : flex;
  display    : -webkit-flex;
  text-align : center;
  font-size  : 25px;
  color      : #1c2438;
}

.icon-result {
  margin-right: 10px;
}
</style>
