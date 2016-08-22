/**
 * Created by admin on 2016/7/30.
 */

angular.module('serviceModule', []).
  service('publicMethod', ['$filter', '$ionicLoading', '$ionicPopup', '$ionicHistory',
    function ($filter, $ionicLoading, $ionicPopup, $ionicHistory) {
      return {

        //返回上一页
        goBack: function () {
          $ionicHistory.goBack();
        },

        //无背景的弹框
        showLoadingNoBackdrop: function (content) {
          $ionicLoading.show({
            template: content,
            noBackdrop: true,
            duration: 1000
          });
        },

        //有背景的弹框
        showLoadingMessage: function (content) {
          $ionicLoading.show({
            template: content,
            duration: 1000
          });
        },

        //隐藏弹出框
        hideLoading: function () {
          $ionicLoading.hide();
        },

        //一个提示对话框
        showAlert: function (template) {
          return $ionicPopup.alert({
            title: '提示',
            template: "<div style='text-align:center'>" + template + "</div>",
            okText: '确认' //确认按钮，去掉为英文的ok
          });
        },

        //选择标题的提示对话框
        showPopup: function (title, template) {
          $ionicPopup.show({
            title: (angular.isDefined(title) ? title : "提示"),
            template: template,
            buttons: [
              {
                text: '确定',
                type: 'button button-cux-popup-confirm'
              }
            ]
          });
        },

        //选择对话框 确定 or 取消
        showPopupConfirm: function (title, template) {
          return $ionicPopup.confirm({
            title: (angular.isDefined(title) ? title : "提示"),
            template: template,
            cancelText: '取消',
            cancelType: 'button-cux-popup-cancel',
            okText: '确定',
            okType: 'button-cux-popup-confirm'
          });
        },

        //时间的转换 年月日
        getDateString: function (date) {
          return $filter('date')(date, 'yyyy-MM-dd');
        },

        //时间的转换 年月日时分
        getDateTimeString: function (date) {
          return $filter('date')(date, 'yyyy-MM-dd HH:mm');
        }
      };

    }]).

  //页面间的传值
  service('SettingsService', function () {
    var _variables = {};
    return {
      get: function (varname) {
        return (typeof _variables[varname] !== 'undefined') ? _variables[varname] : false;
      },
      set: function (varname, value) {
        _variables[varname] = value;
      }
    };
  });

