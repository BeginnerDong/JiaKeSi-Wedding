import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
    hasPopped: false,
    animationMain: {},
    animationOne: {},
    animationTwo: {},
    animationThree: {},
    pos: {},
    is_delete:false,
  },
  onLoad(options){

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

  