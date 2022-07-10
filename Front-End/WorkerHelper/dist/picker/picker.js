var that
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    start: {
      type: Number,
      value: 1900
    },
    end: {
      type: Number,
      value: 9999
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    value: [0],
    years: [],
    year: 1900,
    current: 1900,
    dialogh: 0
  },
  attached: function () {
    console.log('attached')
    that = this
    that.animation = wx.createAnimation({
      duration: 300
    })
    var dialoghpx = 500 / 750 * wx.getSystemInfoSync().windowWidth
    that.setData({
      dialogh: dialoghpx
    })
  },
  detached: function () {
    console.log('detached')
    
  },
  pageLifetimes: {
    //组件所在的页面被展示时执行 最低版本2.2.3
    show: function () {
      console.log('页面show')
      var yearstemp = []
      for(var i = that.properties.start; i <= that.properties.end; i ++){
        yearstemp.push(i)
      }
      that.setData({
        years: yearstemp
      })
    },
    //组件所在的页面被隐藏时执行 最低版本2.2.3
    hide: function () {
      console.log('页面被隐藏')
    },
    //这个函数一般使用场景较少，了解就可以了  最低版本2.4.0
    resize: function (size) {
      console.log('页面尺寸变化')
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindChange: function (e) {
      const val = e.detail.value
      that.setData({
        year: this.data.years[val[0]]
      })
    },
    showDialog(current){
      that.setData({
        isShow: true
      })
      var currentindex = 0
      that.data.years.forEach(function(v,i,s){
        if(current == v){
          currentindex = i
        }
      })
      that.setData({
        [`value[0]`] : currentindex,
        year: that.data.years[currentindex],
        current: current
      })

      that.animation.translateY(that.data.dialogh).translateY(0).step()
      that.setData({animation: that.animation.export()})
    },
    cancel(){
      this.triggerEvent("cancel")
      that.dimsss()
    },
    dimsss(){
      that.animation.translateY(that.data.dialogh).step()
      that.setData({animation: that.animation.export()})
      setTimeout(() => {
        that.setData({
          isShow: false
        })
     }, 300)
    },
    lefttap(){
      this.triggerEvent("lefttap")
      that.dimsss()
    },
    righttap(){
      this.triggerEvent("righttap",{
        year: that.data.year
      })
      that.dimsss()
    }
  }
})
