var is_opened = true;

function controlNavigation() {
    var side_nav = document.getElementById("mySidenav");
    var main_container = document.getElementById("main");

    side_nav.style.width = !is_opened ? "250px" : "0";
    main_container.style.marginLeft = !is_opened ? "250px" : "0";
    main_container.style.transition = "margin-left .5s";

    is_opened = !is_opened;
}

// var nav_width = side_nav.style.getPropertyValue("width");
// var cont_margin = main_container.style.getPropertyValue("margin-left")