/**
 * Created by liuqi on 14-7-30.
 */

function determine_CreatButton(){
    if(get_ongoing_price().activity == 'null' || get_ongoing_price().activity == 'never'){
        var CreateButtonStatus=1;
        var ongoing_activity = Activity.getOngoingActivity();
    }
    else{
        CreateButtonStatus=0;
        ongoing_activity=get_ongoing_price().activity;
    }
    return {activity:ongoing_activity,status:CreateButtonStatus};
}

function change_background_color(activity,ongoing){
    var flag='';
    if(activity==ongoing){
        flag= 'btn-warning';
    }else{
        flag='';
    }
    return flag;
}

//function activity_select(name) {
//    var names = init_key('Activities');
//    for (var i = 0; i < names.length; i++) {
//        names[i].selected = 2;
//        if (names[i].name == name) {
//            names[i].selected = 1;
//        }
//    }
//    localStorage['Activities'] = JSON.stringify(names);
//}