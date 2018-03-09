<template>
<div id="plan-write">
  <form>
    <input class="input-type" type="radio" name="types" id="0"/>
    <span class="span-type">Year</span>
    <input class="input-type" type="radio" name="types" id="1"/>
    <span class="span-type">Month</span>
    <input class="input-type" type="radio" name="types" id="2"/>
    <span class="span-type">Day</span>
    <input class="input-date" type="date" v-model="date"/>
    <input class="input-filename" type="text" v-model="filename" placeHolder="filename"/>
    <textarea class="textarea-content" type="text" v-model="content" placeHolder="Content"/>
    <button class="btn-submit" @click="submit">Submit</button>
  </form>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'plan-write',
  data () {
    return {
      date: '',
      filename: '',
      content: ''
    }
  },
  methods: {
    submit: function () {

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
  width      : 90%;
  overflow   : auto;
  word-wrap  : break-word;
  margin     : 20px 0;
  display    : block;
  color      : #1788e8;
  font-size  : 20px;
  resize     : none;
  line-height: 30px;
  padding    : 5px;
}

.btn-submit {
  width    : auto;
  padding  : 5px 15px;
  margin   : 30px 0;
  display  : block;
  font-size: 20px;
}
</style>
