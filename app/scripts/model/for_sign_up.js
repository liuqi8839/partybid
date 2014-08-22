


function determine_Button(){

    if( Price.hasOngoingPrice() == true ){
        if( Price.getOngoingPrice().activity != Activity.getSelectedActivity().activity ){
            var button_name = '开始';
            var button_status = 0;
        }
        else{
            button_name = '结束';
            button_status = 0;
        }
    }
    else{
        if( Activity.hasOngoingActivity() == false ){
            button_name = '开始';
            button_status = 1;
        }
        else if(Activity.getOngoingActivity().activity == Activity.getSelectedActivity().activity) {
            button_name = '结束';
            button_status = 1;
        }
        else{
            button_name = '开始';
            button_status = 0;
        }
    }
    return {name: button_name , status: button_status};
}
