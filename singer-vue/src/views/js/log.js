import singer from './code';
import config from './api';
import axios from 'axios';
import router from '../../router';
import Vue from 'vue';
/*
数据说明：
data = {
  category: ‘’，
      // [ //类型  目前定义以下几个
      //   '_event',
      //   '_error',
      //   '_load',
      //   '_leave',
      // ],
  action: '',//指令  如：click 、 loadtime 等 用来丰富分类
  desc: '', //传达的主要信息  如：页面加载了45ms，xx按钮被点击 等
  par1: '', //其他备注
  par2: '', //其他备注
}

使用方法：
1.import singerLog from '/path'
2.Vue.use(singerLog)
3.主动发送日志：singerLog.sendLog(category, action, desc, par1, par2);
4.实例内主动发送日志：this.singerLog(category, action, desc, par1, par2)
5.指令 v-singerLog:eventName='value' 给元素绑定‘eventName’事件监听，发送日志
  等同于 singerLog('_event', eventName, value, '','')

默认监听：

每个日志自带参数： location.href, route, deviceId, counselor, _t
页面加载时间: '_load' 'loadtime' 30ms
离开时页面滚动位置: '_leave' 'position' 0
js错误: '_error' 'pageError' errMsg
*/

function Log() {
  var _self = this;
  var _listener = function () {
    /* 统计页面加载时间 */
    localStorage.startTime = new Date().getTime();
    window.onload = function (e) {
      _self.sendLog('_capability','loadTime',new Date().getTime() - Number(localStorage.startTime));
    }
    window.onbeforeunload = function (e) {
      let top = document.documentElement ?
        document.documentElement.scrollTop : document.body.scrollTop;
        _self.sendLog('_leave', 'position', top);
    }
    window.onerror = function (msg, uri, line) {
      _self.sendLog('_error', 'pageError', msg);
    }
  }

  //发送日志
  this.sendLog = function (category, action, desc, par1, par2) {

    axios.defaults.headers.common['counselor'] = window.counselor || '';

    axios.get(config.api.getDeviceId)
    .then(function (res) {
      if(res.data.code == singer.code.SUCCESS){
        //设置deviceId header
        axios.defaults.headers.common['deviceId'] = res.data.item.deviceId;
        axios.defaults.headers.common['planet'] = 'H5';
        _self.sendLog = function (_category, _action, _desc, _par1, _par2){
          var _t = new Date().getTime();
          var data = {
            action: _action,
            content: _desc,
            remarks: _par1 || ''
          };

          var curRoute = router.currentRoute;
          var weapons = (sessionStorage.weapons || '').split(',');
          var len = weapons.length;
          var weapon = weapons[len-1] || '',
              fromWeapon = weapons[len-2] || '';
          axios.post(config.api.log,{
            weapon: weapon,//武器唯一标志
            fromWeapon: fromWeapon,
            url: window.location.href,
            route: curRoute.path,
            query: curRoute.query,
            event: _category,
            data: data
          });
        }
        _listener();
        _self.sendLog(category, action, desc, par1, par2);
      }
    });

  }

  // 注册插件
  this.install = function (Vue, options) {
    // 注册一个全局自定义指令 `v-singerlog:click`
    Vue.directive('singerlog', function (el, binding) {
      el.addEventListener(binding.arg, function (e) {
        _self.sendLog('_event', binding.arg, binding.value);
      });
    })
    //全局添加方法
    Vue.mixin({
      methods:{
        singerLog: _self.sendLog,
        addLeaveListener:function (func) {
          window.addEventListener('beforeunload',function (e) {
            func();
          });
        },
        //el 媒体对象
        addVideoLeaveListener: function (el) {
          this.addLeaveListener(function (e) {
            alert('hhh');
            console.log(el);
            //视频未播放结束 添加日志
            if(el.ended){
              this.singerlog('_leave',el.targetName, 'ended', 'allTime:'+el.duration);
            }else{
              this.singerlog('_leave',el.targetName, el.currentTime, 'allTime:'+el.duration);
            }
          });
        }
      }
    });
  }
}

var SingerLog = new Log();
export default SingerLog;
