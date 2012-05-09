var Folder = (function () {

	var canvas;
	var opened = true;
	var boxes = [];

	var init = function() {
		canvas = $("#canvas");

		$(".box").each(function(index) {				
			var color = "color" + Math.floor(Math.random()*4);
			$(this).addClass(color);
		});	

		$(".slider").on("change",onSliderChange);
		
		$("#button-open").on("click", open);
		$("#button-close").on("click", close);
		canvas.on("click", toggle);
	};

	var open = function() {
		openVertical(0)
		openHorizontal(15, 800);
		opened = true;
	}

	var close = function() {
		openHorizontal(180);
		openVertical(180, 800);
		opened = false;
	}

	var toggle = function() {
		opened ? close() : open();
	}

	var onSliderChange = function(event) {
		var value = $(event.target).val();
		$(event.target).parent().find(".value").html(value);

		switch ($(event.target).parent().prop("id")) {
			case "slider-0":
				openVertical(value);
				break;
			case "slider-1":
				openHorizontal(value);
				break;
		}
	}

	var openVertical = function(value, delay) {
		if (typeof delay == 'undefined') { delay = 200; }
		$(".row").css("-webkit-transition-delay",delay+"ms");

		value = Math.min(value, 179);

		$(".row-1up, .row-2up, .row-3up").css("-webkit-transform", "translate3d(0px,-200px,0px) rotate3d(0,0,1,"+value+"deg)");
		$(".row-1down, .row-2down, row-3down").css("-webkit-transform", "translate3d(0px,200px,0px) rotate3d(0,0,1,-"+value+"deg)");	
	
		$("#slider-0 input").val(value);
	}

	var openHorizontal = function(value, delay) {
		if (typeof delay == 'undefined') { delay = 200; }
		$(".folder, .box").css("-webkit-transition-delay",delay+"ms");

		var middle = (4-1) * 200 / 2  * (value/180);

		$(".level0").css("-webkit-transform", "rotate3d(0,1,0,-"+(value/2)+"deg)");
		$(".level2, .level4, .level6").css("-webkit-transform", "translate3d(200px,0px,0px) rotate3d(0,1,0,-"+value+"deg)");
		$(".level1, .level3, .level5, .level7").css("-webkit-transform", "translate3d(200px,0px,0px) rotate3d(0,1,0,"+value+"deg)");
	
		if (value>=140){
			$(".folder").css("-webkit-transform", "translate3d("+middle+"px,0px,0px) rotate3d(0,1,0,"+(value/2)+"deg)");
		} else {
			$(".folder").css("-webkit-transform", "translate3d("+middle+"px,0px,0px) rotate3d(0,1,0,0deg)");
		}

		$("#slider-1 input").val(value);
	}

	return {
		init: init,
		open: open,
		close: close,
		toggle: toggle
	};
})();

Zepto(function($){
  Folder.init();

  setTimeout(function(){
  	 Folder.close();
  }, 1200 );
})