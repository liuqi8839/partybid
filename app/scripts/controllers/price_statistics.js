/**
 * Created by liuqi on 14-8-8.
 */
angular.module('partybidApp')

    .controller('PriceStatisticsCtrl', function ($scope, $location) {

        $scope.current_price =get_selected_price();
        $scope.statistics_SMS=statistics_sms();
        $scope.statistics_numbers=statistics_price_information().length;
        $scope.successful_bidder=successful_bidder();

        $scope.BackToPriceList = function () {
            $location.path('/price_list');
        }
        $scope.GotoToPriceResult = function () {
            $location.path('/price_result/'+'hide');
        }
    })