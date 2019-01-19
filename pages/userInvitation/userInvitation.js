import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
  	indicatorDots: true,
	vertical: false,
	autoplay: false,
	circular: true,
	interval: 2000,
	duration: 500,
	previousMargin: 0,
	nextMargin: 0,
	swiperIndex:0,
	mainData:[],  
    hasPopped: false,
    animationMain: {},
    animationOne: {},
    animationTwo: {},
    animationThree: {},
    pos: {},
    is_delete:false,
    mainData:[],
    isFirstLoadAllStandard:['getMainData']

  },
  onLoad(options){
  	const self = this;
  	api.commonInit(self);
  	self.getMainData();
  	self.data.index = self.data.swiperIndex;
  	console.log('self.data.index',self.data.index )
  },


  getMainData(){
    const  self =this;
    const postData={};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id,
      type:6,
      user_no:wx.getStorageSync('info').user_no
    };
    const callback =(res)=>{
      if(res.info.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.info.data)
      };
      console.log(self.data.mainData)
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'getMainData',self);
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.articleGet(postData,callback);
  },

  deleteArticle(){
    const  self =this;
    const postData={};
    postData.tokenFuncName = 'getProjectToken';
    postData.searchItem = {
      id:self.data.mainData[self.data.index].id
    };
    postData.data = {
    	status:-1
    };
    const callback =(res)=>{
      if(res.solely_code==100000){
        api.showToast('删除成功','none')
      };
      self.data.mainData = [];
      self.getMainData()
    };
    api.articleUpdate(postData,callback);
  },
  /****************菜单****************/
  popp() {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationFive = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(180).step()
    animationOne.translate(-40, -90).rotateZ(0).opacity(1).step()
    animationTwo.translate(-60, 0).rotateZ(0).opacity(1).step()
    animationFive.translate(-80, -50).rotateZ(0).opacity(1).step()
    this.setData({
      animationMain: animationMain.export(),
      animationOne: animationOne.export(),
      animationTwo: animationTwo.export(),
      animationFive: animationFive.export(),
    })
  },

  takeback() {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationFive = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(0).step();
    animationOne.translate(0, 0).rotateZ(0).opacity(0).step()
    animationTwo.translate(0, 0).rotateZ(0).opacity(0).step()
    animationFive.translate(0, 0).rotateZ(0).opacity(0).step()
    this.setData({
      animationMain: animationMain.export(),
      animationOne: animationOne.export(),
      animationTwo: animationTwo.export(),
      animationFive: animationFive.export(),
    })
  },

  menuMain () {
    if (!this.data.hasPopped) {
      this.popp()
      this.setData({
        hasPopped: true,
      })
    } else {
      this.takeback()
      this.setData({
        hasPopped: false,
      })
    }
  },

  swiperChange(e) {
    const self = this;
    self.data.index = e.detail.current
    console.log('self.data.index',self.data.index )
  },

  delete(){
    const self = this;
    self.is_delete = !self.is_delete;
    self.setData({
      web_is_delete:self.is_delete
    })
  },

  confirm(){
    const self = this;
    self.is_delete = false;
    self.setData({
      web_is_delete:self.is_delete
    })
  },

  cancle(){
    const self = this;
    self.is_delete = false;
    self.setData({
      web_is_delete:self.is_delete
    })
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

})

  