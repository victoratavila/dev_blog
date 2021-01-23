$(document).ready(() => {

    let trashBtn = $('#trashBtn');
    if(localStorage.admin){
        trashBtn.removeAttr('hidden');
    }
})