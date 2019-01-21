import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
 	isFirstLoadAllStandard:['feastGet','userGet']
  },


  onLoad(options) {
    const self = this;
    api.commonInit(self);  
    self.data.feast_no = options.feast_no
    self.userGet();
    
    
  },

  userGet(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    const callback = (res)=>{
      if(res.info.data.length>0){
        self.data.userData = res.info.data[0]
      };
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'userGet',self);
      self.feastGet();
    };
    api.userGet(postData,callback);
  },

  feastGet(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem = {
    	feast_no:self.data.feast_no,
    	user_type:2
    };
    postData.getAfter = {
    	feastUser:{
    		tableName:'FeastUser',
    		middleKey:'feast_no',
    		key:'feast_no',
    		searchItem:{
    			status:1
    		},
    		condition:'='
    	}
    };
    const callback = (res)=>{
      if(res.info.data.length>0){
      	self.data.feastData = res.info.data[0];
        if(res.info.data[0].feastUser.length==0){
        	const c_postData = {
        		tokenFuncName:'getProjectToken',
        		data:{
        			feast_no:self.data.feast_no,
        			nick_name:self.data.userData.nickname,
        			headImgUrl:self.data.userData.headImgUrl,
        			phone:self.data.userData.info.phone,
        			gender:self.data.userData.info.gender,
        			married:self.data.userData.info.married,
        			user_no:self.data.userData.user_no,
        			isSign:1
        		}
        	};
        	const c_callback = (res) =>{
        		console.log('feastuserAdd',res)
        		self.feastGet()
        	}
        	api.feastuserAdd(c_postData,c_callback)
        }
      };   
      self.setData({
      	web_feastData:self.data.feastData
      });
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'feastGet',self);   
    };
    api.feastGet(postData,callback);
  },


  feastUserSign(){
  	const self = this;
  	api.buttonCanClick(self);
  	const postData = {
		tokenFuncName:'getProjectToken',	
		data:{
			isSign:2
		}
	};
	const callback = (res) =>{
		if(res.solely_code==100000){
			api.showToast('签到成功','none')
			self.data.feastData.feastUser[0].isSign = 2;
		}
		console.log('self.data.feastData',self.data.feastData)
		self.setData({
	      web_feastData:self.data.feastData
	    });
		api.buttonCanClick(self,true)
	}
	api.feastuserUpdate(postData,callback)
  },


  intoPathRedi(e){
    const self = this;
    wx.navigateBack({
      delta:1
    })
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
  
})

  