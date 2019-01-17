import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
 	mainData:[],
    isFirstLoadAllStandard:['getMainData'],
  },


  onLoad(options){
  	const self = this;
  	api.commonInit(self);
  	self.getMainData()
  },


   getMainData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      title:'视频',
      thirdapp_id:'2'
    };
    const callback = (res)=>{ 
      if(res.info.data.length>0){
        self.data.mainData = res.info.data[0]
      };
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });	
    };
    api.labelGet(postData,callback);
  },
 
  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },


})

  