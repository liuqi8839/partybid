

angular.module('partybidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {

        $scope.activity_back = Activity.hasActivities();

        $scope.CreateActivity = function(new_activity) {
            var  newActivity = new Activity(new_activity, false, true);
            if (newActivity.findRepeat()) {
                $scope.tips = '活动名称重复';
                return ;
            }
            $scope.tips = '';
            newActivity.save();
            $location.path('/activity_sign_up');
        };

        $scope.GotoActivityList = function () {
            $location.path('/');
        }
    });
