var scroll = new SmoothScroll('a[href*="#"]')

function navbarscrolling() {
    var scroll = window.scrollY

    if (scroll > 0) {
        $(".navbar-dark").addClass("navbar-light")
        $(".navbar-dark").addClass("navbar-dark-scrolled")
        $(".navbar-dark-scrolled").removeClass("navbar-dark")
        $(".navbar").addClass("navbar-light-scrolled")
    } else {
        $(".navbar-dark-scrolled").removeClass("navbar-light")
        $(".navbar-dark-scrolled").addClass("navbar-dark")
        $(".navbar-dark").removeClass("navbar-dark-scrolled")
        $(".navbar").removeClass("navbar-light-scrolled")
    }
}

$(window).scroll(navbarscrolling())
$(document).ready(navbarscrolling())

$(".auto-hiding-navbar").autoHidingNavbar({
    "animationDuration": 300,
    "showOnBottom": false
})

AOS.init({
    once: false,
    startEvent: "load"
})

$(document).ready(function() {
    if (document.getElementById("typed")){
        var typed = new Typed("#typed", {
            strings: ["Professional Developer", "Roblox Developer", "Discord Bot Developer", "Website Developer", "Codes in JavaScript, HTML, CSS, Roblox Lua and more!", "Chill Guy!"],
            typeSpeed: 20,
            backSpeed: 20,
            smartBackspace: true,
            loop: true,
            shuffle: true
        })
    }
})
