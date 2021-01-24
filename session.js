function checkIfLoggedIn(){
    const currentToken = localStorage.getItem('token');
    if(currentToken){
        if(location.href.includes("login.html")
            || location.href.includes("register.html")){
            location.href = "../";
        }
    } else {
        // If I am currently not logged in
        // And trying to acceess a unauthorized page
        // (Trying to access all pages besides login)
        if(!location.href.includes("/login.html")
        && !location.href.includes("singup.html")) {
            location.href = '/login/login.html';
        }
    }
}

function logOut(){
    localStorage.removeItem('token');
    //location.href = 'http://127.0.0.1:5500/login/login.html';
    location.href = '/login/login.html';
}

checkIfLoggedIn();

