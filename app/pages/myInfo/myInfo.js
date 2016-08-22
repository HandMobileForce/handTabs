/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('myInfoModule')

  .controller('myInfoCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    function ($scope,
              $state,
              publicMethod) {




      console.log('myInfoCtrl.enter');

      $scope.$on('$ionicView.enter', function (e) {
        console.log('myInfoCtrl.$ionicView.enter');
      });

      $scope.$on('$destroy', function (e) {
        console.log('myInfoCtrl.$destroy');
      });
    }]);
