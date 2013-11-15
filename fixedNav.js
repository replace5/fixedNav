;(function(global, $) {

	$.fn.fixedNav = function(offset) {
		var scrollTimer,
			tDefault = [],
			checkList = this,
			view  = $(global),
			oMarTop = offset || 0;

		if(checkList.length) {
			$(window).bind('scroll', function() {
				getDefault();
				clearTimeout(scrollTimer);
				scrollTimer = setTimeout(checkScroll, 16);
			}).bind('resize', function() {
				getDefault();
			});
		}

		function getDefault() {
			checkList.each(function(index) {
				var	$this = $(this),
					arr = [];
				// arr['dWidth'] = $this.width();
				arr["startPos"] = $this.offset().top;
				arr["dTop"] = $this.css('top') || 'auto';
				arr["dZindex"] = $this.css('z-index') || '1';
				arr["dPosititon"] = $this.css('posititon') || 'static';
				tDefault.push(arr);
			});
		}

		function checkScroll() {
			var scrollTop = view.scrollTop();
			checkList.each(function(index) {
				var $this = $(this);
				if(scrollTop > tDefault[index]['startPos']+ oMarTop) {
					$this.css({"position": "fixed", "top": "0", "z-index": "999"});
				} else {
					$this.css({"position": tDefault[index]['dPosititon'], "top": tDefault[index]['dTop'], "z-index": tDefault[index]['dZindex']});
				}
			});
			scrollTimer = setTimeout(arguments.callee, 6);
		}

	}

})(window, jQuery);