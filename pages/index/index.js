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
    sliderData:[],
    isFirstLoadAllStandard:['getLocation','getSliderData']
  },
  
 
  onLoad() {
    const self = this;
    api.commonInit(self);
    self.getLocation();
    self.getSliderData()
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

  getLocation() {
    const self = this;
    const callback = (res)=>{
      if(res){
        self.data.submitData.city = res.address_component.city,
        self.data.submitData.district = res.address_component.district
      };
      self.setData({
        web_submitData:self.data.submitData
      })
    };
    api.getLocation('reverseGeocoder',callback);
    api.checkLoadAll(self.data.isFirstLoadAllStandard,'getLocation',self)
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

  