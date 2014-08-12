/**
 * Created by liuqi on 14-7-23.
 */


angular.module('partybidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {

        $scope.activity_back=get_value('Activities');

        $scope.CreateActivity=function(new_activity) {
            if (judge_new(new_activity, 'Activities') == 2) {
                $scope.tips = '活动名称重复';
            }
            else {
                $scope.tips = '';
                create_new(new_activity);
                $location.path('/activity_sign_up');
            }
        }

        $scope.GotoActivityList = function () {
            $location.path('/');
        }
    })
