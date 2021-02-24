$(document).ready(function(){
  if ($(window).scrollTop()){
    $("header").addClass("nav-show")
  } else {
    $("header").removeClass("nav-show")
  }

  $("a").on("click", function(event){
    if (this.hash !== ""){
      event.preventDefault()

      var hash = this.hash

      $("html, body").animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash
      })
    }
  })
})