function getOpponentKey(opponentId){
    if(typeof localStorage!=typeof undefined){
        if(localStorage.getItem(opponentId.toString())) {
            return localStorage.getItem(opponentId.toString());
        }
    }

    return false;
}

function saveOpponentKey(opponentId,opponentKey){
    if(typeof localStorage!=typeof undefined){
        localStorage.setItem(opponentId,opponentKey);
        return true;
    }

    return false;
}