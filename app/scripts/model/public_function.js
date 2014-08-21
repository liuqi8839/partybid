/**
 * Created by liuqi on 14-7-31.
 */
function init_key(key) {
    if(get_value(key)) {
        var names = parse_value(key);
    }
    else{
        names = [];
    }
    return names;
}

function get_value(key) {
    var flag = false;
    if(localStorage.getItem(key)) {
        flag = true;
    }
    return flag;
}

function parse_value(key) {
    return JSON.parse(localStorage.getItem(key));
}

function unshift_value(value,name,key) {
    name.unshift(value);
    localStorage[key] = JSON.stringify(name);
}
