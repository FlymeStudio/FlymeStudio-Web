<template>
<div>
  <Button v-if="teamType == 1" class="btn-team" type="primary" shape="circle" icon="archive" @click="exportProjects()"></Button>
  <Button v-else class="btn-team" type="primary" shape="circle" icon="archive" disabled></Button>

  <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalExport" ok-text="Ok" cancel-text="Cancel" @on-ok="clearAll()" @on-cancel="clearAll()">
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
          <Select v-model="selectMemberId" style="width:200px" placeholder="Select member">
            <Option v-for="member in teamData.members" :value="member.id" :key="member.id">{{ member.name }}({{ member.num }})</Option>
          </Select>
          <Button class="btn" type="primary" shape="circle" icon="ios-search" @click="search()">Search</Button>
          <Button class="btn" type="info" shape="circle" icon="android-close" @click="clearResource()">Clear</Button>
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
        id: 0,
        num: '',
        tel: '',
        name: '',
        email: '',
        messages: []
      },
      teamType: this.type,
      teamData: this.teamRes,
      modalExport: false,
      spinExport: false,
      selectMemberId: '',
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
          title: 'Name',
          width: 80,
          align: 'center',
          key: 'name'
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
          title: 'Name',
          width: 80,
          align: 'center',
          key: 'name'
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
          title: 'Name',
          key: 'name'
        },
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
        // {
        //   title: 'Content',
        //   key: 'content'
        // },
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
      this.info = this.$store.state.user.userInfo
    },
    exportProjects () {
      this.modalExport = true
    },
    search () {
      if (this.selectMemberId === '') {
        this.$Notice.error({
          title: 'Please select a member.',
          desc: ''
        })
        return
      }
      this.spinExport = true
      let _this = this
      teamworkApi.viewMemberProjects(this.selectMemberId).then(function (response) {
        console.log('response=' + response)
        if (response.status === 200) {
          if (response.data.result === true) {
            _this.dataResource = response.data.data
            _this.computePercent(_this.selectMemberId)
          } else {
            _this.$Notice.error({
              title: 'Failed to get data.',
              desc: ''
            })
          }
        } else {
          _this.$Notice.error({
            title: 'HTTP request error.',
            desc: ''
          })
          console.log('status=' + response.status)
        }
        _this.spinShow = false
      }).catch(function (error) {
        _this.$Notice.error({
          title: 'HTTP request error.',
          desc: ''
        })
        _this.spinShow = false
        console.log(error)
      })
    },
    computePercent (id) {
      if (this.dataResource === null) {
        return
      }
      var name = ''
      for (var i = 0; i < this.teamData.members.length; i++) {
        if (this.teamData.members[i].id === id) {
          name = this.teamData.members[i].name
          break
        }
      }
      for (var j = 0; j < this.dataResource.length; j++) {
        this.dataResource[j].name = name
        if (this.dataResource[j].plans.length === 0) {
          this.dataResource[j].percent = 0
        } else {
          var percent = 0
          for (var k = 0; k < this.dataResource[j].plans.length; k++) {
            percent += this.dataResource[j].plans[k].percent
          }
          this.dataResource[j].percent = Math.round(percent / this.dataResource[j].plans.length)
        }
      }
    },
    clearResource () {
      this.selectMemberId = ''
      this.dataResource = []
    },
    clearAll () {
      this.selectMemberId = ''
      this.dataResource = []
      this.dataChoose = []
      this.dataExport = []
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
      let id = this.dataResource[index].id
      for (var i = 0; i < this.dataChoose.length; i++) {
        if (this.dataChoose[i].id === id) {
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
            plans = plans + '(' + this.dataChoose[i].plans[j].percent + ') [' + this.dataChoose[i].plans[j].tag + '] ' + this.dataChoose[i].plans[j].goal + '; \n\t\t\t\t'
          }
          let project = {
            name: this.dataChoose[i].name,
            date: this.dataChoose[i].date,
            percent: this.dataChoose[i].percent,
            title: this.dataChoose[i].title,
            // content: this.dataChoose[i].content,
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
