import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();


Page({
  data: {
    marquee:-450,
    windowWidth:0,
    maxScroll:0,
    is_game:true,
    move_count:0
  },
  onLoad: function (options) {
    const self = this;
      self.data.windowWidth = wx.getSystemInfoSync().windowWidth;
      self.setData({
        marquee: -450,
      });

      self.data.maxScroll = self.data.windowWidth*2;
      self.setData({
	  	web_move_count:self.data.move_count
	  });
  },

  click(){
  	const  self = this;
  	self.data.move_count = self.data.move_count+1;
  	self.setData({
  		web_move_count:self.data.move_count
  	});
  	self.gamelogAdd()
  },

   gamelogAdd(){
  	const self = this
  	const postData = {};
  	postData.tokenFuncName = 'getProjectToken';
  	postData.data = {
  		relation_id:self.data.id,
  		user_no:wx.getStorageSync('info').user_no,
  		count:self.data.move_count,
  	};
  	const callback = (res) =>{
  		console.log(res)
  	};
  	api.gamelogAdd(postData,callback)
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

  