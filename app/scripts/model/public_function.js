/**
 * Created by liuqi on 14-7-31.
 */

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

function revise_value(value,key){
    localStorage[key]=JSON.stringify(value);
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
    var activities_name = parse_value(key);
    for(var n=0;n<activities_name.length;n++){
        if(value == activities_name[n]){
            p=2;
            break;
        }
        else{
            p=1;
        }
    }
    return p;
}