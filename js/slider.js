/**
 * 
 */
SCROLLBAR_WIDTH = 0;

Slider = function(parent, width, height, customRoot) {
	this.parent = parent;
	
	this.thread = null;
	
	this.currentSlide = 0;
	this.slides = [];
	
	if(customRoot) {
		this.root = $(customRoot);
	} else {
		 this.root = $("<div></div>");	
		 this.parent.append(this.root);
	}
	this.root.css("overflow", "hidden"); 
	
	this.container = $("<div></div>");
	this.container.css("position", "absolute")
				  .css("overflowX", "visible")
				  .css("z-index", 7)
				  .height("100%");
	this.root.append(this.container);
	this.resize(width, height);
}

Slider.prototype.add = function(slide) {
	this.slides.push(slide);
	this.container.width((this.slides.length * 100) + "%");
	this.container.append(slide);
}

Slider.prototype.__swipe = function(forward, force) {
	var left;
	if(forward) {
		if(++this.currentSlide == this.slides.length) {
			this.currentSlide = 0;
		}
	} else {
		if(--this.currentSlide == -1) {
			this.currentSlide = this.slides.length - 1;
		}
	}
	
	this.container.animate({left:(this.currentSlide * -this.root.width())}, force ? 0 : 400);
}

Slider.prototype.next = function() {
	this.stop();
	var wasStarted = (this.thread != null);
	this.__swipe(true);
	if(wasStarted) {
		this.start();
	}
}

Slider.prototype.last = function() {
	this.stop();
	var wasStarted = (this.thread != null);
	this.__swipe(false);
	if(wasStarted) {
		this.start();
	}
}

Slider.prototype.__autoSwipe = function() {
	console.log("WHO CALL ME?!");
	this.__swipe(true);
	this.thread = setTimeout(this.__autoSwipe.bind(this), this.duration);
}

Slider.prototype.resize = function(width, height) {
	this.root.width(width).height(height);
	for(var key in this.slides) {
		this.slides[key].width(width).height(height);
	}
	this.container.css("left", this.currentSlide * -this.root.width());
}

Slider.prototype.start = function(duration) {
	if(duration) {
		this.duration = duration;
	} else if(!this.duration) {
		this.duration = 7500;
	}
	
	this.thread = setTimeout(this.__autoSwipe.bind(this), this.duration);
}

Slider.prototype.stop = function() {
	clearTimeout(this.thread);
}