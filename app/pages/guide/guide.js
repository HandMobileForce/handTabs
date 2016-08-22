/**
 * Created by gusenlin on 16/5/16.
 */
angular.module('loginModule')

  .controller('guideCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    function ($scope,
              $state,
              publicMethod) {

      console.log('loginCtrl.enter');

      $scope.toLogin = function () {
        console.log("跳过导航页到登陆页");
        $state.go("login");
      };

      $scope.$on('$ionicView.enter', function (e) {
        console.log('guideCtrl.$ionicView.enter');
      });

      $scope.$on('$destroy', function (e) {
        console.log('guideCtrl.$destroy');
      });
    }]);
