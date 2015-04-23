function VkWrapper(sendHandler, messagesHandler) {
    this.sendHandler = sendHandler;
    this.messagesHandler = messagesHandler;

    //init
    var self = this;
    this.opponentId = location.href.split('sel=')[1];
    console.log('OpponentId:' + this.opponentId);

    this.textElem = document.getElementById('im_editable' + this.opponentId);
    this.sendButton = document.getElementById('im_send');
    removeEvent(this.textElem, data(this.textElem, 'events').keyup);
    console.log('VK events has removes');


    //Subscribe on message list changed
    this.im_rows = document.querySelector('#im_rows');
    this.observerConfig = { attributes: true, childList: true, characterData: true };
    this.observer = new MutationObserver(function(mutations) {
        var msgElements = document.getElementsByClassName('im_msg_text');
        self.messagesHandler(msgElements);
    });
    this.observer.observe(this.im_rows, this.observerConfig);
    console.log('Subscribe on change messages');

    //Subscribe on send with Enter or button click
    this.textElem.onkeyup = function (event) {
        if (event.keyCode == 13) {
            self.sendHandler(this.textContent);
        }
    }
    this.sendButton.onclick = function() {
        self.sendHandler(this.textContent);
    }
    console.log('Subscribe on send button or Enter');

    //Methods
    this.sendMessage = function(message) {
        this.textElem.textContent = message;
        IM.send();
        console.log('Message ' + message + ' has send!');
    }



}