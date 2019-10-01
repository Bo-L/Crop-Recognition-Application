// components/lessonInfo/lessonInfo.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */ 
  properties: {
    lesson_info: {
       type:Object,
       value:{}  
    },
    index:{
      type:"number",
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hide(){
      // this.setData({
      //   isShow:!this.data.isShow,
      // })
    },
    _lessonDetail:function(event){
      console.log("lessonDetail")
      var info = {
        index: event.currentTarget.dataset.index,
        lesson_info: event.currentTarget.dataset.lessonInfo
      }
       if (info.lesson_info.isPlant){
       this.triggerEvent("openDetail", info);
       }
    }
  }
})
