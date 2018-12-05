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
    
    if(this.icon.match(/repo:.+/)) {
    	this.icon = this.icon.replace("repo:", GITHUB_ACCOUNT_LINK + "/" + this.repository + "/blob/");
    	this.icon += "?raw=true";
    }
}

Project.prototype.createCard = function(parent, reverse) {
	this.parent = parent;
	this.root = $("<table></table>");
	this.root.attr("class", "project-root");
	this.parent.append(this.root);
	
	var row = $("<tr></tr>");
	var cell;
	this.root.append(row);
	
	var genIcon = function() {
		cell = $("<td></td>");
		row.append(cell);
		cell.attr("rowspan", 2)
			.width("25%");
		this.logo = $("<img/>");
		this.logo.attr("src", this.icon)
				 .attr("class", "project-icon");
		cell.append(this.logo);
	}.bind(this);
	
	var genTitle = function() {
		this.title = $("<td></td>");
		row.append(this.title);
		this.title.html(this.name)
				  .attr("class", "project-title");
	}.bind(this);
	
	if(reverse) {
		genTitle();
		genIcon();
	} else {
		genIcon();
		genTitle();
	}
	
	row = $("<tr></tr>");
	this.root.append(row);
	cell = $("<td></td>");
	row.append(cell);
	this.info = $("<div></div>");
	this.info.html(this.information)
		 .attr("class", "project-info");
	cell.append(this.info);
	
	this.root.on("click", function() {
		openPage("projects/" + this.page + "/");
	}.bind(this));
}