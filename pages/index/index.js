import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();


Page({
  data: {
    background: ['/images/banner.jpg', '/images/banner.jpg', '/images/banner.jpg'],
    sliderData:['/images/banner.jpg', '/images/banner.jpg', '/images/banner.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    swiperIndex:0,
    swiperBig:0,
    submitData:{
      city:'',
      district:''
    },
    sForm:{
      item:'' 
    },
    sliderData:[],
    articleData:[],
    articleTwoData:[],
    articleThreeData:[],
    articleFourData:[],
    isFirstLoadAllStandard:['getLocation','getSliderData','getArticleData','getArticleTwoData','getArticleThreeData','getArticleFourData']
  },
  
 
  onLoad() {
    const self = this;
    api.commonInit(self);
    self.getLocation();
    self.getSliderData();
    self.getArticleData();
    self.getArticleTwoData();
    self.getArticleThreeData();
    self.getArticleFourData()
  },

  getSliderData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      caseData:{
        tableName:'Label',
        searchItem:{
          title:['=',['首页轮播']],
        },
        middleKey:'parentid',
        key:'id',
        condition:'in',
      },
    };
    postData.order = {
      listorder:'desc'
    };
    const callback = (res)=>{ 
      console.log(1000,res);
      if(res.info.data.length>0){
       self.data.sliderData.push.apply(self.data.sliderData,res.info.data)
      }
      self.setData({
        web_sliderData:self.data.sliderData,
      });
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getSliderData',self);
    };
    api.labelGet(postData,callback);
  },

  getArticleData(){
    const  self =this;
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      partner:{
        tableName:'Label',
        searchItem:{
          title:['=',['三生一刻']],
        },
        middleKey:'menu_id',
        key:'id',
        condition:'in',
      },
    }
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.articleData.push.apply(self.data.articleData,res.info.data)
      };
      console.log(self.data.articleData)
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getArticleData',self);
      self.setData({
        web_articleData:self.data.articleData,
      });
    };
    api.articleGet(postData,callback);
  },

  getArticleTwoData(){
    const  self =this;
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      partner:{
        tableName:'Label',
        searchItem:{
          title:['=',['婚礼堂']],
        },
        middleKey:'menu_id',
        key:'id',
        condition:'in',
      },
    }
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.articleTwoData.push.apply(self.data.articleTwoData,res.info.data)
      };
      console.log(self.data.articleTwoData)
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getArticleTwoData',self);
      self.setData({
        web_articleTwoData:self.data.articleTwoData,
      });
    };
    api.articleGet(postData,callback);
  },

  getArticleThreeData(){
    const  self =this;
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      partner:{
        tableName:'Label',
        searchItem:{
          title:['=',['首页底部轮播']],
        },
        middleKey:'menu_id',
        key:'id',
        condition:'in',
      },
    }
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.articleThreeData.push.apply(self.data.articleThreeData,res.info.data)
      };
      console.log(self.data.articleThreeData)
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getArticleThreeData',self);
      self.setData({
        web_articleThreeData:self.data.articleThreeData,
      });
    };
    api.articleGet(postData,callback);
  },

  getArticleFourData(){
    const  self =this;
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      partner:{
        tableName:'Label',
        searchItem:{
          title:['=',['最美瞬间']],
        },
        middleKey:'menu_id',
        key:'id',
        condition:'in',
      },
    }
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.articleFourData.push.apply(self.data.articleFourData,res.info.data);
        if(res.info.data.length>3){
          self.data.articleFourData = self.data.articleFourData.slice(0,3) 
        }
      };

      console.log(self.data.articleFourData)
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getArticleFourData',self);
      self.setData({
        web_articleFourData:self.data.articleFourData,
      });
    };
    api.articleGet(postData,callback);
  },

  getLocation() {
    const self = this;
    const callback = (res)=>{
      if(res){
        self.data.submitData.city = res.address_component.city,
        self.data.submitData.district = res.address_component.district
      };
      self.setData({
        web_submitData:self.data.submitData
      });
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getLocation',self)
    };
    api.getLocation('reverseGeocoder',callback); 
  },

  inputChange(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    self.setData({
      web_sForm:self.data.sForm,
    });  
    console.log(self.data.sForm)
  },

  /**************轮播*****************/
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
  swiperChangeBig(e) {
    const that = this;
    that.setData({
      swiperBig: e.detail.current,
    })
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  intoPathRedirect(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'redi');
  }, 
})

  