/**
 * Created by liuqi on 14-8-7.
 */

function create_new(new_activity){
    var activities=init_key('Activities');
    for(var i=0;i<activities.length;i++){
        activities[i].selected=2;
    }
    unshift_value({"activity":new_activity,"status":2,"selected":1},activities,'Activities');
}
