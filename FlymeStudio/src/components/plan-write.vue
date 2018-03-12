<template>
<div id="plan-write">
  <form>
    <select class="select-type" v-model="type">
      <option disabled value="">Type</option>
      <option value="0">Yearly</option>
      <option value="1">Monthly</option>
      <option value="2">Weekly</option>
      <option value="3">Daily</option>
    </select>
    <input class="input-date" type="date" v-model="date" />
    <input class="input-title" type="text" v-model="title" placeHolder="Title" />
    <mavon-editor class="me" v-model="markdownValue" :toolbarsFlag="toolbarsFlag" :subfield="subfield" :defaultOpen="defaultOpen" :toolbars="toolbars"></mavon-editor>
    <input class="input-chooser" type="file" accept=".md" id="chooser">
    <button class="btn-upload" @click="modalConfirm = true">Upload</button>
    <button class="btn-save" @click="save">Save</button>
    <Modal class="modal-confirm" v-model="modalConfirm" title="Warning" @on-ok="upload" @on-cancel="uploadCancel">
      <p>The content you upload will cover the origin content.</p>
      <p>Are you sure to upload?</p>
    </Modal>
  </form>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'plan-write',
  data () {
    return {
      type: '',
      date: '',
      title: '',
      markdownValue: '',
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
      },
      modalConfirm: false
    }
  },
  methods: {
    upload: function () {
      var file = document.getElementById('chooser').files[0]
      var reader = new FileReader()
      let _this = this
      reader.onload = function (event) {
        _this.markdownValue = event.target.result
        _this.uploadSuccess(true)
      }
      reader.onerror = function (event) {
        _this.uploadError(true)
      }
      reader.onloadend = function (event) {
        _this.modal1 = false
      }
      reader.readAsText(file, 'utf-8')
    },
    uploadSuccess (nodesc) {
      this.$Notice.success({
        title: 'Upload successful',
        desc: nodesc ? '' : 'Upload successful. '
      })
    },
    uploadError (nodesc) {
      this.$Notice.error({
        title: 'Upload failed',
        desc: nodesc ? '' : 'Upload failed. '
      })
    },
    uploadCancel () {
      this.modal1 = false
    },
    save: function () {}
  }
}
</script>

<style scoped>
.select-type {
  margin-right: 20px;
  font-size   : 18px;
}

.input-date {
  width    : 160px;
  font-size: 18px;
}

.input-title {
  width    : auto;
  margin   : 20px 0;
  height   : auto;
  word-wrap: break-word;
  font-size: 20px;
  display  : block;
  color    : #1788e8;
}

.me {
  height: 600px;
  width : 100%;
  margin: 20px 0;
}

.input-chooser {
  margin      : 20px 0;
  font-size   : 18px;
  margin-right: 5px;
}

.btn-upload {
  width    : auto;
  padding  : 0 10px;
  margin   : 10px 0;
  font-size: 18px;
}

.btn-save {
  width    : auto;
  padding  : 0 10px;
  margin   : 10px 0;
  font-size: 18px;
  display  : block;
}

.modal-confirm {
  position: absolute;
  z-index : 1501;
  color   : red;
}

.modal-confirm p {
  font-size: 18px;
}
</style>
