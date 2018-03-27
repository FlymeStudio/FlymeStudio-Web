<template>
<div>
  <Button v-if="teamType == 1" class="btn-team" type="primary" shape="circle" icon="archive" @click="exportProjects()"></Button>
  <Button v-else class="btn-team" type="primary" shape="circle" icon="archive" disabled></Button>

  <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalExport" ok-text="Ok" cancel-text="Cancel" @on-ok="clear()" @on-cancel="clear()">
    <p slot="header" class="p-title">
      <span>{{ teamData.name }}</span>
    </p>

    <Layout>

      <Spin class="spin" fix v-if="spinExport">
        <Icon class="icon-spin" type="load-c" size=50></Icon>
      </Spin>

      <div>
        <span class="span-title">Resource</span>
        <div class="div-resource">
          <Select v-model="selectMemberTel" style="width:200px" placeholder="Select member">
            <Option v-for="member in teamData.members" :value="member.tel" :key="member.tel">{{ member.name }}({{ member.tel }})</Option>
          </Select>
          <Button class="btn" type="primary" shape="circle" icon="ios-search" @click="search()">Search</Button>
          <Button class="btn" type="info" shape="circle" icon="android-close" @click="clear()">Clear</Button>
        </div>
        <Table class="table-resource" height="300" highlight-row border :columns="columnsResource" :data="dataResource" size="small" no-data-text="No data" no-filtered-data-text="No filtered data"></Table>
      </div>

      <div class="div-export">
        <span class="span-title">Export</span>
        <Table class="table-export" height="300" highlight-row border :columns="columnsChoose" :data="dataChoose" size="small" ref="table" no-data-text="No data"></Table>
        <Button type="primary" icon="archive" @click="exportCsv()">Export</Button>
      </div>

    </Layout>
  </Modal>
</div>
</template>

<script>
import teamworkApi from '../api/teamworkApi'
import expandRow from './component-table-expand.vue'

