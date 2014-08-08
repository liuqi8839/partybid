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
        var message_title=message[0]+message[1];
        message_title=message_title.toLocaleLowerCase();
        if(message_title=='bm'){
            this.sign_up_sms(message_json);

        }
        else{
            if(message_title=='jj'){
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
        sign_up_after_accept();
        function sign_up_after_accept(){
            if(get_ongoing_price().activity!='null' &&get_ongoing_price().activity!='never'){
                var SendMessage = 'Sorry，报名已经结束！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }
            else if(get_ongoing_activity()=='null'){
                SendMessage = '活动尚未开始，请稍候！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }
            else{
                sign_up_allow();
            }
        }
        function sign_up_allow(){
            if (sign_up_judge_new() == 2) {
                var SendMessage = '您已报名！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }else {
                sign_up_add_new();
                SendMessage='恭喜！报名成功！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
                freshActivityList();
            }
        }
        function sign_up_judge_new() {
            var p = 1;
            var sign_up_information = init_key('SignUpInformation');
            for (var n = 0; n < sign_up_information.length; n++) {
                if (PhoneNumber == sign_up_information[n].phone_number
                    && sign_up_information[n].activity==get_ongoing_activity()) {
                    p = 2;
                    break;
                }
            }
            return p;
        }
        function sign_up_add_new() {
            var Name = message.replace("bm","");
            Name = Name.replace("Bm","");
            Name = Name.replace("bM","");
            Name = Name.replace("BM","");
            Name = Name.replace(/\s+/g,"");
            var sign_up_information = init_key('SignUpInformation');
            var messages = {activity:get_ongoing_activity(),name: Name, phone_number: PhoneNumber};
            unshift_value(messages,sign_up_information,'SignUpInformation')
        }
        function freshActivityList(){
            var signUpScope = angular.element("#page_head").scope();
            if(signUpScope!=undefined) {
                if (typeof(signUpScope.page_head) == "function") {
                    signUpScope.$apply(signUpScope.page_head.bind(signUpScope));
                }
            }
        }
    },

    price_sms: function(message_json){
        var PhoneNumber = message_json.messages[0].phone;
        var message = message_json.messages[0].message;
        price_after_accept();
        function price_after_accept(){
            if(get_ongoing_activity()!='null' || get_ongoing_price().activity=='never') {
                var SendMessage = '对不起，竞价尚未开始！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }
            else if (get_ongoing_price().activity == 'null') {
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
                if (sign_up_information[i].activity == get_ongoing_price().activity && sign_up_information[i].phone_number == PhoneNumber) {
                    flag = 2
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
                    && price_information[n].activity==get_ongoing_price().activity
                    && price_information[n].count==get_ongoing_price().count) {
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
            var price_information=init_key('PriceInformation');
            var messages = {activity:get_ongoing_price().activity,count:get_ongoing_price().count,price: price, phone_number: PhoneNumber};
            unshift_value(messages,price_information,'PriceInformation')
        }

        function freshPriceList(){
            var PriceScope = angular.element("#prices").scope();
            if(PriceScope!=undefined) {
                if (typeof(PriceScope.prices) == "function") {
                    PriceScope.$apply(PriceScope.prices.bind(PriceScope));
                }
            }
        }
    }
}

function notify_message_received(message_json) {
    native_accessor.receive_message(message_json);
}

