var hT = jQuery('.love_counter').offset().top,
    hH = jQuery('.love_counter').outerHeight(),
    wH = jQuery(window).height();
if (jQuery(window).scrollTop() > hT + hH - wH) {
    jQuery('.love_count').each(function () {
        var $this = jQuery(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.Counter) + '+');
            }
        });
    });
}
