function decrypt(txt) {
    return txt;
}

function encrypt(txt) {
    return txt;
}


function decodeMessages(){
    var msgElements = document.getElementsByClassName('im_msg_text');
    for (msgElement of msgElements) {
        var sourceText = msgElement.textContent;
        var startIndex = sourceText.indexOf('[encrypt]');
        if (startIndex != -1) {
            var endIndex = sourceText.indexOf('[/encrypt]');
            sourceText = sourceText.substring(startIndex + 9, endIndex);
            var decryptText = decrypt(sourceText);
            console.log(decryptText);
            msgElement.textContent = decryptText;
        }
    }
}

console.log('start vk privacy');
decodeMessages();

var opponentId = location.href.split('=')[1];
console.log(opponentId);
var textElem = document.getElementById('im_editable' + opponentId);
console.log(textElem);
console.log(removeEvent);
removeEvent(textElem, data(textElem, 'events').keyup);
console.log('Vk events has removes')

var text = '';
textElem.onkeyup = function(event) {
    if (event.keyCode == 13) {
        console.log('Key up ' + event.keyCode);
        var encryptText = encrypt(text);
        console.log('Encrypt ' + text + ' to ' + encryptText);
        textElem.textContent = '[encrypt]' + encryptText + '[/encrypt]';
        text = '';
        IM.send();

    }
    else {
        text = this.textContent;
    }


}



