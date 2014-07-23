/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {
        $scope.CreateActivity = function () {
            $location.path('/create_activity')
        }
    });