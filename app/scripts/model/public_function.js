/**
 * Created by liuqi on 14-7-31.
 */
function init_key(key){
    if(get_value(key)){
        var names=parse_value(key);
    }else{
        names=new Array();
    }
    return names;
}

function get_value(key){
    var flag=false;
    if(localStorage.getItem(key)) {
        flag=true;
    }
    return flag;
}

function parse_value(key){
    return JSON.parse(localStorage.getItem(key));
}

function unshift_value(value,name,key){
    name.unshift(value);
    localStorage[key] = JSON.stringify(name);
}

function judge_new(value,key){
    var p=3;
    if(get_value(key)) {
        p=judge_repeat(value,key);
    }
    return p;
}

function judge_repeat(value,key) {
    var p=1;
    var names = parse_value(key);
    for(var n=0;n<names.length;n++){
        if(value == names[n].activity){
            p=2;
            break;
        }
    }
    return p;
}

function change_background_color(name,ongoing){
    var flag='';
    if(name==ongoing){
        flag= 'btn-warning';
    }else{
        flag='';
    }
    return flag;
}

function get_ongoing_activity(){
    if(!get_value('Activities')){
        ongoing_activity='null';
    }
    else {
        var activities=init_key('Activities');
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].status == 1) {
                var ongoing_activity = activities[i].activity;
                break;
            }
            else {
                ongoing_activity = 'null'
            }
        }
    }
    return ongoing_activity;
}

function get_selected_activity(){
    var activities=init_key('Activities');
    for(var i=0;i<activities.length;i++){
        if(activities[i].selected==1){
            var selected_activity=activities[i].activity;
        }
    }
    return selected_activity;
}

function get_ongoing_price(){
    if(!get_value('Price')){
        ongoing_activity='never';
        ongoing_count='never';
    }
    else {
        var price=init_key('Price');
        for (var i = 0; i < price.length; i++) {
            if (price[i].status == 1) {
                var ongoing_activity = price[i].activity;
                var ongoing_count =price[i].count;
                break;
            }
            else {
                ongoing_activity = 'null';
                ongoing_count = 'null';
            }
        }
    }
    return {activity:ongoing_activity,count:ongoing_count};
}

function get_selected_price(){
    var price=init_key('Price');
    for(var i=0;i<price.length;i++){
        if(price[i].selected==1){
            var selected_activity=price[i].activity;
            var selected_count=price[i].count;
        }
    }
    return {activity:selected_activity,count:selected_count};
}
