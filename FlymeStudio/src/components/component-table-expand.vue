<template>
<div>
  <Row class="expand-row">
    <div class="expand-key">Content</div>
    <mavon-editor class="detail-content" v-model="row.content" :subfield="subfieldDetail" :defaultOpen="defaultOpenDetail" :toolbarsFlag="toolbarsFlagDetail"></mavon-editor>
  </Row>
  <Row>
    <div class="expand-key">Plans</div>
    <div class="div-plans">
      <Alert class="alert-plans" v-for="item in row.plans" :key="item.timestamp">
        <Progress class="detail-progress" v-if="item.percent == 100" :percent="100" :stroke-width="18"></Progress>
        <Progress class="detail-progress" v-else :percent="item.percent" :stroke-width="18" status="active"></Progress>
        <div class="div-plan">
          <Tag class="tag-tag" type="dot" color="blue">{{ item.tag }}</Tag>
          <Input class="input-goal" type="text" :readonly="true" v-model="item.goal"></Input>
        </div>
      </Alert>
    </div>
  </Row>
</div>
</template>

<script>
export default {
  props: {
    row: Object
  },
  data () {
    return {
      subfieldDetail: false,
      defaultOpenDetail: 'preview',
      toolbarsFlagDetail: false
    }
  }
}
</script>

<style scoped>
.expand-row {
  margin-bottom: 16px;
}

.expand-key {
  font-size  : 16px;
  font-weight: bold;
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
</style>
