/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivitySignUpCtrl', function ($scope, $location) {
        $scope.BackList = function () {
            $location.path('/')
        };
        //点击返回，跳转到活动列表页面

        var activity_use=JSON.parse(localStorage.getItem('show_name'));
        var now_activity = activity_use[0];//数组中第0项的名称，用于展示在活动报名页面
        $scope.now_show = now_activity;
        //展示活动名称

        var start_show=true;
        var SignUpHold=localStorage.getItem('hold');
        if(!SignUpHold){
            var holder=new Array();
            holder.unshift('null');
            localStorage['hold']=JSON.stringify(holder);
        }
        else{
            var hold_use=JSON.parse(localStorage.getItem('hold'));
            var now_hold=hold_use[0];
            var start_button=new Array();
            if(now_hold!='null'){
                if(now_hold!=now_activity){
                    start_show=false;
                    start_button.unshift('开始');
                }
                else{
                    start_button.unshift('结束');
                }//检测占有hold的是否是当前活动，如果是，按钮变成可点击的结束按钮，如果不是，按钮变成开始,但不可点击。
            }
            else{
                start_show=true;
                start_button.unshift('开始');
            }//检测hold是否被占有，如果被占有，检测被谁占有，如果没被占有，所有活动都有可点击状态的开始按钮。
            localStorage['StartOrEnd']=JSON.stringify(start_button);
        }

       $scope.StartActivity=function() {
           var hold_use=JSON.parse(localStorage.getItem('hold'));
           var now_hold=hold_use[0];
           var holder=new Array();
           if(now_hold=='null'){
               holder.unshift(now_activity);
               //点击开始按钮，占有hold数组
           }
           else{
               //不再接受报名
               //点击结束按钮，弹出“报名结束确认”提示，询问“确认要结束本次报名吗？”
               holder.unshift('null');
               //点击结束按钮，退回hold数组。
           }
           localStorage['hold']=JSON.stringify(holder);
        }
    });