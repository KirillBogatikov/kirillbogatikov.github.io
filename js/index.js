$(window).on("load", function() {
	loadProjects();
	initiateSlider();
	initiateCards();
	
	registerOnResize(updateSlider);
	
	$(".contact-icon").on("click", function(e) {
		document.location.href= $(e.currentTarget).attr("href");
	});
});

function loadProjects() {
	PROJECTS = [];
	var raw = fetchJson("/projects/summary.json?4");
	
	for(var pid in raw) {
		var project = new Project(raw[pid]);
		PROJECTS.push(project);
	}
}

function initiateCards() {
	var table = $("<table id=\"project-cards\"></table>");
	$("#projects").append(table);
	var row;
	
	for(var pid in PROJECTS) {
		var reverse = true;
		if(pid % 2 == 0) {
			reverse = false;
			row = $("<tr></tr>");
			table.append(row);
		}
		
		var cell = $("<td width=\"50%\"></td>");
		row.append(cell);
		var card = PROJECTS[pid].createCard(reverse);
		cell.append(card.root);
	}
}

function initiateSlider() {
	var width = Math.floor($("#preview").width() * 0.80);
	var height = Math.floor(720 * width / 1280);
	
	slider = new Slider($("#preview"), width, height, "#slider");
	
	for(var pid in PROJECTS) {
		var preview = PROJECTS[pid].createPreview(width, height);
		slider.add(preview.root);
	}
	
	slider.start(3500);
	
	var size = Math.floor($("#preview").width() - width) / 2 - 30;
	$(".slider-buttons").width(size).css("top", (height - size) / 2);
	
	$("#slider-last").on("click", slider.last.bind(slider));
	$("#slider-next").on("click", slider.next.bind(slider));
}

function updateSlider() {
	var width = Math.floor($("#preview").width() * 0.80);
	var height = Math.floor(720 * width / 1280);
	slider.resize(width, height);
	
	var size = Math.floor($("#preview").width() - width) / 2 - 30;
	$(".slider-buttons").width(size).css("top", (height - size) / 2);
}