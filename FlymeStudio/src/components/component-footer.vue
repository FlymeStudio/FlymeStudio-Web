<template>
<Footer class="layout-footer-center">
  <Form width="auto" inline>

    <!-- author -->
    <FormItem>
      <span style="color:black;">Powered by <a href="https://github.com/frogfans" target="_blank" style="color:black;">ZengYu</a> - Copyright ©2018 All Rights Reserved</span>
    </FormItem>

    <!-- project -->
    <FormItem>
      <a href="https://github.com/flymestudio" target="_blank" style="color:black;">
        <Icon type="social-github" size=16></Icon>
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
</style>
