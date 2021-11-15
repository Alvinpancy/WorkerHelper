// pages/mine/mine.js
var app = getApp();
Page({
  data:{
    list:[
      {
        mode: 'scaleToFill',
        text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
      }
    ],
    src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg'
    //hasData: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var storage = app.getFav();
    var offerList = Object.keys(storage).map(key => storage[key]);
    this.setData({
      list: offerList,
      hasData: offerList.length?true:false
    });
    storage = null;
    offerList = null;
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
});