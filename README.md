# handTabs 模板

# 模板介绍
```
1、app目录下有config文件夹，里面有devConfig.json和prodConfig.json。对应开发环境和正式环境。

2、publish文件夹同样存在dev和prod两种环境  
   dev文件夹配置了开发环境的configXmlDev,和resourcesDev
   prod文件夹配置了正式环境的configXmlProd,和resourcesProd

3、app目录下scripts文件夹里面的comment存放着公共的方法，有service.js和publicFunction.js两个文件
   引用service.js里面的方法记得注入publicMethod
   
4、在page下面新建.scss文件的时候    注意theme文件夹里面的app.core.scss的修改
```

# 环境搭建
```
# 下载源代码
$ git clone https://github.com/HandMobileForce/handTabs.git

# 切换到根目录
$ cd handTabs

# 安装gulp构建环境
$ npm install

# 安装js依赖库
$ bower install

# 构建测试环境开发目录
$ gulp run-dev
$ gulp build-dev

# 浏览器运行app程序，自动检测代码改动，并且将变化反应到网页中，代码编写过程中使用
$ gulp serve
```
* 构建测试环境目录:
```bash
gulp build-dev
```
* 构建正式环境目录:
```bash
gulp build-prod
```

* 切换到开发环境:
```bash
$ gulp clean
$ gulp run-dev
$ gulp build-dev
```

* 切换到正式环境:
```bash
$ gulp clean
$ gulp run-prod
$ gulp build-prod
```

# Git 操作规范
```
st=>start: 开始
e=>end: 结束
clone=>operation: git clone url
pullA=>operation: git pull origin develop:develop
checkoutA=>operation: git checkout -b feature/A
code=>operation: 编写代码/修改代码
add=>operation: git add
commit=>operation: git commit
checkoutB=>operation: git checkout develop
pullB=>operation: git pull origin develop:develop
merge=>operation: git merge feature/A
conflict=>operation: 如果有冲突，解决冲突
push=>operation: git push origin develop:develop

st->clone->pullA->checkoutA->code->add->commit->checkoutB->pullB->merge->conflict->push->e
```

# IDE
WebStorm
Android Studio
Xcode


# 开发规范
```
1.所有文件名，文件夹都以中划线分隔 ,全部小写 比如 contact-us
2.html 尽量不要有style=“”
3.javascript代码变量第二个单词首字母大写  比如 timeOffManagment
4.javascript代码字符串定义用单引号  比如 var target=''
5.angular的对象里面谨慎使用闭包
6.angular的controller和service 用注入的时候，都要进行申明，目的是为了压缩混淆，
  如 angular.modal.controller('TabCtrl’,[‘$scope’,function($scope){}]);
7.尽量谨慎使用$rootScope.$broadcast  因为$rootScope 不会在controller销毁的时候被回收
8.scss的规范写法
   approve-list {
     ##
     .approve-item{
     ##
     }
   }
9.代码里面一定要有注释
10.angularJS项目 逻辑功能不要全部写在controller里面，最好写在service里面
11.在一个controller 里面，变量都在最上面，函数在下面，因为js执行的时候，他也会自动先去执行变量的定义
12.在使用指令的时候用hms打头，dom，content尽量写在template里面。
```

