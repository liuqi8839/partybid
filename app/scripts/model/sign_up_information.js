function SignUpInformation(activity,message,phone_number) {
    var name = message.replace("bm","");
    name = name.replace("Bm","");
    name = name.replace("bM","");
    name = name.replace("BM","");
    name = name.replace(/\s+/g,"");
    this.activity = activity;
    this.name = name;
    this.phone_number =phone_number;
}

SignUpInformation.prototype.dealWith =  function() {
    if(Price.hasOngoingPrice()) {
       return native_accessor.send_sms(this.phone_number, 'Sorry，报名已经结束！');
    }
    if(!Activity.hasOngoingActivity()) {
        return native_accessor.send_sms(this.phone_number, '活动尚未开始，请稍候！');
    }
    this.signUp();
};

SignUpInformation.prototype.signUp =  function() {
    if (this.isRepeat()) {
        return native_accessor.send_sms(this.phone_number, '您已报名！');
    }
    this.save();
    native_accessor.send_sms(this.phone_number, '恭喜！报名成功！');
    this.freshActivityList();
};

SignUpInformation.prototype.isRepeat =  function() {
    var PhoneNumber = this.phone_number;
    return _.some(SignUpInformation.getSignUpInformation(), function(anySignUp) {
        return ((PhoneNumber == anySignUp.phone_number) && (anySignUp.activity == Activity.getOngoingActivity().activity));
    });
};

SignUpInformation.prototype.save = function() {
    var signUpInformation = SignUpInformation.getSignUpInformation();
    signUpInformation.unshift(this);
    SignUpInformation.setSignUpInformation(signUpInformation);
};

SignUpInformation.prototype.freshActivityList =  function() {
    var signUpScope = angular.element("#page_head").scope();
    if(signUpScope != undefined){
        if(typeof(signUpScope.page_head) == "function") {
            signUpScope.$apply(signUpScope.page_head.bind(signUpScope));
        }
    }
};

SignUpInformation.hasSignUpInformation = function(){
    return (SignUpInformation.getSignUpInformation() != []);
};

SignUpInformation.getSignUpInformation = function() {
    return init_key('SignUpInformation');
};

SignUpInformation.setSignUpInformation = function(signUpInformation) {
    localStorage['SignUpInformation'] = JSON.stringify(signUpInformation);
};

SignUpInformation.getSignUpOfCurrentActivity = function() {
    var sign_up_messages = [];
    _.some(SignUpInformation.getSignUpInformation(), function(anySignUp) {
        if( anySignUp.activity == Activity.getSelectedActivity().activity) {
            sign_up_messages.push({name: anySignUp.name, phone: anySignUp.phone_number});
        }
    });
    return sign_up_messages;
};

SignUpInformation.hasSignUpOfCurrentActivity =  function() {
    return (SignUpInformation.getSignUpOfCurrentActivity().length != 0);
};