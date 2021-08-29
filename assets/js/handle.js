/*
KingCh1ll
Handle.js
*/

var scroll = new SmoothScroll('a[href*="#"]');
var online = true;

$(window).load(async () => {
  var Popup = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: popup => {
      popup.addEventListener("mouseenter", Swal.stopTimer);
      popup.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  window.addEventListener("error", err => {
    Popup.fire({
      icon: "error",
      title: "Uh oh!",
      text: `An error occured. Please contact a support member with the following error. ${err.message}`,
    });
  });

  var iframes = document.getElementsByTagName("iframe");

  for (var iframe of iframes) {
    iframe.setAttribute("sandbox", "allow-popups allow-forms");
  }
});

$(document).ready(() => {
  var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: "#navbar-example",
  });

  var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
  dataSpyList.forEach(dataSpyEl => {
    bootstrap.ScrollSpy.getInstance(dataSpyEl).refresh();
  });

  var iframes = document.getElementsByTagName("iframe");

  for (var iframe of iframes) {
    iframe.setAttribute("sandbox", "allow-popups allow-forms");
  }

  AOS.init({
    once: false,
    startEvent: "load",
    duration: "600",
  });

  $(document).on("click", ".deletebot", async function() {
    await Swal.fire({
      title: `Are you sure you want to delete ${$(this).attr("name")}?`,
      text: "THIS ACTION CANNOT BE UNDONE!",
      icon: "warning",
      html: `Type <u>${$(this).attr("name")}</u> to confirm.`,
      showCancelButton: true,
      input: "text",
      confirmButtonText: "Delete",
      preConfirm: async name => {
        if (name.toLowerCase() !== $(this).attr("name").toLowerCase()) {
          Swal.update({
            title: "Cancelled",
            html: "",
          });

          await wait(1);
        } else {
          await fetch(`/api/bots/${$(this).attr("id")}`, {
            method: "DELETE",
          });

          location.href = "/";
        }
      },
    });
  });

  $(".counter").each(function() {
    $(".counter").animate(
      {
        Counter: this.text(),
      },
      {
        duration: 2000,
        easing: "swing",
        step: function() {
          this.text(`${Math.ceil(this.Counter)}+`);
        },
      },
    );
  });
});
