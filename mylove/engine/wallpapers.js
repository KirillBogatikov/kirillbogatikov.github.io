Wallpapers = function(useAggresive) {
	this.slides = [];
	this.current = -1;
	this.view = $("<img/>");
	this.view.css("position", "absolute").width("100%").css("z-index", -999);
	
	this.addSlide = function(src) {
		this.slides.push(src);
	}
	
	this.update = function() {
		if(++this.current >= this.slides.length)
			this.current = 0;
			
		this.view.attr("src", this.slides[this.current]);
			
		setTimeout(this.update.bind(this), 7500);
	};
	
	$(document.body).append(this.view);
	this.update();
}

SecretBlind = function() {
	this.background = $("<img/>")
	this.background.attr("src", "img/wallpaper.gif").height("100%").css("position", "fixed").css("z-index", 998);
	this.foreground = $("<div></div>");
	this.foreground.html("Хочешь увидеть сюрпризик? Тогда переверни телефончик)").width("70%").css("position", "fixed").css("left", "15%").css("top", "35%").css("z-index", 998);
	this.foreground.css("background", "rgba(255, 255, 255, 0.75)").css("font-size", "250%").css("text-align", "center").css("border-radius", 50).css("padding", "25px");
	
	var f = function() {
		if(screen.width > screen.height) {
			this.background.css("display", "none");
			this.foreground.css("display", "none");
		} else {
			this.background.css("display", "block");
			this.foreground.css("display", "block");
		}
		setTimeout(f.bind(this), 40);
	};
	f.bind(this)();
	
	$(document.body).append(this.background).append(this.foreground);
}