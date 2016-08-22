/**
 * Created by admin
 */

function detectOS() {
  var sUserAgent = navigator.userAgent;
  var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") ||
    (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  if (isMac) return "Mac";
  var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
  if (isUnix) return "Unix";
  var isLinux = (String(navigator.platform).indexOf("Linux") > -1);

  var isPhone = (navigator.platform == "iPhone");
  if (isPhone) {
    return "iPhone";
  }

  var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
  if (isLinux) {
    if (bIsAndroid) return "Android";
    else return "Linux";
  }
  if (isWin) {
    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
    if (isWin2K) return "Win2000";
    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 ||
      sUserAgent.indexOf("Windows XP") > -1;
    if (isWinXP) return "WinXP";
    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
    if (isWin2003) return "Win2003";
    var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
    if (isWinVista) return "WinVista";
    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
    if (isWin7) return "Win7";
  }
  return "other";
}


/**
 * ==============================公用方法==============================
 * 1、ios和Android客户端
 * 2、判断iphone型号
 * 3、判断什么网络
 * 4、日期转换
 * 5、object TO String
 * 6、判断数组中是否含有某个元素
 * 7、判断输入是否为十一位电话号码
 * 8、邮件格式
 * 9、获得UUID
 * 10、判断当前字符串是否为空
 *
 */

//是否是ios和Android客户端
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

//判断iphone型号  注意版本的更新：https://www.theiphonewiki.com/wiki/Models
var translateModel = function (model) {
  if (model == "iPhone1,1") {
    return "iPhone 2G";
  }
  else if (model == "iPhone1,2") {
    return "iPhone 3G";
  }
  else if (model == "iPhone2,1") {
    return "iPhone 3GS";
  }
  else if (model == "iPhone3,1") {
    return "iPhone 4";
  }
  else if (model == "iPhone3,2") {
    return "iPhone 4";
  }
  else if (model == "iPhone3,3") {
    return "iPhone 4";
  }
  else if (model == "iPhone4,1") {
    return "iPhone 4S";
  }
  else if (model == "iPhone5,1") {
    return "iPhone 5";
  }
  else if (model == "iPhone5,2") {
    return "iPhone 5";
  }
  else if (model == "iPhone5,3") {
    return "iPhone 5C";
  }
  else if (model == "iPhone5,4") {
    return "iPhone 5C";
  }
  else if (model == "iPhone6,1") {
    return "iPhone 5S";
  }
  else if (model == "iPhone6,2") {
    return "iPhone 5S";
  }
  else if (model == "iPhone7,1") {
    return "iPhone 6 Plus";
  }
  else if (model == "iPhone7,2") {
    return "iPhone 6";
  }
  else if (model == "iPhone8,1") {
    return "iPhone 6S ";
  }
  else if (model == "iPhone8,2") {
    return "iPhone 6S Plus";
  }
  else if (model == "iPhone8,4") {
    return "iPhone SE";
  }
  return model;
};

//判断什么网络
var network = function () {
  try {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi';
    states[Connection.CELL_2G] = '2G';
    states[Connection.CELL_3G] = '3G';
    states[Connection.CELL_4G] = '4G';
    states[Connection.CELL] = '2G/3G/4G';
    states[Connection.NONE] = '无网络链接';
    return states[networkState];
  }
  catch (e) {
    return "无网络链接";
  }
};

//日期转换
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

//object TO String
function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + ':' + obj[p] + '\n';
    }
  }
  return str;
}

//判断数组中是否含有某个元素
function inArray(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj)
      return true;
  }
  return false;
}

//判断输入是否为十一位电话号码
function phoneNumber(str) {
  console.log("phoneNumber:" + str);
  var reg = /^([0-9]|[-])+$/g;
  if (str.length !== 11) {
    if (str.length === 12) {
      if (str.charAt(0) === '0') {
        return true;
      }
    }
    return false;
  }
  else {
    return reg.exec(str);
  }
}

//邮件格式
function isEmailAddress(obj) {
  var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  flag = pattern.test(obj);
  return flag;
}

//获得UUID
function guUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//工具类，判断当前字符串是否为空
function isEmpty(v) {
  switch (typeof v) {
    case 'date':
      return true;
    case 'undefined' :
      return true;
    case 'string' :
      if (v.trim().length === 0)
        return true;
      break;
    case 'boolean' :
      if (!v)
        return true;
      break;
    case 'number' :
      if (0 === v)
        return true;
      break;
    case 'object' :
      if (null === v) {
        return true;
      }
      else if (undefined !== v.length && v.length === 0) {
        return true;
      }
      else {
        return false;
      }
      break;
  }
  return false;
}

//经纬度偏差
function bd2gcj(lat, lon) {
  var pi = 3.14159265358979324;
  var a = 6378245.0;
  var ee = 0.00669342162296594323;
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;

  var x = lon, y = lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  var bd_lon = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lat, bd_lon];
}

