/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivitySignUpCtrl', function ($scope, $location) {

        $scope.current_activity = get_selected_activity();

        ($scope.page_head = function(){
            $scope.sign_up_number=sign_up_sms().numbers;
            $scope.Messages=sign_up_sms().messages;
        })()

        $scope.ButtonStatus=determine_Button().status;
        $scope.ButtonText = determine_Button().name;

        $scope.StartActivity=function(){
            if (ChangeOngoing()==true){
                $location.path('/price_list');
            }
            else{
                $scope.ButtonStatus=determine_Button().status;
                $scope.ButtonText = determine_Button().name;
            }
        }

        $scope.GoToPriceList=function(){
            if(get_ongoing_activity()=='null'){
                $location.path('/price_list');
            }
            else{
                alert('尚有报名未结束，不能开始竞价！')
            }
        }

        $scope.BackToList = function () {
            $location.path('/')
        }

    })