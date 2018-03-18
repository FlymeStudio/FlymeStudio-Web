<template>
<div id="project-modify">
  <Row>
    <Col span="1">
      <div class="div-col">
        left
      </div>
    </Col>
    <Col span="1">
      <div class="div-col">
        right
      </div>
    </Col>
  </Row>
</div>
</template>

<script type="text/javascript">
export default{
  name: 'project-modify',
  props: [
    'dataRes'
  ],
  data () {
    return {
      dataSrc: this.dataRes
    }
  }
}
</script>

<style scoped>
.div-col{
  width: 200px;
  display: block;
}
</style>
