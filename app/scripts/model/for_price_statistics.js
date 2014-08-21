/**
 * Created by liuqi on 14-8-8.
 */

function statistics_sms() {
    var price_counts = statistics_price_counts();
    for(var n = 0 ; n < price_counts.length - 1 ; n++) {
        for(var m = 1 ; m < price_counts.length ; m++) {
            if(price_counts[n].price > price_counts[m].price){
                var temp = price_counts[n];
                price_counts[n] = price_counts[m];
                price_counts[m] = temp;
            }
        }
    }
    return price_counts;
}

function successful_bid() {
    var bid = [];
    var price_counts = statistics_sms();
    for(var i = 0 ; i < price_counts.length ; i++) {
        if(price_counts[i].count == 1) {
            bid = price_counts[i];
            break;
        }
    }
    return bid;
}

function successful_bidder() {
    var price_information = result_add_name();
    for(var i = 0 ; i < price_information.length ; i++) {
        if(price_information[i].price == successful_bid().price) {
            var successful_bidder = price_information[i];
        }
    }
    return successful_bidder;
}

function statistics_price_counts() {
    var price_statistics = statistics_price_information();
    var price_counts = [];
    for(var j = 0 ; j < price_statistics.length ; j++) {
        var flag = 1;
        for(var k = 0 ; k < price_counts.length ; k++) {
            if(price_statistics[j].price == price_counts[k].price) {
                flag = 2;
                price_counts[k].count += 1;
            }
        }
        if(flag == 1) {
            price_counts.push({price: price_statistics[j].price , count: 1});
        }
    }
    return price_counts;
}

function statistics_price_information() {
    var price_statistics = [];
    var price_information = init_key('PriceInformation');
    for (var i = 0; i < price_information.length; i++){
        if ( price_information[i].activity == Price.getSelectedPrice().activity
            && price_information[i].count == Price.getSelectedPrice().count) {
            price_statistics.push({price: price_information[i].price , phone: price_information[i].phone_number})
        }
    }
    return price_statistics;
}