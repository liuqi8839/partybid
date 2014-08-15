/**
 * Created by liuqi on 14-8-1.
 */
angular.module('partybidApp')

    .controller('PriceListCtrl', function ($scope, $location) {

        $scope.StartButtonStatus=determine_StartButton().status;

        $scope.BackGroundColor=function(count){
            var ongoing_activity = Price.getOngoingPrice().activity;
            return (count == ongoing_activity) ? 'btn-warning' : "";
        };

        $scope.current_activity = Activity.getSelectedActivity();

        $scope.Prices=Price.hasPrice();

        $scope.StartNewPrice = function(){
            if (judge_sign_up()==2){
                creat_new_price();
                $location.path('/price_activity');
            }
            alert('没有报名者，不能进行竞价！');
        };

        $scope. GotoPriceActivity = function (count) {
            price_select(count);
            $location.path('/price_activity');
        };

        $scope.BackToList = function () {
            var temp = Activity.findBy({"selected": 1});
            var activity = new Activity(temp.activity,temp.status,temp.selected);
            activity.unPitch();
            $location.path('/');
        };

        $scope.GoToSignUp=function(){
            $location.path('/activity_sign_up');
        }
    });