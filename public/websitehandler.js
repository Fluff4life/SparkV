$("header").addClass("nav-show")

$(window).on("scroll", function () {
  if ($(window).scrollTop()){
    $("header").addClass("nav-show")
  } else {
    $("header").removeClass("nav-show")
  }
})

$(document).ready(function () {
  const background = document.querySelector(".filter")
  let x, y

  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault()

      var hash = this.hash

      $("html, body").animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {
        window.location.hash = hash
      })
    }
  })

  document.onmousemove = (movedata) => {
    if (x && y){
      background.style.backgroundPositionX = `${-x}px`
      background.style.backgroundPositionY = `${-y}px`
    }

    x = movedata.clientX / 30
    y = movedata.clientY / 30
  }
})

const onload = () => {
  const headfade = document.querySelector(".headfade")
  const navbar = document.querySelector(".nav-bar")
  const navlinks = document.querySelectorAll(".nav-bar li")

  headfade.onclick = () => {
    navbar.classList.toggle("nav-active")

    navlinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5 ease forwards ${index / 2+1}s`;
      }
    });
    headfade.classList.toggle("toggle")
  }
}

window.onload = () => onload();