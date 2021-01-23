$(document).ready(() => {

    // Hide user nav item if he is logged
    if(localStorage.username){
        let username = localStorage.username;
        username = username.split(' ');
        username = username[0];
        $('#userInfoArea').text(username);
        let userInfo = $('#userNavItem');
        userInfo.removeAttr('hidden');
    } else {
       let loginBtn = $('#loginButton');
       loginBtn.removeAttr('hidden');
    }

    // Logout button
    $('#logoutButton').click( async () => {
        await localStorage.clear();
        window.location.href = '/login';
    })


    // Hide the username and show login button when JWT expire

    const timer = localStorage.timer;
    const token = localStorage.token;

    if(timer && (Date.now() > timer)) {
        let userInfo = $('#userNavItem');
        userInfo.attr("hidden",true);
        let loginBtn = $('#loginButton');
        loginBtn.removeAttr('hidden');
      }

    // if(token == undefined){
    //     window.location.href = "/login";
    // }


})

