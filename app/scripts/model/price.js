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
    if( Price.getAllCounts() == []) {
        this.count = 1;
    }
    else{
        this.count = Price.getAllCounts().length + 1 ;
    }
};

Price.prototype.pitchOn = function() {
    var prices = Price.getPrice();
    _.findWhere(prices, {activity: this.activity ,count: this.count}).selected = 1;
    Price.setPrice(prices);
};

Price.prototype.unPitch = function() {
    var prices = Price.getPrice();
    _.findWhere(prices, {activity: this.activity ,count: this.count}).selected = 2;
    Price.setPrice(prices);
};

Price.prototype.runPrice = function() {
    var prices = Price.getPrice();
    _.findWhere(prices, {activity: this.activity, count: this.count}).status = 1;
    Price.setPrice(prices);
}

Price.prototype.stopPrice = function() {
    var prices = Price.getPrice();
    _.findWhere(prices, {activity: this.activity ,count: this.count}).status = 2;
    Price.setPrice(prices);
};

Price.getAllCounts = function() {
    var prices = Price.getPrice();
    var price_counts = [];
    for(var i = 0 ; i < prices.length ; i++){
        if(prices[i].activity == Activity.getSelectedActivity().activity) {
            price_counts.push(prices[i].count);
        }
    }
    return price_counts;
};

Price.findBy = function(value){
    var prices = Price.getPrice();
    return (_.findWhere(prices , value) || {activity: '' , count: ''});
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
    var prices = Price.getPrice();
    return ( _.findWhere(prices ,{status: 1}) || {activity:''} );
};

Price.getSelectedPrice = function() {
    var prices = Price.getPrice();
    return ( _.findWhere(prices ,{selected: 1}) || {activity: ''} );
};