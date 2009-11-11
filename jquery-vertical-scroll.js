/* Copyright (c) 2009 Sean Soper
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * jquery-vertical-scroller
 * Version: 1.1 (Nov 10, 2009)
 * Requires: jQuery 1.3.2+
 */

(function($) {
  $.fn.verticalScroll = function(options) {
    
    var defaults = {
      duration: 500,
      interval: 5000,
      easing: 'swing',
      height: $(this).css('height')
    };
    
    var opts = $.extend(defaults, options);
    var timer = null;
    var itemsCount = $(this).children('li').length;
    $(this).css('overflow', 'hidden');
    $(this).children('li').css({ 'position' : 'relative', 'height' : opts.height });

    var dotimer = function (elem) {
      if (timer != null) clearInterval(timer);

      timer = setInterval(function() {
        var fired = 0;
        $(elem).children('li').animate({ top: '-=100%' }, opts.duration, opts.easing, function() {
          fired++;
          if (fired == itemsCount) {
            $(elem).children('li:last').after($(elem).children('li:eq(0)'));
            $(elem).children('li').css('top', '0%')
          }
        });
      }, opts.interval);
    }

    dotimer(this);
  };
})(jQuery);
