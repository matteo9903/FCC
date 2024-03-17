// creo una funzione esterna da richiamare ogni volta che voglio fare
// una richiesta (sia POST, PATCH che DELETE)

const apiRequest = async (url = '', optionsObj = null, errMsg=null) => {

    try{
        const response = await fetch(url, optionsObj);
        if(!response.ok) throw Error('Please reload the app');
    }   catch(err){
        errMsg = err.message;
    }   finally {
        // ritorno errore a prescindere che sia nullo o no
        return errMsg;
    }

}

export default apiRequest;

/*
POST = aggiungere nuovo elemento al DB
PATCH = modificare elemento (è per questo che devo specificare il suo ID nella richiesta)
DELETE = eliminare elemento dal DB 
*/