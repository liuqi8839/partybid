/**
 * Created by liuqi on 14-7-23.
 */
'use strict';


angular.module('partybidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        var activity_show;//用于在报名页面显示活动名称
        var activity_back;//用于展示（显示或隐藏）返回按钮
        var activity_use;//用于存储之前保存的数组，便于增删查改
        var p;//用于判断名称是否重复，1就是重复，2就是不重复
        $scope.activity_back=false;//不显示返回按钮
        if(localStorage.getItem('activity_names')) {//存在这个数组
            $scope.activity_back = true;//显示返回按钮
        }
        $scope.ActivityList = function () {
            $location.path('/')
        }

        activity_show=new Array();//每次都给activity_show重新赋值

        $scope.ActivitySignUp = function (activity_new) {
            if(localStorage.getItem('activity_names')) {//之前有已创建的活动，判断名称是否重复
                activity_use = JSON.parse(localStorage.getItem('activity_names'));
                p=1;//默认不重复
                for(var n=0;n<activity_use.length;n++){//遍历数组
                    if(activity_new == activity_use[n]){//满足重复的条件
                        p=2;
                        break;
                    }
                }
            }
            else{
                activity_use=new Array();//之前没有创建活动，新建一个数组
            }
            if(p==2){
                $scope.tips='活动名称重复';
            }
            else {
                $scope.tips='';
                activity_use.unshift(activity_new);//把元素添加到数组的开头，并返回数组的长度
                activity_show.unshift(activity_new);
                localStorage['activity_names'] = JSON.stringify(activity_use);
                localStorage['show_name']=JSON.stringify(activity_show);
                //localStorage 只能存储字符串
                //JSON.stringify(); 将数组装换成字符串
                //JSON.parse();  将字符串装换成数组
                $location.path('/activity_sign_up');
            }
        }
    })
