/**
 * Created by zhangsongsong on 2016-05-04.
 */
function getDis(a, b) {                                           //计算两个坐标之间的距离
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

var H5lock = function (obj) {                                 //初始化H5加锁对象
  this.INIT_PASSWORD = 0;                                     //用于判断当前操作的常量
  this.CHANGE_PASSWORD = 1;
  this.UNLOCK = 2;
  this.RMLOCK = 3;
  this.height = obj.height;
  this.width = obj.width;
  this.miniHeight = obj.miniHeight;
  this.miniWidth = obj.miniWidth;
  this.fillStyle = obj.fillStyle || '#1992EA';
  this.strokeStyle = obj.strokeStyle || '#1992EA';
  this.lineWidth = obj.lineWidth || 2;
  this.canvasID = obj.canvasID || 'canvas';
  this.resetID = obj.resetID || '';
  this.descID = obj.descID || '';
  this.miniCanvasID = obj.miniCanvasID || '';
  this.chooseType = obj.chooseType || 3;
  this.operation = obj.operation || this.INIT_PASSWORD;       //当前操作
  this.successInitCallback = obj.successInitCallback;           //成功初始化手势密码的回调函数
  this.successChangeCallback = obj.successChangeCallback;       //成功修改密码的回调函数
  this.successUnlockCallback = obj.successUnlockCallback;       //成功解锁的回调函数
  this.successRmLockCallback = obj.successRmLockCallback;       //成功解除密码的回调函数
  this.errorCallback = obj.errorCallback;                         //出错调用的函数
  this.step = 0;                                              //当前绘制密码次数
};

H5lock.prototype.checkPass = function (psw1, psw2) {             // 检测密码，判断是否两次输入的密码一样
  var p1 = '',
    p2 = '';
  for (var i = 0; i < psw1.length; i++) {
    if ( typeof psw1 == 'string'){
      p1 += psw1.slice(i, i +1);
    } else {
      p1 += psw1[i].index;
    }
  }
  for (i = 0; i < psw2.length; i++) {
    p2 += psw2[i].index;
  }
  return p1 === p2;
};

H5lock.prototype.getPosition = function (e) {                                     //获取touch点相对于canvas的坐标
  var rect = e.currentTarget.getBoundingClientRect();
  var po = {
    x: e.touches[0].clientX - rect.left,
    y: e.touches[0].clientY - rect.top
  };
  return po;
};

H5lock.prototype.createCircle = function () {// 创建解锁点的坐标，根据canvas的大小来平均分配半径
  var n = this.chooseType;
  var count = 0;
  this.lastPoint = [];            //存储滑动过的圆圈
  this.arr = [];                   //圆圈数组对象
  this.restPoint = [];            //存储所有未滑过的圆圈
  this.r = this.ctx.canvas.width / (1 + 3 * n);// 公式计算  this.ctx.canvas画布对象(最左边两个半径大小距离，剩下的为4×n个距离)
  var r = this.r;
  if( this.miniCtx && ( this.step == 0 || ( this.step == 1 && this.operation == this.CHANGE_PASSWORD )) ){       //包含小九宫格的初始化
    this.miniR = this.miniCtx.canvas.width / (1 + 3 * n);
    var miniR = this.miniR;
    for (var i = 0; i < n; i++) {         //初始化圆圈数组对象以及未滑过的圆圈数组对象
      for (var j = 0; j < n; j++) {
        count++;
        var obj = {
          x: j * 3 * r + 2 * r,
          y: i * 3 * r + 2 * r,
          miniX: j * 3 * miniR + 2 * miniR,
          miniY: i * 3 * miniR + 2 * miniR,
          index: count
        };
        this.arr.push(obj);
        this.restPoint.push(obj);
      }
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);     //清空所有指定区域的像素
    this.miniCtx.clearRect(0, 0, this.miniCtx.canvas.width, this.miniCtx.canvas.height);     //清空小九宫格区域的像素
    for (i = 0; i < this.arr.length; i++) {                                     //为每个圆圈初始化
      this.drawCle(this.arr[i].x, this.arr[i].y, false);
      this.drawCle(this.arr[i].miniX, this.arr[i].miniY, true);
    }
  } else {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        count++;
        var obj = {
          x: j * 3 * r + 2 * r,
          y: i * 3 * r + 2 * r,
          index: count
        };
        this.arr.push(obj);
        this.restPoint.push(obj);
      }
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (i = 0; i < this.arr.length; i++) {
      this.drawCle(this.arr[i].x, this.arr[i].y, false);
    }
  }
};

