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
    Activity.setSignUpInformation(signUpInformation);
};

SignUpInformation.getSignUpInformation = function() {
    return init_key('SignUpInformation');
};

SignUpInformation.setSignUpInformation = function(signUpInformation) {
    localStorage['SignUpInformation'] = JSON.stringify(signUpInformation);
};
