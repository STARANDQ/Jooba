function showMenu() {
    if(document.querySelector(".navigation__menu").style.display === "none"){
        document.querySelector(".navigation__menu").style.display = "block";
        document.querySelector(".navigation__btn-menu").textContent = "Закрити";
    } else if(document.querySelector(".navigation__menu").style.display === "block") {
        document.querySelector(".navigation__menu").style.display = "none";
        document.querySelector(".navigation__btn-menu").textContent = "Меню";
    }
}

let menu = document.querySelector(".navigation");
window.onscroll = function() {
    if(window.pageYOffset >= 110){
        menu.style.position = "fixed";
        menu.style.top = "0";
    }else{
        menu.style.position = "";
        menu.style.top = "";
    }
};