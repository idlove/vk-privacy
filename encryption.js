/* Some shitty globals~ */
const RSA_BITS = 2048;


function createPrimaryKey(){
    if(typeof localStorage!=typeof undefined){
        if(localStorage.getItem('masterpass')){
            var masterKeyPass = localStorage.getItem('masterpass');
            var masterKey = cryptico.generateRSAKey(masterKeyPass, RSA_BITS);
            return masterKey;
        }else{
            var masterKeyPass = prompt('Enter your new master key pass! \n (Will be used for key generation)');
            localStorage.setItem('masterpass',masterKeyPass);
            return createPrimaryKey();
        }
    }

    return false;
}

function getOwnPublicKey(masterKey){
    if(typeof masterKey!=typeof undefined){
        return cryptico.publicKeyString(masterKey);
    }

    return false;
}

function encryptMessage(opponentsPublicKey,plainText){
    if(typeof opponentsPublicKey!=typeof undefined){
        var encryptedMessage = cryptico.encrypt(plainText, opponentsPublicKey);
        return encryptedMessage;
    }

    return false;
}

function decryptMessage(encryptedMessage,masterKey){
    if(typeof encryptedMessage!=typeof undefined && typeof masterKey!=typeof undefined){
        var decryptedMessage = cryptico.decrypt(encryptedMessage, masterKey);
        return decryptedMessage;
    }

    return false;
}
