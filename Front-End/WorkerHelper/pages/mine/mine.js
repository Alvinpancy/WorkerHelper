// pages/post/post.js
var app = getApp();
Page({
  data: {
    item: 0,
    tab: 0,
    // 星级评价
    starSize:'38rpx',
    starIcon:'like',
    starVoidIcon:'like-o',
    starColor:'#ffd21e',
    starGutter: '4rpx',
    starCount: 4,
    
    // 单列选择器
    
    showInd:false, 
    showEdu:false,
    shwoSex:false,
    showSta:false, 
    selIndustry: '', 
    selEducation: '',
    selSex: '',
    selStability: '',
    cateIndustry:[
      '销售|客服|市场',
      '财务|人力资源|行政',
      '项目|质量|高级管理',
      'IT|互联网|通信',
      '房产|建筑|物业管理',
      '金融',
      '采购|贸易|交通|物流',
      '生产|制造',
      '传媒|印刷|艺术|设计',
      '咨询|法律|教育|翻译',
      '服务业',
      '能源|环保|农业|科研',
      '服务业',
      '兼职|实习|社工|其他',
    ],
    cateEducation: [
        '博士985',
        '博士211',
        '博士其他',
        '硕士985',
        '硕士211',
        '硕士其他',
        '本科985',
        '本科211',
        '本科其他',
        '大专',
        '其它'
      ],
    cateSex: [
     '男生占绝大部分',
     '男生占大半部分',
     '一半一半',
     '女生占大部分',
     '女生占绝大部分'

    ],
    cateStability: [
      '10%',
      '20%',
      '30%',
      '40%',
      '50%'
    ],
      
    current: 'tab1',
    schoolBtn: 1,
    societyBtn: 0,
    internBtn: 0,
    starIndex1: 1,
    starIndex2: 4,
    starIndex3: 2,
    starIndex4: 3,

    titles:['校招','实习','社招'],
    
    
    
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [{
        text: '薪酬'
      },
      {
        text: '幸福权重修改'
      },
      {
        text: '经验帖'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    cateIndex: 0,
    titleIndex: 6,
    isInput: false,
    toViewId: 'basic'
  },

  currentIndex:0,
  

  info: {
    company: '',
    position: '',
    city: '',
    salary: '',
    remark: ''
  },
  matchreg: {
    'default': /^.{2,12}$/,
    'remark': /.{2,450}/
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  onReady: function () {
    this.indpicker = this.selectComponent("#ind-picker")
    this.edupicker = this.selectComponent("#edu-picker")
    this.sexpicker = this.selectComponent("#sex-picker")
    this.stapicker = this.selectComponent("#sta-picker")
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onChange1(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex1': index
    })
  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex2': index
    })
  },
  onChange3(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex3': index
    })
  },
  onChange4(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex4': index
    })
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  schoolSelectBtn: function (event) {
    this.setData({
      schoolBtn: 1,
      societyBtn: 0,
      internBtn: 0
    });
  },
  societySelectBtn: function (event) {
    this.setData({
      schoolBtn: 0,
      societyBtn: 1,
      internBtn: 0
    });
  },
  internSelectBtn: function (event) {
    this.setData({
      schoolBtn: 0,
      societyBtn: 0,
      internBtn: 1
    });
  },
  
// 类型单选按钮
catchButton:function(e){
  var that = this;
  if (this.data.currentIndex === e.currentTarget.id) {
    return false;
  } else {
    that.setData({
      currentIndex: e.currentTarget.id
    })
  }
},
 


  onFocus: function () {
    this.setData({
      isInput: true,
      toViewId: 'remark'
    });
  },
  onBlur: function () {
    this.setData({
      isInput: false,
      toViewId: 'basic'
    });
  },
  changeCate: function (e) {
    this.setData({
      cateIndex: e.detail.value
    });
  },

  changeTitle: function (e) {
    this.setData({
      titleIndex: e.detail.value
    });
  },
  onInput: function (e) {
    var text = e.detail.value.trim();
    var regitem = this.matchreg[e.target.id] || this.matchreg['default'];
    this.info[e.target.id] = e.detail.value.trim();
    if (text.length > 1) {
      if (!regitem.test(text)) {
        wx.showToast({
          'title': '超出限制',
          'icon': 'loading',
          'duration': 1000
        });
      }
    }

  },
  tapConfirm: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定提交信息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.tapSubmit();
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  tapAbove: function () {
    wx.navigateBack();
  },
  tapCancel: function () {},
  tapSubmit: function () {
    var param = {
      'hangye': this.data.category[this.data.cateIndex],
      'company': this.info.company,
      'position': this.info.position,
      'city': this.info.city,
      'salary': this.info.salary,
      'xueli': this.data.title[this.data.titleIndex]
    };
    var regitem;
    for (var i in param) {
      regitem = this.matchreg[i] || this.matchreg['default'];
      if (!regitem.test(param[i])) {
        wx.showToast({
          'title': '信息格式不符',
          'icon': 'loading',
          'duration': 1000
        });
        return;
      }
    }
    param['remark'] = this.info.remark;
    wx.showToast({
      'title': '提交中',
      'icon': 'loading',
      'duration': 10000
    });
    app.getAjaxData({
      url: [app.globalData.domain, 'webapi/jobrecord', ''].join('/'),
      data: param,
      success: function (res) {
        wx.showToast({
          'title': '成功',
          'icon': 'success',
          'duration': 2000
        });
        setTimeout(function () {
          app.globalData.needReq = true;
          wx.navigateBack();
        }, 1500);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  
  btn:function(){
    this.setData({show:true})
  },
  
  onLoad: function () {
    that = this
  },
  // 行业选择器
  onCloseInd(){
    this.indpicker.hidePicker()
},
  onConfirmInd(e){
    const session = e.detail
    
    this.setData({
        selIndustry:session
    })
    this.indpicker.hidePicker()
},

  
  showPickerInd(){
    this.setData({showInd:true})
    
  },
  // 学历选择器
  onCloseEdu(){
    this.edupicker.hidePicker()
},
  onConfirmEdu(e){
    const session = e.detail
    
    this.setData({
        selEducation:session
    })
    this.edupicker.hidePicker()
},

  
  showPickerEdu(){
    this.setData({showEdu:true})
    
  },

  // 男女比例
  onCloseSex(){
    this.sexpicker.hidePicker()
},
  onConfirmSex(e){
    const session = e.detail
    
    this.setData({
        selSex:session
    })
    this.sexpicker.hidePicker()
},
  showPickerSex(){
    this.setData({showSex:true})
  },

  // 裁员情况
  onCloseSta(){
    this.stapicker.hidePicker()
},
  onConfirmSta(e){
    const session = e.detail
    
    this.setData({
        selStability:session
    })
    this.stapicker.hidePicker()
},
  showPickerSta(){
    this.setData({showSta:true})
  },

  // 获取输入框的值
  getDataBindTap: function(e) {
    var information = e.detail.value;//输入的内容
    var value = e.detail.value.length;//输入内容的长度
    var lastArea = 200 - value;//剩余字数
    var that = this;
      that.setData({
            information: information,
            lastArea: lastArea
      })
  },
  
  

})


