
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

    var opponentId = location.href.split('=')[1];
    console.log('OpponentId:' + opponentId);

    var textElem = document.getElementById('im_editable' + opponentId);

    removeEvent(textElem, data(textElem, 'events').keyup);
    console.log('VK events has removes')

    var text = '';
    textElem.onkeyup = function (event) {
        if (event.keyCode == 13) {
            console.log('Original:' + text);
            var encryptText = encryptMessage(myPublicKey, Base64.encode(text)).cipher;  //For test!!!
            console.log('Encrypt ' + text + ' to ' + encryptText);
            textElem.textContent = '[encrypt]' + encryptText + '[/encrypt]';
            text = '';
            IM.send();

        }
        else {
            text = this.textContent;
        }


    }




