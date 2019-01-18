import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    mainData:[],
    index:0,
    styleData:[],
    date:2017,
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
      type:2
    },
    isFirstLoadAllStandard:['getMainData','getStyleData'],
    order:{}
  },
  onLoad(options){
    const self = this;
    api.commonInit(self);
    if(options.item){
      self.data.searchItem.title =  ['LIKE',['%'+options.item+'%']]
    };
    self.data.searchItem.menu_id = options.id;
    self.getMainData();
    self.getStyleData()
    /*self.setData({
      web_index:self.data.index
    })*/
  },


  getStyleData(){
    const  self =this;
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      partner:{
        tableName:'Label',
        searchItem:{
          title:['=',['风格']],
        },
        middleKey:'parentid',
        key:'id',
        condition:'in',
      },
    }
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.styleData.push.apply(self.data.styleData,res.info.data)
      };
      console.log(self.data.styleData)
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getStyleData',self);
      self.setData({
        web_styleData:self.data.styleData,
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
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.order = api.cloneForm(self.data.order);
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','none')
      };  
       setTimeout(function()
      {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },300);
      api.buttonCanClick(self,true);
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.articleGet(postData,callback);
  },

  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll&&self.data.buttonCanClick){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },

  onPullDownRefresh(){
    const self = this;
    wx.showNavigationBarLoading(); 
    self.data.order = {};
    delete self.data.searchItem.keywords;
    delete self.data.searchItem.title;
    self.setData({
      web_order:self.data.order
    });
    self.getMainData(true);
  },


  changeOrder(e){
    const self = this;
    api.buttonCanClick(self);
    const key = api.getDataSet(e,'key');
    self.data.order = {
      [key]:self.data.order[key]=='asc'?'desc':'asc'
    };
    self.setData({
      web_order:self.data.order,
      web_index:999
    });
    self.getMainData(true);
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


  styleChange(e) {
    const self = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(self.data.styleData[e.detail.value].id)
    self.data.searchItem.keywords = self.data.styleData[e.detail.value].id;
    self.getMainData(true);
    self.setData({
      web_index:e.detail.value,
    })
  },

  bindDateChange(e) {
    const self = this;
    self.setData({
      date: e.detail.value
    })
  },
})

  