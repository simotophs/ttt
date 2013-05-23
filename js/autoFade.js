
(function($) {
	$.fn.autoFade = function(conf) {   
		var zIndex = 1;
		$(this).children(':empty').remove();
		var _conf = {
			tag:'li',
			speed:1000,
			interval:3000,
			activeClass:'current'
		}
		var active=0;
		var conf = $.extend(_conf,conf||{});
		var self = $(this);
		var items = self.children(conf.tag);
		var len = items.length;
		var interval_timer;
		var timeout_timer;

		if(len<=1) return self;
		if(conf.nav){
			$.each(items,function(i,v){
				var nav = $("<a href='javascript:;'></a>");
				nav.click(function(){
					click(i);
				});
				$(conf.nav).append(nav);
			})
			$(conf.nav).children().eq(0).addClass(conf.activeClass);
		}
		items.hide();
		items.eq(0).show();
		function click(i){
			if(active==i) return;
			active=i;
			interval_timer && clearInterval(interval_timer);
			timeout_timer && clearTimeout(timeout_timer);
			items.fadeOut();
			items.eq(i).fadeIn();
			setNav(i);
			timeout_timer = setTimeout(function(){run()},conf.interval);
		}
		function run(){
			interval_timer = setInterval(function(){
				active++;
				if(active>=len) active=0;
				items.fadeOut();
				items.eq(active).fadeIn();
				setNav(active);
			},conf.interval);
		}
		function setNav(i){
			if(conf.nav){
				var nav = $(conf.nav);
				nav.children().removeClass(conf.activeClass);
				nav.children().eq(i).addClass(conf.activeClass);
			}
		}
		run();
	};     

})(jQuery);


