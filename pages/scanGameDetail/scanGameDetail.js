import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
  	mainData:[],
 	isFirstLoadAllStandard:['getMainData']
  },


  onLoad(options) {
    const self = this;
    api.commonInit(self);  
    self.data.id = options.id;
    self.getMainData()
    
    
  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem = {
    	user_type:2,
    	id:self.data.id
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
      	 self.data.mainData=res.info.data[0];
      	 self.data.mainData.content = api.wxParseReturn(res.info.data[0].content).nodes;
      }
      self.setData({
      	web_mainData:self.data.mainData
      });
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);   
    };
    api.gameGet(postData,callback);
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

  