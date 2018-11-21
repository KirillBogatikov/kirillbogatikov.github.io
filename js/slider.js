/**
 * 
 */
SCROLLBAR_WIDTH = 0;

Slider = function(parent, width, height, customRoot) {
	this.parent = parent;
	
	this.currentSlide = 0;
	this.slides = [];
	
	if(customRoot) {
		this.root = $(customRoot);
	} else {
		 this.root = $("<div></div>");	
		 this.parent.append(this.root);
	}
	this.root.css("overflow", "hidden"); 
	this.resize(width, height);
	
	this.container = $("<div></div>");
	this.container.css("position", "relative")
				  .css("overflowX", "visible")
				  .height("100%");
	this.root.append(this.container);
}

Slider.prototype.add = function(slide) {
	this.slides.push(slide);
	this.container.width(this.slides.length * this.slideWidth);
	this.container.append(slide);
}

Slider.prototype.__swipe = function(forward) {
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
	
	this.container.animate({left:(this.currentSlide * -this.slideWidth)}, 400);
}

Slider.prototype.next = function() {
	this.stop();
	this.__swipe(true);
	this.start();
}

Slider.prototype.last = function() {
	this.stop();
	this.__swipe(false);
	this.start();
}

Slider.prototype.__autoSwipe = function() {
	this.__swipe(true);
	this.thread = setTimeout(this.__autoSwipe.bind(this), this.duration);
}

Slider.prototype.resize = function(width, height) {
	this.root.width(width).height(height); 
	this.slideWidth = parseInt(this.root.width());
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