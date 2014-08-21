
angular.module('partybidApp')

    .controller('PriceListCtrl', function ($scope, $location) {

        $scope.StartButtonStatus = determine_StartButton().status;

        $scope.Prices = Price.getAllCounts();

        $scope.current_activity = Activity.getSelectedActivity();

        $scope.PriceColor = function(count) {
            if (Price.getOngoingPrice().activity == Activity.getSelectedActivity.activity) {
                var background = (count == Price.getOngoingPrice().count) ? 'btn-warning' : '';
            }
            else{
                background = '';
            }
            return background;
        };

        $scope.StartNewPrice = function() {
            if (judge_sign_up() == 2){
                var  newPrice = new Price(Activity.getSelectedActivity().activity , 0 , 2 , 1);
                newPrice.newCount();
                newPrice.save();
                newPrice.runPrice();
                $location.path('/price_activity');
            }
            else{
                alert('没有报名者，不能进行竞价！');
            }
        };

        $scope.GotoPriceActivity = function (count) {
            var temp = Price.findBy({"activity": Activity.getSelectedActivity().activity , "count": count});
            var price = new Price(temp.activity , temp.count , temp.status , temp.selected);
            price.pitchOn();
            $location.path('/price_activity');
        };

        $scope.BackToList = function () {
            var temp = Activity.findBy({"selected": 1});
            var activity = new Activity(temp.activity,temp.status,temp.selected);
            activity.unPitch();
            $location.path('/');
        };

        $scope.GoToSignUp=function() {
            $location.path('/activity_sign_up');
        }
    });