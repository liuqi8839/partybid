/**
 * Created by liuqi on 14-8-1.
 */
angular.module('partybidApp')

    .controller('PriceListCtrl', function ($scope, $location) {

        $scope.StartButtonStatus=determine_StartButton().status;

        $scope.BackGroundColor=function(count){
            return change_background_color(count,determine_StartButton().ongoing);
        }

        $scope.current_activity = get_selected_activity();

        $scope.Prices=get_prices();

        $scope.StartNewPrice = function(){
            if (judge_sign_up()==2){
                creat_new_price();
                $location.path('/price_activity');
            }
            else {
                alert('没有报名者，不能进行竞价！');
            }
        }

        $scope. GotoPriceActivity = function (count) {
            price_select(count);
            $location.path('/price_activity');
        }

        $scope.BackToList = function () {
            $location.path('/');
        }

        $scope.GoToSignUp=function(){
            $location.path('/activity_sign_up');
        }
    })