import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
     date: '2016-09-01',
    time: '12:01',
    scrollNumber:'two1',
    web_scrollTop:0,
    clientHeight: 0,
    startY:0,
    endY:0,
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
    if(i<self.data.scrollTop/self.data.clientHeight){
      self.data.scrollNumber = "two"+(i+1);
    }else{
      self.data.scrollNumber = "two"+(i);
    }
    self.setData({
      web_scrollTop:e.detail.scrollTop,
      web_scrollNumber:self.data.scrollNumber
    });
  },
  touchstart(e){
      const self = this;
      self.data.startY=e.changedTouches[0].clientY;
      console.log("Y1",self.data.startY);
  },
  touchend(e){
        const self = this;
      self.data.endY=e.changedTouches[0].clientY;
      console.log("Y",self.data.endY);
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
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
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
})

  