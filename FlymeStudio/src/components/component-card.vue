<template>
<Card>
  <div>
    <div class="card-top">
      <i-circle class="card-circle" :size="40" v-if="percent == 100" :percent="100" stroke-color="#5cb85c" :stroke-width="8" :trail-width="8">
        <Icon type="ios-checkmark-empty" size="40" color="#5cb85c"></Icon>
      </i-circle>
      <i-circle class="card-circle" :size="40" v-else :percent="percent" stroke-color="#2d8cf0" :stroke-width="8" :trail-width="8" style="color:#ed3f14;">
        <span class="demo-Circle-inner">{{ percent }}%</span>
      </i-circle>
      <span class="card-date">{{ date }}</span>
      <span class="card-detail" @click="detail(key)"><Icon type="more" size="24"></Icon></span>
    </div>
    <p class="card-title" slot="title">{{ title }}</p>
    <mavon-editor class="card-content" v-model="content" :subfield="subfield" :defaultOpen="defaultOpen" :toolbarsFlag="toolbarsFlag">{{ content }}</mavon-editor>
  </div>
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
      toolbarsFlag: false
    }
  },
  methods: {
    detail: function (key) {
      console.log('key: ' + key)
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
  height    : 200px;
  margin    : 0 -10px;
  font-size : 12px;
  overflow  : hidden;
  z-index   : 5;
}
</style>
