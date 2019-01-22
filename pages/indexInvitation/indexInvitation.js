import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
     indicatorDots: true,
      vertical: false,
      autoplay: false,
      circular: true,
      interval: 2000,
      duration: 500,
      previousMargin: 0,
      nextMargin: 0,
      swiperIndex:0,
      mainData:[],
      isFirstLoadAllStandard:['getMainData']
  },
  onLoad(options){
  	const self = this;
  	api.commonInit(self);
  	self.getMainData()
  },

  getMainData(){
    const  self =this;
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      type:4
    };
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data)
      };
      console.log(self.data.mainData)
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.articleGet(postData,callback);
  },

  upDateOrAdd(e){
  	const self = this;
  	var index = api.getDataSet(e,'index');
  	const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      type:6,
      user_no:wx.getStorageSync('info').user_no
    };
    const callback =(res)=>{
      if(res.info.data.length>0){
      	if(index==0){
      		wx.navigateTo({
		  	   url:"/pages/invitationFirstPreview/invitationFirstPreview?id="+res.info.data[0].id
		  	 })	
      	}  
      }else{
      	const c_postData = {
          tokenFuncName:'getProjectToken',
          data:{
            type:6,
            title:self.data.mainData[index].title,
            small_title:self.data.mainData[index].small_title,
            address:self.data.mainData[index].address,
            mainImg:self.data.mainData[index].mainImg,
            user_no:wx.getStorageSync('info').user_no,
            
            passage2:self.data.mainData[index].id,
            menu_id:21
          }	
      	};
      	const c_callback = (res) =>{
      		if(res.solely_code==100000){
      			wx.navigateTo({
			  	   url:"/pages/invitationFirstPreview/invitationFirstPreview?id="+res.info.id
			  	})	
      		}
      	};
      	api.articleAdd(c_postData,c_callback)
      } 
    };
    api.articleGet(postData,callback);
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  intoPathRedi(e){
    const self = this;
    wx.navigateBack({
      delta:1
    })
  },
  intoPathRedirect(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'redi');
  }, 
 
})

  