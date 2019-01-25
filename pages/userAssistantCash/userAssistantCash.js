import {Api} from '../../utils/api.js';
var api = new Api();

import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {

    submitData:{
      count:'',
      cardNum:''
    },
    isFirstLoadAllStandard:['getUserInfoData']


  },



  onLoad(){
    const self = this;
    api.commonInit(self);
    self.getUserInfoData();
  },





  changeBind(e){
    const self = this;
    api.fillChange(e,self,'submitData');

    console.log(self.data.submitData);
    self.setData({
      web_submitData:self.data.submitData,
    }); 
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },


  flowLogAdd(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getThreeToken';
    postData.data={
        user_no:wx.getStorageSync('threeInfo').user_no,
        count:-self.data.submitData.count,
        cardNum:self.data.submitData.card,
        trade_info:'提现',
        status:0,
        type:2
    };
    console.log('postData',postData)
    const callback = (res)=>{
      if(res.solely_code==100000){
        api.showToast('申请成功','none',1000);
        setTimeout(function(){
          self.intoPathBack()
        },1000);
      };
      api.buttonCanClick(self,true);
    };
    api.flowLogAdd(postData,callback);
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
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getUserInfoData',self)
    };
    api.userInfoGet(postData,callback);   
  },
  

  submit(){
    const self = this;
    api.buttonCanClick(self);
    var num = self.data.submitData.count;
    const pass = api.checkComplete(self.data.submitData);
    if(pass){  
      console.log(self.data.userData)
      if(self.data.userData&&parseInt(self.data.userData)>=num){
          self.flowLogAdd();  
     }else{
        api.buttonCanClick(self,true);
        api.showToast('余额不足','none');  
      }
    }else{
      api.buttonCanClick(self,true);
      api.showToast('请输入提现金额','none');
    };
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  intoPathBack(e){
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

  