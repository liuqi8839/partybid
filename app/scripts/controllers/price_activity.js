/**
 * Created by liuqi on 14-8-1.
 */
angular.module('partybidApp')

    .controller('PriceActivityCtrl', function ($scope, $location) {
        $scope.EndPrice = function() {
            if (confirm('您确定要结束本次竞价吗？') == true) {
                var temp = Price.findBy({"selected": 1});
                var price = new Price(temp.activity, temp.count , temp.status, temp.selected);
                price.stopPrice();
                $location.path('/price_result/'+'show');
            }
        };

        $scope.current_price = Price.getSelectedPrice();

        ($scope.prices = function(){
            $scope.price_number = price_sms().numbers;
            $scope.Messages = price_sms().messages;
        })();

        $scope.EndButtonStatus = determine_EndButton();

        $scope.BackToPriceList = function () {
            var temp = Price.findBy({"selected": 1});
            var price = new Price(temp.activity , temp.count , temp.status , temp.selected);
            price.unPitch();
            $location.path('/price_list');
        }
    });
