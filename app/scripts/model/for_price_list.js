/**
 * Created by liuqi on 14-8-1.
 */


function determine_StartButton(){
    if(Price.hasOngoingPrice() == false){
        var StartButtonStatus = 1;
    }
    else{
        if(Price.getOngoingPrice().activity == Activity.getSelectedActivity().activity){
            var ongoing = Price.getOngoingPrice().count;
        }
        StartButtonStatus = 0;
    }
    return{ongoing: ongoing , status: StartButtonStatus};
}

function judge_sign_up(){
    var flag = 1;
    var sign_up_information = init_key("SignUpInformation");
    for(var i = 0 ; i < sign_up_information.length ; i++) {
        if (sign_up_information[i].activity == Activity.getSelectedActivity().activity) {
            flag = 2;
            break;
        }
    }
    return flag;
}