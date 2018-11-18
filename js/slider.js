/**
 * 
 */
SCROLLBAR_WIDTH = 0;

Slider = function(parent, width, height) {
	this.parent = parent;
	
	this.slides = [];
	
	this.root = $("<div></div>");
	this.root.css("overflow", "hidden")
			 .width(width).height(height); 
	this.parent.append(this.root);
	
	this.size = {
		width: parseInt(this.root.width()), 
		height: parseInt(this.root.height())
	};
	
	this.container = $("<div></div>");
	this.container.css("position", "relative")
				  .css("overflowX", "visible")
				  .width(this.size.width).height(this.size.height);
	this.root.append(this.container);
	
	this.left = $("<img src='img/slider/left.png'/>");
	this.left.css("position", "absolute")
			 .width(this.size.height / 3).height(this.size.height / 3)
			 .css("float", "left")
			 .css("top", this.size.height / 3);
	this.root.append(this.left);
}

Slider.prototype.add = function(slide) {
	this.slides.push(slide);
	this.container.width(this.slides.length * this.size.width);
	this.container.append(slide);
}

Slider.prototype.__animate = function(l) {
	this.container.animate({left:l}, 400);
}

Slider.prototype.next = function(a) {
	if(!a)this.stop();
	var l = parseInt(this.container.css("left")) - this.size.width;
	if(l <= -this.container.width()) {
		l = 0;
	}
	this.__animate(l);
}

Slider.prototype.last = function() {
	this.stop();
	var l = parseInt(this.container.css("left"));
	if(l == 0) {
		l = -(this.slides.length) * this.size.width;
	}
	l += this.size.width;
	this.__animate(l);
}

Slider.prototype.start = function() {
	this.next(true);
	this.thread = setTimeout(this.start.bind(this), 7500);
}

Slider.prototype.stop = function() {
	clearTimeout(this.thread);
}