H5lock.prototype.drawCle = function (x, y , isMini) {                                     //初始化解锁密码面板
  if (!isMini){
    this.ctx.strokeStyle = this.strokeStyle;                                     //设置或返回用于笔触的颜色、渐变或模式
    this.ctx.lineWidth = this.lineWidth;                                         //设置或返回当前的线条宽度
    this.ctx.beginPath();                                                           //起始一条路径，或重置当前路径
    this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);                             //创建弧/曲线（用于创建圆形或部分圆）
    this.ctx.closePath();                                                           //创建从当前点回到起始点的路径
    this.ctx.stroke();                                                              //绘制已定义的路径
  } else {                                                                          //初始化小九宫格
    this.miniCtx.strokeStyle = this.strokeStyle;
    this.miniCtx.lineWidth = this.lineWidth;
    this.miniCtx.beginPath();
    this.miniCtx.arc(x, y, this.miniR, 0, Math.PI * 2, true);
    this.miniCtx.closePath();
    this.miniCtx.stroke();
  }
};

H5lock.prototype.drawPoint = function () {                                       //初始化填充所有滑过的圆圈的圆心
  for (var i = 0; i < this.lastPoint.length; i++) {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.beginPath();
    this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 3, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
    if ( this.miniCtx && ( ( this.operation == this.INIT_PASSWORD && this.step == 0 ) || ( this.operation == this.CHANGE_PASSWORD && this.step != 2 ) ) ){
      this.miniCtx.fillStyle = this.fillStyle;
      this.miniCtx.beginPath();
      this.miniCtx.arc(this.lastPoint[i].miniX, this.lastPoint[i].miniY, this.miniR, 0, Math.PI * 2, true);
      this.miniCtx.closePath();
      this.miniCtx.fill();
    }
  }
};

H5lock.prototype.drawLine = function (po, lastPoint) {                            // 解锁轨迹
  this.ctx.beginPath();
  this.ctx.strokeStyle = this.fillStyle;                                        //设置或返回用于笔触的颜色、渐变或模式
  this.ctx.lineWidth = this.lineWidth;                                      //初始化解锁轨迹的线条宽度
  this.ctx.moveTo(lastPoint[0].x, lastPoint[0].y);                                  //把路径移动到画布中的指定点，不创建线条
  for (var i = 1; i < this.lastPoint.length; i++) {
    this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
  }
  this.ctx.lineTo(po.x, po.y);                                                     //添加一个新点，然后在画布中创建从该点到最后指定点的线条
  this.ctx.stroke();                                                               //绘制已定义的路径
  this.ctx.closePath();                                                            //创建从当前点回到起始点的路径
};

H5lock.prototype.drawTriangle = function (fromPt, toPt) {                          //绘制三角形箭头
  this.ctx.beginPath();
  this.ctx.fillStyle = this.fillStyle;
  if ( fromPt.x == toPt.x ){                                                       //两点平行于y轴的情况
    if( fromPt.y < toPt.y ){
      this.ctx.moveTo(fromPt.x, fromPt.y + this.r * 5 / 6);
      this.ctx.lineTo(fromPt.x + this.r / 4, fromPt.y + this.r / 2);
      this.ctx.lineTo(fromPt.x - this.r / 4, fromPt.y + this.r / 2);
      this.ctx.closePath();
      this.ctx.fill();
    } else {
      this.ctx.moveTo(fromPt.x, fromPt.y - this.r * 5 / 6);
      this.ctx.lineTo(fromPt.x + this.r / 4, fromPt.y - this.r / 2);
      this.ctx.lineTo(fromPt.x - this.r / 4, fromPt.y - this.r / 2);
      this.ctx.closePath();
      this.ctx.fill();
    }
  } else if ( fromPt.y == toPt.y ){                                                //两点平行于x轴的情况
    if( fromPt.x < toPt.x ){
      this.ctx.moveTo(fromPt.x + this.r * 5 / 6, fromPt.y);
      this.ctx.lineTo(fromPt.x + this.r / 2, fromPt.y + this.r / 4);
      this.ctx.lineTo(fromPt.x + this.r / 2, fromPt.y - this.r / 4);
      this.ctx.closePath();
      this.ctx.fill();
    } else {
      this.ctx.moveTo(fromPt.x - this.r * 5 / 6, fromPt.y);
      this.ctx.lineTo(fromPt.x - this.r / 2, fromPt.y + this.r / 4);
      this.ctx.lineTo(fromPt.x - this.r / 2, fromPt.y - this.r / 4);
      this.ctx.closePath();
      this.ctx.fill();
    }
  } else {
    var dis = getDis(fromPt, toPt);
    var sin = ( toPt.y - fromPt.y ) / dis;
    var cos = ( toPt.x - fromPt.x ) / dis;
    this.ctx.moveTo(fromPt.x + this.r * 5 / 6 * cos , fromPt.y + this.r * 5 / 6 * sin );
    var tempX = fromPt.x + this.r / 2 * cos;
    var tempY = fromPt.y + this.r / 2 * sin;
    this.ctx.lineTo(tempX + this.r / 4 * sin, tempY - this.r / 4 *cos);
    this.ctx.lineTo(tempX - this.r / 4 * sin, tempY + this.r / 4 *cos);
    this.ctx.closePath();
    this.ctx.fill();
  }
};

