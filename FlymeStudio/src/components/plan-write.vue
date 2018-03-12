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
    <mavon-editor class="me" v-model="markdownvalue" :toolbarsFlag="toolbarsFlag" :subfield="subfield" :defaultOpen="defaultOpen" :toolbars="toolbars"></mavon-editor>
    <input class="input-chooser" type="file" accept=".md" id="chooser">
    <button class="btn-upload" @click="upload">Upload</button>
    <button class="btn-save" @click="save">Save</button>
  </form>
</div>
</template>

<script type="text/javascript">

export default {
  name: 'plan-write',
  data () {
    return {
      date: '',
      articlename: '',
      markdownvalue: '',
      toolbarsFlag: true,
      subfield: false,
      defaultOpen: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    upload: function () {
      var file = document.getElementById('chooser').files[0]
      var reader = new FileReader()
      reader.readAsText(file, 'utf-8')
      reader.onload = function (f) {
        console.log('result:\n' + this.result)
        this.markdownvalue = '' + this.result
      }
    },
    confirm: function () {

    },
    save: function () {
      console.log('content:\n' + this.markdownvalue)
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

.me {
  height : 600px;
  width  : 100%;
  margin : 20px 0;
}

.input-chooser{
  margin    : 20px 0;
  font-size  : 18px;
  margin-right: 5px;
}

.btn-upload {
  width    : auto;
  padding  : 5px 15px;
  margin   : 10px 0;
  font-size: 20px;
}

.btn-save {
  width    : auto;
  padding  : 5px 15px;
  margin   : 10px 0;
  font-size: 20px;
  display: block;
}

</style>