export default {
  name: 'export-projects',
  created () {
    this.getInfo()
  },
  props: [
    'type',
    'teamRes'
  ],
  data () {
    return {
      info: {
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      teamType: this.type,
      teamData: this.teamRes,
      modalExport: false,
      spinExport: false,
      selectMemberTel: '',
      columnsResource: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'Type',
          width: 100,
          align: 'center',
          key: 'type',
          render: (h, params) => {
            return h('div', this.formatType(params.row.type))
          },
          filters: [
            {
              label: '1. Yearly',
              value: '1'
            },
            {
              label: '2. Monthly',
              value: '2'
            },
            {
              label: '3. Weekly',
              value: '3'
            },
            {
              label: '4. Daily',
              value: '4'
            }
          ],
          filterMethod (value, row) {
            return row.type === value
          }
        },
        {
          title: 'Percent',
          width: 120,
          align: 'center',
          key: 'percent',
          render: (h, params) => {
            const row = params.row
            const color = row.percent === 100 ? 'green' : 'red'
            const text = row.percent
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              },
              style: {
                width: '70px'
              }
            }, text)
          },
          filters: [
            {
              label: 'Done',
              value: 1
            },
            {
              label: 'Doing',
              value: 0
            }
          ],
          filterMethod (value, row) {
            if (value === 1 && row.percent === 100) {
              return true
            } else if (value === 0 && row.percent !== 100) {
              return true
            } else {
              return false
            }
          }
        },
        {
          title: 'Date',
          width: 120,
          align: 'center',
          key: 'date'
        },
        {
          title: 'Title',
          align: 'center',
          key: 'title'
        },
        {
          title: 'Add',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.add(params.index)
                  }
                }
              }, 'Add')
            ])
          }
        }
      ],
      dataResource: [],
      columnsChoose: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'Type',
          width: 100,
          align: 'center',
          key: 'type',
          render: (h, params) => {
            return h('div', this.formatType(params.row.type))
          }
        },
        {
          title: 'Percent',
          width: 120,
          align: 'center',
          key: 'percent',
          render: (h, params) => {
            const row = params.row
            const color = row.percent === 100 ? 'green' : 'red'
            const text = row.percent
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              },
              style: {
                width: '70px'
              }
            }, text)
          }
        },
        {
          title: 'Date',
          width: 120,
          align: 'center',
          key: 'date'
        },
        {
          title: 'Title',
          align: 'center',
          key: 'title'
        },
        {
          title: 'Delete',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      dataChoose: [],
      columnsExport: [
        {
          title: 'Percent',
          key: 'percent'
        },
        {
          title: 'Date',
          key: 'date'
        },
        {
          title: 'Title',
          key: 'title'
        },
        {
          title: 'Content',
          key: 'content'
        },
        {
          title: 'Plans',
          key: 'plans'
        }
      ],
      dataExport: []
    }
  },
  methods: {
    getInfo () {
      let name = this.$store.state.user.userInfo.name
      if (name === null) {
        this.$router.push('/')
      } else {
        this.info = this.$store.state.user.userInfo
      }
    },
    exportProjects () {
      this.modalExport = true
    },
    search () {
      if (this.selectMemberTel === '') {
        this.$Notice.error({
          title: 'Please select a member.',
          desc: ''
        })
        return
      }
      this.spinExport = true
      let _this = this
      // TEST START
      if (this.selectMemberTel === '13608089849') {
        this.dataResource = [
          {
            timestamp: 1,
            show: true,
            type: '1',
            percent: 0,
            date: '2017-03-01',
            title: '2017年度计划',
            content: '内容。。。',
            plans: [
              {
                timestamp: 0,
                tag: 'project',
                goal: '健身',
                percent: 20
              },
              {
                timestamp: 1,
                tag: 'project',
                goal: '考驾照',
                percent: 100
              },
              {
                timestamp: 2,
                tag: 'project',
                goal: '秋招',
                percent: 100
              }
            ]
          },
          {
            timestamp: 2,
            show: true,
            type: '2',
            percent: 0,
            date: '2017-09-01',
            title: '2017年9月报告',
            content: '内容。。。\nddddddddddd\naaaaaaaaa',
            plans: [
              {
                timestamp: 3,
                tag: '秋招',
                goal: '复习',
                percent: 70
              },
              {
                timestamp: 4,
                tag: '开学',
                goal: '选班委',
                percent: 100
              }
            ]
          },
          {
            timestamp: 3,
            show: true,
            type: '3',
            percent: 0,
            date: '2018-02-12',
            title: '2018春节活动',
            content: '内容。。。',
            plans: [
              {
                timestamp: 5,
                tag: '旅游',
                goal: '深圳',
                percent: 100
              },
              {
                timestamp: 6,
                tag: '旅游',
                goal: '香港',
                percent: 100
              }
            ]
          },
          {
            timestamp: 4,
            show: true,
            type: '2',
            percent: 0,
            date: '2018-03-04',
            title: '2018开学准备',
            content: '内容',
            plans: [
              {
                timestamp: 7,
                tag: '实习',
                goal: '初期报告',
                percent: 0
              }
            ]
          },
          {
            timestamp: 5,
            show: true,
            type: '2',
            percent: 0,
            date: '2018-01-12',
            title: '放假安排',
            content: '## 1.\n- projects1\n- projects2\n- projects3\n- projects4\n---\n**paragraphy**\n---\n## 2.\nlong content: aaaaaaaaaaaaaa\n---\n > int a = 1\n\n### h3: title3\np4',
            plans: [
              {
                timestamp: 8,
                tag: '年前',
                goal: '在家休息',
                percent: 100
              },
              {
                timestamp: 9,
                tag: '年后',
                goal: '出行游玩',
                percent: 100
              }
            ]
          },
          {
            timestamp: 6,
            show: true,
            type: '2',
            percent: 0,
            date: '2018-03-15',
            title: '实习相关事项',
            content: '内容',
            plans: []
          },
          {
            timestamp: 7,
            show: true,
            type: '4',
            percent: 0,
            date: '2018-05-01',
            title: '毕设安排',
            content: '内容',
            plans: []
          }
        ]
      } else {
        this.dataResource = [
          {
            timestamp: 1001,
            show: true,
            type: '2',
            percent: 0,
            date: '2018-03-26',
            title: '测试标题',
            content: '测试内容。。。\nddddddddddd\naaaaaaaaa',
            plans: [
              {
                timestamp: 10001,
                tag: '测试tag1',
                goal: '测试goal1',
                percent: 70
              },
              {
                timestamp: 10002,
                tag: '测试tag2',
                goal: '测试goal2',
                percent: 100
              }
            ]
          },
          {
            timestamp: 1002,
            show: true,
            type: '4',
            percent: 0,
            date: '2018-03-27',
            title: '测试标题2',
            content: '测试内容2。。。\nddddddddddd\naaaaaaaaa',
            plans: [
              {
                timestamp: 10003,
                tag: '测试tag3',
                goal: '测试goal3',
                percent: 50
              },
              {
                timestamp: 10004,
                tag: '测试tag4',
                goal: '测试goal4',
                percent: 0
              }
            ]
          }
        ]
      }
      this.computePercent()
      setTimeout(() => {
        _this.spinExport = false
      }, 2000)
      // TEST END
      teamworkApi.viewMemberProjects(this.info.tel, this.selectMemberTel).then(function (response) {
        if (response.data.result === true) {
          _this.dataResource = response.data.projects
          _this.computePercent()
        } else {
          _this.$Notice.error({
            title: 'Failed to get data.',
            desc: ''
          })
        }
        _this.spinShow = false
      })
    },
    computePercent () {
      if (this.dataResource === null) {
        return
      }
      for (var i = 0; i < this.dataResource.length; i++) {
        if (this.dataResource[i].plans.length === 0) {
          this.dataResource[i].percent = 0
        } else {
          var percent = 0
          for (var j = 0; j < this.dataResource[i].plans.length; j++) {
            percent += this.dataResource[i].plans[j].percent
          }
          this.dataResource[i].percent = Math.round(percent / this.dataResource[i].plans.length)
        }
      }
    },
    clear () {
      this.selectMemberTel = ''
      this.dataResource = []
    },
    formatType (type) {
      switch (type) {
        case '1':
          return 'Yearly'
        case '2':
          return 'Monthly'
        case '3':
          return 'Weekly'
        case '4':
          return 'Daily'
        default:
          return 'Unknow'
      }
    },
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    add (index) {
      let timestamp = this.dataResource[index].timestamp
      for (var i = 0; i < this.dataChoose.length; i++) {
        if (this.dataChoose[i].timestamp === timestamp) {
          return
        }
      }
      this.dataChoose.push(this.dataResource[index])
    },
    remove (index) {
      this.dataChoose.splice(index, 1)
    },
    exportCsv () {
      if (this.dataChoose.length === 0) {
        this.$Notice.error({
          title: 'No data to export.',
          desc: ''
        })
      } else {
        this.spinExport = true
        this.dataExport = []
        for (var i = 0; i < this.dataChoose.length; i++) {
          let plans = ''
          for (var j = 0; j < this.dataChoose[i].plans.length; j++) {
            plans = plans + this.dataChoose[i].plans[j].percent + ' [' + this.dataChoose[i].plans[j].tag + '] ' + this.dataChoose[i].plans[j].goal + '\n'
          }
          let project = {
            date: this.dataChoose[i].date,
            percent: this.dataChoose[i].percent,
            content: this.dataChoose[i].content,
            plans: plans
          }
          this.dataExport.push(project)
        }
        let _this = this
        setTimeout(() => {
          _this.spinExport = false
          _this.$refs.table.exportCsv({
            filename: _this.teamData.name + '(' + this.formatDate(new Date()) + ')',
            columns: _this.columnsExport,
            data: _this.dataExport
          })
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.btn-team {
  margin   : auto 5px;
  font-size: 20px;
}

.vertical-center-modal {
  display        : flex;
  align-items    : center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.p-title {
  font-size : 16px;
  color     : #f60;
  text-align: center;
}

.span-title {
  width      : 100%;
  font-size  : 18px;
  font-weight: bold;
  text-align : center;
  margin     : 10px auto;
  display    : block;
}

.div-resource {
  width     : 100%;
  margin-top: 10px;
}

.btn {
  width      : 90px;
  font-weight: bold;
  margin-left: 15px;
  text-align : center;
}

.menu {
  z-index: 5;
}

.span-item {
  align-items: center;
  font-size  : 16px;
}

.table-resource {
  width     : 100%;
  margin    : 10px auto;
  text-align: center;
}

.div-export {
  width     : 100%;
  margin-top: 20px;
  border-top: 1px solid #000;
}

.table-export {
  width     : 100%;
  margin    : 10px auto;
  text-align: center;
}
</style>
