<template>
<div id="plan-upload">
  <form>
    <input class="input-type" type="radio" name="types" id="0"/>
    <span class="span-type">Year</span>
    <input class="input-type" type="radio" name="types" id="1"/>
    <span class="span-type">Month</span>
    <input class="input-type" type="radio" name="types" id="2"/>
    <span class="span-type">Day</span>
    <input class="input-date" type="date" v-model="date"/>
    <input class="input-chooser" type="file" id="chooser">
    <input class="input-filename" type="text" v-model="filename" placeHolder="filename"/>
    <button class="btn-upload" @click="upload">Upload</button>
  </form>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'plan-upload',
  data () {
    return {
      date: '',
      filename: '',
      content: ''
    }
  },
  methods: {
    upload: function () {
      var chooser = document.getElementById('chooser')
      console.log('chooser:' + chooser.value)
    }
  }
}
</script>

<style scoped>
.input-type {
  margin-left: 20px;
  font-size  : 22px;
}

.span-type {
  align-items: center;
  height     : auto;
  font-size  : 20px;
}

.input-date {
  margin-left: 30px;
  width      : 160px;
  font-size  : 18px;
}

.input-chooser{
  display: block;
  margin    : 20px 0;
  font-size  : 18px;
}

.input-filename {
  width     : auto;
  margin    : 20px 0;
  height    : auto;
  word-wrap : break-word;
  font-size : 25px;
  display   : block;
  color     : #1788e8;
}

.textarea-content {
  height     : 600px;
  width      : 80%;
  overflow   : auto;
  word-wrap  : break-word;
  margin     : 20px auto;
  display    : block;
  color      : #1788e8;
  font-size  : 20px;
  resize     : none;
  line-height: 30px;
  padding    : 5px;
}

.btn-upload {
  width    : auto;
  padding  : 5px 15px;
  margin   : 30px 0;
  display  : block;
  font-size: 20px;
}
</style>
