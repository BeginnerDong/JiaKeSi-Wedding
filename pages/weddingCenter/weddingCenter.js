import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    is_show:false,
  },
  onLoad(options){

  },
 
  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
  menu_show(e){
    const self = this;
    self.setData({
      is_show:true,
    })
  },
  menu_hide(e){
    const self = this;
    self.setData({
      is_show:false,
    })
  },
  select_city(e){
    const self = this;
    self.data.is_select = e.currentTarget.dataset.id;
    self.setData({
      web_select:self.data.is_select 
    })
  },
})

  