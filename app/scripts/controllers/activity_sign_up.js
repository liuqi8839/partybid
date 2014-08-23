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

            if (!Activity.hasOngoingActivity()){
                activity.runActivity();
                return $scope.Button = determine_Button();
            }

            if(confirm('您确定要结束本次报名吗？')){
                activity.stopActivity();
                $location.path('/price_list');
            }

        };

        $scope.GoToPriceList=function() {
            if(Activity.hasOngoingActivity()) {
                return alert('尚有报名未结束，不能开始竞价！')
            }
            $location.path('/price_list');
        };

        $scope.BackToList = function () {
            var temp = Activity.getSelectedActivity();
            var activity = new Activity(temp.activity,temp.status,temp.selected);
            activity.unPitch();
            $location.path('/')
        }

    });