H5lock.prototype.pickPoints = function (fromPt, toPt) {
  var lineLength = Math.round(getDis(fromPt, toPt));                         //首先获取两个点左边之间的直线距离
  var dir = toPt.index > fromPt.index ? 1 : -1;                  //如果是从小到大，则dir为1，否则dir为2

  var len = this.restPoint.length;                             //剩余节点数量
  var i = dir === 1 ? 0 : (len - 1);                             //如果从小到大，i = 0，否则i = 节点数量 - 1
  var limit = dir === 1 ? len : -1;                              //如果从小到大，limit = 节点数量，否则limit = -1

  while (i !== limit) {                                          //遍历所有的剩余节点
    var pt = this.restPoint[i];
    if (!pt){
      break;
    }
    if ( Math.round(getDis(pt, fromPt) + getDis(pt, toPt)) === lineLength) {      //如果剩余节点中有跟起始和终点节点在一条直线上的，则将其放入滑过的节点中
      this.drawPoint(pt.x, pt.y);                             //画出刚加入的节点圆心
      this.lastPoint.push(pt);                               //滑过的节点数组添加刚加入的节点
      this.restPoint.splice(i, 1);                           //剩余的节点数组删除掉刚加入的节点
      if (limit > 0) {
        i--;
        limit--;
      } else {
        i++;
        limit++;
      }
    }
    i += dir;           //循环自变量
  }
};

H5lock.prototype.update = function (po) {                                         //核心变换方法在touchmove时候调用
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  if( this.miniCtx && ( ( this.operation == this.INIT_PASSWORD && this.step == 0 ) || ( this.operation == this.CHANGE_PASSWORD && this.step != 2 ) ) ){
    this.miniCtx.clearRect(0, 0, this.miniCtx.canvas.width, this.miniCtx.canvas.height);
  }

  for (var i = 0; i < this.arr.length; i++) {                                         //每帧先把面板画出来
    this.drawCle(this.arr[i].x, this.arr[i].y, false);
    if( this.miniCtx ){
      this.drawCle(this.arr[i].miniX, this.arr[i].miniY, true);
    }
  }

  for( i = 0; i < this.lastPoint.length - 1; i++){
    this.drawTriangle(this.lastPoint[i], this.lastPoint[i + 1]);
  }

  this.drawPoint(this.lastPoint);                                                 //每帧画圆心
  this.drawLine(po, this.lastPoint);                                              //每帧花轨迹

  for (i = 0; i < this.restPoint.length; i++) {                              //更新的时候判断移动到的点是否在剩余节点数组里面
    var pt = this.restPoint[i];
    if ( getDis(po, pt) < this.r) {
      this.drawPoint(pt.x, pt.y);                                                   //如果来到一个新的圆圈，我们需要把圆心画出来
      this.pickPoints(this.lastPoint[this.lastPoint.length - 1], pt);
      if( this.lastPoint.length > 1){
        this.drawTriangle(this.lastPoint[this.lastPoint.length - 2], pt);        //画三角形箭头
      }
      break;
    }
  }
};

H5lock.prototype.initDesc = function () {                                           //初始化提示信息
  if ( this.operation == this.INIT_PASSWORD){
    this.setDesc('请绘制手势密码');
  } else if ( this.operation == this.CHANGE_PASSWORD ){
    this.setDesc('请输入原手势密码');
  } else if ( this.operation == this.UNLOCK){
    this.setDesc('请输入密码解锁');
  } else  {
    this.setDesc('请输入密码取消手势解锁')
  }
};

H5lock.prototype.clearPassword = function () {                                     //重新绘制密码
  this.step = 0;
  this.reset();
  this.initDesc();
};

H5lock.prototype.reset = function () {                                               //重新初始化面板并绘制圆圈
  this.createCircle();
};

H5lock.prototype.setDesc = function ( desc ){                                       //设置提示信息
  if(this.descElem){
    this.descElem.innerHTML = desc;
  }
};

