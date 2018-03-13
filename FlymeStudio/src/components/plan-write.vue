<template>
<div id="plan-write">
  <Form ref="formItem" :model="formItem">
    <FormItem prop="type">
      <Select class="select-type" v-model="formItem.type" size="large" placeholder="Type">
      <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </select>
    </FormItem>
    <FormItem prop="date">
      <DatePicker class="datePicker" type="date" size="large" v-model="formItem.date" placeholder="Date" confirm/>
    </FormItem>
    <FormItem prop="title">
      <Input class="input-title" type="text" v-model="formItem.title" placeholder="Title" clearable size="large" />
    </FormItem>
    <FormItem prop="markdownValue">
      <mavon-editor class="mavonEditor" :value="formItem.markdownValue" :subfield="subfield" :defaultOpen="defaultOpen" :placeholder="placeholder" :toolbarsFlag="toolbarsFlag" :toolbars="toolbars"></mavon-editor>
    </FormItem>
    <FormItem>
        <input class="input-chooser" type="file" accept=".md" id="chooser">
        <Button class="btn-upload" @click="upload" size="large">Upload</Button>
    </FormItem>
    <FormItem>
      <Button type="success" class="btn-item" @click="save" size="large">Save</Button>
      <Button class="btn-item" @click="handleReset('formItem')" size="large">Reset</Button>
    </FormItem>
    <Modal class="modal-confirm" v-model="modalConfirm" title="Warning" @on-ok="uploadOk" @on-cancel="uploadCancel">
      <p>The content you upload will cover the origin content.</p>
      <p>Are you sure to upload?</p>
    </Modal>
  </Form>
</div>
</template>

<script type="text/javascript">
export default {
  name: 'plan-write',
  data () {
    return {
      types: [
        {
          value: '0',
          label: 'Yearly'
        },
        {
          value: '1',
          label: 'Monthly'
        },
        {
          value: '2',
          label: 'Weekly'
        },
        {
          value: '3',
          label: 'Daily'
        }
      ],
      formItem: {
        type: '',
        date: '',
        title: '',
        markdownValue: ''
      },
      subfield: true,
      defaultOpen: '',
      placeholder: 'Content',
      toolbarsFlag: true,
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
      if (document.getElementById('chooser').files[0] != null) {
        this.modalConfirm = true
      }
    },
    uploadOk: function () {
      var file = document.getElementById('chooser').files[0]
      var reader = new FileReader()
      let _this = this
      reader.onload = function (event) {
        _this.formItem.markdownValue = event.target.result
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
    uploadCancel () {
      this.modal1 = false
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
    handleReset (name) {
      this.$refs[name].resetFields()
      var chooser = document.getElementById('chooser')
      chooser.outerHTML = chooser.outerHTML
    },
    save: function () {}
  }
}
</script>

<style scoped>
.select-type {
  width       : 160px;
  margin-right: 20px;
  z-index     : 7;
  display: block;
}

.datePicker {
  width   : 160px;
  z-index : 7;
  display: block;
}

.input-title {
  width  : 240px;
  display: block;
}

.mavonEditor {
  height : 600px;
  width  : 100%;
  z-index: 5;
}

.input-chooser {
  font-size   : 18px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.btn-upload {
  width : auto;
  margin-bottom: 10px;
}

.btn-item {
  width  : 100px;
  margin-right: 20px;
  margin-bottom: 10px;
}

.modal-confirm {
  position: absolute;
  z-index : 10;
  color   : red;
}

.modal-confirm p {
  font-size: 18px;
}
</style>
