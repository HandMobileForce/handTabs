# handTabs 模板

一个基于 ionic v1 + angular v2 的 Hybrid app环境

>建议: 推荐 Cordova 5.4.1以及以上 + gulp + bower

# 环境搭建

```
# 下载源代码
$ git clone https://github.com/HandMobileForce/Demo.git

# 切换到根目录
$ cd Demo

# 安装gulp构建环境
$ npm install

# 安装js依赖库
$ bower install

# 构建测试环境开发目录
$ gulp run-dev

# 浏览器运行app程序
$ ionic serve
```

##每次修改代码后
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
5.angular的对象里面不要使用闭包
6.angular的controller和service 用注入的时候，都要进行申明，目的是为了压缩混淆，
  如 angular.modal.controller('TabCtrl’,[‘$scope’,function($scope){}]);
6.尽量谨慎使用$rootScope.$broadcast  因为$rootScope 不会在controller销毁的时候被回收
7.scss的规范写法
   approve-list {
     ##
     .approve-item{
     ##
     }
   }
8.代码里面一定要有注释
9.angularJS项目 逻辑功能不要全部写在controller里面，因该写在service里面
10. 在一个controller 里面，变量都在最上面，函数在下面，因为js执行的时候，他也会自动先去执行变量的定义
```

#关于app下面的文件夹
```
1、app目录下有config 和configProd，configxml和configxmlProd文件，
   resources目录下有dev和prod文件分别对应开发环境和正式环境。
   需要自已配置对应的文件，resources没有开发和正式环境的区分可直接把cev和prod文件下的图片设置成一样的

2、app目录下的scripts里面的comment存放着公共的方法，有service.js和publicFunction.js两个文件
   引用service.js里面的方法记得注入publicMethod
   
3、在page下面新建.scss文件的时候    注意theme文件夹里面的app.core.scss的修改
```

