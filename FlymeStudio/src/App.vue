<template>
<div id="app">
  <div>
    <router-view/>
  </div>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style >
body,
html {
  padding : 0;
  margin  : 0;
  overflow: visible;
}

#app {
  font-family            : 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing: grayscale;
  color                  : #2c3e50;
  width                  : auto;
  height                 : auto;
}
</style>
