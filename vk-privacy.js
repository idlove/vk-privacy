console.log('Start VK Privacy');
var encryptedSessionStarted = false;

var vkWrapper = new VkWrapper(sendHandler, messagesHandler);

var masterKey = createPrimaryKey();
var myPublicKey = getOwnPublicKey(masterKey);
console.log('My Public key:' + myPublicKey);

console.log('Send my public key');
vkWrapper.sendMessage('[key]' + myPublicKey + '[/key]');
encryptedSessionStarted = true;

function sendHandler(text) {
    console.log('Original text:' + text);

    var messageId = saveMessage(text);
    console.log('Save this message in cache, with id:' + messageId);

    var opponentPublicKey = getOpponentKey(vkWrapper.opponentId);
    if (opponentPublicKey == false) {
        if (confirm('Opponent public key not found! Message will not be encrypted. Send?')) {
            vkWrapper.sendMessage(text);
        }
    } else {
        var encryptText = encryptMessage(opponentPublicKey, Base64.encode(text)).cipher;
        console.log('Encrypt ' + text + ' to ' + encryptText);
        vkWrapper.sendMessage('[encrypt id="' + messageId + '"]' + encryptText + '[/encrypt]');
    }
}

function messagesHandler(msgElements) {
    console.log('Start read messages');
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
                    saveOpponentKey(vkWrapper.opponentId, keyText);
                }
            }
        } catch(e) {
            console.error(e);
        }
    }
}















