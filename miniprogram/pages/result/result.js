// pages/takeLessons/lessonList.js
var util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson_list: [
      // { "disease": "苹果黑腐病", "info": "发病地区多为东北地区", "acc": "准确率99.8%", "weekday": "周日", "time": "14:00-16:00", "state": 1, "plant": "苹果", "pic":"../../images/account.png"}
    ],
    top_text: "诊断结果如下:",
    height: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    });
    var time = util.formatTime(new Date());
    var pic = JSON.parse(options.imgArr);
    var result_list = JSON.parse(options.result);
    var plant = JSON.parse(options.plant);
    var acc = JSON.parse(options.acc);
    var info = JSON.parse(options.info);
    var type= JSON.parse(options.type);
    var disease = JSON.parse(options.disease);
    var level = JSON.parse(options.level);
    var symptom= JSON.parse(options.symptom);
    var prevent_cure = JSON.parse(options.prevent_cure);
    var isPlant=JSON.parse(options.isPlant);
    var number = JSON.parse(options.number)
    var that=this;
    let list = that.data.lesson_list
    console.log('跳转')
    console.log(pic)
    for (let i = 0; i < pic.length; i++) {
      let index=number[i]
      console.log(index)
      let strings = JSON.parse("{\"result\":" + "\"" + result_list[i] + "\" " + ","+
        "\"info\":" + "\"" + info[i] + "\" " + "," +
        "\"acc\":" + "\"" + acc[i] + "\" " + "," +
        "\"time\":" + "\"" + time+ "\" " + "," +
        "\"state\":" + 1 + "," +
        "\"plant\":" + "\"" + plant[i] + "\" " + "," +
        "\"pic\":" + "\"" + pic[index] + "\" " + "," +
        "\"type\":" + "\"" + type[i] + "\" " + "," +
        "\"disease\":" + "\"" + disease[i] + "\" " + "," +
        "\"level\":" + "\"" + level[i] + "\" " + "," +
        "\"symptom\":" + "\"" + symptom[i] + "\" " + "," +
        "\"prevent_cure\":" + "\"" + prevent_cure[i] + "\" " + "," +
        "\"isPlant\":" + isPlant[i]  +
        "}")

      list.push(strings)
    }
    console.log(list)
    that.setData({
      lesson_list: list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得lessonInfo组件
    this.lessonInfo = this.selectComponent("#lessonInfo");
    this.lessonDetail = this.selectComponent("#lessonDetail");
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 查看课程详情
  _openDetail(event) {
    console.log("openDetail")
    console.log(event.detail)
    this.lessonDetail.show(event.detail);
  }
})