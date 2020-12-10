function checkIfLoggedIn(){
    const currentToken = localStorage.getItem('token');
    if(currentToken){
        if(location.href == "http://127.0.0.1:55/login/login.html"){
            location.href = "../";
        }
    } else {
        // If I am currently not logged in
        // And trying to acceess a unauthorized page
        // (Trying to access all pages besides login)
        if(location.href != "http://127.0.0.1:5500/login/login.html") {
            location.href = 'http://127.0.0.1:5500/login/login.html';
        }
    }
}

function logOut(){
    localStorage.removeItem('token');
    location.href = 'http://127.0.0.1:5500/login/login.html';
}

checkIfLoggedIn();

