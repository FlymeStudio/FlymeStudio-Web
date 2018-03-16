<template>
<Card>
  <div>
    <div class="card-top">
      <i-circle v-if="cardPercent == 100" class="card-circle" :size=40 :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
        <Icon type="ios-checkmark-empty" size=40 color="#5cb85c"></Icon>
      </i-circle>
      <i-circle v-else class="card-circle" :size=40 :percent="cardPercent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
        <span class="demo-Circle-inner">{{ cardPercent }}%</span>
      </i-circle>
      <span class="card-date">{{ cardSrc.date }}</span>
      <span class="card-detail" @click="modalPreview = true"><Icon type="more" size="24"></Icon></span>
    </div>
    <p class="card-title" slot="title">{{ cardSrc.title }}</p>
    <mavon-editor class="card-content" v-model="cardSrc.content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ cardSrc.content }}</mavon-editor>
  </div>
  <Modal type="info" class="preview-modal" width="90%" v-model="modalPreview" :mask-closable="false" :ok-text="okText" :cancel-text="cancelText" class-name="vertical-center-modal">
    <div>
      <div class="card-top">
        <i-circle class="card-circle" :size=40 v-if="cardPercent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
          <Icon type="ios-checkmark-empty" size=40 color="#5cb85c"></Icon>
        </i-circle>
        <i-circle class="card-circle" :size=40 v-else :percent="cardPercent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
          <span class="demo-Circle-inner">{{ cardPercent }}%</span>
        </i-circle>
        <span class="card-date">{{ cardSrc.date }}</span>
      </div>
      <p class="preview-title" slot="title">{{ cardSrc.title }}</p>
      <mavon-editor class="preview-content" v-model="cardSrc.content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ cardSrc.content }}</mavon-editor>
      <div class="div-plans">
        <Alert class="alert-plans" v-for="item in cardSrc.plans" :key="item.timestamp">
          <Progress class="preview-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
          <Progress class="preview-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
          <div class="div-plan">
            <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
            <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
          </div>
        </Alert>
      </div>
    </div>
  </Modal>
</Card>
</template>

<script>
export default{
  name: 'component-card',
  props: [
    'cardData'
  ],
  data () {
    return {
      cardSrc: this.cardData,
      subfield: false,
      defaultOpen: 'preview',
      toolbarsFlag: false,
      modalPreview: false,
      okText: 'Ok',
      cancelText: 'Close'
    }
  },
  computed: {
    cardPercent: function () {
      let _percent = 0
      for (var i = 0; i < this.cardSrc.plans.length; i++) {
        _percent += this.cardSrc.plans[i].percent
      }
      if (this.cardSrc.plans.length === 0) {
        return 0
      } else {
        return Math.round(_percent / this.cardSrc.plans.length)
      }
    }
  },
  methods: {
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

.preview-modal {
  z-index: 7;
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
  z-index   : 7;
}

.div-plans {
  margin-top: 20px;
}

.alert-plans {
  padding-right: 5px;
}

.div-plan {
  display: flex;
}

.preview-progress {
  font-size    : 16px;
  color        : #1788e8;
  margin-bottom: 10px;
  margin-right : -40px;
  display: block;
}

.tag-tag {
  width  : 100px;
  display: inline-block;
}

.input-goal {
  width  : 100%;
  flex   : 1;
  margin : auto 10px auto 5px;
  display: inline-block;
}

.vertical-center-modal {
  display        : flex;
  align-items    : center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
