//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})
var native_accessor = {

    send_sms: function (phone_number, SendMessage) {
        native_accessor.send_sms({"receivers":[{ "phone":phone_number}]}, {"message_content":SendMessage});
        //console.log(phone_number, SendMessage);
    },

    receive_message: function (message_json) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(message_json);
        }
    },

    process_received_message: function (message_json) {
        var PhoneNumber = message_json.messages[0].phone;
        var Name = message_json.messages[0].message;
        Name = Name.toLocaleLowerCase();
        Name = Name.replace("bm","");
        Name = Name.replace(/\s+/g,"");

        if(!get_value('OngoingActivity')){
            var SendMessage = '活动尚未开始，请稍候！';
            this.send_sms(PhoneNumber, SendMessage);
        }
        else if(parse_value('OngoingActivity')=='null'){
            SendMessage = 'Sorry，报名已经结束！';
            this.send_sms(PhoneNumber, SendMessage);
        }
        else{
            allow_to_sign(PhoneNumber,parse_value('OngoingActivity'));
        }

        function allow_to_sign(PhoneNumber,key){
            if (judge_new_sign_up(PhoneNumber,key) == 2) {
                SendMessage = '您已报名！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
            }
            else {
                add_new_sign_up(Name, PhoneNumber,key);
                SendMessage='恭喜！报名成功！';
                native_accessor.send_sms(PhoneNumber, SendMessage);
                freshActivityList();

            }
        }

        function freshActivityList(){
            var signUpScope = angular.element("#page_head").scope();
            if(typeof(signUpScope.page_head) == "function"){
                signUpScope.$apply(signUpScope.page_head.bind(signUpScope));
            }
        };

        function judge_new_sign_up(value, key) {
            var p = 3;
            if (get_value(key)) {
                p = judge_sign_up_repeat(value, key);
            }
            return p;
        }

        function judge_sign_up_repeat(value, key) {
            var p = 1;
            var get_key = parse_value(key);
            for (var n = 0; n < get_key.length; n++) {
                if (value == get_key[n].phone_number) {
                    p = 2;
                    break;
                }
                else {
                    p = 1;
                }
            }
            return p;
        }

        function add_new_sign_up(Name, PhoneNumber, key) {
            if (judge_new_sign_up(PhoneNumber, key) == 1) {
                var save_message = parse_value(key);
            }
            else {
                save_message = new Array();
            }
            var messages = {name: Name, phone_number: PhoneNumber};
            unshift_value(messages,save_message,key)
        }
    }

}

function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
}

