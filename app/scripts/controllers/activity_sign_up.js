/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivitySignUpCtrl', function ($scope, $location) {
        $scope.ActivityList = function () {
            $location.path('/')
        };
        var activity_use=JSON.parse(localStorage.getItem(['activity_names'])||[]);
        var now_activity=activity_use[0];//数组中第0项的名称，用于展示在活动报名页面
        $scope.now_show=now_activity;
    });