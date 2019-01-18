import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();
Page({
  data: {
    submitData:{
      name:'',
      phone:'',
      address:'',
      email:'', 
      level:'',
      passage1:'',

      gender:'',
      married:'',
      hasCar:'',
      hasHome:''
    },
    isFirstLoadAllStandard:['userInfoGet'],
  },


  onLoad: function () {
    const self = this;
    api.commonInit(self);  
    self.userInfoGet();
  },



  userInfoGet(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.submitData.name = res.info.data[0].info.name;
        self.data.submitData.phone = res.info.data[0].info.phone; 
        self.data.submitData.address = res.info.data[0].info.address;
        self.data.submitData.email = res.info.data[0].info.email;
        self.data.submitData.level = res.info.data[0].info.level;
        self.data.submitData.passage1 = res.info.data[0].info.passage1;
        self.data.submitData.gender = res.info.data[0].info.gender;
        self.data.submitData.hasCar = res.info.data[0].info.hasCar; 
        self.data.submitData.hasHome = res.info.data[0].info.hasHome; 
        self.data.submitData.married = res.info.data[0].info.married; 
      };
      self.data.mainData = res;
     
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'userInfoGet',self);
      self.setData({
        web_submitData:self.data.submitData,
      });
      
    };
    api.userGet(postData,callback);
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

  userInfoUpdate(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.data = {};
    postData.data = api.cloneForm(self.data.submitData);
    const callback = (data)=>{
      if(data.solely_code==100000){
        api.showToast('完善成功','none');

        setTimeout(function(){
          api.pathTo('/pages/user/user','rela')
        },1000);
      }else{
        api.showToast('网络故障','none')
      };
      api.buttonCanClick(self,true);
    };
    api.userInfoUpdate(postData,callback);
  },

  submit(){
    const self = this;
    api.buttonCanClick(self);
    var phone = self.data.submitData.phone;
    const pass = api.checkComplete(self.data.submitData);
    if(pass){
      if(phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)){
        api.buttonCanClick(self,true);
        api.showToast('手机格式不正确','none')
        
      }else{
        wx.showLoading();
        const callback = (user,res) =>{
          self.userInfoUpdate(); 
       };
       api.getAuthSetting(callback);   
     }
   }else{
      api.buttonCanClick(self,true);
      api.showToast('请补全信息','none');
     
   };
  },

  
})

  