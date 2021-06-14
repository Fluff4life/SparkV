// Thank you, discord.rovelstars.com! I learned some stuff used here from their code on GitHub.

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

function DocReady() {
    navbarscrolling()

    if (document.getElementById("KingCh1llTyped")) {
        var typed = new Typed("#KingCh1llTyped", {
            strings: ["Professional Developer", "Roblox Developer", "Discord Bot Developer", "Website Developer", "Codes in JavaScript", "Codes in HTML", "Codes in CSS", "Codes in Roblox Lua", "Chill Guy!"],
            typeSpeed: 20,
            backSpeed: 20,
            smartBackspace: true,
            loop: true,
            shuffle: true
        })
    }

    if (document.getElementById("Ch1llBloxTyped")) {
        var typed = new Typed("#Ch1llBloxTyped", {
            strings: ["Ch1ll Bot!"],
            typeSpeed: 20,
            backSpeed: 20,
            smartBackspace: true,
            loop: true,
            shuffle: true
        })
    }

    $(".auto-hiding-navbar").autoHidingNavbar({
        animationDuration: 300,
        showOnBottom: false
    })
    
    AOS.init({
        once: false,
        startEvent: "load"
    })

    $(document).on("click", ".deletebot", async function () {
        await Swal.fire({
            title: `Are you sure you want to delete ${$(this).attr("name")}?`,
            text: "THIS ACTION CANNOT BE UNDONE!",
            icon: "warning",
            html: `Type <u>${$(this).attr("name")}</u> to confirm.`,
            showCancelButton: true,
            input: "text",
            confirmButtonText: "Delete",
            preConfirm: async (name) => {
                if (name.toLowerCase() !== $(this).attr("name").toLowerCase()){
                    Swal.update({
                        title: "Cancelled",
                        html: ""
                    })

                    await wait(1)
                } else {
                    await fetch(`/api/bots/${$(this).attr("id")}`, {
                        method: "DELETE"
                    })

                    location.href = "/home"
                }
            }
        })
    })

    $(document).on("click", ".notify", async function () {
        await Snackbar.show({
            text: $(this).attr("text")
        })
    })

    $(".counter").each(function () {
        $(".counter").animate({
            Counter: this.text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                this.text(Math.ceil(this.Counter) + '+');
            }
        })
    })
}

function LoadWindow() {
    var online = true

    new SmoothScroll('a[href*="#"]')
    $("#object").fadeOut()
    $("#loading").fadeOut()

    var iframes = document.getElementsByTagName("iframe")

    for (var iframe of iframes) {
        iframe.setAttribute("sandbox", "allow-popups allow-forms")
    }

    const Popup = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (popup) => {
            popup.addEventListener("mouseenter", Swal.stopTimer)
            popup.addEventListener("mouseleave", Swal.resumeTimer)
        }
    })

    window.addEventListener("error", function (err) {
        Popup.fire({
            icon: "error",
            title: "Uh oh! An error occured.",
            text: err.message
        })
    })

    setInterval(() => {
        if (navigator.onLine != online) {
            if (navigator.onLine == false) {
                Popup.fire({
                    icon: "error",
                    title: "Uh oh! You're not connected."
                })
            }

            if (navigator.onLine == true) {
                Popup.fire({
                    icon: "success",
                    title: "Reconnected!"
                })
            }

            online = navigator.onLine
        }
    }, 1 * 1000)

    if (typeof (Storage) !== undefined) {
        if (localStorage.allowcookies === "accepted") {
            return
        }

        Swal.fire({
            title: "Hey, new guy!",
            text: "Welcome to Ch1ll Studios' official website!",
            imageUrl: "/assets/images/Ch1llStudios.png",
            imageHeight: 100,
            imageWidth: 100,
            showCancelButton: false,
            showDenyButton: true,
            confirmButtonText: "<span>Show me around!</span>",
            denyButtonText: "<span>Hey... I've been here before!</span>",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Meet Ch1ll Studios!",
                    text: "We make stuff! Check out our stuff by clicking any of the dropdowns on the navigation bar at the top.",
                    confirmButtonText: "<span>Cool!</span>"
                }).then(() => {
                    Swal.fire({
                        title: "🍪 We use cookies!",
                        text: "We love cookies!!",
                        icon: "info",
                        confirmButtonText: "<span>I love cookies too!</span>"
                    }).then(() => {
                        localStorage.allowcookies = "accepted"
                    })
                })
            }
        })
    } else {
        Swal.fire({
            title: "Uh oh!",
            text: "Your browser doesn't support local storage! We recommend you update your browser or use a different one before using our website.",
            icon: "error",
            confirmButtonText: "<span>Dang...</span>"
        }).then(() => {
            window.close()
        })
    }
}

$(LoadWindow())
$(window).scroll(navbarscrolling)
$(document).ready(DocReady)
