import singer from './code';
import config from './api';
import axios from 'axios';

const common = function () {
  this.errorUrl = `${process.env.API_ROOT}404`; // 404
};
const root = process.env.API_ROOT;// 接口前缀地址
common.prototype = {
  detectmob() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true; // 移动端
    }
    return false;// pc端
  },
  is_weixn() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return true;
    }
    return false;
  },
  terminal() {
    if (navigator.userAgent.match(/Android/i)) {
      return false; // Android设备
    }
    return true; // iphone
  },
  setCookie(name, value, days) {
    const date = new Date;
    date.setTime(`${date.getTime()}24 * 60 * 60 * 1000 * days`);
    window.document.cookie = `${name}=${value};path=/;expires=${date.toGMTString()}`;
  },
  getCookie(cookiename) {
    let result;
    let start;
    let end;
    const mycookie = document.cookie;
    const isExist = mycookie.indexOf(`${cookiename}=`);
    if (isExist > -1) {
      start = mycookie.indexOf('=', isExist) + 1;
      end = mycookie.indexOf(';', start);
      if (end === -1) {
        end = mycookie.length;
      }
      result = unescape(mycookie.substring(start, end));
    }
    return result;
  },
  getUrlParams(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
  },
  /*
   @param callbackPath {string} 授权成功回传路径
   @return {Promise}
  */
  checkAuth(callbackPath) {
    //TODO 视情况是否判断 localstorage 兼容性
    callbackPath = callbackPath || window.location.href;
    var counselor = this.getUrlParams('counselor');

    return new Promise((resolve, reject) => {
      if(!counselor) reject(new Error("- no counselor"));
      if(localStorage.hasAuth == true){
        //存在
        resolve(true);
      }else{
        axios.get(config.api.checkAuth,{
          params:{
            counselor: counselor
          }
        })
        .then(function (res) {
          if(res.data.code == singer.code.SUCCESS){//已授权
            localStorage.hasAuth = true;
            resolve(true);
          }else if(res.data.code == singer.code.WEIXIN_USER_NOT_LOGIN){//未授权
            var url = 'https://singer.tdf.ministudy.com/auth/weixin/redirect-uri?redirect=';
            // console.log(url + encodeURIComponent(callbackPath));
            window.location.href = url + encodeURIComponent(callbackPath);
          }else{
            alert(res.data.message);
          }
        })
        .catch(function (err) {
          reject(err);
        });
      }
    });
  },
  /*
  发送日志方法
  @params route 发送路由
  @params data  携带信息
  {
  category: '',//enter,leave,error,load
  action: '',//
  desc: '',//备注
  par1: '',
  par2:'',
  _t: '',//时间
}
  */
  sendLog(route, data){

    data._t = new Date().getTime();


    let _self = this;
    let counselor = this.getUrlParams('counselor') || '';
    axios.defaults.headers.common['counselor'] = counselor;
    //获取deviceId 设置请求header
    axios.get(config.api.getDeviceId)
    .then(function (res) {
      console.log(res);
      if(res.data.code == singer.code.SUCCESS){
        axios.defaults.headers.common['deviceId'] = res.data.item.deviceId;
        _self.sendLog = function (route) {
          axios.post(config.api.log,{
            params:{
              url: encodeURIComponent(window.location.href),
              route: encodeURIComponent(route),
            }
          })
        }
        _self.sendLog(route);
      }
    });

  }
}
export default new common();
