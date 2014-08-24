
angular.module('partybidApp')

    .controller('PriceStatisticsCtrl', function ($scope, $location) {

        $scope.current_price = Price.getSelectedPrice();
        $scope.statistics_SMS = PriceInformation.giveResultSort(PriceInformation.getStatisticsCounts());
        $scope.statistics_numbers = PriceInformation.getStatisticsInformation().length;
        $scope.successful_bidder = PriceInformation.getSuccessfulBidder();

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
