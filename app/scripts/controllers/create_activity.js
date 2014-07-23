/**
 * Created by liuqi on 14-7-23.
 */
'use strict';


angular.module('partybidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.ActivityList = function () {
            $location.path('/activity_list')
        }

        $scope.ActivitySignUp = function (activity_name) {
            var activity_names=JSON.parse(localStorage.getItem(['activity_names'])||[]);
            activity_names.unshift(activity_name);//把元素添加到数组的开头，并返回数组的长度
            //localStorage 只能存储字符串
            localStorage['activity_names']=JSON.stringify(activity_names);
            //JSON.stringify(); 将数组装换成字符串
            //JSON.parse();  将字符串装换成数组
            $location.path('/activity_sign_up');
        }
    });
