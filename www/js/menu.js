Menu = function() {
	this.items = [];
	for(var i = 0; i < arguments.length; i++) {
		items.push(arguments[i]);
	}
}

Menu.prototype.addItem = function(i) {
	this.items.push(i);
	this.update();
}

Menu.prototype.removeItem = function(i) {
	if(typeof i == 'number' && this.items.length > i && i > -1) {
		delete this.items[i];
	} else {
		for(var j = 0; j < this.items.length; j++) {
			if(this.items[j] == i) {
				delete this.items[i];
				break;
			}
		}
	}
	
	this.update();
}

Menu.prototype.update = function() {
	var menu = $("<div></div>");
	menu.attr("style", "menu");
	menu.attr("id", this.id);
	
	for(var i = 0; i < this.items.length; i++) {
		menu.append(this.items[i].toHTML());
	}
	
	
}

Item = function(label) {
	this.label = label;
}

Item.prototype.toHTML = function() {
	var div = $("<div></div>");
	div.attr("class", "menu-item");
	div.html(this.label);
	return div;
}