function Price(activity, count, status, selected) {
    this.activity = activity;
    this.count = count;
    this.status = status;
    this.selected = selected;
}

Price.prototype.save = function() {
    var prices = Price.getPrice();
    prices.unshift(this);
    Price.setPrice(prices);
};

//Price.prototype.pitchOn = function() {
//    var prices = Price.getPrice();
//    _.findWhere(prices, {activity: this.activity ,count: this.count}).selected = 1;
//    localStorage['prices'] = JSON.stringify(prices);
//};
//
//Price.prototype.unPitch = function() {
//    var prices = Price.getPrice();
//    _.findWhere(prices, {activity: this.activity ,count: this.count}).selected = 2;
//    localStorage['prices'] = JSON.stringify(prices);
//};
//
//Price.prototype.runPrice = function() {
//    var prices = Price.getPrice();
//    _.findWhere(prices, {activity: this.activity ,count: this.count}).status = 1;
//    localStorage['prices'] = JSON.stringify(prices);
//};
//
//Price.prototype.stopPrice = function() {
//    var prices = Price.getPrice();
//    _.findWhere(prices, {activity: this.activity ,count: this.count}).status = 2;
//    localStorage['prices'] = JSON.stringify(prices);
//};

Price.findBy = function(value){
    var prices = Price.getPrice();
    return (_.findWhere(prices , value)|| {selected: ''});
};

Price.setPrice = function (prices) {
    localStorage['Price'] = JSON.stringify(prices);
};

Price.getPrice = function () {
    return init_key('Price');
};

Price.hasPrice = function(){
    return (Price.getPrice() != '');
};

Price.hasOngoingPrice = function() {
    return (Price.getOngoingPrice() != '');
};

Price.hasSelectedPrice = function() {
    return (Price.getSelectedPrice() != '');
};

Price.getOngoingPrice = function() {
    var prices = Price.getPrice();
    return (_.findWhere(prices , {status: 1} ) || {activity: '' ,count: ''});
};

Price.getSelectedPrice = function() {
    var prices = Price.getPrice();
    return (_.findWhere(prices, {selected: 1})|| {activity: '' ,count: ''});
};