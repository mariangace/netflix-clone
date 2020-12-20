

let singupForm = document.getElementById("singupForm")
let apiurl = 'http://localhost:3000';

singupForm.addEventListener("submit", (e) => {
  //By default submit event will redirect to somewhere.
  e.preventDefault();
  let payload = { 
    name:singupForm.name.value,
    email: singupForm.email.value,
    password: singupForm.password.value
  }  
  fetch(apiurl+"/register", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Accept-Encoding':'gzip, deflate, br'
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(payload) // body data type must match "Content-Type" header
  })
  .then((response)=> {
    if(response.ok){
      return response.json();
    }else{
      throw new Error ("something went wrong");
    } // return promise already
  })
  .then((response)=> {
    //singupForm.after("Success!");
    console.log('success!',response)
    //location.href = "../index.html";
    location.href= `../login/login.html?existingEmail=${payload.email}&registered=true`
  }).catch((error)=> {
    location.href= `../login/login.html?existingEmail=${payload.email}`
  })
})

document.getElementById("login").onclick = function () {
    location.href = "../login/login.html";
};