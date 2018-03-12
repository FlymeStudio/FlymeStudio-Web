<template>
<div class="div-all">
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
        <transition name="slide-fade">
        <div class="div-ul" v-show="isPlanShow">
          <div v-bind:class="tagId == 10 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(10)">Overview</div>
          <div v-bind:class="tagId == 11 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(11)">Write</div>
          <div v-bind:class="tagId == 12 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(12)">Search</div>
        </div>
        </transition>

        <div v-bind:class="tagId == 2 ? ['div-tag', 'tag-active'] : 'div-tag'" @click="select(2)">Achieve</div>
        <transition name="slide-fade">
        <div class="div-ul" v-show="isAchieveShow">
          <div v-bind:class="tagId == 20 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(20)">Overview</div>
          <div v-bind:class="tagId == 21 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(21)">Write</div>
          <div v-bind:class="tagId == 22 ? ['div-li', 'tag-active'] : 'div-li'" @click="select(22)">Search</div>
        </div>
        </transition>
      </div>
    </div>

    <div class="div-right-outer">
      <div class="div-right">
        <transition name="component-fade" mode="out-in">
        <componentInfo v-show="componentId == 0"></componentInfo>
        </transition>
          <transition name="component-fade" mode="out-in">
        <componentPlanOverview v-show="componentId == 10"></componentPlanOverview>
        </transition>
          <transition name="component-fade" mode="out-in">
        <componentPlanWrite v-show="componentId == 11"></componentPlanWrite>
        </transition>
          <transition name="component-fade" mode="out-in">
        <componentPlanSearch v-show="componentId == 12"></componentPlanSearch>
        </transition>
          <transition name="component-fade" mode="out-in">
        <componentAchieveOverview v-show="componentId == 20"></componentAchieveOverview>
        </transition>
          <transition name="component-fade" mode="out-in">
        <componentAchieveWrite v-show="componentId == 21"></componentAchieveWrite>
        </transition>
          <transition name="component-fade" mode="out-in">
        <componentAchieveSearch v-show="componentId == 22"></componentAchieveSearch>
        </transition>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import componentInfo from './info.vue'
import componentPlanOverview from './plan-overview.vue'
import componentPlanWrite from './plan-write.vue'
import componentPlanSearch from './plan-search.vue'
import componentAchieveOverview from './achieve-overview.vue'
import componentAchieveWrite from './achieve-write.vue'
import componentAchieveSearch from './achieve-search.vue'
import accountApi from '../api/accountApi'
import infoApi from '../api/infoApi'
import planApi from '../api/planApi'
import achieveApi from '../api/achieveApi'

export default {
  name: 'home',
  created () {
    this.getInfo()
  },
  data () {
    return {
      tel: '13608089849',
      name: 'user',
      email: '1213814232@qq.com',
      tagId: 0,
      componentId: 0,
      isPlanShow: false,
      isAchieveShow: false
    }
  },
  components: {
    componentInfo,
    componentPlanOverview,
    componentPlanWrite,
    componentPlanSearch,
    componentAchieveOverview,
    componentAchieveWrite,
    componentAchieveSearch
  },
  methods: {
    getInfo () {
      this.name = '曾宇' // test
      this.email = '1213814232@qq.com' // test

      infoApi.info(this.tel).then(function (response) {
        if (response.data.result === true) {
          this.name = response.data.name
          this.email = response.data.email
        }
      })
      planApi.plan(this.tel).then(function (response) {
        if (response.data.result === true) {
          this.plan = response.data.plan
        }
      })
      achieveApi.achieve(this.tel).then(function (response) {
        if (response.data.result === true) {
          this.achieve = response.data.achieve
        }
      })
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
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-180px);
  opacity  : 0;
}

.component-fade-enter-active {
  transition: 0.5s ease;
}

.component-fade-leave-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.component-fade-enter {
  opacity  : 0;
  transform: translateY(-480px);
}

.component-fade-leave-to {
  transform: translateY(480px);
  opacity  : 0;
}

.div-top {
  border-bottom: 3px solid #bbb;
}

.div-all {
  min-width: 600px;
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
  color                      : black;
  cursor                     : pointer;
  padding                    : 10px 20px;
  font-weight                : bold;
  font-size                  : 20px;
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration   : 0.5s;
  -o-transition-duration     : 0.5s;
  -ms-transition-duration    : 0.5s;
  transition-duration        : 0.5s;
}

.div-tag:hover {
  background-color: grey;
  color           : white;
}

.div-li {
  color                      : #333;
  cursor                     : pointer;
  padding                    : 10px 20px 10px 40px;
  font-size                  : 18px;
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration   : 0.5s;
  -o-transition-duration     : 0.5s;
  -ms-transition-duration    : 0.5s;
  transition-duration        : 0.5s;
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
  width      : auto;
  height     : auto;
  padding    : 20px;
  margin-left: 180px;
}

.div-right {
  height: 100%;
  font-size: 20px;
}
</style>
