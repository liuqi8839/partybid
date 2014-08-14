/**
 * Created by liuqi on 14-8-1.
 */

function get_prices(){
    var price=init_key('Price');
    var price_counts=new Array();
    for(var i=0;i<price.length;i++){
        if(price[i].activity==Activity.getSelectedActivity()) {
            price_counts.push(price[i].count);
        }
    }
    return price_counts;
}

function creat_new_price(){
    var prices=init_key('Price');
    for(var i=0;i<prices.length;i++){
        prices[i].selected=2;
    }
    unshift_value({"activity":Activity.getSelectedActivity(),"count":new_count(),"status":1,"selected":1},prices,'Price');
}

function new_count(){
    var count=1;
    var price=init_key('Price');
    for(var i=0;i<price.length;i++){
        if(price[i].activity==Activity.getSelectedActivity()){
            count=price[i].count+1;
            break;
        }
    }
    return count;
}

function determine_StartButton(){
    if(get_ongoing_price().activity=='null' ||get_ongoing_price().activity=='never'){
        var StartButtonStatus=1;
    }
    else{
        var ongoing_price=get_ongoing_price();
        if(ongoing_price.name==Activity.getSelectedActivity()){
            var ongoing=ongoing_price.count;
        }
        StartButtonStatus=0;
    }
    return{ongoing:ongoing,status:StartButtonStatus};
}

function price_select(count) {
    var prices=init_key("Price");
    for(var i=0;i<prices.length;i++){
        prices[i].selected=2;
        if(prices[i].count==count && Activity.getSelectedActivity() == prices[i].activity){
            prices[i].selected=1;
        }
    }
    localStorage['Price'] = JSON.stringify(prices);
}

function judge_sign_up(){
    var flag = 1;
    var sign_up_information = init_key("SignUpInformation");
    for(var i = 0 ; i < sign_up_information.length ; i++) {
        if (sign_up_information[i].activity == Activity.getSelectedActivity()) {
            flag = 2;
            break;
        }
    }
    return flag;
}