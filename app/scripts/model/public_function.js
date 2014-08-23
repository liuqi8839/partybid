
function init_key(key) {
    if(localStorage.getItem(key)) {
        var names = parse_value(key);
    }
    else{
        names = [];
    }
    return names;
}

function parse_value(key) {
    return JSON.parse(localStorage.getItem(key));
}

function determine_Button() {
    if(Price.hasOngoingPrice() && Price.getOngoingPrice().activity != Activity.getSelectedActivity().activity) {
        return {name: '开始', status: false};
    }
    if(Price.hasOngoingPrice() && Price.getOngoingPrice().activity == Activity.getSelectedActivity().activity){
        return {name: '结束' , status: false};
    }
    if(Activity.hasOngoingActivity() && Activity.getOngoingActivity().activity != Activity.getSelectedActivity().activity){
        return {name: '开始' , status: false};
    }
    if(Activity.hasOngoingActivity() && Activity.getOngoingActivity().activity == Activity.getSelectedActivity().activity) {
        return {name: '结束' , status: true};
    }
    return {name: '开始' , status: true};
}

function determine_EndButton() {
    var prices = Price.getPrice();
    return _.some(prices, function(anyPrice) {
        if(anyPrice.selected == 1 && anyPrice.status == 1){
            return true;
        }
    });
    return false;
}
