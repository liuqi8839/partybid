/**
 * Created by liuqi on 14-7-30.
 */

function ChangeOngoing() {
    var flag=false;
    var activities_name = init_key('Activities');
    if (get_ongoing_activity() == 'null'){
        for (var i = 0; i < activities_name.length; i++) {
            if (activities_name[i].selected == 1) {
                activities_name[i].status = 1;
            }
        }
    }
    else {
        if (confirm('您确定要结束本次报名吗？') == true) {
            flag=true;
            for (var i = 0; i < activities_name.length; i++) {
                activities_name[i].status = 2;
            }
        }
    }
    localStorage['Activities'] = JSON.stringify(activities_name);
    return flag;
}

function determine_Button(){
    if(get_ongoing_price().activity!='null' && get_ongoing_price().activity!='never'){
        if(get_ongoing_price().activity!=get_selected_activity()){
            var button_name = '开始';
            var button_status = 0;
        }
        else{
            button_name = '结束';
            button_status = 0;
        }
    }
    else {
        if (get_ongoing_activity() == 'null') {
            button_name = '开始';
            button_status = 1;
        }
        else {
            if (get_ongoing_activity() == get_selected_activity()) {
                button_name = '结束';
                button_status = 1;
            }
            else {
                button_name = '开始';
                button_status = 0;
            }
        }
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
            if (parse_value('SignUpInformation')[i].activity == get_selected_activity()) {
                sign_up_messages.push({name: parse_value('SignUpInformation')[i].name, phone: parse_value('SignUpInformation')[i].phone_number})
            }
        }
        sign_up_numbers=sign_up_messages.length;
    }
    return {numbers:sign_up_numbers,messages:sign_up_messages};
}

