/**
 * Created by liuqi on 14-7-30.
 */



function change_background_color(name,key){
    var flag='';
    if(name==parse_value(key)){
        flag= 'btn-warning';
    }
    else{
        flag='';
    }
    return flag;
}