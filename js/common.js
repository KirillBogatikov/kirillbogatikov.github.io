/**
 * Auto Fixes Per Second
 */
const AFPS = 25;
/**
 * Storage onload callbacks
 */
customOnloads = [];
customAutoFixes = [];

LANGUAGE = "ru";

onload = function() {
	startAutoFix();
	
	if(customOnloads.length > 0) {
		for(var id in customOnloads)
			customOnloads[id]();
	}
}

var lastScreen = {
	width: -1,
	height: -1
};

function startAutoFix() {
	fixHeaderWidth();
	if(lastScreen.width != screen.width || lastScreen.height != screen.height) {
		lastScreen.width = screen.width;
		lastScreen.height = screen.height;
		
		fixSectionsPosition();
		
		if(customAutoFixes.length > 0) {
			for(var id in customAutoFixes)
				customAutoFixes[id]();
		}
	}
	
	setTimeout(startAutoFix, 1000 / AFPS);
}

function fixHeaderWidth() {
	var header = $("#header");
	header.width("100%");
	var width = parseInt(header.width());
	width -= 30;
	header.width(width);
}

function fixSectionsPosition() {
	var preview = $("#preview");
	var header = $("#header");
	preview.css("padding-top", header.height() + 45);
}

function fetchFile(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send(null);

	if (xhr.status != 200) {
		return [xhr.status, xhr.statusText];
	}
	return xhr;
}

function fetchJson(url) {
	var file = fetchFile(url);
	if(typeof file == 'array') {
		return file;
	}
	return JSON.parse(file.responseText);
}
