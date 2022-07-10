const app = getApp()
var that
Page({
    data: {
        ads: [],
        list: [],
        isNewest: true,
        kind: 'jobtotal',
        inputShowed: false,
        hasData: true,
        anim: {},
        history: [],
        inputval:'',
        keyword: '',
        hidden_search: true,
         
       
        // 标签页选项
        currentTab: 0,
        // 搜索框
        inputValue:'',
        placeholder:'请输入内容',
        
        // 历史记录
        historyStorage: [],
        historyStorageShow: false,
        inputValue: "",        //输入框输入的值
        replaceValue: "",
              
    },
    cache : [],
    onShareAppMessage: function () {
      return {
        title: 'OfferShow-最可信的校招薪水交流平台',
        path: 'pages/offer/offer',
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
      };
    },    
    onLoad: function(options) {
       // 历史搜索
      let that = this
      wx.getStorage({
        key: 'historyStorage',
        success: function (res) {
          console.log(res.data)
          that.setData({
            historyStorageShow: true,
            historyStorage: res.data
          })
        }
      })
  },
  //点击进入详情页
  goToList: function (e) {
    
  },


  
    onShow: function(){
    // 页面初始化 options为页面跳转所带来的参数 
        if (app.globalData.needReq || this.cache.length < 1) {
          app.globalData.needReq = false;
          this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), {}, true);
          this.getAds();
          //是最新列表而非搜索页
          this.setData({
            isNewest: true
          })
          this.setData({
            'history':wx.getStorageSync('history') || []
          }); 
              
        }
        /*
        this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), {});
        this.getAds();
        this.isNewest = true;//是最新列表而非搜索页
        this.setData({
          'history':wx.getStorageSync('history') || []
        });
        */        
    },
    getAds: function() {
      var _this = this;
      app.getAjaxData({
          url: [app.globalData.domain, 'webapi/weixinad', ''].join('/'),
          data: {},
          success: function(res) {
            // success
            var list = res.data.info.map(function(v){
              return Object.assign(v, {'res_jumpurl': encodeURIComponent(v.res_jumpurl)});
            });
            // wx.hideToast();            
            _this.setData({
              ads: list
            });
          }
        });
    },
    getInfo: function(urltext, pastData = {}, cache = false) {
        var _this = this;
        /*wx.showToast({
          title: 'loading',
          icon: 'loading',
          duration: 10000
        });*/
        app.getAjaxData({
          url: urltext,
          data: pastData,
          success: function(res) {
            // success
            var list = res.data.info;
            if (list.length < 1){
              /*wx.showToast({
                title: '无结果',
                icon: 'loading',
                duration: 1000
              });*/
            }
            else{
              wx.hideToast();
            }
            // wx.hideToast();            
            _this.setData({
              list: list,
              hasData: list.length?true:false
            });
            if (cache) {
              _this.cache = list;
            }
          },
          fail: function(res) {
            // fail
            //wx.showToast({
            //  title: 'failed',
            //  icon: 'loading',
            //  duration: 10000
            //});
          },
          complete: function(res) {
            // complete
          }
        });
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
          this.setData({
              inputShowed: false
          });
    },
    inputTyping: function (e) {
      var dataToSet = {};
      this.setData({
        'keyword':e.detail.value          
      });
      if (e.detail.value === '') {
        // this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), {});
        this.setData({
          isNewest: true
        })
        dataToSet.list = this.cache;
        dataToSet.hasData = this.cache.length?true:false;
        this.setData(dataToSet);
      }
    },
    clickHistory:function(e){
      this.setData({
        'keyword':e.currentTarget.dataset.word
      });
      this.tapSearch();
    },
    clearHistory: function(e){
        wx.setStorageSync('history', []);
        this.setData({
          'history':[]
        });        
    },   
    tapBackground: function(e){
        if (e.target.id === 'historyBackground'){
          this.hideInput();
        }
    },
    tapSearch: function() {
        var history = this.data.history;
        this.hideInput();
        if (this.data.keyword.trim() === '') {
          if ( this.data.isNewest) {//是最新列表而非搜索页
            /*wx.showToast({
              'title': '关键词为空',
              'icon': 'loading',
              'duration': 1000
            });*/s
          }
          else{
            app.globalData.needReq = true;
            this.onShow();
          }
        }
        else{
          //go
          this.setData({
            isNewest: false
          });
          //进行搜索，设置非最新列表
          this.getInfo(
            [app.globalData.domain, 'webapi/jobsearch', ''].join('/'),
            {
              'content': this.data.keyword.trim()
            });
          if (history.indexOf(this.data.keyword) === -1){
            //保持4个历史
            history.unshift(this.data.keyword.trim());
            while(history.length > 4){
              history.pop();
            }
            wx.setStorageSync('history', history);
            this.setData({
              'history':history
            });
          }
        }
    },
    tapAbout: function() {
        wx.navigateTo({
          url: '../about/about'
        });
    },
    
    bindChange:function(e){
      var that = this;
      that.setData({ currentTab: e.detail.current });
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

     // 用户输入触发
     handleInput: function(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    // 点击清空输入框icon
    handleDeleteClick: function() {
      this.setData({
        inputValue: ''
      })
    },

    // 清除历史记录
    remove: function () {
    var _this = this
    wx: wx.showModal({
      content: '确认清除所有历史记录?',
      success: function (res) {
        if (res.confirm) {
          wx: wx.removeStorage({
            key: 'historyStorage',
            success: function (res) {
              _this.setData({
                historyStorage: []
              })
              wx.setStorageSync("historyStorage", [])
            },
          })
        } else {
          console.log("点击取消")
        }
      },
    })
  },
 
 
  /**
   * 获取input的值
   */
  getInputValue(e) {
    // console.log("获取value值",e.detail)   // {value: "ff", cursor: 2}
    this.setData({
      inputValue: e.detail.value
    })
    this.setData({
      searchresult: true,
    })
  },
   /**
   * 点击搜索提交跳转并存储历史记录
   */
  searchbegin: function (e) {
    let _this = this
    var data = e.currentTarget.dataset;
    _this.data.replaceValue = e.currentTarget.dataset.postname
    // _this.data.replaceValue = 
    wx: wx.setStorage({
      key: 'historyStorage',
      data: _this.data.historyStorage.concat(_this.data.inputValue),
      data: _this.data.historyStorage.concat(_this.data.replaceValue)
    })
    // console.log(_this.data.inputValue)
    // console.log(_this.data.historyStorage)
    wx.navigateTo({
      url: '../../commodity/commodity-search-list/index?postName=' + data['postname']
    })
  },



  
    
    

});


