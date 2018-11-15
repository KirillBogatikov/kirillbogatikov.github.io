/**
 * Auto Fixes Per Second
 */
const AFPS = 25;

onload = function() {
	startAutoFix();
	
	if(window["customOnload"]) {
		custumOnload();
	}
}

var lastScreen = {
	width: -1,
	height: -1
};

function startAutoFix() {
	if(lastScreen.width != screen.width || lastScreen.height != screen.height) {
		lastScreen.width = screen.width;
		lastScreen.height = screen.height;
		
		fixHeaderWidth();
		fixSectionsPosition();
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
	preview.css("margin-top", header.height() + 30);
}
