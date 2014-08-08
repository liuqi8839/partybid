/**
 * Created by liuqi on 14-8-8.
 */
angular.module('partybidApp')

    .controller('PriceResultCtrl', function ($scope, $location) {

        $scope.current_price =get_selected_price();
        $scope.result_numbers=result_sms().numbers;
        $scope.result_messages=result_sms().messages;


        $scope.BackToPriceList = function () {
            $location.path('/price_list');
        }
        $scope.GotoToPriceStatistics = function () {
            $location.path('/price_statistics');
        }
    })