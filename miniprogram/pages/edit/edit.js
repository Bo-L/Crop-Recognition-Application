// pages/edit/edit.js

const app = getApp();
const { regeneratorRuntime } = global

Page({
    /*** 页面的初始数据*/
    data: {
        imgArr:[],
        hideAdd: 0,
        loadingHidden: true,
        plant:[],
        result:[],
        acc:[],
        info:[],
        type:[],
        disease :[],
        level :[],
        symptom :[],
        prevent_cure :[],
        isPlant:[],
        number:[]
    },
  onShow: function () {
    // let self=this;
    // self.setData({
    //   imgArr: [],
    //   hideAdd: 0,
    //   loadingHidden: true,
    //   plant: [],
    //   result: [],
    //   acc: [],
    //   info: [],
    //   type: [],
    //   disease: [],
    //   level: [],
    //   symptom: [],
    //   prevent_cure: []
    // })
  },
   chooseImage:function(){
        let self = this;
        wx.chooseImage({
            count: 9,
            // sizeType: 'compressed',
            sourceType: ['album', 'camera'],
            success(res) {
              if (res.tempFilePaths.length > 0 ){
                let img_url = self.data.imgArr;
                for (let i = 0; i < res.tempFilePaths.length; i++) {
                  img_url.push(res.tempFilePaths[i])
                }
                  self.setData({
                   imgArr: img_url
                  })
                if (self.data.imgArr.length == 9) {
                  self.setData({
                    hideAdd: 1
                  })
                }
                else {
                  self.setData({
                    hideAdd: 0
                  })
                }
              }

                // tempFilePath可以作为img标签的src属性显示图片
                // self.setData({
                //     imgArr: res.tempFilePaths
                // })           
            },
        })
    },
    deleteImage:function(e){
      console.log(e)
      let self = this;
      let index = e.currentTarget.dataset.index;//获取当前长按图片下标
      console.log(index)
      let img_url = self.data.imgArr;
      let temp_plant = self.data.plant;
      let temp_result = self.data.result;
      let temp_acc = self.data.acc;
      let temp_info = self.data.info;
      let temp_type = self.data.type;
      let temp_disease = self.data.disease;
      let temp_level = self.data.level;
      let temp_symptom = self.data.symptom;
      let temp_prevent_cure = self.data.prevent_cure;
      let temp_isPlant = self.data.isPlant;
      let temp_number = self.data.number;
      wx.showModal({
        title: '提示',
        content: '确定要删除此图片吗',
        success(res){
          if(res.confirm){
            img_url.splice(index,1)
            temp_plant.splice(index, 1)
            temp_result.splice(index, 1)
            temp_acc.splice(index, 1)
            temp_info.splice(index,1)
            temp_type.splice(index, 1)
            temp_disease.splice(index, 1)
            temp_level.splice(index, 1)
            temp_symptom.splice(index, 1)
            temp_prevent_cure.splice(index, 1)
            temp_isPlant.splice(index, 1)
            temp_number.splice(index, 1)
            if (img_url.length<9){
              self.setData({
                hideAdd: 0
              })
            }
          }else{
            return false;
          }
          self.setData({
            imgArr:img_url,
            plant:temp_plant,
            result:temp_result,
            acc:temp_acc,
            info:temp_info,
            type:temp_type,
            disease:temp_disease,
            level:temp_level,
            symptom:temp_symptom,
            prevent_cure:temp_prevent_cure,
            isPlant:temp_isPlant,
            number:temp_number
          })
        }
      })
    },
    async requestPic(){
      console.log("requestPic");
      let self = this;
      var flag;
      
        self.setData(
          {
            loadingHidden: false,
            plant: [],
            result: [],
            acc: [],
            info: [],
            type: [],
            disease: [],
            level: [],
            symptom: [],
            prevent_cure: [],
            isPlant: [],
            number: []
          }
        )
        var tempFilePaths = self.data.imgArr;
        for (let i = 0; i < tempFilePaths.length; i++) { //循环执行图片上传、检测
          let imagePath = tempFilePaths[i];//待检测的图片路径
          flag= await self.upload(imagePath,i);
          console.log(i);
          console.log(flag);
        }
      //    self.setData({
      //   result: temp_result,
      //   plant: temp_plant,
      //   acc:temp_acc,
      //   info:temp_info,
      //   loadingHidden:true,
      //   type:temp_type,
      //   disease:temp_disease,
      //   level:temp_level,
      //   symptom:temp_symptom,
      //   prevent_cure:temp_prevent_cure
      // })

     
    },
    upload(filepath,i){
      let self=this;
      return new Promise((resolve,reject)=>{
        wx.uploadFile({
          url: 'https://deeppdr.machineilab.org/upload/', //检测病虫害的url
          formData: {
            number: i
          },
          filePath: filepath,
          name: 'img',
          success: function (res) { 
            //打印得到的返回数据
            // if (res.statusCode)
            if (res.statusCode) {
              console.log('pic '+i)
              let data = JSON.parse(res.data)
              console.log(data)
              self.data.number.push(data.number)
              self.data.isPlant.push(data.isPlant)
              self.data.result.push(data.result)
              self.data.plant.push(data.plant)
              self.data.acc.push(data.acc)
              self.data.info.push(data.info)
              self.data.type.push(data.type)
              self.data.disease.push(data.disease)
              self.data.level.push(data.level)
              self.data.symptom.push(data.symptom)
              self.data.prevent_cure.push(data.prevent_cure)
              resolve(1);
            } else {
              reject(0);
            }
          }
        })
      
      
      })
    },
    refreshData(){
      console.log("refreshData");
      let self=this;
      self.setData({
        loadingHidden: true
      })
      // return new Promise( (resolve, reject)=> {
      wx.navigateTo({
        url: '../result/result?imgArr=' + JSON.stringify(self.data.imgArr)+
          '&result=' + JSON.stringify(self.data.result)+
          '&plant=' + JSON.stringify(self.data.plant)+
          '&acc=' + JSON.stringify(self.data.acc)+
          '&info=' + JSON.stringify(self.data.info)+
          '&type='+ JSON.stringify(self.data.type)+
          '&disease=' + JSON.stringify(self.data.disease) +
          '&level=' + JSON.stringify(self.data.level) +
          '&symptom=' + JSON.stringify(self.data.symptom) +
          '&isPlant=' + JSON.stringify(self.data.isPlant) +
          '&prevent_cure=' + JSON.stringify(self.data.prevent_cure)+
          '&number=' + JSON.stringify(self.data.number) 
      })
      // })
  }, 
  async postData(){
     await this.requestPic();
     await this.refreshData();

  },
  
})