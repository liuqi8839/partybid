/**
 * Created by liuqi on 14-8-1.
 */
angular.module('partybidApp')

    .controller('PriceActivityCtrl', function ($scope, $location) {
        $scope.EndPrice=function(){
            if(EndOngoingPrice()==true){
                $location.path('/price_result/'+'show');
            }
        }

        $scope.current_price =Price.getSelectedPrice();

        ($scope.prices = function(){
            $scope.price_number=price_sms().numbers;
            $scope.Messages=price_sms().messages;
        })()

        $scope.EndButtonStatus=determine_EndButton();

        $scope.BackToPriceList = function () {
            $location.path('/price_list');
        }


    })