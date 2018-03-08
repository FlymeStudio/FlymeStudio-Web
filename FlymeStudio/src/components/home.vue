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
    <ul class="content-tag">
      <li v-bind:class="tagId == 0 ? 'li-active' : ''" @click="clickInformation">Info</li>
      <li v-bind:class="tagId == 1 ? 'li-active' : ''" @click="clickPlan">Plan</li>
      <li v-bind:class="tagId == 2 ? 'li-active' : ''" @click="clickAchieve">Achieve</li>
    </ul>
    <div class="content-data">
      <div class="data-information" v-show="tagId == 0">
        <div class="information-info">
          <div class="div-info">
          <img class="img-info" src="../assets/tel.jpg">
          <span class="span-value">{{ information.info.tel }}</span>
        </div>
        <div class="div-info">
          <img class="img-info" src="../assets/email.jpg">
          <span class="span-value">{{ information.info.email }}</span>
        </div>
        </div><br>
        <hr><br>

        <div class="information-plan">
          <span class="span-key">Plan</span>
          <span class="span-value">{{ information.plan.total }}</span>
          <span class="span-key">Finish</span>
          <span class="span-value" style="color:green;">{{ information.plan.finish }}</span>
          <span class="span-key">Rest</span>
          <span class="span-value" style="color:red;">{{ information.plan.rest }}</span>
          <progress class="plan-progress" max="100" value="75" />
          <span class="span-value">{{ information.plan.percent }}</span>
        </div><br>
        <hr><br>

        <div class="information-achieve">
          <span class="span-key">Achieve</span>
          <span class="span-value">{{ information.achieve.total }}</span>
        </div>
      </div>
      <div class="data-plan" v-show="tagId == 1">
        <span class="span-key">Total</span>
        <span class="span-value">{{ information.plan.total }}</span>
        <span class="span-key">Finish</span>
        <span class="span-value" style="color:green;">{{ information.plan.finish }}</span>
        <span class="span-key">Rest</span>
        <span class="span-value" style="color:red;">{{ information.plan.rest }}</span>
        <progress class="plan-progress" max="100" value="75" />
        <span class="span-value">{{ information.plan.percent }}</span>
        <ul id="ul-plan">
          <li class="li-item" v-for="year in plan" :key="year.year">
            {{ year.year }}
            <span v-if="year.title != ''"> ———— </span>
            <span class="item-value" @click="openPlan(year.searchId)" v-if="year.title != ''">{{ year.title }}</span>
            <ul>
              <li class="li-item" v-for="month in year.array" :key="month.month">
                {{ month.month }}
                <span v-if="month.title != ''"> ———— </span>
                <span class="item-value" @click="openPlan(month.searchId)" v-if="month.title != ''">{{ month.title }}</span>
                <ul>
                  <li class="li-item" v-for="day in month.array" :key="day.day">
                    {{ day.day }}
                    <span v-if="day.title != ''"> ———— </span>
                    <span class="item-value" @click="openPlan(day.searchId)" v-if="day.title != ''">{{ day.title }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="data-achieve" v-show="tagId == 2">
        <span class="span-key">Total</span>
        <span class="span-value">{{ information.achieve.total }}</span>
        <ul id="ul-achieve">
          <li class="li-item" v-for="year in achieve" :key="year.year">
            {{ year.year }}
            <span v-if="year.title != ''"> ———— </span>
            <span class="item-value" @click="openAchieve(year.searchId)" v-if="year.title != ''">{{ year.title }}</span>
            <ul>
              <li class="li-item" v-for="month in year.array" :key="month.month">
                {{ month.month }}
                <span v-if="month.title != ''"> ———— </span>
                <span class="item-value" @click="openAchieve(month.searchId)" v-if="month.title != ''">{{ month.title }}</span>
                <ul>
                  <li class="li-item" v-for="day in month.array" :key="day.day">
                    {{ day.day }}
                    <span v-if="day.title != ''"> ———— </span>
                    <span class="item-value" @click="openAchieve(day.searchId)" v-if="day.title != ''">{{ day.title }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script >
import quitApi from '../api/quitApi'
// import infoApi from '../api/infoApi'
// import planApi from '../api/planApi'
// import achieveApi from '../api/achieveApi'

export default {
  name: 'home',
  created () {
    this.getInfo()
  },
  data () {
    return {
      name: 'user',
      tagId: 0,
      information: {
        info: {
          tel: '13608089849',
          email: '1213814232@qq.com'
        },
        plan: {
          total: 16,
          finish: 12,
          rest: 4,
          percent: '75%'
        },
        achieve: {
          total: 16
        }
      },
      plan: [{
        year: 2017,
        searchId: 0,
        title: '',
        array: [{
          month: 8,
          searchId: 1,
          title: '',
          array: []
        }, {
          month: 12,
          searchId: 2,
          title: '12 month',
          array: [{
            day: 13,
            searchId: 3,
            title: '13 day'
          }, {
            day: 24,
            searchId: 4,
            title: '24 day'
          }]
        }]
      }, {
        year: 2018,
        searchId: 5,
        title: '2018 year',
        array: [{
          month: 1,
          searchId: 6,
          title: '',
          array: [{
            day: 6,
            searchId: 7,
            title: '6 day'
          }]
        }]
      }],
      achieve: [{
        year: 2017,
        searchId: 8,
        title: '',
        array: [{
          month: 8,
          searchId: 9,
          title: '',
          array: []
        }, {
          month: 12,
          searchId: 10,
          title: '12 month',
          array: [{
            day: 13,
            searchId: 11,
            title: '13 day'
          }, {
            day: 24,
            searchId: 12,
            title: '24 day'
          }]
        }]
      }, {
        year: 2018,
        searchId: 13,
        title: '2018 year',
        array: [{
          month: 1,
          searchId: 14,
          title: '',
          array: [{
            day: 6,
            searchId: 15,
            title: '6 day'
          }]
        }]
      }]
    }
  },
  methods: {
    getInfo () {
      this.name = '曾宇'
      // infoApi.info(this).then(function (response) {
      //   if (response.data.result === true) {
      //     this.information = response.data.information
      //   }
      // })
      // planApi.plan(this).then(function (response) {
      //   if (response.data.result === true) {
      //     this.plan = response.data.plan
      //   }
      // })
      // achieveApi.achieve(this).then(function (response) {
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
      quitApi.quit(this.tel).then(function (response) {
        if (response.data.result === true) {
          this.$router.push('/login')
        }
      })
    },
    clickInformation: function () {
      this.tagId = 0
    },
    clickPlan: function () {
      this.tagId = 1
    },
    clickAchieve: function () {
      this.tagId = 2
    },
    openPlan: function (searchId) {
      console.log('searchId:' + searchId)
    },
    openAchieve: function (searchId) {
      console.log('searchId:' + searchId)
    }
  }
}

</script>

<style scoped >
.div-top {
  border-bottom: 1px solid #bbb;
}

.div-content {
  width  : auto;
  padding: 30px 10%;
  height : auto;
  display: flex;
}

.content-tag {
  width          : 100px;
  list-style-type: none;
  margin         : 0;
  padding        : 0;
  position       : absolute;
}

.content-tag li {
  width                      : 100%;
  height                     : 50px;
  border-bottom              : 1px solid black;
  display                    : -webkit-flex;
  display                    : flex;
  align-items                : center;
  overflow                   : hidden;
  cursor                     : pointer;
  padding-left               : 5px;
  font-size                  : 20px;
  -webkit-transition-duration: .5s;
  -moz-transition-duration   : .5s;
  -o-transition-duration     : .5s;
  -ms-transition-duration    : .5s;
  transition-duration        : .5s;
}

.content-tag li:hover {
  background-color: grey;
}

.li-active {
  background-color: black;
  color           : white;
}

.content-data {
  height    : auto;
  margin    : 0 0 50px 120px;
  width     : 100%;
  padding   : 20px;
  overflow-x: auto;
}

.data-information {
  min-width: 600px;
}

.data-plan {
  min-width: 600px;
}

.data-achieve {
  min-width: 600px;
}

.div-info {
  padding    : 5px;
  align-items: center;
  height     : auto;
  display    : flex;
  display    : -webkit-flex;
}

.img-info {
  height       : 30px;
  width        : 30px;
  margin-right : 10px;
  border-radius: 15px;
}

.span-key {
  font-weight: bold;
  font-size  : 20px;
}

.span-value {
  color       : #1788e8;
  font-weight : bold;
  margin-right: 15px;
  font-size   : 20px;
}

.li-item {
  margin-bottom: 15px;
  font-size    : 20px;
}

.item-value {
  margin-left    : 20px;
  color          : #1788e8;
  font-weight    : bold;
  margin-right   : 15px;
  font-size      : 20px;
  cursor         : pointer;
  text-decoration: underline;
}
</style>
