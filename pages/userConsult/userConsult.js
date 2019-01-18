import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    
      submitData:{
        content:'',
        title:'',
        phone:'',
        type:7,
      },
      buttonCanClick:true
    },

  onLoad(options){
    const self = this;
    self.setData({
      web_buttonCanClick:self.data.buttonCanClick
    })
  },


  messageAdd(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    console.log('postData',postData)
    const callback = (res)=>{
      if(res.solely_code==100000){
        api.showToast('提交成功','none',1000);
        setTimeout(function(){
          self.intoPathRedi()
        },1000);
      };
      api.buttonCanClick(self,true);
    };
    api.messageAdd(postData,callback);
  },

  

  changeBind(e){
    const self = this;
    api.fillChange(e,self,'submitData');
    self.setData({
      web_submitData:self.data.submitData,
    });  
    console.log(self.data.submitData)
  },

  submit(){
    const self = this;
    api.buttonCanClick(self);
    const pass = api.checkComplete(self.data.submitData);
    if(pass){
      self.messageAdd();    
    }else{
      api.buttonCanClick(self,true);
      api.showToast('请补全信息','none',1000);   
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


  