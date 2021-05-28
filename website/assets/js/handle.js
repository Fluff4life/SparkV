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
    if (document.getElementById("KingCh1llTyped")){
        var typed = new Typed("#KingCh1llTyped", {
            strings: ["Professional Developer", "Roblox Developer", "Discord Bot Developer", "Website Developer", "Codes in JavaScript", "Codes in HTML", "Codes in CSS", "Codes in Roblox Lua", "Chill Guy!"],
            typeSpeed: 20,
            backSpeed: 20,
            smartBackspace: true,
            loop: true,
            shuffle: true
        })
    }
    
    if (document.getElementById("Ch1llBloxTyped")){
        var typed = new Typed("#Ch1llBloxTyped", {
            strings: ["Ch1ll Bot!"],
            typeSpeed: 20,
            backSpeed: 20,
            smartBackspace: true,
            loop: true,
            shuffle: true
        })
    }
})
