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
  },
  
 
  onLoad() {
    const self = this;
    self.data.paginate = getApp().globalData.paginate;


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

  