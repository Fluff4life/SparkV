$(document).ready(() => {
    $(".smoothScroll").on("click", (event) => {
        if (this.hash !== "") {
            event.preventDefault()

            let target = this.hash

            $("html, body").animate({
                scrollTop: target.offset().top
            }, 1000, () => {
                window.location.hash = target
            })
        }
    })

    const dropdownbuttons = document.querySelectorAll(".dropdown button")

    function ToggleDropdown() {
        const toggle = this.getAttribute("aria-expanded")

        for (i = 0; i < dropdownbuttons.length; i++){
            dropdownbuttons[i].setAttribute("aria-expanded", "false")
        }

        if (toggle == "false") {
            this.setAttribute("aria-expanded", "true")
        }
    }

    dropdownbuttons.forEach((dropdown) => dropdown.addEventListener("click", ToggleDropdown))
})
