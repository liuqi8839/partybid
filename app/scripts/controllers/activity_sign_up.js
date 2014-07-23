/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivitySignUpCtrl', function ($scope, $location) {
        $scope.ActivityList = function () {
            $location.path('/activity_list')
        };
        var activity_names=JSON.parse(localStorage.getItem(['activity_names'])||[]);
        var now_activity=activity_names[0];
        $scope.now_activity=now_activity;
    });