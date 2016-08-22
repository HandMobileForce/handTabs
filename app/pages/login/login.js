/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('loginModule')
  .controller('loginCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    '$ionicLoading',
    '$http',
    'publicMethod',
    '$log',
    function ($scope,
              $state,
              baseConfig,
              $ionicLoading,
              $http,
              publicMethod,
              $log) {

      $(function () {
        $log.debug("屏幕高度", $(".login").height());
      });

      $scope.loginData = {};
      $scope.currentVersionNum = baseConfig.currentVersion;

      console.log('loginCtrl.enter');

      $scope.savePassword = function () {
        $scope.checkbox_savePwd = !$scope.checkbox_savePwd;//取反 记住密码框的状态
        console.log("此时密码框的状态为 :", angular.toJson($scope.checkbox_savePwd));
        if ($scope.loginData.password !== "") {
          if ($scope.checkbox_savePwd === true) {
            window.localStorage.password = $scope.loginData.password;
          } else {
            window.localStorage.password = "";
          }
        }
      };

      $scope.doLogin = function () {
        if (isEmpty($scope.loginData.username)) {
          $ionicLoading.show({
            template: '用户名不为空！',
            duration: 1000
          });
        } else {
          if (isEmailAddress($scope.loginData.username)) {
            window.localStorage.empno = $scope.loginData.username;
            if ($scope.checkbox_savePwd) {
              window.localStorage.password = $scope.loginData.password;
            } else {
              window.localStorage.password = "";
            }
            $state.go("tab.message");
            //$ionicLoading.show({
            //  template: 'Loading...'
            //});
            //var url = baseConfig.basePath + "/appLogin/user_login/login";
            //var params = '{"params":{"p_user_name":"' + $scope.loginData.username +
            //  '","p_password":"' + $scope.loginData.password + '"}}';
            //
            //$http.post(url, params).success(function (result) {
            //  $ionicLoading.hide();
            //  if (baseConfig.debug) {
            //    console.log("result success " + angular.toJson(result));
            //  }
            //
            //  if (result.con_status == "S") {
            //    window.localStorage.token = result.pre_token + result.token_key;
            //    window.localStorage.empno = $scope.loginData.username;
            //    $state.go("tab.message");
            //  }
            //
            //}).error(function (response, status) {
            //  $ionicLoading.hide();
            //  if (baseConfig.debug) {
            //    console.log("response error " + angular.toJson(response));
            //  }
            //});
          } else {
            $ionicLoading.show({
              template: '请用邮箱登录',
              duration: 1000
            });
          }
        }
      };

      $scope.$on('$ionicView.enter', function (e) {
        console.log('loginCtrl.$ionicView.enter');
      });

      $scope.$on('$destroy', function (e) {
        console.log('loginCtrl.$destroy');
      });

    }]);
