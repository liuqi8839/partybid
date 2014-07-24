/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')



    .controller('ActivityListCtrl', function ($scope, $location) {
       // alert(6);
        $scope.ActivitySignUp = function () {
            $location.path('/activity_sign_up');
        }

        var activity_null = localStorage.getItem('activity_names');//判断活动列表是否为空，如果为空，跳转到创建活动列表
        if(!activity_null){
            $location.path('/create_activity');
         }

        $scope.CreateActivity = function () {

            $location.path('/create_activity');

        }
        var activity_use=JSON.parse(localStorage.getItem('activity_names'));
        $scope.activity_show=activity_use;//用于展示已经创建的活动
    });