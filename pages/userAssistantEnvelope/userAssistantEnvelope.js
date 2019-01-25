import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
   num:0,
   mainData:[],
   isFirstLoadAllStandard:['getMainData'],
   searchItem:{
     count:['>',0]
   }
  },

  onLoad(options){
    const self = this;
    api.commonInit(self);
    self.getUserInfoData();
    self.getMainData();
    self.setData({
      web_num:self.data.num
    })
  },

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self)
    };
    const postData = {};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.tokenFuncName = 'getThreeToken';
    postData.searchItem = api.cloneForm(self.data.searchItem);
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data)
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','none')
      }
      self.setData({
        web_mainData:self.data.mainData
      })
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self)
    };
    api.flowLogGet(postData,callback);   
  },

  getUserInfoData(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getThreeToken';
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.userData = res.info.data[0].balance
      };
      self.setData({
        web_userData:self.data.userData
      })
    };
    api.userInfoGet(postData,callback);   
  },

  tab(e){
    const self = this;
    var num = api.getDataSet(e,'num')
    api.buttonCanClick(self);
    if(num==1){
      self.data.searchItem ={
        count:['<',0],
        status:['in',[0,1]]
      }
    }else if(num==0){
      self.data.searchItem ={
        count:['>',0]
      }
    }
    self.getMainData(true);
    this.setData({
      web_num:num
    })
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

  