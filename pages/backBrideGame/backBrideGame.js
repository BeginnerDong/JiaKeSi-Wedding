import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();


Page({
  data: {
    marquee:-450,   //每次移动X坐标
    windowWidth:0,     //小程序宽度
    maxScroll:0,     //文本移动至最左侧宽度及文本宽度
  },
  onLoad: function (options) {
    const self = this;
      self.data.windowWidth = wx.getSystemInfoSync().windowWidth;
      self.setData({
        marquee: -450,
      });

      self.data.maxScroll = self.data.windowWidth*2;
      self.scrolltxt();
  },
  scrolltxt:function(){
    var self = this;
    var interval = setInterval(function () {
      var next = self.data.marquee-1; //每次移动距离
      console.log('next',self.data.maxScroll);

      if(Math.abs(next)>self.data.maxScroll){
        next = -self.data.windowWidth;
        clearInterval(interval);
        self.scrolltxt();
      }
      self.setData({
        marquee: next
      });
    }, 10);
  }
})

  