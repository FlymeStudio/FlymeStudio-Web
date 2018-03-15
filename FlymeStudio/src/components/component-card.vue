<template>
<Card>
  <div>
    <div class="card-top">
      <i-circle class="card-circle" :size=40 v-if="percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
        <Icon type="ios-checkmark-empty" size=40 color="#5cb85c"></Icon>
      </i-circle>
      <i-circle class="card-circle" :size=40 v-else :percent="percent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
        <span class="demo-Circle-inner">{{ percent }}%</span>
      </i-circle>
      <span class="card-date">{{ date }}</span>
      <span class="card-detail" @click="modalPreview = true"><Icon type="more" size="24"></Icon></span>
    </div>
    <p class="card-title" slot="title">{{ title }}</p>
    <mavon-editor class="card-content" v-model="content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ content }}</mavon-editor>
  </div>
  <Modal class="modal-preview"
    width="90%" v-model="modalPreview" :mask-closable="false" :ok-text="okText" :cancel-text="cancelText" class-name="vertical-center-modal" @on-ok="modalConfirm = true">
      <div>
        <div class="card-top">
          <i-circle class="card-circle" :size=40 v-if="percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
            <Icon type="ios-checkmark-empty" size=40 color="#5cb85c"></Icon>
          </i-circle>
          <i-circle class="card-circle" :size=40 v-else :percent="percent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
            <span class="demo-Circle-inner">{{ percent }}%</span>
          </i-circle>
          <span class="card-date">{{ date }}</span>
        </div>
        <p class="preview-title" slot="title">{{ title }}</p>
        <mavon-editor class="preview-content" v-model="content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ content }}</mavon-editor>
      </div>
  </Modal>
  <Modal class="modal-confirm" v-model="modalConfirm" title="Warning" :ok-text="okText" :cancel-text="cancelText" :loading="loading" @on-cancel="cancel" @on-ok="save">
    <p>Are you sure to save the change?</p>
  </Modal>
</Card>
</template>

<script>
export default{
  name: 'component-card',
  props: [
    'cardKey',
    'cardType',
    'cardPercent',
    'cardDate',
    'cardTitle',
    'cardContent'
  ],
  data () {
    return {
      key: this.cardKey,
      percent: this.cardPercent,
      date: this.cardDate,
      title: this.cardTitle,
      content: this.cardContent,
      subfield: false,
      defaultOpen: 'preview',
      toolbarsFlag: false,
      modalPreview: false,
      modalConfirm: false,
      loading: true,
      okText: 'Save',
      cancelText: 'Cancel'
    }
  },
  methods: {
    cancel: function () {
      this.modalPreview = true
    },
    save: function () {
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

.preview-title {
  width      : 100%;
  text-align : center;
  border-top : 1px solid #ccc;
  margin-top : 10px;
  padding-top: 10px;
  font-weight: bold;
  font-size  : 22px;
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

.preview-content {
  min-width : 100px;
  min-height: 100px;
  width     : auto;
  height    : auto;
  margin-top: 10px;
  font-size : 16px;
  z-index   : 5;
}

.modal-preview{
  z-index: 10;
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
