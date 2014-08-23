//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})
var native_accessor = {

    send_sms: function (phone, message) {
        //native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
        console.log(phone, message);
    },

    receive_message: function (message_json) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(message_json);
        }
    },

    process_received_message: function (message_json) {
        var PhoneNumber = message_json.messages[0].phone;
        var message = message_json.messages[0].message;
        var message_title = message[0] + message[1];
        message_title = message_title.toLocaleLowerCase();
        if(message_title == 'bm') {
            this.sign_up_sms(message_json);

        }
        else{
            if(message_title == 'jj'){
                this.price_sms(message_json);
            }
            else{
                var SendMessage = '对不起，请发送正确的格式！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }
        }
    },

    sign_up_sms: function(message_json){
        var PhoneNumber = message_json.messages[0].phone;
        var message = message_json.messages[0].message;
        var  newSignUp = new SignUpInformation(Activity.getOngoingActivity().activity, message, PhoneNumber);
        newSignUp.dealWith();
    },

    price_sms: function(message_json){
        var PhoneNumber = message_json.messages[0].phone;
        var message = message_json.messages[0].message;

        var  newPrice = new PriceInformation(Price.getOngoingPrice().activity, Price.getOngoingPrice().count, message, PhoneNumber);
        newPrice.dealWith();

//        price_after_accept();

        function price_after_accept(){
            if(Activity.hasOngoingActivity() !=false) {
                var SendMessage = '对不起，竞价尚未开始！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }
            else if (Price.hasOngoingPrice() == false) {
                SendMessage = 'Sorry，出价已经结束！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }
            else {
                if (exit_sign_up() == 2) {
                    price_allow();
                }
                else{
                    SendMessage = '对不起，您未报名，不能参与竞价！';
                    native_accessor.send_sms(PhoneNumber, SendMessage);
                }
            }
        }

        function exit_sign_up(){
            var sign_up_information = init_key('SignUpInformation');
            var flag = 1;
            for (var i = 0; i < sign_up_information.length; i++) {
                if (sign_up_information[i].activity == Price.getOngoingPrice().activity && sign_up_information[i].phone_number == PhoneNumber) {
                    flag = 2;
                    break;
                }
            }
            return flag;
        }
        function price_allow(){
            if (price_judge_new() == 2) {
                var SendMessage = '您已成功出价，请勿重复出价！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }else {
                price_add_new();
                SendMessage='恭喜！出价成功！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
                freshPriceList();
            }
        }
        function price_judge_new() {
            var p = 1;
            var price_information = init_key('PriceInformation');
            for (var n = 0; n < price_information.length; n++) {
                if (PhoneNumber == price_information[n].phone_number
                    && price_information[n].activity == Price.getOngoingPrice().activity
                    && price_information[n].count == Price.getOngoingPrice().count) {
                    p = 2;
                    break;
                }
            }
            return p;
        }
        function price_add_new() {
            var price = message.replace("jj","");
            price = price.replace("Jj","");
            price = price.replace("jJ","");
            price = price.replace("JJ","");
            price = price.replace(/\s+/g,"");
            var price_information = init_key('PriceInformation');
            var messages = {activity: Price.getOngoingPrice().activity , count: Price.getOngoingPrice().count , price: price , phone_number: PhoneNumber};
            unshift_value(messages , price_information , 'PriceInformation');
        }

        function freshPriceList(){
            var PriceScope = angular.element("#prices").scope();
            if(PriceScope != undefined) {
                if (typeof(PriceScope.prices) == "function") {
                    PriceScope.$apply(PriceScope.prices.bind(PriceScope));
                }
            }
        }
    }
};

function notify_message_received(message_json) {
    native_accessor.receive_message(message_json);
}

