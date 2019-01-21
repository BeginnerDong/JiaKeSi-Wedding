import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({


  data: {

 	isFirstLoadAllStandard:['feastUserGet']
  },


	onShow(){
	    const self = this;
	    if(wx.getStorageSync('info')&&wx.getStorageSync('info').info.married&&wx.getStorageSync('info').info.married!=0){
	        self.setData({
	          web_show:false
	        });
	        wx.redirectTo({
	          url: '/pages/scanBarrage/scanBarrage'
	        })
	    }
	},


    onLoad(options){
	    const self = this;
	    
    },
  
  	feastUserUpdate(e){
	  	const self = this;
	  	var married  = api.getDataSet(e,'married');
	  	const postData = {
			tokenFuncName:'getProjectToken',
			data:{
				married:married
			}
		};
		const callback = (res) =>{
			if(res.solely_code==100000){
				wx.redirectTo({
		          url: '/pages/scanBarrage/scanBarrage'
		        })
			};
		}
		api.feastUserUpdate(postData,callback)
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

  