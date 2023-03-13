// component/i-sortbar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        sortList:{
            type:Array,
            required:true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTab:0,
        showPopup:false,
        signal:0,
        qualificationList:[
          '不限','本科','硕士','博士','专科','其他'
        ],
        curQualification:0,
        curRecruitment:0,
        curIndustry:0,
        industryList:[
          '不限','IT|互联网|通信','金融','传媒|印刷|艺术|设计','房产|建筑|物业管理','咨询|法律|教育|翻译','其它'
        ]

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 转换排序方式
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
        // 下拉展示
        showPopup(){
          if(this.data.signal===0){
            this.setData({showPopup:true,signal:1})
          }else{
            this.setData({
              showPopup:false,
              signal:0,
              curQualification:0,
              curRecruitment:0,
              curIndustry:0
            })
          }
        },
        // 选择招聘方式
        swichRecruit(e){
          this.setData({curRecruitment:e.target.dataset.id})
        },
        // 选择学历
        swichQualification(e){
          this.setData({curQualification:e.target.dataset.id})
        },
        // 选择行业
        swichIndustry(e){
          this.setData({curIndustry:e.target.dataset.id})
        },
        // 重置按钮
        resetOptions(){
          this.setData({
            curQualification:0,
            curRecruitment:0,
            curIndustry:0
          })
        }
    }
})
