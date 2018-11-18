customOnloads.push(function() {
	initiateSlider();
});

function initiateSlider() {
	var width = Math.floor($("#preview").width() * 0.80);
	var height = Math.floor(720 * width / 1280);
	
	slider = new Slider($("#preview"), width, height, "#slider");
	
	for(var i = 1; i < 6; i++) {
		var div = $("<img/>")
		div.attr("src", "/img/preview/" + i + ".png");
		div.width(width);
		slider.add(div);
	}
	
	slider.start(3500);
	
	var size = Math.floor($("#preview").width() - width) / 2 - 30;
	$(".slider-buttons").width(size).css("top", (height - size) / 2);
	
	$("#slider-last").on("click", slider.last.bind(slider));
	$("#slider-next").on("click", slider.next.bind(slider));
}