
angular.module('partybidApp')

    .controller('PriceActivityCtrl', function ($scope, $location) {
        $scope.EndPrice = function() {
            if (confirm('您确定要结束本次竞价吗？') == true) {
                var temp = Price.getSelectedPrice();
                var price = new Price(temp.activity, temp.count , temp.status, temp.selected);
                price.stopPrice();
                $location.path('/price_result/'+'show');
            }
        };

        $scope.current_price = Price.getSelectedPrice();

        ($scope.prices = function(){
            $scope.Messages = PriceInformation.showAllOfCurrentPrice();
        })();

        $scope.EndButtonStatus = determine_EndButton();

        $scope.BackToPriceList = function () {
            var temp = Price.getSelectedPrice();
            var price = new Price(temp.activity , temp.count , temp.status , temp.selected);
            price.unPitch();
            $location.path('/price_list');
        }
    });
