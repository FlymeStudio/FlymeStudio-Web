<template>
<div>
  <ul class="div-top">
    <li><img src="https://cloud-res.mzres.com/resources/sync/images/flymelogo144.png" @click="flyme"></li>
    <li style="margin-left:20px;"><span style="font-size:25px;">{{ name }}</span></li>
    <li><span></span></li>
    <li class="li-right"><span @click="quit">Sign Out</span></li>
    <li class="li-right"><span @click="help">Help</span></li>
  </ul>
  <div class="div-content">
    <ul class="content-tag">
      <li @click="information">Information</li>
      <li @click="objective">Objective</li>
      <li @click="summary">Summary</li>
    </ul>
    <div class="content-data">

    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      name: 'user'
    }
  },
  methods: {
    flyme: function () {
      window.open('https://www.flyme.cn/')
    },
    help: function () {
      window.open('https://www.baidu.com/')
    },
    quit: function () {
    },
    information: function () {
    },
    objective: function () {
    },
    summary: function () {
    }
  }
}
</script>

<style scoped >
.div-top {
  border-bottom: 1px solid #bbb;
}

.div-content {
  width     : auto;
  margin    : 30px 10%;
  height    : auto;
  display   : flex;
  background: yellow;
}

.content-tag {
  width           : 120px;
  background-color: grey;
  list-style-type : none;
  margin          : 0;
  padding         : 0;
  position        : absolute;
}

.content-tag li {
  width        : 100%;
  height       : 50px;
  display      : flex;
  border-bottom: 1px solid black;
  display      : -webkit-flex;
  align-items  : center;
  overflow     : hidden;
  cursor       : pointer;
}

.content-tag li:hover {
  background-color: white;
}

.content-data {
  height          : auto;
  min-height      : 150px;
  margin-left     : 120px;
  background-color: green;
  width           : 100%;
  padding         : 20px;
}
</style>
