ScrollView = function(parent) {
    this.root = $("<div></div>");
    this.scroll = $("<div><div>");
    this.container = $("<div></div>");
    this.root.css("overflow", "hidden");
    this.scroll.css("overflow", "scroll");
    
    this.scroll.append(this.container);
    this.root.append(this.scroll);
    parent.append(this.root);
}

ScrollView.countScrollbarsSize = function() {
    var body = $(document.body);
    var container = $("<div></div>");
    var child = $("<div></div>");
    container.append(child);
    body.append(container);
    
    container.width("100%");
    child.width("100%");
    container.css("overflow", "scroll");
    ScrollView.SYSTEM_SCROLLS_SIZE = container.width() - child.width(); 
    container.remove();
}

ScrollView.prototype.setContentView = function(content) {
    this.container.append(content);
}

ScrollView.prototype.setWidth = function(w) {
    if(typeof w != 'number' || w < 0) return;
    
    this.root.width(w);
    this.container.width(w);
    this.scroll.width(w + ScrollView.SYSTEM_SCROLLS_SIZE);
}

ScrollView.prototype.setHeight = function(h) {
    if(typeof h != 'number' || h < 0) return;
    
    this.root.height(h);
    this.container.height(h);
    this.scroll.height(h + ScrollView.SYSTEM_SCROLLS_SIZE);
}