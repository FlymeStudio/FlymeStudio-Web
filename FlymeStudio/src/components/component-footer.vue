<template>
<Footer class="layout-footer-center">
  <Form class="form" width="auto">
    <FormItem class="form-item">
      <span style="color:black;">Power by ZengYu - Copyright ©2018 All Rights Reserved</span>
    </FormItem>
    <FormItem>
      <a href="https://github.com/frogfans" target="_blank" style="color:black;margin-right:20px;">
        <Icon type="social-github" size="16"></Icon>
        frogfans
      </a>
      <a href="https://github.com/flymestudio" target="_blank" style="color:black;margin-left:20px;">
        <Icon type="social-github" size="16"></Icon>
        FlymeStudio
      </a>
    </FormItem>
  </Form>
</Footer>
</template>

<script>
export default {
  name: 'component-footer'
}
</script>

<style scoped>
.layout-footer-center {
  text-align : center;
  font-weight: bold;
}

.form {
  height       : 40px;
  margin-bottom: 10px;
}

.form-item {
  height: 15px;
}
</style>
