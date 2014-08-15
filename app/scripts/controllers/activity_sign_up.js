/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivitySignUpCtrl', function ($scope, $location) {

        $scope.current_activity = Activity.getSelectedActivity().activity;

        ($scope.page_head = function(){
            $scope.sign_up_number=sign_up_sms().numbers;
            $scope.Messages=sign_up_sms().messages;
        })();

        $scope.ButtonStatus=determine_Button().status;
        $scope.ButtonText = determine_Button().name;

        $scope.StartActivity=function(){
            var temp= Activity.findBy({"selected": 1});
            var activity = new Activity(temp.activity,temp.status,temp.selected);
            if (Activity.hasOngoingActivity() == false){
                activity.runActivity();
            }
            else if(confirm('您确定要结束本次报名吗？') == true){
                activity.stopActivity();
                $location.path('/price_list');
            }
            $scope.ButtonStatus=determine_Button().status;
            $scope.ButtonText = determine_Button().name;
        };

        $scope.GoToPriceList=function(){
            if(Activity.hasOngoingActivity() == false) {
                $location.path('/price_list');
            }
            else{
                alert('尚有报名未结束，不能开始竞价！')
            }
        };

        $scope.BackToList = function () {
            var temp = Activity.findBy({"selected": 1});
            var activity = new Activity(temp.activity,temp.status,temp.selected);
            activity.unPitch();
            $location.path('/')
        }

    });