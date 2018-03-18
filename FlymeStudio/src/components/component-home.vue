<template>
<div id="component-home">
  <Alert show-icon>
    <Icon type="plane" slot="icon"></Icon>
    <template slot="desc">
      <div class="div-content">
        Make work more efficient
      </div>
    </template>
  </Alert>
</div>
</template>

<script>
export default {
  name: 'component-home'
}
</script>

<style scoped>
.div-content {
  width      : auto;
  height     : auto;
  display    : block;
  position   : relative;
  margin     : auto;
  /* text-align : center; */
  align-items: center;
  font-weight: bold;
  font-size  : 18px;
}
</style>
