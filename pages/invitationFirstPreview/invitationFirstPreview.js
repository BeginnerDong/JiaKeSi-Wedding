import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    startX: 0,
    startY: 0,
    isTouchMove:false,
    clientHeight: 0,
    web_scrollTop:0,
    scrollTop:0,
    scrollNumber:'two1',
    choose_gift:false,
    is_send:false,
    close:false,
    currentId:0,
    send_money:false,
  },
  
  onLoad(options){
    const self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.data.clientHeight = res.windowHeight;
        self.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },

  scroll(e){
    const self = this;
    self.data.scrollTop = e.detail.scrollTop
    var i=parseInt(self.data.scrollTop/self.data.clientHeight);
    console.log(999,self.data.scrollTop)
    if(i<=self.data.scrollTop/self.data.clientHeight){
      self.data.scrollNumber = "two"+(i+1);
    }else{
      self.data.scrollNumber = "two"+(i);
    }
    // var i=Math.ceil(self.data.scrollTop/self.data.clientHeight);
    // if(self.data.scrollTop>self.data.clientHeight*i){
    //   self.data.scrollNumber = "two"+i;
    // }else{
    //    self.data.scrollNumber = "two"+(i-1);
    // }
    self.setData({
      web_scrollTop:e.detail.scrollTop,
      web_scrollNumber:self.data.scrollNumber
    });

     console.log(66,self.data.scrollNumber);
  },

  touchstart: function (e) {
    const self = this;
    self.data.startY = e.changedTouches[0].clientY;
    this.setData({
     startX: e.changedTouches[0].clientX,
     startY: e.changedTouches[0].clientY,
    })
  },

  touchmove: function (e) {
    const self = this;
   var startX = self.data.startX;//开始X坐标
   var startY = self.data.startY;//开始Y坐标
   
   var touchMoveX = e.changedTouches[0].clientX;//滑动变化坐标
   var touchMoveY = e.changedTouches[0].clientY;//滑动变化坐标
   self.data.isTouchMove = true;
   if (startY > touchMoveY) {
    self.data.isTouchMove = true;
    console.log(self.data.isTouchMove)
    self.setData({
      web_isTouchMove:self.data.isTouchMove
    })
  }
},
  gift(e){
    const self = this;
    self.setData({
      choose_gift:true
    })
  },
  send_gift(){
    const self = this;
    self.setData({
      is_send:true,
      choose_gift:false,
    })
  },
  close(){
    const self = this;
    self.setData({
      is_send: false,
      send_money:false,
    })
  },
  send_money(){
    const self = this;
    self.setData({
      send_money: true,
    })
  },
  choose(e){
   this.setData({
      currentId:e.currentTarget.dataset.id
    })
  },
  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
})

  