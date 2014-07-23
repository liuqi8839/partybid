/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivitySignUpCtrl', function ($scope, $location) {
        $scope.ActivityList = function () {
            $location.path('/activity_list')
        }
    });