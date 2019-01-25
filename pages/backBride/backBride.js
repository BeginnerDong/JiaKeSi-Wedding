import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();


Page({
  data: {
    marquee:-450,
    windowWidth:0,
    maxScroll:0,
    is_game:true
  },
  onLoad: function (options) {
    const self = this;
      self.data.windowWidth = wx.getSystemInfoSync().windowWidth;
      self.setData({
        marquee: -450,
      });

      self.data.maxScroll = self.data.windowWidth*2;
      
  },
  close(){
    const self = this;
    self.data.is_game =false;
    self.setData({
      is_game:self.data.is_game
    })
  },
  game(){
    const self = this;
    self.scrolltxt();
  },
  scrolltxt:function(){
    var self = this;
    var interval = setInterval(function () {
      var next = self.data.marquee-1;
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

  