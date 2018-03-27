<template>
<div>
  <Button v-if="teamType == 1" class="btn-team" type="primary" shape="circle" icon="archive" @click="exportProjects()"></Button>
  <Button v-else class="btn-team" type="primary" shape="circle" icon="archive" disabled></Button>

  <Spin class="spin" fix v-if="spinExport">
    <Icon class="icon-spin" type="load-c" size=50></Icon>
  </Spin>

  <Modal class-name="vertical-center-modal" class="modal" width="90%" :closable="true" :mask-closable="false" v-model="modalExport" ok-text="Ok" cancel-text="Cancel">
    <Layout>
      <span class="span-title">Resource</span>
      <div>
        <div class="div-resource">
          <Select v-model="selectMember" style="width:200px" placeholder="Select member">
            <Option v-for="member in teamData.members" :value="member.tel" :key="member.tel">{{ member.name }}({{ member.tel }})</Option>
          </Select>
          <Button class="btn" type="primary" shape="circle" icon="ios-search" @click="search()">Search</Button>
          <Button class="btn" type="info" shape="circle" icon="android-close" @click="clear()">Clear</Button>
          <Button class="btn" type="success" shape="circle" icon="android-add" @click="add()">Add</Button>
        </div>
        <Table class="table-resource" height="300" highlight-row border :columns="columnsResource" :data="dataResource" size="small" @on-current-change="changeSelection" no-data-text="No data"></Table>
      </div>
      <div class="div-export">
        <span class="span-title">Export</span>
        <Table class="table-export" height="300" border :columns="columnsExport" :data="dataExport" size="small" ref="table" no-data-text="No data"></Table>
        <Button type="primary" icon="archive" @click="exportCsv()">Export</Button>
      </div>
    </Layout>
  </Modal>
</div>
</template>

<script>
import expandRow from './component-table-expand.vue'

export default {
  name: 'export-projects',
  created () {
    //
  },
  props: [
    'type',
    'teamRes'
  ],
  data () {
    return {
      teamType: this.type,
      teamData: this.teamRes,
      modalExport: false,
      spinExport: false,
      selectMember: '',
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
          key: 'type'
        },
        {
          title: 'Percent',
          width: 100,
          align: 'center',
          key: 'percent'
        },
        {
          title: 'Date',
          align: 'center',
          key: 'date'
        },
        {
          title: 'Title',
          align: 'center',
          key: 'title'
        }
      ],
      dataResource: [
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
        }
      ],
      columnsExport: [
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
        },
        {
          title: 'Percent',
          width: 100,
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
          title: 'Delete',
          key: 'action',
          width: 100,
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
      dataExport: [
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
        }
      ]
    }
  },
  methods: {
    exportProjects () {
      this.modalExport = true
    },
    search () {

    },
    changeSelection (currentRow, oldCurrentRow) {
      this.currentInvite = currentRow
    },
    clear () {
      this.searchContent = ''
      this.dataUser = []
    },
    filter () {

    },
    add () {

    },
    remove (index) {
      this.dataExport.splice(index, 1)
    },
    exportCsv () {
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

.span-title {
  width      : 100%;
  text-align : center;
  font-size  : 18px;
  font-weight: bold;
  margin     : 20px auto;
  display    : block;
}

.div-resource {
  width     : 100%;
  margin-top: 20px;
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
