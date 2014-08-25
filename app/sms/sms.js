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
        if (message_title == 'bm') {
            var newSignUp = new SignUpInformation(Activity.getOngoingActivity().activity, message, PhoneNumber);
            return newSignUp.dealWith();
        }
        if (message_title == 'jj') {
            var newPrice = new PriceInformation(Price.getOngoingPrice().activity, Price.getOngoingPrice().count, message, PhoneNumber);
            return newPrice.dealWith();
        }
        native_accessor.send_sms(PhoneNumber, '对不起，请发送正确的格式！');
    }
};

function notify_message_received(message_json) {
    native_accessor.receive_message(message_json);
}