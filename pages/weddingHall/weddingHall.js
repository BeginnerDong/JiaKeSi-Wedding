import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    current:0,
    array: ['分类1', '分类2', '分类3'],
    date:2017
  },
  onLoad(options){

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
  bindChooseDate(e) {
    this.setData({
      current: e.detail.value
    })
  },
  bindDateChange(e) {
    const self = this;
    self.setData({
      date: e.detail.value
    })
  },
})

  