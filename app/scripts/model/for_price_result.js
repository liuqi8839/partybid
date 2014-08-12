/**
 * Created by liuqi on 14-8-8.
 */

function result_sms(){
    var result_final=new Array();
    if(get_value('PriceInformation')){
        result_final=result_after_sequence();
    }
    return {numbers:result_final.length,messages:result_final};
}

function result_after_sequence(){
    var result_sequence=new Array();
    var price_messages=result_after_order();
    for(var k=0;k<price_messages.length;k++){
        var sequence_number= k+1;
        result_sequence.push({sequence:sequence_number,price:price_messages[k].price,name:price_messages[k].name, phone: price_messages[k].phone});
    }
    return result_sequence;
}

function result_after_order(){
    var price_messages=result_add_name();
    for(var j=0;j<price_messages.length-1;j++){
        for(var m=1;m<price_messages.length;m++){
            if(price_messages[j].price>price_messages[m].price){
                var temp=price_messages[j];
                price_messages[j]=price_messages[m];
                price_messages[m]=temp;
            }
        }
    }
    return price_messages;
}

function result_add_name(){
    var price_messages=new Array();
    var price_information=init_key('PriceInformation');
    for (var i = 0; i < price_information.length; i++){
        if ( price_information[i].activity == get_selected_price().activity
            && price_information[i].count == get_selected_price().count) {
            var sign_up_information=init_key('SignUpInformation');
            for(var n=0;n<sign_up_information.length;n++){
                if(price_information[i].phone_number==sign_up_information[n].phone_number){
                    price_information[i].name=sign_up_information[n].name;
                }
            }
            price_messages.push({price:price_information[i].price,name:price_information[i].name, phone: price_information[i].phone_number});
        }
    }
    return price_messages;
}