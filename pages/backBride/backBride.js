import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
  
  },
  onLoad(options){
    const self = this;
   
  },
 

 close(){
    const self = this;
    setData({
      is_close:false,
    })
  },
  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
})

  