// component/i-picker/i-picker.js
Component({
    options:{
        addGlobalClass:true
    },
    /**
     * 组件的属性列表
     */
    properties: {
      show:{
          type:Boolean,
          value: false,
          
      },
      category: {
          type:Array,
          value:[1,2,3,4,5,6,7,8]
        }
      
    },

    /**
     * 组件的初始数据
     */
    data: {
    
        val:0   // 默认选中数据的第一条数据

    },

    /**
     * 组件的方法列表
     */
    methods: {

        bindClose:function(){
            console.log("bindClose")
          },
        bindButtonTap:function(e){
            console.log(e.detail)
            this.setData({show:false})
          },
        bindChange: function (e) {
            const val = e.detail.value
            // val:选中的下标
            this.setData({
                session: this.data.category[val],
                val:val  // 将选中的下标赋值到data里
            })
        },
        // 点击“取消”的事件
        hidePicker(){
            this.setData({
                show:false
            })
        },
        onClose(){
            
            console.log('你点击了取消');
            
            this.triggerEvent('cancelEvent') 
             // 这个是弹窗的显示隐藏

        },
        // 点击“确定”的事件
        onConfirm(e) {
            
            console.log('你点击了确定');
            
            this.triggerEvent('confirmEvent', this.data.category[this.data.val])
                 // 默认选择下标为0的数据
            show:false     
            
        },
        preventTouchMove(){

        },

    }
})