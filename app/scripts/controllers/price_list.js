
angular.module('partybidApp')

    .controller('PriceListCtrl', function ($scope, $location) {

        $scope.StartButtonStatus = Price.hasOngoingPrice();

        $scope.Prices = Price.getAllCounts();

        $scope.current_activity = Activity.getSelectedActivity();

        $scope.PriceColor = function(price) {
            var background = (price == Price.getOngoingPrice().count) ? 'btn-warning' : '';
            background =  (Price.getOngoingPrice().activity == Activity.getSelectedActivity().activity) ? background : '';
            return background;
        };

        $scope.StartNewPrice = function() {
            if (!SignUpInformation.hasSignUpOfCurrentActivity()){
                return alert('没有报名者，不能进行竞价！');
            }
            var  newPrice = new Price(Activity.getSelectedActivity().activity , 0 , false , true);
            newPrice.newCount();
            newPrice.save();
            newPrice.runPrice();
            $location.path('/price_activity');
        };

        $scope.GotoPriceActivity = function (count) {
            var temp = Price.findBy({"activity": Activity.getSelectedActivity().activity , "count": count});
            var price = new Price(temp.activity , temp.count , temp.status , temp.selected);
            price.pitchOn();
            $location.path('/price_activity');
        };

        $scope.BackToList = function () {
            var temp = Activity.getSelectedActivity();
            var activity = new Activity(temp.activity,temp.status,temp.selected);
            activity.unPitch();
            $location.path('/');
        };

        $scope.GoToSignUp=function() {
            $location.path('/activity_sign_up');
        }
    });
