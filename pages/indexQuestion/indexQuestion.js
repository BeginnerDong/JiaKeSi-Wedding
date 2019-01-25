import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    is_answer:0,
    mainData:[],
    isFirstLoadAllStandard:['getMainData'],
    saveAfter:{}
  },


  onLoad(options){
    const self = this;
    api.commonInit(self);
    self.getMainData();
  },



  getMainData(isNew){
    const  self =this;
    if(isNew){
      api.clearPageIndex(self)
    };
    const postData={};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      type:3
    };
    postData.order = {
      listorder:'asc'
    };
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','none')
      };  
      api.buttonCanClick(self,true);
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.articleGet(postData,callback);
  },



  answer(e){
    const self = this;
    var index = api.getDataSet(e,'index');
    var option = api.getDataSet(e,'option');
    var answer = api.getDataSet(e,'answer')
    if(self.data.mainData[index].hasOption==option){
      self.data.mainData[index].hasOption = '';
      delete self.data.saveAfter[index];
    }else{
      self.data.mainData[index].hasOption = option;
      self.data.saveAfter[index] = {
        tableName:'Message',
        FuncName:'add',
        data:{
          passage1:self.data.mainData[index].id,
          title:self.data.mainData[index].title,
          keywords:answer,
          type:5,
          user_no:wx.getStorageSync('info').user_no,
          thirdapp_id:getApp().globalData.thirdapp_id,
          res:{relation_id:'id'}
        }
      };
    };
    /*if(JSON.stringify(self.data.saveAfter)!='{}'){
      for (var key in self.data.saveAfter) {
        postData.saveAfter.push(self.data.saveAfter[key])
      };
    };*/
    
    console.log('self.data.saveAfter',self.data.saveAfter)
    self.setData({
      web_mainData:self.data.mainData,
    })
  },

  messageAdd(){
    const self = this;
    var time = new Date().getFullYear()+'/'+ new Date().getMonth()+1+'/'+ new Date().getDate();
    console.log('time',time)
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.data = {
      type:4,
      title:time+'-'+wx.getStorageSync('info').nickname,
      user_no:wx.getStorageSync('info').user_no,
      res:{relation_id:'id'}
    };
    postData.saveAfter = [];  
    if(JSON.stringify(self.data.saveAfter)!='{}'){
      for (var key in self.data.saveAfter) {
        console.log(self.data.saveAfter[key])
        postData.saveAfter.push(self.data.saveAfter[key])
      };
    };
    console.log('postData',postData)

    const callback = (res)=>{
      if(res.solely_code==100000){
        /*api.showToast('提交成功','none',1000);
        setTimeout(function(){
          self.intoPathRedi()
        },1000);*/
      };
      api.buttonCanClick(self,true);
    };
    api.messageAdd(postData,callback);
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

  