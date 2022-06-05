// pages/detail/detail.js
var app = getApp();
Page({
  data: {
    detail: {},
    message:[],
    id: '',
    hasFav: false,
    hiddenmodalput: true,  
    messageContent:'',
  },
  onShareAppMessage: function () {
    return {
      title: 'OfferShow-' + this.data.detail.company +'-'+ this.data.detail.position,
      path: ['pages/detail/detail?id=',this.data.id,'&getdata=request'].join(''),
      // path: 'pages/offer/offer',
      success: function(res) {
        wx.showToast({
          'title':'分享成功',
          'icon':'success',
          'duration': 1000
        });
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },  
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var temp,
    _this = this,
    favState = false;
    // console.log(options);
    if(app.getFav(options.id)){
      favState = true;
    }
    else{
      favState = false;
    }
    if (options.getdata === "request") {
      var tempid = options.id;
      app.getAjaxData({
        url:[app.globalData.domain, 'webapi/jobdetail/'].join('/'),
        data:{
          'id':options.id
        },
        success: function(res) {
          // success
          _this.setData({
            detail: res.data.info,
            id: options.id,
            hasFav: favState
          });
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
          wx.hideToast();
        }
      });
      app.getAjaxData({
        url: [app.globalData.domain, 'webapi/jobmessagelist/'].join('/'),
        data: {
          'id': tempid
        },
        success: function (res) {
          // console.log(this.data.id);
          // success
          _this.setData({
            message: res.data.info,
            'id': options.id,
            hasFav: favState
          });
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
          wx.hideToast();
        }
      });
    }
    else{
      temp = app.getCache(options.id);
      app.getAjaxData({
        url: [app.globalData.domain, 'webapi/jobmessagelist/'].join('/'),
        data: {
          'id': options.id
        },
        success: function (res) {
          // success
          _this.setData({
            detail: temp,
            message: res.data.info,
            'id': options.id,
            hasFav: favState
          });
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
          wx.hideToast();
        }
      });
    }
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function(options) {
    // 页面显示
    this.detectFav();  
    console.log(options);
      
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  tapBack:function(){
    if (/detail/.test(app.globalData.fromPath)) {
      wx.switchTab({
        url: '/pages/offer/offer'
      });
    }
    else{
      wx.navigateBack();
    }
  },  
  postRank: function(urltext) {
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 10000
    });
    app.getAjaxData({
      url: urltext,
      data: {
        'id': this.data.id
      },
      success: function(res) {
        wx.showToast({
          title: '谢谢评价',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function(res) {
        // fail
        wx.showToast({
          title: '错误',
          icon: 'success',
          duration: 2000
        });
      },
      complete: function(res) {
        setTimeout(function() {
          app.globalData.needReq = true;
          wx.navigateBack();
        }, 1500);
      }
    })
  },
  detectFav: function(){
    var favState = false;
    if(app.getFav(this.data.id.toString())){
      favState = true;      
    }
    else{
      favState = false;
    }
    this.setData({
      hasFav: favState
    });        
  },
  saveToFav: function(){
    app.setFav(this.data.id.toString(), this.data.detail);
    this.detectFav();
    wx.showToast({
      "title":"success",
      "icon":"success",
      "duration":1500
    });
  },
  messageInput: function (e) {
    var that = this;
    that.setData({
      messageContent: e.detail.value
    })
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    });
    var param = {
      'id': this.data.id,
      'content': this.data.messageContent.trim()
    };
    if (!this.data.messageContent.trim()) {
      wx.showToast({
        'title': '别忘了打字哦！',
        'icon': 'loading',
        'duration': 1000
      });
      return;
    }
    app.getAjaxData({
      url: [app.globalData.domain, 'webapi/jobmessage', ''].join('/'),
      data: param,
      success: function (res) {
        wx.showToast({
          'title': '留言成功',
          'icon': 'success',
          'duration': 2000
        });
      },
      fail: function (res) {
        wx.showToast({
          'title': '留言失败，系统陷入未知领域啦！',
          'icon': 'success',
          'duration': 2000
        });
      },
      complete: function (res) {
        // complete
      }
    })
    console.log("留言内容" + this.data.messageContent.trim());
  },  
  removeFromFav: function(){
    app.delFav(this.data.id.toString());
    this.detectFav();
    wx.showToast({
      "title":"success",
      "icon":"success",
      "duration":1500
    });
  },
  toShare: function(){
    wx.showShareMenu();
  },
  tapRank: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定提交信息？',
      success: function(res) {
        var url = '';
        if (res.confirm) {
          console.log('用户点击确定');
          url = [app.globalData.domain, 'webapi', e.target.dataset.rank, ''].join('/');
          that.postRank(url);
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  }
})