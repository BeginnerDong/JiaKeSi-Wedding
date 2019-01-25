import {Api} from '../../utils/api.js';
var api = new Api();
const app = getApp();
import {Token} from '../../utils/token.js';
const token = new Token();

Page({
  data: {
  	is_game:false,
  },
  onLoad(options){
  	const self = this;
  },

	game(){
		const self = this;
		self.data.is_game = !self.data.is_game;
		self.setData({
			is_game:self.data.is_game
		})
	},

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  }, 
})

  