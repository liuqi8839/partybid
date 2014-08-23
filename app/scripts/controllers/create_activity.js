/**
 * Created by liuqi on 14-7-23.
 */


angular.module('partybidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {

        $scope.activity_back = Activity.hasActivities();

        $scope.CreateActivity = function(new_activity)  {
            if (Activity.findRepeat(new_activity)) {
                return $scope.tips = '活动名称重复';
            }
            $scope.tips = '';
            var  newActivity = new Activity(new_activity, 2, 1);
            newActivity.save();
            $location.path('/activity_sign_up');
        };

        $scope.GotoActivityList = function () {
            $location.path('/');
        }
    });
