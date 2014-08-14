/**
 * Created by liuqi on 14-7-30.
 */

function ChangeOngoing() {
    var temp= Activity.findBy({"selected": 1});
    var activity = new Activity(temp.activity,temp.status,temp.selected);
    if (Activity.hasOngoingActivity() == false){
        activity.runActivity();
        return false;
    }
    if (confirm('您确定要结束本次报名吗？') == true) {
        activity.stopActivity();
        return true;
    }
}

function determine_Button(){
//    if(get_ongoing_price().activity != 'null' && get_ongoing_price().activity != 'never' )  {
//        if( get_ongoing_price().activity != Activity.getSelectedActivity() )  {
//            var button_name = '开始';
//            var button_status = 0;
//        }
//        else{
//            button_name = '结束';
//            button_status = 0;
//        }
//    }
//    else {
//        if (Activity.getOngoingActivity() == '' ) {
//            button_name = '开始';
//            button_status = 1;
//        }
//        else {
//            if (Activity.getOngoingActivity() == Activity.getSelectedActivity() ) {
//                button_name = '结束';
//                button_status = 1;
//            }
//            else {
//                button_name = '开始';
//                button_status = 0;
//            }
//        }
//    }
    if((get_ongoing_price().activity != 'null' && get_ongoing_price().activity != 'never')
        && get_ongoing_price().activity != Activity.getSelectedActivity() ) {

        var button_name = '开始';
        var button_status = 0;
    }
    else if((get_ongoing_price().activity != 'null' && get_ongoing_price().activity != 'never')
        && get_ongoing_price().activity == Activity.getSelectedActivity()){

        button_name = '结束';
        button_status = 0;
    }
    else if((get_ongoing_price().activity == 'null' || get_ongoing_price().activity == 'never')
        &&  Activity.hasOngoingActivity() == false ){

        button_name = '开始';
        button_status = 1;
    }
    else if((get_ongoing_price().activity == 'null' || get_ongoing_price().activity == 'never')
        &&  Activity.hasOngoingActivity() == true
        && Activity.getOngoingActivity() == Activity.getSelectedActivity() ){

        button_name = '结束';
        button_status = 1;
    }
    else if((get_ongoing_price().activity == 'null' || get_ongoing_price().activity == 'never')
        &&  Activity.hasOngoingActivity() == true
        && Activity.getOngoingActivity() != Activity.getSelectedActivity() ) {
        button_name = '开始';
        button_status = 0;
    }
    return {name:button_name,status:button_status};
}

function sign_up_sms(){
    var sign_up_messages=new Array();
    if(!get_value('SignUpInformation')){
        var sign_up_numbers=0;
    }
    else {
        for (var i = 0; i < parse_value('SignUpInformation').length; i++) {
            if (parse_value('SignUpInformation')[i].activity == Activity.getSelectedActivity()) {
                sign_up_messages.push({name: parse_value('SignUpInformation')[i].name, phone: parse_value('SignUpInformation')[i].phone_number})
            }
        }
        sign_up_numbers=sign_up_messages.length;
    }
    return {numbers:sign_up_numbers,messages:sign_up_messages}
}

