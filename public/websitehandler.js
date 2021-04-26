$(window).on("scroll", function () {
  if ($(window).scrollTop()) {
    $("header").addClass("nav-show")
  } else {
    $("header").removeClass("nav-show")
  }
})

$(document).ready(function () {
  const headfade = document.querySelector(".headfade")
  const navbar = document.querySelector(".nav-bar")
  const navlinks = document.querySelectorAll(".nav-bar li")
  const wrapper = document.querySelector(".wrapper")
  const toast = wrapper.querySelector(".toast")
  const title = toast.querySelector("span")
  const subTitle = toast.querySelector("p")
  const wifiIcon = toast.querySelector(".icon")
  const closeIcon = toast.querySelector(".close-icon")

  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault()

      var hash = this.hash

      $("html, body").animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash
      })
    }
  })

  function ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://google.com", true);
    xhr.onload = () => { //once ajax loaded
      if (xhr.status == 200 && xhr.status < 300) {
        toast.classList.remove("offline");
        title.innerText = "You're online now";
        subTitle.innerText = "Hurray! Internet is connected.";
        wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
        closeIcon.onclick = () => { //hide toast notification on close icon click
          wrapper.classList.add("hide");
        }
        setTimeout(() => { //hide the toast notification automatically after 5 seconds
          wrapper.classList.add("hide");
        }, 5000);
      } else {
        offline(); //calling offline function if ajax status is not equal to 200 or not less that 300
      }
    }
    xhr.onerror = () => {
      offline(); ////calling offline function if the passed url is not correct or returning 404 or other error
    }
    xhr.send(); //sending get request to the passed url
  }

  function offline() { //function for offline
    wrapper.classList.remove("hide");
    toast.classList.add("offline");
    title.innerText = "You're offline now";
    subTitle.innerText = "Opps! Internet is disconnected.";
    wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
  }

  setInterval(() => { //this setInterval function call ajax frequently after 100ms
    ajax();
  }, 100);

  headfade.onclick = () => {
    navbar.classList.toggle("nav-active")

    navlinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5 ease forwards ${index / 2 + 1}s`;
      }
    });
    headfade.classList.toggle("toggle")
  }
})
