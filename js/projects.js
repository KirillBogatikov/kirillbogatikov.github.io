/**
 * 
 */
Project = function(data) {
	this.name = data.name;
	this.page = data.page;
	this.repository = data.repository;
    this.information = data.information[LANGUAGE];
    this.platform = (data.platform.length == 0 ? null : data.platform);
    this.dependences = data.dependences;
    this.tools = data.tools;
    this.icon = data.icon;
}

Project.prototype.createHTML = function(parent) {
	this.parent = parent;
	this.root = $("<div></div>");
	this.parent.append
	this.title = $("<h3></h3>");
	this.title.html(this.name)
			  .attr("class", "project-title")
			  .width("100%");
	this.
}