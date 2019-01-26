var is_opened = false;

function controlNavigation() {
    var side_nav = document.getElementById("mySidenav");
    var main_container = document.getElementById("main");
    
    side_nav.style.width = !is_opened ? "250px" : "0";
    main_container.style.marginLeft = !is_opened ? "250px" : "0";
    is_opened = !is_opened;
}