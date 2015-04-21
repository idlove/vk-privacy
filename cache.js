function digestMessage(message){
    if(typeof message!=typeof undefined){
        return md5(message);
    }

    return false;
}

function saveMessage(message){
    if(typeof message!=typeof undefined){
        var key = digestMessage(message);
        if(typeof localStorage!=typeof undefined){
            localStorage.setItem(key,message);
            return key;
        }
    }

    return false;
}

function getMessage(key){
    if(typeof key!=typeof undefined){
        if(typeof localStorage!=typeof undefined){
            return localStorage.getItem(key);
        }
    }

    return false;
}

