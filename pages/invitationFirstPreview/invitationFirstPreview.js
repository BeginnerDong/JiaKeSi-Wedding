import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    date: '2016-09-01',
    time: '12:01',
    clientHeight: 0,
    web_scrollTop:0,
    scrollTop:0,
    choose_gift:false,
    is_send:false,
    close:false,
    currentId:0,
    send_money:false,
    is_edit:false,
    marquee:0,   //每次移动X坐标
    windowHeight:130,     //小程序宽度
    maxScroll:0,     //文本移动至最左侧宽度及文本宽度
    scrollindex: 0,  //当前页面的索引值
    totalnum: 8,  //总共页面数
    starty: 0,  //开始的位置x
    endy: 0, //结束的位置y
    critical:0, //触发翻页的临界值
    margintop: 0,  //滑动下拉距离
    submitData:{
      title:'',
      small_title:'',
      address:'',
      passage1:'',
      type:4,
      menu_id:21,
      mainImg:{}
    },
    giftData:[],
    sForm:{
      content:''
    },
    money:{
      count:''
    },
    
    isFirstLoadAllStandard:['articleGet','giftDataGet','productData']
  },
  
  onLoad(options){
    const self = this;
    api.commonInit(self);
    self.data.id=options.id;
    if(options.type){
    	self.data.type=options.type	
    };
    
    wx.getSystemInfo({
      success: function (res) {
        self.data.clientHeight = res.windowHeight;
        self.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    self.setData({
      marquee: self.data.windowHeight
    });
    self.data.maxScroll = self.data.windowHeight * 2+60;
    if(options.scene){
      var scene = decodeURIComponent(options.scene)
    };
    if(options.user_no){
      self.messageAdd(options.user_no)
    };
    if(options.id){
      self.data.id = options.id
    };
    self.scrolltxt();
    self.articleGet();
    self.giftDataGet();
    self.productData();
    self.setData({
    	web_type:self.data.type
    })
  },

  articleGet(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      id: self.data.id
    };

    const callback = (res)=>{
      if(res.solely_code==100000){
        self.data.mainData = res.info.data[0];
        self.data.submitData.title = res.info.data[0].title;
        self.data.submitData.small_title = res.info.data[0].small_title;
        self.data.submitData.address = res.info.data[0].address;
        self.data.submitData.passage1 = res.info.data[0].passage1;
        self.data.submitData.mainImg = res.info.data[0].mainImg;
      }else{
        api.showToast('数据错误','none')
      }
      self.setData({
        web_submitData:self.data.submitData
      })
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'articleGet',self)
    };
    api.articleGet(postData,callback);
  },

  messageAdd(user_no){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.data = {
      type:6,
      passage1:user_no,
      relation_id:self.data.id
    };
    const callback = (res)=>{

    };
    api.messageAdd(postData,callback);
  },

  blessAdd(){
    const self = this;
    const postData = {};
    postData.tokenFuncName = 'getProjectToken';
    postData.data = {
      to_user_no:self.data.mainData.user_no,
      user_no:wx.getStorageSync('info').user_no,
      invite_id:self.data.id,
      content:self.data.sForm.content
    };
    const callback = (res)=>{

    };
    api.blessAdd(postData,callback);
  },

  giftDataGet(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      caseData:{
        tableName:'Label',
        searchItem:{
          title:['=',['礼物']],
        },
        middleKey:'category_id',
        key:'id',
        condition:'in',
      },
    };
    const callback = (res)=>{
      if(res.solely_code==100000){
        self.data.giftData.push.apply(self.data.giftData,res.info.data)
      }else{
        api.showToast('数据错误','none')
      }
      self.setData({
        web_giftData:self.data.giftData
      })
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'giftDataGet',self)
    };
    api.productGet(postData,callback);
  },

  productData(){
    const self = this;
    const postData = {};
    postData.searchItem = {
      thirdapp_id:getApp().globalData.thirdapp_id
    };
    postData.getBefore = {
      caseData:{
        tableName:'Label',
        searchItem:{
          title:['=',['红包']],
        },
        middleKey:'category_id',
        key:'id',
        condition:'in',
      },
    };
    const callback = (res)=>{
      if(res.solely_code==100000){
        self.data.productData = res.info.data[0]
      }else{
        api.showToast('数据错误','none')
      }
      api.checkLoadAll(self.data.isFirstLoadAllStandard,'productData',self)
    };
    api.productGet(postData,callback);
  },

  choose(e){
    const self = this;
    var index = api.getDataSet(e,'index');
    self.data.giftId  = self.data.giftData[index].id;
    self.data.price = self.data.giftData[index].price;
    this.setData({
      web_index:index
    })
  },

  addOrder(e){
    const self = this;
    if(!self.data.order_id){
      const postData = {
        tokenFuncName:'getProjectToken',   
        orderList:[
          {
            product:[
              {id:self.data.giftId,count:1}
            ],
            type:1, 
          }
        ], 
      };
      const callback = (res)=>{
        if(res&&res.solely_code==100000){
          self.data.order_id = res.info.id
          self.pay(self.data.order_id);          
        }else{
          api.showToast(res.msg,'none')
        };
      };
      api.addOrder(postData,callback);
    }else{
      self.pay(self.data.order_id)
    }   
  },

  addOrderTwo(e){
    const self = this;
    if(!self.data.order_id){
      const postData = {
        tokenFuncName:'getProjectToken',   
        orderList:[
          {
            product:[
              {id:self.data.productData.id,count:self.data.price}
            ],
            type:1, 
          }
        ], 
      };
      const callback = (res)=>{
        if(res&&res.solely_code==100000){
          self.data.order_id = res.info.id
          self.pay(self.data.order_id);          
        }else{
          api.showToast(res.msg,'none')
        };
      };
      api.addOrder(postData,callback);
    }else{
      self.pay(self.data.order_id)
    }   
  },

  pay(order_id){
    const self = this;
    var order_id = self.data.order_id;
    const postData = {
      tokenFuncName:'getProjectToken',
      searchItem:{
        id:order_id
      },
      pay:{score:0}
    };
    postData.payAfter = {
      flowLog:{
        tableName:'FlowLog',
        FuncName:'add',
        data:{
          type:2,
          count:self.data.price,
          user_no:self.data.mainData.user_no,
          trade_info:'礼物收入',
        }
      }
    }
    const callback = (res)=>{ 
      if(res.solely_code==100000){
        api.showToast('赠送成功','none')
        self.close()
      }else{
        api.showToast(res.msg,'none')
      }
         
    };
    api.pay(postData,callback);
  },

  scrollTouchstart: function (e) {
    const py = e.touches[0].pageY;
    this.setData({
      starty: py
    })
  },

  scrollTouchend: function (e) {
    const  self = this;
    const py = e.changedTouches[0].pageY;
    self.setData({
      endy: py,
    })
    console.log(e.changedTouches[0].pageY, self.data.starty);
    if (py - self.data.starty > self.data.critical && self.data.scrollindex > 0) {
      self.setData({
        scrollindex: self.data.scrollindex - 1
      })
    } else if (py - self.data.starty < -(self.data.critical) && self.data.scrollindex < self.data.totalnum - 1) {
     
      self.setData({
        scrollindex: self.data.scrollindex + 1
      })
    }
    self.setData({
      starty: 0,
      endy: 0,
      margintop: 0
    })
  },

  scrolltxt:function(){
    const self = this;
    var interval = setInterval(function () {
      var next = self.data.marquee-1; //每次移动距离
      if( next<0 && Math.abs(next)>self.data.maxScroll ){
        next = self.data.windowHeight;
        clearInterval(interval);
        self.scrolltxt();
      }
      self.setData({
        marquee: next
      });
    }, 30);
  },

  scroll(e){
    const self = this;
    self.data.scrollTop = e.detail.scrollTop
    var i=parseInt(self.data.scrollTop/self.data.clientHeight);
    if(i<=self.data.scrollTop/self.data.clientHeight){
      self.data.scrollNumber = "two"+(i+1);
    }else{
      self.data.scrollNumber = "two"+(i);
    }
    self.setData({
      web_scrollTop:e.detail.scrollTop,
      web_scrollNumber:self.data.scrollNumber
    });

  },

  upLoadImg(e){
    const self = this;
    var position = api.getDataSet(e,'position');
    if(self.data.submitData.mainImg.length>2){
      api.showToast('仅限3张','fail');
      return;
    };
    wx.showLoading({
      mask: true,
      title: '图片上传中',
    });
    const callback = (res)=>{
      console.log('res',res)
      if(res.solely_code==100000){

        self.data.submitData.mainImg[position] = {
          url:res.info.url
        };
        self.setData({
          web_submitData:self.data.submitData
        });
        wx.hideLoading()  
        console.log('self.data.submitData',self.data.submitData)
      }else{
        api.showToast('网络故障','none')
      }

    };

    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        console.log(callback)
        api.uploadFile(tempFilePaths[0],'file',{tokenFuncName:'getProjectToken'},callback)
      },
      fail: function(err){
        wx.hideLoading();
      }
    })
  },

  changeBind(e){
    const self = this;
    if(api.getDataSet(e,'value')){
      self.data.submitData[api.getDataSet(e,'key')] = api.getDataSet(e,'value');
    }else{
      api.fillChange(e,self,'submitData');
      api.fillChange(e,self,'sForm');
      api.fillChange(e,self,'money');
    };
    console.log(self.data.submitData);
    if(self.data.money){
      self.data.price = self.data.money.count
    };
    self.setData({
      web_money:self.data.money,
      web_sForm:self.data.sForm,
      web_submitData:self.data.submitData,
    });  
  },

  edit(e){
    const self = this;
    self.data.is_edit = !self.data.is_edit;
    self.setData({
      web_edit:self.data.is_edit
    })
  },

  gift(e){
    const self = this;
    self.setData({
      choose_gift:true
    })
  },

  close_gift(e){
    const self = this;
    self.setData({
      choose_gift:false
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
      choose_gift:false
    })
  },

  send_money(){
    const self = this;
    self.setData({
      send_money: true,
    })
  },

 

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  changeOpenTime(e) {
    const self = this;
    self.setData({
      time:e.detail.value
    })
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

})

  