import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0
  },
  onLoad(options){
    const self = this;
    for (var i = 0; i < 10; i++) {
       self.data.items.push({
        url: '/images/img4@2x.jpg',
        isTouchMove: false //默认全隐藏删除
       })
      }
    self.setData({
     items: self.data.items
    })
    console.log(100,self.data.items)
  },
  touchstart: function (e) {
  //开始触摸时 重置所有删除
  this.data.items.forEach(function (v, i) {
   if (v.isTouchMove)//只操作为true的
    v.isTouchMove = false;
  })
  this.setData({
   startX: e.changedTouches[0].clientX,
   startY: e.changedTouches[0].clientY,
   items: this.data.items
  })
  },
  touchmove: function (e) {
  var that = this,
   index = e.currentTarget.dataset.index,//当前索引
   startX = that.data.startX,//开始X坐标
   startY = that.data.startY,//开始Y坐标
   touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
   touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
   //获取滑动角度
   angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
  that.data.items.forEach(function (v, i) {
   v.isTouchMove = false
   //滑动超过30度角 return
   
   //if (Math.abs(angle) > 1) return;
   
   // if (i == index) {
      console.log('startY',startY,'touchMoveY',touchMoveY);
    if (startY > touchMoveY) {

      v.isTouchMove = true
      console.log(v,v.isTouchMove)
    }
    else {
       v.isTouchMove = false
    }
    console.log(1,v.isTouchMove)
   // }
  })
  //更新数据
  that.setData({
   items: that.data.items
  })
 },
 /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
 angle: function (start, end) {
    var _X = end.X - start.X,
     _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
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

  