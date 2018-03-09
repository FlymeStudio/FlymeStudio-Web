<template>
<div>
  <ul class="div-top">
    <li><img class="img-flyme" src="https://cloud-res.mzres.com/resources/sync/images/flymelogo144.png" @click="clickFlyme"></li>
    <li><span style="font-size:25px;">{{ name }}</span></li>
    <li><span></span></li>
    <li class="li-right"><span @click="clickQuit">Sign Out</span></li>
    <li class="li-right"><span @click="clickHelp">Help</span></li>
  </ul>

  <div class="div-content">
    <div class="div-left-outer">
      <div class="div-left">
        <div v-bind:class="tagId == 0 ? ['div-tag', 'tag-active'] : 'div-tag'" @click="select(0)">Info</div>

        <div v-bind:class="tagId == 1 ? ['div-tag', 'tag-active'] : 'div-tag'" @click="select(1)">Plan</div>
        <div class="div-ul" v-show="isPlanShow">
          <div v-bind:class="tagId == 10 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(10)">Overview</div>
          <div v-bind:class="tagId == 11 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(11)">Write</div>
          <div v-bind:class="tagId == 12 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(12)">Upload</div>
          <div v-bind:class="tagId == 13 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(13)">Search</div>
        </div>

        <div v-bind:class="tagId == 2 ? ['div-tag', 'tag-active'] : 'div-tag'" @click="select(2)">Achieve</div>
        <div class="div-ul" v-show="isAchieveShow">
          <div v-bind:class="tagId == 20 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(20)">Overview</div>
          <div v-bind:class="tagId == 21 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(21)">Write</div>
          <div v-bind:class="tagId == 22 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(22)">Upload</div>
          <div v-bind:class="tagId == 23 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(23)">Search</div>
        </div>
      </div>
    </div>

    <div class="div-right-outer">
      <div class="div-right">
        <componentInfo v-show="componentId == 0"></componentInfo>
        <componentPlanOverview v-show="componentId == 10"></componentPlanOverview>
        <componentPlanWrite v-show="componentId == 11"></componentPlanWrite>
        <componentPlanUpload v-show="componentId == 12"></componentPlanUpload>
        <componentPlanSearch v-show="componentId == 13"></componentPlanSearch>
        <componentAchieveOverview v-show="componentId == 20"></componentAchieveOverview>
        <componentAchieveWrite v-show="componentId == 21"></componentAchieveWrite>
        <componentAchieveUpload v-show="componentId == 22"></componentAchieveUpload>
        <componentAchieveSearch v-show="componentId == 23"></componentAchieveSearch>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import componentInfo from './info.vue'
import componentPlanOverview from './plan-overview.vue'
import componentPlanWrite from './plan-write.vue'
import componentPlanUpload from './plan-upload.vue'
import componentPlanSearch from './plan-search.vue'
import componentAchieveOverview from './achieve-overview.vue'
import componentAchieveWrite from './achieve-write.vue'
import componentAchieveUpload from './achieve-upload.vue'
import componentAchieveSearch from './achieve-search.vue'
import accountApi from '../api/accountApi'

export default {
  name: 'home',
  created () {
    this.getInfo()
  },
  data () {
    return {
      name: 'user',
      tagId: 0,
      componentId: 0,
      isPlanShow: false,
      isAchieveShow: false,
      information: {
        info: {
          tel: '13608089849',
          email: '1213814232@qq.com'
        }
      }
    }
  },
  components: {
    componentInfo,
    componentPlanOverview,
    componentPlanWrite,
    componentPlanUpload,
    componentPlanSearch,
    componentAchieveOverview,
    componentAchieveWrite,
    componentAchieveUpload,
    componentAchieveSearch
  },
  methods: {
    getInfo () {
      this.name = '曾宇'
      // accountApi.info(this).then(function (response) {
      //   if (response.data.result === true) {
      //     this.information = response.data.information
      //   }
      // })
      // accountApi.plan(this).then(function (response) {
      //   if (response.data.result === true) {
      //     this.plan = response.data.plan
      //   }
      // })
      // accountApi.achieve(this).then(function (response) {
      //   if (response.data.result === true) {
      //     this.achieve = response.data.achieve
      //   }
      // })
    },
    clickFlyme: function () {
      window.open('https://www.flyme.cn/')
    },
    clickHelp: function () {
      window.open('https://www.baidu.com/')
    },
    clickQuit: function () {
      this.$router.push('/login')
      accountApi.quit(this.tel).then(function (response) {
        if (response.data.result === true) {
          this.$router.push('/login')
        }
      })
    },
    select (tagId) {
      this.tagId = tagId
      if (tagId === 1) {
        this.isPlanShow = !this.isPlanShow
      } else if (tagId === 2) {
        this.isAchieveShow = !this.isAchieveShow
      } else {
        this.componentId = tagId
      }
    }
  }
}
</script>

<style scoped>
.div-top {
  border-bottom: 3px solid #bbb;
}

.div-content {
  width  : auto;
  height : auto;
  display: block;
}

.div-left-outer {
  width : auto;
  height: auto;
}

.div-left {
  width        : 180px;
  height       : auto;
  border-right : 0.5px solid #bbb;
  border-bottom: 0.5px solid #bbb;
  position     : absolute;
}

.div-tag {
  color      : black;
  cursor     : pointer;
  padding    : 10px 20px;
  font-weight: bold;
  font-size  : 20px;
}

.div-tag:hover {
  background-color: grey;
  color           : white;
}

.div-li {
  color    : #333;
  cursor   : pointer;
  padding  : 10px 20px 10px 30px;
  font-size: 18px;
}

.tag-active {
  color           : blue;
  background-color: #bbb;
}

.div-li:hover {
  background-color: grey;
  color           : white;
}

.div-right-outer {
  width  : auto;
  height : auto;
  padding: 20px;
}

.div-right {
  height          : 100%;
  margin-left     : 180px;
  background-color: yellow;
  border-left     : 0.5px solid #bbb;
}
</style>
