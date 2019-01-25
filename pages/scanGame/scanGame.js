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
    if(options.feast_no){
    	self.data.feast_no = options.feast_no 	
    };  
    self.getMainData()
    
    
  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem = {
    	user_type:2,
    	type:1,
    	feast_no:self.data.feast_no
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
      	 self.data.mainData.push.apply(self.data.mainData,res.info.data)
      }else{
      	self.data.isLoadAll= true;
      	api.showToast('没有更多了','none')
      }
      self.setData({
      	web_mainData:self.data.mainData
      });
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);   
    };
    api.gameGet(postData,callback);
  },

   onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll&&self.data.buttonCanClick){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
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

  