
(function($) {
	
	// static constructs
	var t = $.tools.scrollable; 

	t.navigator = {
		conf: {	
			offset:10
		} 
	};

	$.fn.scrollbar = function(conf) { 
		conf = $.extend({}, t.navigator.conf, conf);	
		var api = $(this).data("scrollable"),ret;
		if (api) { ret = api; }

		var scroll = $(conf.bar),
		bar = scroll.children();
		if(!scroll || !bar) return;

		var viewport = api.getRoot(),
		wall = api.getItemWrap();

		var viewport_w,wall_w,r,scroll_w;

		function init(){
			viewport_w = viewport.width(),
			wall_w = wall.width()+conf.offset,
			r = viewport_w/wall_w,
			scroll_w = scroll.width();
			r>1?r=1:r=r;
			bar.css('width',scroll_w*r);
		}

		init();
		document.body.onselectstart = function(){return false};

		var startX = 0,barClick = false,barLeft = 0,wallLeft = 0;
		bar.mousedown(function(e){
			startX = e.pageX;
			barClick = true;
			barLeft = parseInt(bar.css("left")) || 0;
			wallLeft = parseInt(wall.css("left")) || 0;
		});
		$(document).mouseup(function(){
			barClick = false;
		});
		$(document).mousemove(function(e){
			if(!barClick) return;
			var e = e || event;
			var offset = e.pageX - startX;
			var _barLeft = barLeft+offset;
			var _wallLeft = wallLeft-wall_w*offset/scroll_w;
			if(_barLeft<0) _barLeft = 0;
			if(_barLeft>scroll_w-scroll_w*r) _barLeft = scroll_w-scroll_w*r;
			if(_wallLeft>0) _wallLeft = 0;
			if(_wallLeft<(viewport_w-wall_w)) _wallLeft = viewport_w-wall_w;
			bar.css("left",_barLeft);
			wall.css("left",_wallLeft);
		})

		api.onSeek = function(){
			var left = Math.abs(parseInt(wall.css("left")));
			var r = left/wall_w;
			bar.css("left",scroll_w*r);
		}
		api.onResize = init;

		return conf.api ? ret: this; 
	};
})(jQuery)