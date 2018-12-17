/**
 * Callback listeners array
 */
var onresizes = [];

/**
 * Current language. Used in I18n
 */
LANGUAGE = "ru";

SUPPORTED_ERRORS = [404];

/**
 * Adds to quene callback to listen onresize event
 */
function registerOnResize(fn) {
    if(onresizes.indexOf(fn) == -1)
        onresizes.push(fn);
    else
        throw "Already registered";
}

/**
 * Add new onload listener
 */
$(window).on("load", function() {
    //start listening to onresize events
    startOnResize();
    
    //add onscroll listen to animate fading "top" anchor
    $(document).on("scroll", toggleFastScroll);
    
    $(document.body).on("click", "A", function(e) {
	e.preventDefault();
	console.log(e);
	openPage(e.currentTarget.href);
    });
    //add animation to all elements with class anchor-link
    setScrollToAnimation(".anchor-link");
});

var lastScrollTop = -1;
var fastScrollShowed = true;

/**
 * fades in or fades out top anchor 
 */
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

//last screen params
var lastScreen = {
    width: -1,
    height: -1
};

/**
 * listens screen resizing and calls all existing callbacks 
 */
function startOnResize() {
    if(lastScreen.width != screen.width || lastScreen.height != screen.height) {
        lastScreen.width = screen.width;
        lastScreen.height = screen.height;
        
        fixHeaderWidth();
        fixSectionsPosition();
        
        if(onresizes.length > 0) {
            for(var id in onresizes)
                onresizes[id]();
        }
    }
    
    //listen after 40 milliseconds
    setTimeout(startOnResize, 40);
}

/**
 * fixes header width: recount width by 
 * removing from width paddings 
 */
function fixHeaderWidth() {
    var header = $("#header");
    header.width("100%");
    var width = parseInt(header.width());
    width -= (parseFloat(header.css("padding-left")) + parseFloat(header.css("padding-right")));
    header.width(width);
}

/**
 * fixes sections position: shift all to header height pixels to bottom
 * header will be drawn on top of page. this will cause the content to overlap
 */
function fixSectionsPosition() {
    var preview = $($(".section")[0]);
    var header = $("#header");
    preview.css("padding-top", header.height() + 45);
}

/**
 * returns instance of XMLHttpRequest, associated with specified url
 * or array [errorStatus, errorMessage] if error was be occurred
 */
function fetchFile(url, method) {
    var xhr = new XMLHttpRequest();
    xhr.open(method ? method : 'GET', url, false);
    xhr.send(null);

    if (xhr.status != 200) {
        return new Array(xhr.status, xhr.statusText);
    }
    return xhr;
}

/**
 * returns JSON structure, parsed from specified by url file's text
 * or array [errorStatus, errorMessage] if error was be occurred
 */
function fetchJson(url) {
    var file = fetchFile(url);
    if(file instanceof Array) {
        return file;
    }
    return JSON.parse(file.responseText);
}

/**
 * opens specified link in current tab and adds record to history
 */
function openPage(uri) {
    if(uri.indexOf(/(ht|f)tp(s?)/) == -1) {
	$.ajax({
	    url: uri,
	    method: "HEAD"
	}).done(function(data) {
	    if(~uri.indexOf("#")) uri = uri.replace("#", "?yes#")
	    else uri += "?yes";
	    
	    location.assign(uri);
	}).fail(function(xhr) {
	    var page = "unknown.html?" + xhr.status;
	    if(~SUPPORTED_ERRORS.indexOf(xhr.status)) {
		page = xhr.status + ".html?yes";
	    }
	    location.assign("/error/" + page);
	});
    } else {
	location.assign(uri);
    }
}

/**
 * sets scrolling animation to all elements, which found by selector
 * element must have href attribute with anchor name in value 
 */
function setScrollToAnimation(selector) {
    var anchors = $(selector);
    anchors.on("click", function(event) { 
        var id  = $(this).attr('href');
        if(!id || id[0] != "#") {
            return;    
        } 
        event.preventDefault();

        animateScrollingTo($(id));
    });
}

/**
 * scrolls page to specified element
 * child must be jquery instance
 */
function animateScrollingTo(child) {
    var minus = parseInt($("#header").height());
    minus += parseInt(child.css("padding-top"));
    minus += parseInt(child.css("margin-top"));
    
    var top = child.offset().top - minus;
    
    $(document.scrollingElement).animate({
        scrollTop: Math.max(top, 0)
    }, 500);
}