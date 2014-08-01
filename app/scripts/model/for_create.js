/**
 * Created by liuqi on 14-7-30.
 */

function create_new(value,key_1,key_2){
    if(judge_new(value,key_1)==1){
        var activities_name=parse_value(key_1);
    }
    else{
        activities_name=new Array();
    }
    unshift_value(value,activities_name,key_1)
    revise_value(value,key_2)
}