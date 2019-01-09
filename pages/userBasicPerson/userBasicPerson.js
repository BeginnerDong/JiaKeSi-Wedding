import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    is_marriage:0,
    is_assets:0,
    is_gender:0,
  },
  onLoad(options){

  },
  marriage(e){
    const self = this;
    self.setData({
      is_marriage:e.currentTarget.dataset.id
    })
  },
  assets(e){
    const self = this;
    self.setData({
      is_assets:e.currentTarget.dataset.id
    })
  },
  gender(e){
    const self = this;
    self.setData({
      is_gender:e.currentTarget.dataset.id
    })
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

  