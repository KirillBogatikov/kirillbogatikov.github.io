/**
 * 
 */
Project = function(data) {
	this.name = data.name;
	this.page = data.page;
	this.repository = data.repository;
    this.information = data.information[LANGUAGE];
    this.platform = data.platform;
    this.dependences = data.dependences;
    this.tools = data.tools;
    this.icon = data.icon;
    
    if(this.icon.match(/repo:.+/)) {
    	this.icon = this.icon.replace("repo:", GITHUB_ACCOUNT_LINK + "/" + this.repository + "/blob/");
    	this.icon += "?raw=true";
    }
}

Project.prototype.createCard = function(reverse) {
	if(this.card) return this.card;
	
	var card = this.card = {};
	
	card.root = $("<table></table>");
	card.root.attr("class", "project-card-root");
	
	var row = $("<tr></tr>");
	var cell;
	card.root.append(row);
	
	var genIcon = function() {
		cell = $("<td></td>");
		row.append(cell);
		cell.attr("rowspan", 2)
			.width("25%");
		card.logo = $("<img/>");
		card.logo.attr("src", this.icon)
				 .attr("class", "project-card-icon");
		cell.append(card.logo);
	}.bind(this);
	
	var genTitle = function() {
		card.title = $("<td></td>");
		row.append(card.title);
		card.title.html(this.name)
				  .attr("class", "project-card-title");
	}.bind(this);
	
	if(reverse) {
		genTitle();
		genIcon();
	} else {
		genIcon();
		genTitle();
	}
	
	row = $("<tr></tr>");
	card.root.append(row);
	cell = $("<td></td>");
	row.append(cell);
	card.info = $("<div></div>");
	card.info.html(this.information)
		 .attr("class", "project-card-info");
	cell.append(card.info);
	return card;
}

Project.prototype.createPreview = function(width, height) {
	var preview = this.preview = {};
	
	preview.root = $("<div></div>");
	preview.root.width(width)
				.attr("class", "project-preview-root");
	
	preview.title = $("<h1></h1>");
	preview.title.html(this.name)
				 .attr("class", "project-preview-title");
	preview.root.append(preview.title);
	
	preview.icon_container = $("<div></div>");
	preview.icon_container.attr("class", "project-preview-icon-container");
	preview.root.append(preview.icon_container);
	
	preview.icon = $("<img/>");
	preview.icon.attr("src", this.icon)
				.attr("class", "project-preview-icon");
	preview.icon_container.append(preview.icon);
	
	preview.info = $("<div></div>");
	preview.info.attr("class", "project-preview-text")
				.html(this.information);
	preview.root.append(preview.info);
	
	preview.details = $("<button></button>");
	preview.details.attr("class", "project-preview-button")
				   .html("Детали проекта")
				   .on("click", function() {
					   animateScrollingTo(this.createCard().root.parent());
				   }.bind(this));
	preview.root.append(preview.details).append($("<p>"));
	
	preview.details = $("<button disabled></button>");
	preview.details.attr("class", "project-preview-button")
				   .html("На страницу проекта")
				   .on("click", function() {
					   openPage("projects/" + this.page);
				   }.bind(this));
	preview.root.append(preview.details);
	
	return preview;
}