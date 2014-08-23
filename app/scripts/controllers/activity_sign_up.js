/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivitySignUpCtrl', function ($scope, $location) {

        $scope.current_activity = Activity.getSelectedActivity().activity;

        ($scope.page_head = function() {
            $scope.Messages = SignUpInformation.getSignUpOfCurrentActivity();
        })();

        $scope.Button = determine_Button();

        $scope.StartActivity = function() {
            var temp= Activity.getSelectedActivity();
            var activity = new Activity(temp.activity,temp.status,temp.selected);

            if (Activity.hasOngoingActivity() == false){
                activity.runActivity();
            }
            else if(confirm('您确定要结束本次报名吗？') == true){
                activity.stopActivity();
                $location.path('/price_list');
            }

            $scope.Button = determine_Button();
        };

        $scope.GoToPriceList=function() {
            if(Activity.hasOngoingActivity() == false) {
                $location.path('/price_list');
            }
            else{
                alert('尚有报名未结束，不能开始竞价！')
            }
        };

        $scope.BackToList = function () {
            var temp = Activity.getSelectedActivity();
            var activity = new Activity(temp.activity,temp.status,temp.selected);
            activity.unPitch();
            $location.path('/')
        }

    });