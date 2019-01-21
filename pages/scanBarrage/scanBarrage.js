import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
      submitData:{
        content:'',
        relation_user_no:wx.getStorageSync('info').user_no
      },
      gameChatData:[],
      isFirstLoadAllStandard:['gameChatGet']
  },
  onLoad(options){
    const self = this;
    api.commonInit(self);
    self.gameChatGet()
  },
 
  
  gameChatGet(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self)
    };
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem = {
      user_type:0
    };
    postData.getAfter = {
      feastUser:{
        tableName:'FeastUser',
        middleKey:'relation_user_no',
        key:'user_no',
        searchItem:{
          status:1
        },
        condition:'='
      }
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.gameChatData.push.apply(self.data.gameChatData,res.info.data)
      }else{
        self.data.isLoadALL = true;
        api.showToast('没有更多了','none')
      }
      self.setData({
        web_gameChatData:self.data.gameChatData
      });
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'gameChatGet',self);   
    };
    api.gamechatGet(postData,callback);
  },


  changeBind(e){
    const self = this;
    if(api.getDataSet(e,'value')){
      self.data.submitData[api.getDataSet(e,'key')] = api.getDataSet(e,'value');
    }else{
      api.fillChange(e,self,'submitData');
    };
    console.log(self.data.submitData);
    self.setData({
      web_submitData:self.data.submitData,
    });  
  },

  gamechatAdd(){
    const self = this;
    api.buttonCanClick(self);
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    const callback = (data)=>{
      if(data.solely_code==100000){
        api.showToast('发送成功','none');
        self.data.submitData.content = '';

      }else{
        api.showToast('网络故障','none')
      };
      self.data.mainData = [];
      self.gameChatGet(true);
      api.buttonCanClick(self,true);
      self.setData({
        web_submitData:self.data.submitData
      })
    };
    api.gamechatAdd(postData,callback);
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

  