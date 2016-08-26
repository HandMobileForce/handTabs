/**
 * Created by gusenlin on 16/4/24.
 */
angular.module('contactModule')

  .controller('contactCtrl', [
    '$scope',
    '$state',
    'publicMethod',
    function ($scope,
              $state,
              publicMethod) {
      console.log('contactCtrl.enter');


      //数据来源
      $scope.columnName = "姓名";

      $scope.headData = [
        {"headItem": "语文"}, {"headItem": "数学"}, {"headItem": "英语"},
        {"headItem": "物理"}, {"headItem": "化学"}, {"headItem": "生物"},
        {"headItem": "历史"}, {"headItem": "地理"}, {"headItem": "政治"}
      ];

      $scope.bodyData = [
        {
          "code": "0001",
          "name": "张三",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "111111111"},
            {"headItem": "数学", "bodyValue": "100"},
            {"headItem": "英语", "bodyValue": "107"},
            {"headItem": "物理", "bodyValue": "22"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "61"},
            {"headItem": "地理", "bodyValue": "43"},
            {"headItem": "政治", "bodyValue": "77"}
          ]
        },
        {
          "code": "0001",
          "name": "李四",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "89"},
            {"headItem": "数学", "bodyValue": "118"},
            {"headItem": "英语", "bodyValue": "88"},
            {"headItem": "物理", "bodyValue": "134321423414444444421412414124"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "62"},
            {"headItem": "地理", "bodyValue": "60"},
            {"headItem": "政治", "bodyValue": "77"}
          ]
        },
        {
          "code": "0001",
          "name": "王五",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "110"},
            {"headItem": "数学", "bodyValue": "141"},
            {"headItem": "英语", "bodyValue": "129"},
            {"headItem": "物理", "bodyValue": "88"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "87"},
            {"headItem": "历史", "bodyValue": "44"},
            {"headItem": "地理", "bodyValue": "39"},
            {"headItem": "政治", "bodyValue": "55"}
          ]
        },
        {
          "code": "0001",
          "name": "张三",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "108"},
            {"headItem": "数学", "bodyValue": "134"},
            {"headItem": "英语", "bodyValue": "120"},
            {"headItem": "物理", "bodyValue": "55"},
            {"headItem": "化学", "bodyValue": "66"},
            {"headItem": "生物", "bodyValue": "40"},
            {"headItem": "历史", "bodyValue": "61"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "86"}
          ]
        },
        {
          "code": "0001",
          "name": "李四",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "111"},
            {"headItem": "数学", "bodyValue": "122"},
            {"headItem": "英语", "bodyValue": "99"},
            {"headItem": "物理", "bodyValue": "22"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "62"},
            {"headItem": "地理", "bodyValue": "60"},
            {"headItem": "政治", "bodyValue": "77"}
          ]
        },
        {
          "code": "0001",
          "name": "王五",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "110"},
            {"headItem": "数学", "bodyValue": "133"},
            {"headItem": "英语", "bodyValue": "109"},
            {"headItem": "物理", "bodyValue": "88"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "87"},
            {"headItem": "历史", "bodyValue": "71"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "55"}
          ]
        },
        {
          "code": "0001",
          "name": "李四",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "99"},
            {"headItem": "数学", "bodyValue": "100"},
            {"headItem": "英语", "bodyValue": "88"},
            {"headItem": "物理", "bodyValue": "22"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "62"},
            {"headItem": "地理", "bodyValue": "60"},
            {"headItem": "政治", "bodyValue": "77"}
          ]
        },
        {
          "code": "0001",
          "name": "王五",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "110"},
            {"headItem": "数学", "bodyValue": "120"},
            {"headItem": "英语", "bodyValue": "109"},
            {"headItem": "物理", "bodyValue": "75"},
            {"headItem": "化学", "bodyValue": "88"},
            {"headItem": "生物", "bodyValue": "81"},
            {"headItem": "历史", "bodyValue": "54"},
            {"headItem": "地理", "bodyValue": "66"},
            {"headItem": "政治", "bodyValue": "45"}
          ]
        },
        {
          "code": "0001",
          "name": "李四",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "102"},
            {"headItem": "数学", "bodyValue": "111"},
            {"headItem": "英语", "bodyValue": "99"},
            {"headItem": "物理", "bodyValue": "66"},
            {"headItem": "化学", "bodyValue": "53"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "77"},
            {"headItem": "地理", "bodyValue": "87"},
            {"headItem": "政治", "bodyValue": "77"}
          ]
        },
        {
          "code": "0001",
          "name": "王五",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "110"},
            {"headItem": "数学", "bodyValue": "120"},
            {"headItem": "英语", "bodyValue": "109"},
            {"headItem": "物理", "bodyValue": "88"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "87"},
            {"headItem": "历史", "bodyValue": "71"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "55"}
          ]
        },
        {
          "code": "0001",
          "name": "张三",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "98"},
            {"headItem": "数学", "bodyValue": "134"},
            {"headItem": "英语", "bodyValue": "111"},
            {"headItem": "物理", "bodyValue": "55"},
            {"headItem": "化学", "bodyValue": "66"},
            {"headItem": "生物", "bodyValue": "40"},
            {"headItem": "历史", "bodyValue": "61"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "86"}
          ]
        },
        {
          "code": "0001",
          "name": "李四",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "99"},
            {"headItem": "数学", "bodyValue": "100"},
            {"headItem": "英语", "bodyValue": "88"},
            {"headItem": "物理", "bodyValue": "22"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "62"},
            {"headItem": "地理", "bodyValue": "55"},
            {"headItem": "政治", "bodyValue": "77"}
          ]
        },
        {
          "code": "0001",
          "name": "王五",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "110"},
            {"headItem": "数学", "bodyValue": "120"},
            {"headItem": "英语", "bodyValue": "109"},
            {"headItem": "物理", "bodyValue": "88"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "87"},
            {"headItem": "历史", "bodyValue": "71"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "66"}
          ]
        },
        {
          "code": "0001",
          "name": "张三",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "98"},
            {"headItem": "数学", "bodyValue": "134"},
            {"headItem": "英语", "bodyValue": "111"},
            {"headItem": "物理", "bodyValue": "55"},
            {"headItem": "化学", "bodyValue": "66"},
            {"headItem": "生物", "bodyValue": "40"},
            {"headItem": "历史", "bodyValue": "61"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "86"}
          ]
        },
        {
          "code": "0001",
          "name": "李四",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "99"},
            {"headItem": "数学", "bodyValue": "100"},
            {"headItem": "英语", "bodyValue": "88"},
            {"headItem": "物理", "bodyValue": "22"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "62"},
            {"headItem": "地理", "bodyValue": "60"},
            {"headItem": "政治", "bodyValue": "77"}
          ]
        },
        {
          "code": "0001",
          "name": "王五",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "110"},
            {"headItem": "数学", "bodyValue": "120"},
            {"headItem": "英语", "bodyValue": "109"},
            {"headItem": "物理", "bodyValue": "88"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "87"},
            {"headItem": "历史", "bodyValue": "71"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "55"}
          ]
        },
        {
          "code": "0001",
          "name": "张三",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "98"},
            {"headItem": "数学", "bodyValue": "134"},
            {"headItem": "英语", "bodyValue": "111"},
            {"headItem": "物理", "bodyValue": "55"},
            {"headItem": "化学", "bodyValue": "66"},
            {"headItem": "生物", "bodyValue": "40"},
            {"headItem": "历史", "bodyValue": "61"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "86"}
          ]
        },
        {
          "code": "0001",
          "name": "李四",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "99"},
            {"headItem": "数学", "bodyValue": "112"},
            {"headItem": "英语", "bodyValue": "88"},
            {"headItem": "物理", "bodyValue": "22"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "62"},
            {"headItem": "地理", "bodyValue": "60"},
            {"headItem": "政治", "bodyValue": "77"}
          ]
        },
        {
          "code": "0001",
          "name": "王五",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "110"},
            {"headItem": "数学", "bodyValue": "134"},
            {"headItem": "英语", "bodyValue": "109"},
            {"headItem": "物理", "bodyValue": "88"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "87"},
            {"headItem": "历史", "bodyValue": "71"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "67"}
          ]
        },
        {
          "code": "0001",
          "name": "张三",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "98"},
            {"headItem": "数学", "bodyValue": "134"},
            {"headItem": "英语", "bodyValue": "111"},
            {"headItem": "物理", "bodyValue": "55"},
            {"headItem": "化学", "bodyValue": "66"},
            {"headItem": "生物", "bodyValue": "40"},
            {"headItem": "历史", "bodyValue": "61"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "55"}
          ]
        },
        {
          "code": "0001",
          "name": "李四",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "99"},
            {"headItem": "数学", "bodyValue": "100"},
            {"headItem": "英语", "bodyValue": "88"},
            {"headItem": "物理", "bodyValue": "22"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "78"},
            {"headItem": "历史", "bodyValue": "62"},
            {"headItem": "地理", "bodyValue": "60"},
            {"headItem": "政治", "bodyValue": "76"}
          ]
        },
        {
          "code": "0001",
          "name": "王五",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "110"},
            {"headItem": "数学", "bodyValue": "120"},
            {"headItem": "英语", "bodyValue": "109"},
            {"headItem": "物理", "bodyValue": "88"},
            {"headItem": "化学", "bodyValue": "51"},
            {"headItem": "生物", "bodyValue": "87"},
            {"headItem": "历史", "bodyValue": "71"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "55"}
          ]
        },
        {
          "code": "0001",
          "name": "张三",
          "bodyItem": [
            {"headItem": "语文", "bodyValue": "98"},
            {"headItem": "数学", "bodyValue": "122"},
            {"headItem": "英语", "bodyValue": "108"},
            {"headItem": "物理", "bodyValue": "55"},
            {"headItem": "化学", "bodyValue": "66"},
            {"headItem": "生物", "bodyValue": "40"},
            {"headItem": "历史", "bodyValue": "61"},
            {"headItem": "地理", "bodyValue": "45"},
            {"headItem": "政治", "bodyValue": "86"}
          ]
        }
      ];

      $scope.$on('$ionicView.enter', function (e) {
        console.log('contactCtrl.$ionicView.enter');
      });

      $scope.$on('$destroy', function (e) {
        console.log('contactCtrl.$destroy');
      });
    }]);
