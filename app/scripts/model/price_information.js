function PriceInformation(activity, count, message, phone_number) {
    var price = message.replace("jj","");
    price = price.replace("Jj","");
    price = price.replace("jJ","");
    price = price.replace("JJ","");
    price = price.replace(/\s+/g,"");
    this.activity = activity;
    this.count = count;
    this.price = price;
    this.phone_number = phone_number;
}

PriceInformation.prototype.dealWith =  function() {
    if(Activity.hasOngoingActivity()) {
        var SendMessage = '对不起，竞价尚未开始！';
        return native_accessor.send_sms(this.phone_number, SendMessage);
    }
    if(!Price.hasOngoingPrice()) {
        SendMessage = 'Sorry，出价已经结束！';
        return native_accessor.send_sms(this.phone_number, SendMessage);
    }
    if(!this.isSigned()) {
        SendMessage = '对不起，您未报名，不能参与竞价！';
        return native_accessor.send_sms(this.phone_number, SendMessage);
    }
    this.judgePrice();
};

PriceInformation.prototype.isSigned = function() {
    var PhoneNumber = this.phone_number;
    return _.some(SignUpInformation.getSignUpInformation(), function(anySignUp) {
        return ( PhoneNumber == anySignUp.phone_number && anySignUp.activity == Price.getOngoingPrice().activity);
    });
};

PriceInformation.prototype.judgePrice = function() {
    if (this.isRepeat() == true) {
        var SendMessage = '您已经出价啦！';
        return native_accessor.send_sms(this.phone_number, SendMessage);
    }
    this.priceRight();
};

PriceInformation.prototype.priceRight = function() {
    this.save();
    var SendMessage='恭喜！出价成功！';
    native_accessor.send_sms(this.phone_number, SendMessage);
    this.freshPriceList();
};

PriceInformation.prototype.isRepeat = function() {
    var PhoneNumber = this.phone_number;
    return _.some(PriceInformation.getPriceInformation(), function(anySignUp) {
        return ((PhoneNumber == anySignUp.phone_number) && (anySignUp.activity == Price.getOngoingPrice().activity) && (anySignUp.count == Price.getOngoingPrice().count));
    });
};

PriceInformation.prototype.save = function() {
    var priceInformation = PriceInformation.getPriceInformation();
    priceInformation.unshift(this);
    PriceInformation.setPriceInformation(priceInformation);
};

PriceInformation.prototype.freshPriceList =  function() {
    var PriceScope = angular.element("#prices").scope();
    if((PriceScope != undefined) && (typeof(PriceScope.prices) == "function")) {
        PriceScope.$apply(PriceScope.prices.bind(PriceScope));
    }
};

PriceInformation.hasPriceInformation = function(){
    return (SignUpInformation.getSignUpInformation() != []);
};

PriceInformation.getPriceInformation = function() {
    return init_key('PriceInformation');
};

PriceInformation.setPriceInformation = function(priceInformation) {
    localStorage['PriceInformation'] = JSON.stringify(priceInformation);
};

PriceInformation.showAllOfCurrentPrice = function() {
    if(PriceInformation.hasPriceInformation()) {
        return PriceInformation.addSequence(PriceInformation.addNameForCurrentPrice());
    }
    return [];
};

PriceInformation.getCurrentPriceInformation = function() {
    if(PriceInformation.hasPriceInformation()) {
        return PriceInformation.addSequence(PriceInformation.giveResultSort());
    }
    return [];
};

PriceInformation.giveResultSort = function() {
    var price_messages = PriceInformation.addNameForCurrentPrice();
    for(var j = 0 ; j < price_messages.length - 1 ; j++) {
        for(var m = 1 ; m < price_messages.length ; m++) {
            if(price_messages[j].price > price_messages[m].price) {
                var temp = price_messages[j];
                price_messages[j] = price_messages[m];
                price_messages[m] = temp;
            }
        }
    }
    return price_messages;
};

PriceInformation.addSequence = function(price_messages) {
    var sequence_number = 0;
    _.some(price_messages, function(anyPriceMessage) {
        sequence_number += 1;
        anyPriceMessage.sequence = sequence_number;
    });
    return price_messages;
};

PriceInformation.addNameForCurrentPrice = function() {
    var price_messages = [];
    _.some(PriceInformation.getPriceInformation(), function(anyPriceInformation) {
        if(anyPriceInformation.activity == Price.getSelectedPrice().activity && anyPriceInformation.count == Price.getSelectedPrice().count) {
            anyPriceInformation = PriceInformation.addBidderName(anyPriceInformation);
            price_messages.push({ price: anyPriceInformation.price, name: anyPriceInformation.name, phone: anyPriceInformation.phone_number});
        }
    });
    return price_messages;
};

PriceInformation.addBidderName = function(anyPriceInformation) {
    _.some(SignUpInformation.getSignUpInformation(), function(anySignUpInformation) {
            if(anySignUpInformation.phone_number == anyPriceInformation.phone_number) {
                anyPriceInformation.name = anySignUpInformation.name;
            }
        }
    );
    return anyPriceInformation;
};