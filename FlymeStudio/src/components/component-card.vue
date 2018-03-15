<template>
<Card>
  <div>
    <div class="card-top">
      <i-circle class="card-circle" :size=40 v-if="cardPercent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
        <Icon type="ios-checkmark-empty" size=40 color="#5cb85c"></Icon>
      </i-circle>
      <i-circle class="card-circle" :size=40 v-else :percent="cardPercent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
        <span class="demo-Circle-inner">{{ cardPercent }}%</span>
      </i-circle>
      <span class="card-date">{{ date }}</span>
      <span class="card-detail" @click="modalPreview = true"><Icon type="more" size="24"></Icon></span>
    </div>
    <p class="card-title" slot="title">{{ title }}</p>
    <mavon-editor class="card-content" v-model="content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ content }}</mavon-editor>
  </div>
  <Modal class="preview-modal" width="90%" v-model="modalPreview" :mask-closable="false" :ok-text="okText" :cancel-text="cancelText" class-name="vertical-center-modal" @on-ok="modalConfirm = true">
    <div>
      <div class="card-top">
        <i-circle class="card-circle" :size=40 v-if="cardPercent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
          <Icon type="ios-checkmark-empty" size=40 color="#5cb85c"></Icon>
        </i-circle>
        <i-circle class="card-circle" :size=40 v-else :percent="cardPercent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
          <span class="demo-Circle-inner">{{ cardPercent }}%</span>
        </i-circle>
        <span class="card-date">{{ date }}</span>
      </div>
      <p class="preview-title" slot="title">{{ title }}</p>
      <mavon-editor class="preview-content" v-model="content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ content }}</mavon-editor>
      <div class="div-plans">
        <Alert v-for="item in plans" :key="item.index">
          <Progress  class="preview-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
          <Progress  class="preview-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
          <Tag type="dot" color="blue" style="width:100px;text-align:center;">{{ item.tag }}</Tag>
          <Tag type="dot" color="yellow" style="width:300px;">{{ item.goal }}</Tag>
          <Button class="btn-plans" type="ghost" shape="circle" icon="minus" @click="deletePlan(item.index)"></Button>
        </Alert>
        <Alert>
          <Input type="text" clearable placeholder="Tag" style="width:100px;" v-model="editTag"></Input>
          <Input type="text" clearable placeholder="Goal" style="width:300px;margin:auto 4px;" v-model="editGoal"></Input>
          <Button class="btn-plans" type="ghost" shape="circle" icon="plus" @click="addPlan()"></Button>
        </Alert>
      </div>
    </div>
  </Modal>
  <Modal class="modal-confirm" v-model="modalConfirm" title="Warning" :ok-text="okText" :cancel-text="cancelText" :loading="loading" @on-cancel="cancel()" @on-ok="save()">
    <p>Are you sure to save the change?</p>
  </Modal>
</Card>
</template>

<script>
export default{
  name: 'component-card',
  created () {
    this.planIndex = this.plans.length
  },
  props: [
    'cardData'
  ],
  data () {
    return {
      key: this.cardData.key,
      date: this.cardData.date,
      title: this.cardData.title,
      content: this.cardData.content,
      plans: this.cardData.plans,
      subfield: false,
      defaultOpen: 'preview',
      toolbarsFlag: false,
      planIndex: '',
      editTag: '',
      editGoal: '',
      modalPreview: false,
      modalConfirm: false,
      loading: true,
      okText: 'Save',
      cancelText: 'Cancel'
    }
  },
  computed: {
    cardPercent: function () {
      let _percent = 0
      for (var i = 0; i < this.plans.length; i++) {
        _percent += this.plans[i].percent
      }
      if (this.plans.length === 0) {
        return 0
      } else {
        return Math.round(_percent / this.plans.length)
      }
    }
  },
  methods: {
    cancel () {
      this.modalPreview = true
    },
    deletePlan (index) {
      for (var i = 0; i < this.plans.length; i++) {
        if (this.plans[i].index === index) {
          this.plans.splice(i, 1)
          break
        }
      }
    },
    addPlan () {
      var plan = {
        index: this.planIndex,
        tag: this.editTag,
        goal: this.editGoal,
        percent: 0
      }
      this.plans.push(plan)
      this.editTag = ''
      this.editGoal = ''
      this.planIndex++
    },
    save () {
      let _this = this
      setTimeout(() => {
        _this.$Notice.success({
          title: 'Save successful',
          desc: ''
        })
        _this.modalConfirm = false
        _this.modalPreview = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.card-top {
  width      : 100%;
  align-items: center;
  margin     : auto 0;
  display    : flex;
  display    : -webkit-flex;
}

.card-circle {
  font-size  : 14px;
  font-weight: bold;
  display    : inline-block;
}

.card-date {
  width      : auto;
  margin-left: 20px;
  font-size  : 16px;
}

.card-detail {
  float   : right;
  position: relative;
  margin  : auto 0 auto auto;
  cursor  : pointer;
}

.card-title {
  width      : 100%;
  text-align : center;
  border-top : 1px solid #ccc;
  margin-top : 5px;
  padding-top: 5px;
  font-weight: bold;
  font-size  : 18px;
}

.card-content {
  min-width : 100px;
  min-height: 100px;
  width     : auto;
  height    : 120px;
  margin    : 0;
  font-size : 12px;
  z-index   : 5;
}

.preview-modal{
  z-index: 10;
}

.preview-title {
  width      : 100%;
  text-align : center;
  border-top : 1px solid #ccc;
  margin-top : 10px;
  padding-top: 10px;
  font-weight: bold;
  font-size  : 22px;
}

.preview-content {
  min-width : 100px;
  min-height: 50px;
  width     : auto;
  height    : auto;
  margin-top: 10px;
  font-size : 16px;
  z-index   : 5;
}

.div-plans{
    margin-top: 20px;
}

.preview-plans{
}

.preview-progress{
  font-size: 16px;
  color: #1788e8;
  margin-bottom: 10px;
}

.btn-plans{
  display: inline-block;
  float: right;
  margin-left: auto;
}

.vertical-center-modal {
  display        : flex;
  align-items    : center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.modal-confirm {
  position: absolute;
  z-index : 15;
}

.modal-confirm p {
  font-size: 18px;
  color    : red;
}
</style>
