<template>
<div id="information-overview">
  <Alert class="alert-information" show-icon>
    <Icon class="icon-item" type="ios-telephone" slot="icon" size=30></Icon>
    <template slot="desc">
      <div>
        <span class="span-item">{{ info.tel }}</span>
      </div>
    </template>
  </Alert>

  <Alert class="alert-information" show-icon>
    <Icon class="icon-item" type="email" slot="icon" size=30></Icon>
    <template slot="desc">
      <div>
        <span class="span-item">{{ info.email }}</span>
      </div>
    </template>
  </Alert>

  <Alert class="alert-information" show-icon v-for="item in info.messages" :key="item.messageId">
    <span class="span-item"><Tag color="#80848f">{{ item.from }}</Tag> invite you to join <Tag color="blue">{{ item.teamName }}</Tag></span>
    <Icon class="icon-item" type="ios-people" slot="icon" size=30></Icon>
    <template slot="desc">
      <div class="div-message">
        <Button class="btn-message" type="success">Accept</Button>
        <Button class="btn-message" type="error">Refuse</Button>
      </div>
    </template>
  </Alert>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'information-overview',
  created () {
    this.getInfo()
  },
  data () {
    return {
      info: {
        tel: '13608089849',
        name: 'user',
        email: '',
        messages: [
          {
            messageId: '1',
            from: '13600000001',
            teamName: 'Support system',
            teamId: '00001'
          },
          {
            messageId: '2',
            from: '13600000002',
            teamName: 'Overseas firmware',
            teamId: '00002'
          }
        ]
      }
    }
  },
  methods: {
    getInfo () {
      this.info.name = '曾宇' // test
      this.info.email = '1213814232@qq.com' // test
    }
  }
}
</script>

<style scoped>
.icon-item {
  width       : 18px;
  text-align  : center;
  margin-right: 10px;
}

.span-item {
  font-size: 16px;
}

.div-message{
  margin-top:10px;
}

.alert-information{
  margin-top: 10px;
}

.btn-message{
  margin-right: 10px;
}
</style>
