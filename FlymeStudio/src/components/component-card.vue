<template>
<Card>
  <div>
    <div class="card-top">
      <i-circle v-if="dataPercent == 100" class="card-circle" :size=40 :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
        <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
      </i-circle>
      <i-circle v-else class="card-circle" :size=40 :percent="dataPercent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
        <span class="demo-Circle-inner">{{ dataPercent }}%</span>
      </i-circle>
      <span class="card-date">{{ dataSrc.date }}</span>
      <span class="card-detail" @click="modalModify = true"><Icon type="compose" size="24"></Icon></span>
      <span class="card-detail" @click="modalDetail = true"><Icon type="android-open" size="24"></Icon></span>
    </div>
    <p class="card-title" slot="title">{{ dataSrc.title }}</p>
    <!-- <mavon-editor class="card-content" v-model="dataSrc.content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ dataSrc.content }}</mavon-editor> -->
  </div>
  <Modal class-name="vertical-center-modal" class="modal-detail" width="90%" :mask-closable="false" v-model="modalDetail" :ok-text="okDetail" :cancel-text="cancelDetail">
    <div>
      <div class="card-top">
        <i-circle class="card-circle" :size=40 v-if="dataPercent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="9" :trail-width="9">
          <Icon type="ios-checkmark-empty" size=50 color="#5cb85c"></Icon>
        </i-circle>
        <i-circle class="card-circle" :size=40 v-else :percent="dataPercent" stroke-color="#2d8cf0" :stroke-width="9" :trail-width="9" style="color:#ed3f14;">
          <span class="demo-Circle-inner">{{ dataPercent }}%</span>
        </i-circle>
        <span class="card-date">{{ dataSrc.date }}</span>
      </div>
      <p class="detail-title" slot="title">{{ dataSrc.title }}</p>
      <mavon-editor class="detail-content" v-model="dataSrc.content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ dataSrc.content }}</mavon-editor>
      <div class="div-plans">
        <Alert class="alert-plans" v-for="item in dataSrc.plans" :key="item.timestamp">
          <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
          <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
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
    'dataRes',
    'modalDetail',
    'modalModify'
  ],
  data () {
    return {
      dataSrc: this.dataRes,
      subfield: false,
      defaultOpen: 'preview',
      toolbarsFlag: false,
      modalDetailShow: this.modalDetail,
      modalModifyShow: this.modalModify,
      okDetail: 'Ok',
      cancelDetail: 'Close'
    }
  },
  computed: {
    dataPercent: function () {
      let _percent = 0
      for (var i = 0; i < this.dataSrc.plans.length; i++) {
        _percent += this.dataSrc.plans[i].percent
      }
      if (this.dataSrc.plans.length === 0) {
        return 0
      } else {
        return Math.round(_percent / this.dataSrc.plans.length)
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
  margin-bottom     : 10px;
  padding-bottom: 10px;
  display    : flex;
  display    : -webkit-flex;
  border-bottom : 1px solid #ccc;
}

.card-circle {
  font-size  : 15px;
  font-weight: bold;
  display    : inline-block;
}

.card-date {
  width      : auto;
  margin-left: 20px;
  font-size  : 16px;
}

.card-detail {
  width: auto;
  float   : right;
  position: relative;
  margin  : auto 0 auto auto;
  cursor  : pointer;
}

.card-title {
  width      : 100%;
  text-align : center;
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

.modal-detail {
  z-index: 7;
}

.detail-title {
  width      : 100%;
  text-align : center;
  font-weight: bold;
  font-size  : 22px;
}

.detail-content {
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

.detail-progress {
  font-size    : 16px;
  color        : #1788e8;
  margin-bottom: 10px;
  margin-right : -40px;
  display      : block;
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
