/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {
       // alert(6);
        $scope.ActivitySignUp = function () {
            $location.path('/activity_sign_up');
        };


        $scope.CreateActivity = function () {

            $location.path('/create_activity');

        }
        var activity_names=JSON.parse(localStorage.getItem('activity_names'));
        $scope.activitys=activity_names;
    });