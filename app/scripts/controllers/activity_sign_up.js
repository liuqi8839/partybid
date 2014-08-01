/**
 * Created by liuqi on 14-7-23.
 */
angular.module('partybidApp')
    .controller('ActivitySignUpCtrl', function ($scope, $location) {

        $scope.current_activity = parse_value('CurrentActivity');

        ($scope.page_head = function(){
            $scope.Messages=parse_value($scope.current_activity);

            if(!get_value($scope.current_activity)){
                $scope.sign_up_number=0;
            }
            else{
                $scope.sign_up_number=$scope.Messages.length;
            }
        })();


        determine_StartButton();

        $scope.StartActivity=function(){
            ChangeOngoing('OngoingActivity','CurrentActivity');
            determine_StartButton();
        }

        function determine_StartButton(){
            $scope.judge_button=JudgeButton('OngoingActivity','CurrentActivity');
            if ($scope.judge_button==1) {
                $scope.able_start = 1;
                var button_name = '开始';
            }
            else {
                if ($scope.judge_button == 3) {
                    $scope.able_start = 1;
                    button_name = '结束';
                }
                else {
                    $scope.able_start = 0;
                    button_name = '开始';
                }
            }
            $scope.show_start = button_name;
        }

        $scope.BackToList = function () {
            $location.path('/')
        };
    });