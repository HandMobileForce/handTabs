/**
 * Created by gusenlin on 16/5/16.
 */
//注册请求过滤器
angular.module('utilModule',[]).factory('httpRequestHeader', function () {
  var interceptor = {
    'request': function (config) {
      if (window.localStorage.token && window.localStorage.userName) {
        var timestamp = new Date().getTime();
        var token = CryptoJS.MD5(window.localStorage.token + timestamp);
        config.headers.timestamp = timestamp;
        config.headers.token     = token;
        config.headers.loginName = window.localStorage.userName;
      }
      return config;
    }
  };

  return interceptor;
});
