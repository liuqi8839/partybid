/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')



    .controller('ActivityListCtrl', function ($scope, $location) {
       // alert(6);
        $scope.ActivitySignUp = function (name) {
            var activity_show=Array();
            activity_show.unshift(name);
            localStorage['show_name']=JSON.stringify(activity_show);
            $location.path('/activity_sign_up');
        }

        var SignUpHold= localStorage.getItem('hold');
        if(!SignUpHold){
            var holder=new Array();
            holder.unshift('null');
            localStorage['hold']=JSON.stringify(holder);
        }
        else{
            var hold_use=JSON.parse(localStorage.getItem('hold'));
            var now_hold=hold_use[0];
        }
        //判定是否存在控制报名活动数的数组hold，如果没有，建立hold数组，并且添加值‘null’.如果有，把占有hold赋值给now_hold。

        var activity_null = localStorage.getItem('activity_names');//判断活动列表是否为空，如果为空，跳转到创建活动列表
        if(!activity_null){
            $location.path('/create_activity');
         }
        else{
            var activity_use=JSON.parse(localStorage.getItem('activity_names'));
            $scope.activity_show=activity_use;//用于展示已经创建的活动



            //占有hold活动底色变黄
        }

        $scope.CreateActivity = function () {
            $location.path('/create_activity');
        }

    })