H5lock.prototype.init = function () {                                               //程序入口
  this.password = window.localStorage.getItem('gesturePassword') ? window.localStorage.getItem('gesturePassword') : '';         //是否已经初始化密码
  this.lastPoint = [];
  this.touchFlag = false;                                                           //是否开始手势解锁
  this.step = 0;
  this.canvas = document.getElementById(this.canvasID);                            //获取ID为canvas的对象
  this.ctx = this.canvas.getContext('2d');                                          //canvas元素本身并没有绘制能力，必须使用脚本来完成实际的绘图，返回一个对象，该对象提供了用于画布上绘图的方法和属性
  this.ctx.globalCompositeOperation = 'source-atop';
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  if( this.miniCanvasID && ( this.operation == this.INIT_PASSWORD || this.operation == this.CHANGE_PASSWORD ) ){
    this.miniCanvas = document.getElementById(this.miniCanvasID);                   //获取小九宫格canvas
    this.miniCtx = this.miniCanvas.getContext('2d');
    this.miniCtx.globalCompositeOperation = 'source-atop';
    this.miniCanvas.width = this.miniWidth;
    this.miniCanvas.height = this.miniHeight;
  }
  if ( this.descID ){
    this.descElem = document.getElementById(this.descID);
    this.initDesc();
  }
  if ( this.resetID ){
    this.resetBtn = document.getElementById(this.resetID);
  }
  this.createCircle();
  this.bindEvent();                                                                   //绑定画布上的事件监听
};

H5lock.prototype.bindEvent = function () {                                                   //为对象绑定事件
  var self = this;
  this.canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
    var po = self.getPosition(e);               //获取触摸位置信息
    for (var i = 0; i < self.arr.length; i++) {           //如果触摸位置与各圆圈圆心位置横竖均距离少于r，则设置触摸设置密码开始
      if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
        self.touchFlag = true;
        self.drawPoint(self.arr[i].x, self.arr[i].y);
        self.lastPoint.push(self.arr[i]);
        self.restPoint.splice(i, 1);
        break;
      }
    }
  }, false);
  this.canvas.addEventListener("touchmove", function (e) {
    if (self.touchFlag) {
      self.update(self.getPosition(e));                   //触摸滑动的时候执行更新位置信息操作
    }
  }, false);
  this.canvas.addEventListener("touchend", function (e) {      //触摸结束监听事件，设置触摸标志量为false，并将信息存储起来
    if (self.touchFlag) {
      self.touchFlag = false;
      if( self.operation == self.INIT_PASSWORD){                //初试话密码
        if(self.step == 0){
          if( self.lastPoint.length < 4) {
            self.setDesc('请至少连接四个点');
            self.errorCallback();
          } else {
            self.firstPassword = self.lastPoint;
            self.step += 1;
            self.setDesc('请确认密码');
          }
        } else if (self.step == 1) {
          if(self.checkPass(self.firstPassword, self.lastPoint)){
            self.step = 0;
            self.storePass(self.lastPoint);
            self.setDesc('设置成功');
            self.successInitCallback();
          } else {
            self.setDesc('两次密码不一致');
            self.errorCallback();
          }
        }
      } else if ( self.operation == self.CHANGE_PASSWORD){          //修改密码
        if(self.step == 0){
          if(self.checkPass(self.password, self.lastPoint)){
            self.step += 1;
            self.setDesc('请设置新密码');
          } else {
            self.setDesc('原密码错误');
            self.errorCallback();
          }
        } else if (self.step == 1) {
          if( self.lastPoint.length < 4) {
            self.setDesc('请至少连接四个点');
            self.errorCallback();
          } else {
            self.firstPassword = self.lastPoint;
            self.step += 1;
            self.setDesc('请确认密码');
          }
        } else if (self.step == 2){
          if(self.checkPass(self.firstPassword, self.lastPoint)){
            self.step = 0;
            self.storePass(self.lastPoint);
            self.setDesc('修改密码成功');
            self.successChangeCallback();
          } else {
            self.setDesc('两次密码不一致');
            self.errorCallback();
          }
        }
      } else if ( self.operation == self.UNLOCK){                   //解锁
        if(self.checkPass(self.password, self.lastPoint)){
          self.setDesc('解锁成功');
          self.successUnlockCallback();
        } else {
          self.setDesc('密码错误');
          self.errorCallback();
        }
      } else if ( self.operation == self.RMLOCK){                     //取消密码
        if(self.checkPass(self.password, self.lastPoint)){
          self.setDesc('取消手势密码成功');
          window.localStorage.removeItem('gesturePassword');
          self.successRmLockCallback();
        } else {
          self.setDesc('密码错误');
          self.errorCallback();
        }
      }
      setTimeout(function () {
        self.reset();
      }, 200);
    }
  }, false);
  if( this.resetBtn ){
    this.resetBtn.addEventListener('click', function(){
      self.clearPassword();
    })
  }
  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false);
};

H5lock.prototype.storePass = function(password){                        //存储密码
  var localPassword = '';
  for(var i = 0; i < password.length; i++){
    localPassword += password[i].index;
  }
  window.localStorage.setItem('gesturePassword', localPassword);
  this.password = password;
};

