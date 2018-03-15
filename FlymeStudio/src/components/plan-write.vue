<template>
<div id="plan-write">
  <Form ref="formItem" :model="formItem" :rules="ruleItem">
    <FormItem>
      <Icon style="width:18px;" type="bookmark" size=18></Icon>
      <span class="span-item">Set type</span>
    </FormItem>
    <FormItem prop="type">
      <Select class="select-type" v-model="formItem.type" size="large" placeholder="Type">
        <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </select>
    </FormItem>
    <FormItem>
      <Icon style="width:18px;" type="calendar" size=18></Icon>
      <span class="span-item">Set date</span>
    </FormItem>
    <FormItem prop="date">
      <DatePicker class="datePicker" type="date" size="large" v-model="formItem.date" placeholder="Date" confirm/>
    </FormItem>
    <FormItem>
      <Icon style="width:18px;" type="pin" size=18></Icon>
      <span class="span-item">Set title</span>
    </FormItem>
    <FormItem prop="title">
      <Input class="input-title" type="text" v-model="formItem.title" placeholder="Title" clearable size="large" />
    </FormItem>
    <FormItem>
      <Icon style="width:18px;" type="social-markdown" size=18></Icon>
      <span class="span-item">Set content</span>
      <Button class="btn-edit" style="margin-left:40px;" @click="modalConfirm = true"><Icon type="upload" size=18></Icon><span class="span-btn">Upload</span></Button>
    </FormItem>
    <FormItem prop="content">
      <mavon-editor class="mavonEditor" v-model="formItem.content" :subfield="subfield" :defaultOpen="defaultOpen" :placeholder="placeholder" :toolbarsFlag="toolbarsFlag" :toolbars="toolbars"></mavon-editor>
    </FormItem>
    <FormItem>
      <Icon style="width:18px;" type="flag" size=18></Icon>
      <span class="span-item">Set goals</span>
    </FormItem>
    <FormItem>
      <Alert v-for="item in formItem.plans" :key="item.index">
        <Tag type="dot" color="blue" style="width:100px;text-align:center;">{{ item.tag }}</Tag>
        <Tag type="dot" color="yellow" style="width:300px;">{{ item.goal }}</Tag>
        <Button type="ghost" shape="circle" icon="minus" @click="deletePlan(item.index)"></Button>
      </Alert>
      <Alert>
        <Input type="text" clearable placeholder="Tag" style="width:100px;" v-model="editTag"></Input>
        <Input type="text" clearable placeholder="Goal" style="width:300px;margin:auto 4px;" v-model="editGoal"></Input>
        <Button type="ghost" shape="circle" icon="plus" @click="addPlan()"></Button>
      </Alert>
    </FormItem>
    <br>
    <br>
    <br>
    <FormItem>
      <Button type="primary" class="btn-item" @click="handleSubmit('formItem')" size="large" :loading="loadingSave">Save</Button>
      <Button class="btn-item" @click="handleReset('formItem')" size="large">Reset</Button>
    </FormItem>

    <Modal class="modal-confirm" v-model="modalConfirm" title="Warning" :ok-text="okText" :cancel-text="cancelText" :loading="loadingUpload" @on-ok="upload()">
      <input class="input-chooser" type="file" accept=".md" id="chooser">
      <p>The content you upload will cover the origin content.</p>
      <p>Are you sure to upload?</p>
    </Modal>
  </Form>
</div>
</template>

<script type="text/javascript">
import planApi from '../api/planApi'

export default {
  name: 'plan-write',
  created () {
    this.planIndex = this.formItem.plans.length
  },
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
        content: '',
        plans: []
      },
      ruleItem: {
        type: [
          {
            required: true,
            message: 'Please select the type.',
            trigger: 'blur'
          }
        ],
        date: [
          {
            required: true,
            type: 'date',
            message: 'Please select the date.',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: 'Please fill in the title.',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: 'Please fill in the content.',
            trigger: 'blur'
          }
        ]
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
      planIndex: '',
      editTag: '',
      editGoal: '',
      modalConfirm: false,
      loadingUpload: true,
      okText: 'Upload',
      cancelText: 'Cancel',
      loadingSave: false
    }
  },
  methods: {
    upload () {
      var chooser = document.getElementById('chooser').files
      if (chooser.length !== 0) {
        var file = chooser[0]
        var reader = new FileReader()
        let _this = this
        reader.onload = function (event) {
          _this.formItem.content = event.target.result
          _this.uploadSuccess(true)
        }
        reader.onerror = function (event) {
          _this.uploadError(true)
        }
        reader.onloadend = function (event) {
          setTimeout(() => {
            _this.modalConfirm = false
          }, 1000)
        }
        reader.readAsText(file, 'utf-8')
      } else {
        this.modalConfirm = false
      }
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
    deletePlan (index) {
      for (var i = 0; i < this.formItem.plans.length; i++) {
        if (this.formItem.plans[i].index === index) {
          this.formItem.plans.splice(i, 1)
          break
        }
      }
    },
    addPlan () {
      var plan = {
        index: this.planIndex,
        tag: this.editTag,
        goal: this.editGoal
      }
      this.formItem.plans.push(plan)
      this.editTag = ''
      this.editGoal = ''
      this.planIndex++
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      var chooser = document.getElementById('chooser')
      chooser.outerHTML = chooser.outerHTML
      this.formItem.plans = []
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          this.$Message.error('Information is incorrect!')
        }
      })
    },
    save () {
      this.loadingSave = true
      let _this = this
      setTimeout(() => {
        _this.$Message.success('Save successful!')
        _this.handleReset('formItem')
      }, 1000)
      planApi.submit(this.formItem.type, this.formItem.date, this.formItem.title, this.formItem.content).then(function (response) {
        if (response.data.result === true) {
          _this.$Message.success('Save successful!')
          _this.handleReset('formItem')
        } else {
          _this.$Message.error('Save failed!')
        }
      })
    }
  }
}
</script>

<style scoped>
.span-item{
  margin-left:10px;
  font-size:16px;
}

.select-type {
  width       : 160px;
  margin-right: 20px;
  z-index     : 7;
  display     : block;
}

.datePicker {
  width  : 160px;
  z-index: 7;
  display: block;
}

.input-title {
  width  : 240px;
  display: block;
}

.span-btn {
  margin-left:5px;
  font-size:16px;
}

.mavonEditor {
  height : 600px;
  width  : 100%;
  z-index: 5;
}

.btn-edit {
  height: auto;
  width: auto;
  padding: 3px 10px;

  align-items: center;
}

.input-chooser {
  font-size    : 18px;
  margin-right : 5px;
  margin-bottom: 10px;
}

.btn-goal{
  float : right;
}

.btn-item {
  width        : 100px;
  margin-right : 20px;
  margin-bottom: 10px;
}

.modal-confirm {
  position: absolute;
  z-index : 10;
}

.modal-confirm p {
  font-size: 18px;
  color    : red;
}
</style>
