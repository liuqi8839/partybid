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

Price.prototype.newCount = function() {
    if(Price.getAllCounts() == []) {
        return this.count = 1;
    }
    this.count = Price.getAllCounts().length + 1 ;
};

Price.prototype.pitchOn = function() {
    var prices = Price.getPrice();
    _.findWhere(prices, {activity: this.activity, count: this.count}).selected = 1;
    Price.setPrice(prices);
};

Price.prototype.unPitch = function() {
    var prices = Price.getPrice();
    _.findWhere(prices, {activity: this.activity, count: this.count}).selected = 2;
    Price.setPrice(prices);
};

Price.prototype.runPrice = function() {
    var prices = Price.getPrice();
    _.findWhere(prices, {activity: this.activity, count: this.count}).status = 1;
    Price.setPrice(prices);
};

Price.prototype.stopPrice = function() {
    var prices = Price.getPrice();
    _.findWhere(prices, {activity: this.activity, count: this.count}).status = 2;
    Price.setPrice(prices);
};

Price.getAllCounts = function() {
    var price_counts = [];
    _.some(Price.getPrice(), function(anyPrice) {
        if(anyPrice.activity == Activity.getSelectedActivity().activity) {
            price_counts.push(anyPrice.count);
        }
    });
    return price_counts;
};

Price.findBy = function(value){
    return (_.findWhere(Price.getPrice(), value) || {activity: '', count: ''});
};

Price.setPrice = function (prices) {
    localStorage['Price'] = JSON.stringify(prices);
};

Price.getPrice = function () {
    return init_key('Price');
};

Price.hasPrice = function(){
    return (Price.getPrice() != []);
};

Price.hasOngoingPrice = function() {
    return (Price.getOngoingPrice().activity != '');
};

Price.hasSelectedPrice = function() {
    return (Price.getSelectedPrice().activity != '');
};

Price.getOngoingPrice = function() {
    return ( _.findWhere(Price.getPrice(), {status: 1}) || {activity: ''} );
};

Price.getSelectedPrice = function() {
    return ( _.findWhere(Price.getPrice(), {selected: 1}) || {activity: ''} );
};