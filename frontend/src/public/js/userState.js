$(document).ready(() => {

    const timer = localStorage.timer;
    const token = localStorage.token;
    
    if(timer && (Date.now() > timer)) {
        localStorage.clear();
        window.location.href = "/login";
      }

    if(token == undefined){
        window.location.href = "/login";
    }

    console.log(timer);
    
})