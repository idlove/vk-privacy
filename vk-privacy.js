
function decodeMessages(masterKey) {
    var msgElements = document.getElementsByClassName('im_msg_text');
    for (msgElement of msgElements)
    {
        var sourceText = msgElement.textContent;
        var startIndex = sourceText.indexOf('[encrypt]');
        if (startIndex != -1) {
            var endIndex = sourceText.indexOf('[/encrypt]');
            sourceText = sourceText.substring(startIndex + 9, endIndex);
            var decryptText = Base64.decode(decryptMessage(sourceText, masterKey).plaintext);
            console.log(decryptText);
            msgElement.textContent = decryptText;
        }
    }
}



console.log('Start VK Privacy');

var masterKey = createPrimaryKey();
var myPublicKey = getOwnPublicKey(masterKey);
console.log('My Public key:' + myPublicKey);

decodeMessages(masterKey);

var opponentId = location.href.split('sel=')[1];
console.log('OpponentId:' + opponentId);

var textElem = document.getElementById('im_editable' + opponentId);

removeEvent(textElem, data(textElem, 'events').keyup);
console.log('VK events has removes')

textElem.onkeyup = function (event) {
    if (event.keyCode == 13) {
        text = this.textContent;
        console.log('Original:' + text);
        //Use myPublicKey for test!
        var encryptText = encryptMessage(myPublicKey, Base64.encode(text)).cipher;  !!
        console.log('Encrypt ' + text + ' to ' + encryptText);
        textElem.textContent = '[encrypt id=]' + encryptText + '[/encrypt]';
        IM.send();
    }
}




