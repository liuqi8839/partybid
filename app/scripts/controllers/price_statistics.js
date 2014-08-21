/**
 * Created by liuqi on 14-8-8.
 */
angular.module('partybidApp')

    .controller('PriceStatisticsCtrl', function ($scope, $location) {

        $scope.current_price = Price.getSelectedPrice();
        $scope.statistics_SMS = statistics_sms();
        $scope.statistics_numbers = statistics_price_information().length;
        $scope.successful_bidder = successful_bidder();

        $scope.BackToPriceList = function () {
            var temp = Price.getSelectedPrice();
            var price = new Price(temp.activity , temp.count , temp.status , temp.selected);
            price.unPitch();
            $location.path('/price_list');
        };

        $scope.GotoToPriceResult = function () {
            $location.path('/price_result/'+'hide');
        }
    });