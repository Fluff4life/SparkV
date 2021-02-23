$(window).on("scroll", function(){
    if ($(window).scrollTop()){
        $("header").addClass("nav-show")
    } else {
        $("header").removeClass("nav-show")
    }
})

window.onload = () => {
    const headfade = document.querySelector(".headfade")
    const navbar = document.querySelector(".nav-bar")
    const navlinks = document.querySelectorAll(".nav-bar li")

    headfade.onclick = () => {
        navbar.classList.toggle("nav-active")

        navlinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5 ease forwards ${index / 7+1}s`;
            }
        });

        headfade.classList.toggle("toggle")
    }
}