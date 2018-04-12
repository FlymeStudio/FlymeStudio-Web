<template>
<div class="layout">
  <Layout>

    <Header>
      <componentNavTop></componentNavTop>
    </Header>

    <Layout>

      <Sider hide-trigger :style="{height: '100vh', background: '#fff'}">
        <componentNavLeft activeName="2"></componentNavLeft>
      </Sider>

      <Layout :style="{padding: '0 24px'}">
        <Content :style="{padding: '15px', minHeight: '280px', background: '#fff'}">
          <Form class="form" ref="formItem" :model="formItem" :rules="ruleItem">

            <Alert type="info">
              <FormItem class="form-item">
                <div class="div-menu-item">
                  <Icon class="icon-item" style="margin:auto 10px;" type="person" size=18></Icon>
                  <span class="span-item">{{ info.name }}</span>
                </div>
              </FormItem>
              <FormItem class="form-item" prop="name">
                <Input type="text" v-model="formItem.name" size="large" placeholder="New name" clearable>
                <Icon class="icon-item" type="edit" slot="prepend" size=18></Icon>
                </Input>
              </FormItem>
            </Alert>

            <Alert type="info">
              <FormItem class="form-item">
                <div class="div-menu-item">
                  <Icon class="icon-item" style="margin:auto 10px;" type="ios-telephone" size=18></Icon>
                  <span class="span-item">{{ info.tel }}</span>
                </div>
              </FormItem>
              <FormItem class="form-item" prop="tel">
                <Input type="text" v-model="formItem.tel" size="large" placeholder="New tel" clearable>
                <Icon class="icon-item" type="edit" slot="prepend" size=18></Icon>
                </Input>
              </FormItem>
            </Alert>

            <Alert type="info">
              <FormItem class="form-item">
                <div class="div-menu-item">
                  <Icon class="icon-item" style="margin:auto 10px;" type="email" size=18></Icon>
                  <span class="span-item">{{ info.email }}</span>
                </div>
              </FormItem>
              <FormItem class="form-item" prop="email">
                <Input type="text" v-model="formItem.email" size="large" placeholder="New email" clearable>
                <Icon class="icon-item" type="edit" slot="prepend" size=18></Icon>
                </Input>
              </FormItem>
            </Alert>

            <Alert type="info">
              <FormItem class="form-item" prop="newPassword">
                <Input type="password" v-model="formItem.newPassword" size="large" placeholder="New password" clearable>
                <Icon class="icon-item" type="android-lock" slot="prepend" size=18></Icon>
                </Input>
              </FormItem>
              <FormItem class="form-item" prop="confirm">
                <div v-if="formItem.newPassword == ''">
                  <Input type="password" v-model="formItem.confirm" size="large" placeholder="Confirm" disabled>
                  <Icon class="icon-item" type="checkmark" slot="prepend" size=18></Icon>
                  </Input>
                </div>
                <div v-else>
                  <Input type="password" v-model="formItem.confirm" size="large" placeholder="Confirm" clearable>
                  <Icon class="icon-item" type="checkmark" slot="prepend" size=18></Icon>
                  </Input>
                </div>
              </FormItem>
            </Alert>

            <FormItem class="form-item-btn">
              <Button class="btn-item" type="primary" @click="handleSubmit('formItem')" style="margin-right:15px;">Submit</Button>
              <Button class="btn-item" @click="handleReset('formItem')" style="margin-left:15px;">Reset</Button>
            </FormItem>

          </Form>

          <!-- confirm -->
          <Modal class="modal-confirm" v-model="modalModify" title="Confirm" :mask-closable="false" :closable="false" ok-text="Modify" cancel-text="Cancel" loading @on-ok="modify()">
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
import componentNavTop from './component-nav-top.vue'
import componentNavLeft from './component-nav-left.vue'
import componentFooter from './component-footer.vue'
import informationApi from '../api/informationApi'

export default{
  name: 'information-modify',
  created () {
    this.getInfo()
  },
  data () {
    return {
      password: '',
      info: {
        id: 0,
        num: '',
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      formItem: {
        name: '',
        tel: '',
        email: '',
        newPassword: '',
        confirm: ''
      },
      ruleItem: {
        name: [
          {
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
            message: 'Please fill in the email.',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Incorrect email format.'
          }
        ],
        newPassword: [
          {
            message: 'Please fill in the password.',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: 'The password should be no less than 6 bits.',
            trigger: 'blur'
          }
        ],
        confirm: [
          {
            message: 'Please fill in the confirm.',
            trigger: 'blur'
          }
        ]
      },
      modalModify: false
    }
  },
  components: {
    componentNavTop,
    componentNavLeft,
    componentFooter
  },
  methods: {
    getInfo () {
      this.info = this.$store.state.user.userInfo
    },
    modify: function () {
      let _this = this
      if (this.info.password !== this.password) {
        this.$Notice.error({
          title: 'Password is incorrect.',
          desc: ''
        })
        setTimeout(() => {
          _this.password = ''
          _this.modalModify = false
        }, 1000)
        return
      }
      informationApi.modify(this.info.tel, this.formItem.name, this.formItem.tel, this.formItem.email, this.formItem.newPassword).then(function (response) {
        console.log('response=' + response)
        if (response.status === 200) {
          if (response.data.result === true) {
            _this.$store.dispatch('doUpdate', _this.info)
            _this.$Notice.success({
              title: 'Modify successful.',
              desc: ''
            })
          } else {
            _this.$Notice.error({
              title: 'Modify failed.',
              desc: ''
            })
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
          console.log('status=' + response.status)
        }
        _this.modalModify = false
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
          if (this.formItem.newPassword === this.formItem.confirm) {
            this.modalModify = true
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
.form {}

.form-item {
  margin-left: 3%;
  color      : #1c2438;
  font-weight: bold;
}

.form-item-btn {
  margin-left: 3%;
}

.btn-item {
  width     : 100px;
  margin-top: 20px;
  font-size : 15px;
}

.icon-item {
  width     : 18px;
  text-align: center;
}

.span-item {
  font-size: 16px;
  color: #2d8cf0;
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
