<template>
<div id="plan-write">
  <form>
    <input class="input-type" type="radio" name="types" id="0" />
    <span class="span-type">Yearly</span>
    <input class="input-type" type="radio" name="types" id="1" />
    <span class="span-type">Monthly</span>
    <input class="input-type" type="radio" name="types" id="2" />
    <span class="span-type">Weekly</span>
    <input class="input-type" type="radio" name="types" id="3" />
    <span class="span-type">Daily</span>
    <input class="input-date" type="date" v-model="date" />
    <input class="input-articlename" type="text" v-model="articlename" placeHolder="Article name" />
    <mavon-editor id="me"></mavon-editor>
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
      articlename: ''
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
  margin-right: 5px;
  font-size  : 22px;
}

.span-type {
  align-items: center;
  height     : auto;
  font-size  : 20px;
  margin-right: 20px;
}

.input-date {
  margin-top: 20px;
  width      : 160px;
  font-size  : 18px;
  display    : block;
}

.input-articlename {
  width    : auto;
  margin   : 20px 0;
  height   : auto;
  word-wrap: break-word;
  font-size: 25px;
  display  : block;
  color    : #1788e8;
}

#me {
  height : 600px;
  width  : 100%;
  margin : 20px 0;
}

.btn-submit {
  width    : auto;
  padding  : 5px 15px;
  margin   : 30px 0;
  display  : block;
  font-size: 20px;
}
</style>
