

let loginForm = document.getElementById("loginForm")
let apiurl = 'http://localhost:3000';

loginForm.addEventListener("submit", (e) => {
  //By default submit event will redirect to somewhere.
  e.preventDefault();
  let payload = { 
    email: loginForm.email.value,
    password: loginForm.password.value
  }  
  fetch(apiurl+"/login", {
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
      loginForm.classList.add('was-validated');
    }else{
      throw new Error ("something went wrong");
      console.log('error')
      document.getElementById("inputEmail");
    } // return promise already
  })
  .then((response)=> {
    //loginForm.after("Success!");
    location.href = "../index.html";
  })
  console.log(payload);
})

// async function loginRequest(url = '', data = {}) {
//     // Opciones por defecto estan marcadas con un *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': '*/*',
//         'Accept-Encoding':'gzip, deflate, br'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }