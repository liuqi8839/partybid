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
    }
};

function notify_message_received(message_json) {
    native_accessor.receive_message(message_json);
}

