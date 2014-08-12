/**
 * Created by liuqi on 14-8-1.
 */

function determine_EndButton() {
    var prices=init_key("Price");
    for(var i=0;i<prices.length;i++) {
        if (prices[i].selected == 1 && prices[i].status == 1) {
            var EndButtonStatus = 1;
            break;
        }
        else {
            EndButtonStatus = 0;
        }
    }
    return  EndButtonStatus;
}

function EndOngoingPrice() {
    var flag=false;
    if (confirm('您确定要结束本次竞价吗？') == true) {
        var prices=init_key('Price');
        for(var i=0;i<prices.length;i++){
            prices[i].status=2;
        }
        localStorage['Price']= JSON.stringify(prices);
        flag=true;
    }
    return flag;
}

function price_sms(){
    var price_messages=new Array();
    if(get_value('PriceInformation')){
        var price_information=init_key('PriceInformation');
        var sequence_number=0;
        for (var i = 0; i <  price_information.length; i++) {
            if ( price_information[i].activity == get_selected_price().activity
                && price_information[i].count == get_selected_price().count) {
                sequence_number += 1;
                var sign_up_information=init_key('SignUpInformation');
                for(var n=0;n<sign_up_information.length;n++){
                    if(price_information[i].phone_number==sign_up_information[n].phone_number){
                        price_information[i].name=sign_up_information[n].name;
                    }
                }
                price_messages.push(
                    {sequence:sequence_number,price:price_information[i].price,
                        name:price_information[i].name, phone: price_information[i].phone_number}
                );
            }
        }
    }
    return {numbers:price_messages.length,messages:price_messages};
}
