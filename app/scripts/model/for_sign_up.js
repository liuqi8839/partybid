


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
    return {name:button_name,status:button_status};
}

function sign_up_sms(){
    var sign_up_messages = [];
    if(!get_value('SignUpInformation')){
        var sign_up_numbers=0;
    }
    else {
        for (var i = 0; i < parse_value('SignUpInformation').length; i++) {
            if (parse_value('SignUpInformation')[i].activity == Activity.getSelectedActivity().activity) {
                sign_up_messages.push({name: parse_value('SignUpInformation')[i].name, phone: parse_value('SignUpInformation')[i].phone_number})
            }
        }
        sign_up_numbers=sign_up_messages.length;
    }
    return {numbers:sign_up_numbers,messages:sign_up_messages}
}
