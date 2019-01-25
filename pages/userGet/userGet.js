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

  onLoad(options){
    const self = this;
    api.commonInit(self);
    self.getMainData()

  },
  
  getMainData(isNew){
  	const self = this;
    if(isNew){
      api.clearPageIndex(self)
    };

    
    const postData={};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      type:6,
      user_no:wx.getStorageSync('info').user_no
    };
    postData.getAfter ={
      article:{
        tableName:'Article',
        middleKey:'relation_id',
        key:'id',
        searchItem:{
          status:1
        },
        condition:'='
      }
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
    api.messageGet(postData,callback);
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
})

  