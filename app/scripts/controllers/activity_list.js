/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {
        $scope.ActivitySignUp = function () {
            $location.path('/activity_sign_up');
        };

        var activity_names=JSON.parse(localStorage.getItem(['activity_names'])||[]);
        $scope.activitys=activity_names;

        $scope.CreateActivity = function () {
            $location.path('/create_activity');
        }
    });