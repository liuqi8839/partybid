/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')

    .controller('ActivityListCtrl', function ($scope, $location) {

        if (Activity.hasActivities() == false) {
            $location.path('/create_activity');
        }

        $scope.activities = Activity.getActivities();

        $scope.CreateButtonStatus = Price.hasOngoingPrice();

        $scope.BackGroundColor = function(name){
            var ongoing_activity = Price.hasOngoingPrice() ? Price.getOngoingPrice().activity : Activity.getOngoingActivity().activity;
            return (name == ongoing_activity) ? 'btn-warning' : "";
        };

        $scope.GotoActivitySignUp = function (name) {
            var temp = Activity.findBy({"activity": name});
            var activity = new Activity(temp.activity,temp.status,temp.selected);
            activity.pitchOn();
            $location.path('/activity_sign_up');
        };

        $scope.GotoCreateActivity = function () {
            $location.path('/create_activity');
        }
    });