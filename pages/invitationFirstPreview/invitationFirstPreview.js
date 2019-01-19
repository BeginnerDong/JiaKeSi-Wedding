import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    date: '2016-09-01',
    time: '12:01',
    clientHeight: 0,
    web_scrollTop:0,
    scrollTop:0,
    choose_gift:false,
    is_send:false,
    close:false,
    currentId:0,
    send_money:false,
    is_edit:false,
    marquee:0,   //每次移动X坐标
    windowHeight:130,     //小程序宽度
    maxScroll:0,     //文本移动至最左侧宽度及文本宽度
    scrollindex: 0,  //当前页面的索引值
    totalnum: 8,  //总共页面数
    starty: 0,  //开始的位置x
    endy: 0, //结束的位置y
    critical:0, //触发翻页的临界值
    margintop: 0,  //滑动下拉距离
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
    self.setData({
      marquee: self.data.windowHeight
    });
    self.data.maxScroll = self.data.windowHeight * 2+60;
    self.scrolltxt();
  },
  scrollTouchstart: function (e) {
    const py = e.touches[0].pageY;
    this.setData({
      starty: py
    })
  },
  scrollTouchend: function (e) {
    const  self = this;
    const py = e.changedTouches[0].pageY;
    self.setData({
      endy: py,
    })
    console.log(e.changedTouches[0].pageY, self.data.starty);
    if (py - self.data.starty > self.data.critical && self.data.scrollindex > 0) {
      self.setData({
        scrollindex: self.data.scrollindex - 1
      })
    } else if (py - self.data.starty < -(self.data.critical) && self.data.scrollindex < self.data.totalnum - 1) {
     
      self.setData({
        scrollindex: self.data.scrollindex + 1
      })
    }
    self.setData({
      starty: 0,
      endy: 0,
      margintop: 0
    })
  },
  scrolltxt:function(){
    const self = this;
    var interval = setInterval(function () {
      var next = self.data.marquee-1; //每次移动距离
      if( next<0 && Math.abs(next)>self.data.maxScroll ){
        next = self.data.windowHeight;
        clearInterval(interval);
        self.scrolltxt();
      }
      self.setData({
        marquee: next
      });
    }, 30);
  },
  scroll(e){
    const self = this;
    self.data.scrollTop = e.detail.scrollTop
    var i=parseInt(self.data.scrollTop/self.data.clientHeight);
    if(i<=self.data.scrollTop/self.data.clientHeight){
      self.data.scrollNumber = "two"+(i+1);
    }else{
      self.data.scrollNumber = "two"+(i);
    }
    self.setData({
      web_scrollTop:e.detail.scrollTop,
      web_scrollNumber:self.data.scrollNumber
    });

  },
  edit(e){
    const self = this;
    self.data.is_edit = !self.data.is_edit;
    self.setData({
      web_edit:self.data.is_edit
    })
  },
  gift(e){
    const self = this;
    self.setData({
      choose_gift:true
    })
  },
  close_gift(e){
    const self = this;
    self.setData({
      choose_gift:false
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
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  changeOpenTime(e) {
    const self = this;
    self.setData({
      time:e.detail.value
    })
  },
  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
})

  