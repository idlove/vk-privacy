console.log('Start VK Privacy');
var encryptedSessionStarted = false;

var opponentId = location.href.split('sel=')[1];
var textElem = document.getElementById('im_editable' + opponentId);
console.log('OpponentId:' + opponentId);

var masterKey = createPrimaryKey();
var myPublicKey = getOwnPublicKey(masterKey);
console.log('My Public key:' + myPublicKey);

removeEvent(textElem, data(textElem, 'events').keyup);
console.log('VK events has removes');

textElem.onkeyup = function (event) {
    if (event.keyCode == 13) {
        sendHandler();
    }
}

var sendButton = document.getElementById('im_send');
sendButton.onclick = sendHandler;

//Subscribe on message list changed
var target = document.querySelector('#im_rows');
var observer = new MutationObserver(function(mutations) {
    readMessages();
});

var config = { attributes: true, childList: true, characterData: true };
observer.observe(target, config);

console.log('Send my public key');
sendMessage('[key]' + myPublicKey + '[/key]');
encryptedSessionStarted = true;

function sendHandler() {
    var text = textElem.textContent;
    console.log('Original text:' + text);

    var messageId = saveMessage(text);
    console.log('Save this message in cache, with id:' + messageId);

    var opponentPublicKey = getOpponentKey(opponentId);
    if (opponentPublicKey == false) {
        if (confirm('Opponent public key not found! Message will not be encrypted. Send?')) {
            sendMessage(text);
        }
    } else {
        var encryptText = encryptMessage(opponentPublicKey, Base64.encode(text)).cipher;
        console.log('Encrypt ' + text + ' to ' + encryptText);
        sendMessage('[encrypt id="' + messageId + '"]' + encryptText + '[/encrypt]');
    }
}

function readMessages() {
    console.log('Start read messages');
    var msgElements = document.getElementsByClassName('im_msg_text');
    for (msgElement of msgElements)
    {
        try {
            var msgText = msgElement.textContent;
            var messageDecrypted = false;
            if (msgText.indexOf('[encrypt id="') == 0) {
                var endIdIndex = msgText.indexOf('"]');
                var endMessageIndex = msgText.indexOf('[/encrypt]');
                var messageId = msgText.substring(13, endIdIndex);
                var sourceMessage = msgText.substring(endIdIndex + 2, endMessageIndex);
                console.log('Find encrypt message ' + sourceMessage + ' with id ' + messageId);
                console.log("Find this message in cache...")

                var message = getMessage(messageId);
                if (message != false) {
                    console.log('Message has find in cache');
                } else {
                    console.log('Message not found in cache, try decrypt this message...');
                    var decryptText = Base64.decode(decryptMessage(sourceMessage, masterKey).plaintext);
                    console.log('Message has decrypt:' + decryptText);
                    message = decryptText;
                    messageDecrypted = true;
                }
                msgElement.textContent = message;
            }else{
                if(encryptedSessionStarted == true && messageDecrypted == false){

                }
            }

            if (msgText.indexOf('[key]') == 0) {
                var endIndex = msgText.indexOf('[/key]');
                keyText = msgText.substring(5, endIndex);
                if (keyText != myPublicKey) {
                    console.log('Find opponent key ' + keyText + ', saved...')
                    saveOpponentKey(opponentId, keyText);
                }
            }
        } catch(e) {
            console.error(e);
        }
    }
}

function sendMessage(message) {
    textElem.textContent = message;
    IM.send();
    console.log('Message ' + message + ' has send!');
}














