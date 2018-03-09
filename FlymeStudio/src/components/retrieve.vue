<template>
<div class="div-msg">{{ message }}</div>
</template>

<script type="text/javascript">
export default {
  name: 'retrieve',
  data () {
    return {
      message: 'Please contact with Administrator.'
    }
  }
}
</script>

<style scoped>
.div-msg {
  width           : auto;
  margin          : auto 0;
  display         : flex;
  text-align      : center;
  align-items     : center;
  justify-content : center;
  height          : 100px;
  background-color: red;
  font-size       : 25px;
  color           : white;
}
</style>
