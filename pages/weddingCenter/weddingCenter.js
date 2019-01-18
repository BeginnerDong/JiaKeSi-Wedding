import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();


Page({
  data: {
    is_show:false,
   mainData:[],
   cityData:[],
   getBefore:{},
   isFirstLoadAllStandard:['getCityData'],
   searchItem:{
   }
  },

  onLoad(options){
    const self = this;
    api.commonInit(self);
    self.data.title = options.city;
    self.data.searchItem.title = ['=',[self.data.title]];
   
    self.getCityData();
    self.getMainData();
    self.setData({
      web_title:self.data.title
    });
  },

  getCityData(){
    const  self =this;
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      type:12
    };
    postData.order = {
      create_time:'asc'
    };
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.cityData.push.apply(self.data.cityData,res.info.data);
      }
      api.buttonCanClick(self,true);
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getCityData',self);
      self.setData({
        web_cityData:self.data.cityData,
      });
    };
    api.labelGet(postData,callback);
  },

  getMainData(isNew){
    const  self =this;
    if(isNew){
      api.clearPageIndex(self)
    };
    const postData={};
    postData.paginate = api.cloneForm(self.data.paginate);
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      caseData:{
        tableName:'Label',
        searchItem:api.cloneForm(self.data.searchItem),
        middleKey:'parentid',
        key:'id',
        condition:'in',
      },
    }
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      api.buttonCanClick(self,true);
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.labelGet(postData,callback);
  },

  menu_show(e){
    const self = this;
    self.setData({
      is_show:true,
    })
  },


  menu_hide(e){
    const self = this;
    self.setData({
      is_show:false,
    })
  },

  select_city(e){
    const self = this;
    self.data.title = api.getDataSet(e,'title');
    console.log('self.data.title',self.data.title)
    self.data.searchItem.title = ['=',[self.data.title]];

    self.getMainData(true)
    self.setData({
      is_show:false,
      web_title:self.data.title
    })
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

  