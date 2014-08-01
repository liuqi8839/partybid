/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')

    .controller('ActivityListCtrl', function ($scope, $location) {

        if (!get_value('ActivitiesName')) {
            $location.path('/create_activity');
        }

        $scope.BackGroundColor=function(name){
            return change_background_color(name,'OngoingActivity');
        }

        $scope.activities_name=parse_value('ActivitiesName');

        $scope.GotoActivitySignUp = function (name) {
            revise_value(name,'CurrentActivity');
            $location.path('/activity_sign_up');
        }

        $scope.GotoCreateActivity = function () {
            $location.path('/create_activity');
        }
    })