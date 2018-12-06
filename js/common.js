/**
 * Auto Fixes Per Second
 */
const AFPS = 25;
const GITHUB_ACCOUNT_LINK = "https://github.com/KirillBogatikov";
/**
 * Storage onload callbacks
 */
customOnloads = [];
customAutoFixes = [];

LANGUAGE = "ru";

onload = function() {
	startAutoFix();
	
	$(document).on("scroll", toggleFastScroll);
	
	if(customOnloads.length > 0) {
		for(var id in customOnloads)
			customOnloads[id]();
	}
	
	applyAnchorsAnimation(".anchor-link");
}

var lastScrollTop = -1;
var fastScrollShowed = true;

function toggleFastScroll() {
	var scroll = $(document.scrollingElement);
	var scrollTop = scroll.prop("scrollTop");
			
	if(scrollTop > scroll.height() / 7 && !fastScrollShowed) {
		fastScrollShowed = true;
		$("#fast-scroll-top").animate({
			opacity: 1
		}, 300);
	} 
	if(scrollTop <= scroll.height() / 7 && fastScrollShowed) {
		fastScrollShowed = false;
		$("#fast-scroll-top").animate({
			opacity: 0
		}, 300);
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


function openPage(uri) {
	var a = $("<a href='" + uri + "'></a>");
	var body = $(document.body);
	body.append(a);
	a[0].click();
	a.remove();
}

function applyAnchorsAnimation(selector) {
	var anchors = $(selector);
	anchors.on("click", function(event) { 
		var id  = $(this).attr('href');
		if(!id || id[0] != "#") {
			return;	
		} 
	    event.preventDefault();

	    var element = $(id);

	    var minus = parseInt($("#header").height());
	    minus += parseInt(element.css("padding-top"));
	    minus += parseInt(element.css("margin-top"));
	    
	    var top = element.offset().top - minus;
	    console.log(top);
	    
	    $(document.scrollingElement).animate({
	    	scrollTop: Math.max(top, 0)
	    }, 500);
	});
}