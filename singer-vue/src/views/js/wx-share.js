import singer from './code';
import config from './api';
import axios from 'axios';
import wx from 'weixin-js-sdk';

export default {
  sign:{
  },
  getSign(){
    axios({
      url:config.api.getSign,
      method:'get'
    })
    .then(response =>{
      this.sign = response.data;
      console.log(this.sign)
    })
  },
  getAjax(url){
  	var promise = new Promise((resolve,reject) => {
			axios({
				url:url,
				method:'get'
			})
			.then(response => {
				resolve(response.data);
			})
		});
		return promise;
  },
  wxDefaultShare(constName){
  	this.getSign();
  	this.getAjax(config.api.getProductConst+constName)
  	.then(data => {
  		wx.config({
        debug: this.sign.debug,
        appId:this.sign.item.appId,
        timestamp:this.sign.item.timestamp,
        nonceStr:this.sign.item.nonceStr,
        signature:this.sign.item.signature,
        jsApiList: [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ]
    	});
	    wx.ready(function(){
	      wx.onMenuShareTimeline({
	        title:data.item.title, // 分享标题
	        imgUrl:data.item.shareImg, // 分享图标
	        link: data.item.mlinkUrl, // 分享链接
	        success: function () {
            return true;
	        },
	        cancel: function () {
            // 用户取消分享后执行的回调函数
	        },
	        fail: function () {
	          alert('服务器生气了,程序员哥哥正在安慰它!!!');
	        }
	      });

	      wx.onMenuShareAppMessage({
	        title:data.item.title, // 分享标题
	        desc:data.item.shareDesc, // 分享描述
	        imgUrl:data.item.shareImg, //
	        link: data.item.mlinkUrl, // 分享链接
	        success: function () {
	        // 用户确认分享后执行的回调函数
	        	return true;
	        },
	        cancel: function () {
	          // 用户取消分享后执行的回调函数
	        },
	        fail: function () {
	          alert('服务器生气了,程序员哥哥正在安慰它!!!');
	        }
	      });
	      wx.onMenuShareQQ({
	        title:data.item.title, // 分享标题
	        desc:data.item.shareDesc, // 分享描述
	        imgUrl:data.item.shareImg, //
	        link: data.item.mlinkUrl, // 分享链接
	        success: function () {
	          // 用户确认分享后执行的回调函数
	          return true;
	        },
	        cancel: function () {
	          // 用户取消分享后执行的回调函数
	        },
	        fail: function () {
	          alert('服务器生气了,程序员哥哥正在安慰它!!!');
	        }
	      });
	  	});
  	})
  },
  wxShare(title,desc,imgUrl,link){
  	this.getSign();	
    wx.config({
      debug: this.sign.debug,
      appId:this.sign.item.appId,
      timestamp:this.sign.item.timestamp,
      nonceStr:this.sign.item.nonceStr,
      signature:this.sign.item.signature,
      jsApiList: [
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    });
    wx.ready(function(){
      wx.onMenuShareTimeline({
        title:title, // 分享标题
        imgUrl:imgUrl, // 分享图标
        link: link, // 分享链接
        success: function () {
          // 用户确认分享后执行的回调函数
          return true;
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        },
        fail: function () {
          alert('服务器生气了,程序员哥哥正在安慰它!!!');
        }
      });

      wx.onMenuShareAppMessage({
        title:title, // 分享标题
        desc:desc, // 分享描述
        imgUrl:imgUrl, //
        link: link, // 分享链接
        success: function () {
        	// 用户确认分享后执行的回调函数
        	return true;
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        },
        fail: function () {
          alert('服务器生气了,程序员哥哥正在安慰它!!!');
        }
      });
      wx.onMenuShareQQ({
        title:title, // 分享标题
        desc:desc, // 分享描述
        imgUrl:imgUrl, //
        link: link, // 分享链接
        success: function () {
          // 用户确认分享后执行的回调函数
          return true;
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        },
        fail: function () {
          alert('服务器生气了,程序员哥哥正在安慰它!!!');
        }
      });
    });
  }
}
