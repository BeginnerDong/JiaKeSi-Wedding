import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
     indicatorDots: true,
      vertical: false,
      autoplay: false,
      circular: true,
      interval: 2000,
      duration: 500,
      previousMargin: 0,
      nextMargin: 0,
      swiperIndex:0,
  },
  onLoad(options){

  },
  bindNoticeDate(e) {
    const self = this;
    self.setData({
      noticeDate:e.detail.value
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

  