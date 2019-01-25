import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    totalData: [],
    startY: 0,
    total_number:2,
    move_count:0,
    is_game:true
  },
  onLoad(options){
    const self = this;
    for(var i = 0; i < self.data.total_number; i++) {
       self.data.totalData.push({
        url: '/images/img4@2x.jpg',
        isTouchMove: false
       })
      }
    self.setData({
      web_totalData: self.data.totalData,
      web_move_count:self.data.move_count
    })
  },
  beginGame(){
    const self = this;
    self.data.is_game = false;
    self.setData({
      is_game:self.data.is_game
    })
  },
  touchstart: function (e) {
    const self = this;
    self.data.totalData.forEach(function (v, i) {
     if (v.isTouchMove)
      v.isTouchMove = false;
    })
    self.data.startY = e.changedTouches[0].clientY
  },

  touchend: function (e) {
    const self = this;
    var index = e.currentTarget.dataset.index;
    var startY = self.data.startY;
    var endY = e.changedTouches[0].clientY;
    console.log(startY,endY);
    if (startY > endY) {
      self.data.move_count ++;
      self.data.totalData[index].isTouchMove = true;
    }else{
      self.data.totalData[index].isTouchMove = false;
    }
    self.setData({
     web_totalData:self.data.totalData,
     web_move_count:self.data.move_count,
    })
 },
 close(){
    const self = this;
    self.setData({
      is_close:false,
    })
  },
  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
})

  