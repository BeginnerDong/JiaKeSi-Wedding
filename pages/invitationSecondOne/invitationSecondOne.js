import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
     choose_gift:false,
     is_send:false,
     close:false,
     currentId:0,
     send_money:false,
  },
  onLoad(options){

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

  