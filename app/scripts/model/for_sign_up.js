/**
 * Created by liuqi on 14-7-30.
 */

function JudgeButton(key_1,key_2){
    if(parse_value(key_1)=='null'||!get_value(key_1)) {
        var flag = 1;
    }
    else{
        if (parse_value(key_1) != parse_value(key_2)) {
            flag=2;
        }
        else {
            flag=3;
        }
    }
    return flag;
}

function ChangeOngoing(key_1,key_2) {
    var flag=true;
    if (parse_value(key_1) == 'null' || !get_value(key_1)) {
        var ongoing_activity = parse_value(key_2);
    }
    else {
        flag = confirm('您确定要结束本活动报名吗？');
        if (flag == true) {
            ongoing_activity = 'null';
        }
    }
    if (flag==true){
        revise_value(ongoing_activity,key_1);
    }
}