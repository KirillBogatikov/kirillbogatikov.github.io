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
        this.icon = this.icon.replace("repo:", "https://github.com/KirillBogatikov/" + this.repository + "/blob/");
        this.icon += "?raw=true";
    }
}

Project.prototype.createCard = function(reverse) {
    if(this.card) return this.card;
    
    var card = this.card = {};
    
    card.root = $("<div></div>");
    card.root.attr("class", "project-card-root");
    card.root.on("click", function() { 
	openPage("/projects/" + this.page + "/");
    }.bind(this));
    
    card.title = $("<h3></h3>");
    card.title.attr("class", "project-card-title")
    	      .html(this.name);
    card.root.append(card.title);
    
    card.icon = $("<img/>");
    card.icon.attr("class", "project-card-icon")
    	     .attr("src", this.icon)
    	     .css("float", reverse ? "left" : "right");
    card.root.append(card.icon);
    
    card.special = $("<div></div>");
    card.special.attr("style", "project-card-content")
    
    var dp_message = this.__format(this.dependences, "без использования сторонних библиотек и фреймфорков",
	    					     "с использованием библиотеки ",
	    					     "с использованием библиотек ");
    var pl_message = this.__format(this.platform, "любой платформе ", "платформе ", "платформе ", "платформах ");
    var tls_message = this.__format(this.tools, " отсутствуют", ": ", ": ");
    
    card.special.html("Проект реализован " + dp_message + " и доступен на " + pl_message + ". Требования к платформе" + tls_message);
    card.root.append(card.special);
    
    return card;
}

Project.prototype.__format = function(array, none, one, more) {
    if(array.length == 0) {
	return none;
    }
    if(array.length == 1) 
	return one + array[0];
    else if(array.length > 1) {
	for(var i in array) {
	    more += array[i];
	    if(i != array.length - 1) more += ", ";
	}
	return more;
    }  
}

Project.prototype.createPreview = function(width) {
    if(this.preview) return this.preview;
    
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
    preview.details.attr("class", "button-light project-preview-button")
                   .html("Детали проекта")
                   .on("click", function() {
                       animateScrollingTo(this.createCard().root);
                   }.bind(this));
    preview.root.append(preview.details).append($("<p>"));
    
    return preview;
}

function loadProjectsJson(project) {
    var json = fetchJson("/projects/summary.json");
    if(typeof(project) == "number") { 
	return json[project];
    } else if(project) {
	for(var i in json) {
	    if(json[i].page == project) {
		return json[i];
	    }
	}
    }
    return json;
}