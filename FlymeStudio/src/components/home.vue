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
          <!-- <li class="li-item" v-for="year in plan" :key="year.year">
            {{ year.year }}
            <span v-if="year.title != ''"> >>>>>> </span>
            <span class="span-value" @click="openPlan()" v-if="year.title != ''">{{ year.title }}</span>
            <ul>
              <li class="li-item" v-for="month in year.res" :key="month.month">
                {{ month.month }}
                <span v-if="month.title != ''"> >>>>>> </span>
                <span class="span-value" @click="openPlan()" v-if="month.title != ''">{{ month.title }}</span>
                <ul>
                  <li class="li-item" v-for="day in month.res" :key="day.day">
                    {{ day.day }}
                    <span v-if="day.title != ''"> >>>>>> </span>
                    <span class="span-value" @click="openPlan()" v-if="day.title != ''">{{ day.title }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li> -->
        </ul>
      </div>
      <div class="data-achieve" v-show="tagId == 2">
        <span class="span-key">Total</span>
        <span class="span-value">{{ information.achieve.total }}</span>
        <ul id="ul-achieve">
          <!-- <li class="li-item" v-for="year in achieve" :key="year.year">
            {{ year.year }}
            <span v-if="year.title != ''"> >>>>>> </span>
            <span class="span-value" @click="openPlan()" v-if="year.title != ''">{{ year.title }}</span>
            <ul>
              <li class="li-item" v-for="month in year.res" :key="month.month">
                {{ month.month }}
                <span v-if="month.title != ''"> >>>>>> </span>
                <span class="span-value" @click="openPlan()" v-if="month.title != ''">{{ month.title }}</span>
                <ul>
                  <li class="li-item" v-for="day in month.res" :key="day.day">
                    {{ day.day }}
                    <span v-if="day.title != ''"> >>>>>> </span>
                    <span class="span-value" @click="openPlan()" v-if="day.title != ''">{{ day.title }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li> -->
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
        title: '',
        res: [{
          month: 8,
          title: '',
          res: []
        }, {
          month: 12,
          title: '12 month',
          res: [{
            day: 13,
            title: '13 day'
          }, {
            day: 24,
            title: '24 day'
          }]
        }]
      }, {
        year: 2018,
        title: '2018 year',
        res: [{
          month: 1,
          title: '',
          res: [{
            day: 6,
            title: '6 day'
          }]
        }]
      }],
      achieve: [{
        year: 2017,
        title: '',
        res: [{
          month: 8,
          title: '',
          res: []
        }, {
          month: 12,
          title: '12 month',
          res: [{
            day: 13,
            title: '13 day'
          }, {
            day: 24,
            title: '24 day'
          }]
        }]
      }, {
        year: 2018,
        title: '2018 year',
        res: [{
          month: 1,
          title: '',
          res: [{
            day: 6,
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
    openPlan: function () {},
    initPlans: function () {
      var ul_plan_year = document.getElementById('ul-plan')
      var years = this.plan
      for (var i = 0; i < years.length; i++) {
        var li_year = document.createElement('li')
        li_year.setAttribute('class', 'li-item')
        var text_year = document.createTextNode(years[i].year)
        li_year.appendChild(text_year)
        if (years[i].title.trim().length > 0) {
          var span_year = document.createElement('span')
          span_year.setAttribute('class', 'span-value')
          var text_year_title = document.createTextNode(years[i].title)
          li_year.appendChild(text_year_title)
        }
        if (years.res.length > 0) {
          var months = years.res
          var ul_plan_month = document.createElement('ul')
          for (var j = 0; j < months.length; j++) {
            var li_month = document.createElement('li')
            li_month.setAttribute('class', 'li-item')
            var text_month = document.createTextNode(months[j].month)
            li_month.appendChild(text_month)
            if (months[j].title.trim().length > 0) {
              var span_month = document.createElement('span')
              span_month.setAttribute('class', 'span-value')
              var text_month_title = document.createTextNode(months[j].title)
              span_month.appendChild(text_month_title)
              li_month.appendChild(text_month_title)
            }
            if (months.res.length > 0) {
              var days = months.res
              var ul_plan_day = document.createElement('ul')
              for (var k = 0; k < days.length; k++) {
                var li_day = document.createElement('li')
                li_day.setAttribute('class', 'li-item')
                var text_day = document.createTextNode(days[k].day)
                li_day.appendChild(text_day)
                if (days[k].title.trim().length > 0) {
                  var span_day = document.createElement('span')
                  span_day.setAttribute('class', 'span-value')
                  var text_day_title = document.createTextNode(days[k].title)
                  span_day.appendChild(text_day_title)
                  li_day.appendChild(span_day)
                }
                ul_plan_day.appendChild(li_day)
              }
              li_month.appendChild(ul_plan_day)
            }
            ul_plan_month.appendChild(li_month)
          }
          li_year.appendChild(ul_plan_month)
        }
        ul_plan_year.appendChild(li_year)
      }
    },
    initAchieves: function () {

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
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration   : 0.5s;
  -o-transition-duration     : 0.5s;
  -ms-transition-duration    : 0.5s;
  transition-duration        : 0.5s;
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

.li-item{
  margin-bottom: 10px;
  font-size   : 20px;
}
</style>
