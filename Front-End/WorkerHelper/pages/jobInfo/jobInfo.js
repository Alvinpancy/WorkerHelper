//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        sortList:['指数','薪资','发布时间'],
        campusList:[
            {company:'Apple',salary:'3K',job:'嵌入式开发','internship':0,happiness:68,workcity:'南京','qualification':'硕士211',postTime:'2022-3'},
            {company:'Google',salary:'15K*15',job:'大数据开发','internship':1,happiness:78,workcity:'上海','qualification':'硕士985',postTime:'2022-9'},
            {company:'Apple',salary:'3K',job:'嵌入式开发','internship':0,happiness:68,workcity:'南京','qualification':'硕士211',postTime:'2022-3'},
            {company:'Google',salary:'15K*15',job:'大数据开发','internship':1,happiness:78,workcity:'上海','qualification':'硕士985',postTime:'2022-9'},
            {company:'Apple',salary:'3K',job:'嵌入式开发','internship':0,happiness:68,workcity:'南京','qualification':'硕士211',postTime:'2022-3'},
            {company:'Google',salary:'15K*15',job:'大数据开发','internship':1,happiness:78,workcity:'上海','qualification':'硕士985',postTime:'2022-9'},
            {company:'Apple',salary:'3K',job:'嵌入式开发','internship':0,happiness:68,workcity:'南京','qualification':'硕士211',postTime:'2022-3'},
            {company:'Google',salary:'15K*15',job:'大数据开发','internship':1,happiness:78,workcity:'上海','qualification':'硕士985',postTime:'2022-9'}
        ]
    },
    //事件处理函数
    onLoad: function () {
    },
   
    swichNav: function (e) {

        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
          return false;
        } else {
          that.setData({
            currentTab: e.target.dataset.current
          })
        }
      },
    jumpToPage(){
        wx.navigateTo({
          url: '../campusInfo/campusInfo',
        })
    }

})