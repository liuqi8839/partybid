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

SignUpInformation.prototype.save = function() {
    var signUpInformation = SignUpInformation.getSignUpInformation();
    signUpInformation.unshift(this);
    SignUpInformation.setSignUpInformation(signUpInformation);
};

SignUpInformation.prototype.dealWith =  function() {
    if(Price.hasOngoingPrice() == true){
        var SendMessage = 'Sorry，报名已经结束！';
        native_accessor.send_sms(this.phone_number, SendMessage);
    }
    else if(Activity.hasOngoingActivity() == false){
        SendMessage = '活动尚未开始，请稍候！';
        native_accessor.send_sms(this.phone_number, SendMessage);
    }
    else{
        this.isSigned();
    }
};

SignUpInformation.prototype.isSigned =  function() {
    if (this.isNewSignUp() == true) {
        var SendMessage = '您已报名！';
        native_accessor.send_sms(this.phone_number, SendMessage);
    }else {
        this.save();
        SendMessage='恭喜！报名成功！';
        native_accessor.send_sms(this.phone_number, SendMessage);
        this.freshActivityList();
    }
};

SignUpInformation.prototype.isNewSignUp =  function() {
    var p = false;
    var sign_up_information = SignUpInformation.getSignUpInformation();
    for (var n = 0; n < sign_up_information.length; n++) {
        if (this.phone_number == sign_up_information[n].phone_number
            && sign_up_information[n].activity == Activity.getOngoingActivity().activity) {
            p = true;
            break;
        }
    }
    return p;
};

SignUpInformation.prototype.freshActivityList =  function() {
    var signUpScope = angular.element("#page_head").scope();
    if(signUpScope!=undefined) {
        if (typeof(signUpScope.page_head) == "function") {
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
    if(SignUpInformation.hasSignUpInformation() == true) {
        var sign_up_information = SignUpInformation.getSignUpInformation();
        _.some(sign_up_information , function(anySignUp) {
            if( anySignUp.activity == Activity.getSelectedActivity().activity) {
                sign_up_messages.push({name: anySignUp.name , phone: anySignUp.phone_number});
            }
        });
    }
    return sign_up_messages;
};