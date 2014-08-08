/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')

    .controller('ActivityListCtrl', function ($scope, $location) {

        if (!get_value('Activities')) {
            $location.path('/create_activity');
        }

        $scope.activities_name=parse_value('Activities');

        $scope.CreateButtonStatus=determine_CreatButton().status;

        $scope.BackGroundColor=function(name){
            return change_background_color(name,determine_CreatButton().activity);
        }

        $scope.GotoActivitySignUp = function (name) {
            activity_select(name);
            $location.path('/activity_sign_up');
        }

        $scope.GotoCreateActivity = function () {
            $location.path('/create_activity');
        }
    })