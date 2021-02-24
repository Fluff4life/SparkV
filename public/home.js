window.onload(function(){
  if ($(window).scrollTop()){
    $("header").addClass("nav-show")
  } else {
    $("header").removeClass("nav-show")
  }
})

$(document).ready(function(){
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