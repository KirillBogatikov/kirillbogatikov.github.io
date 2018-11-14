Callbacks.__update();
Callbacks.addOnloadListener(function(){
	Callbacks.addOnDeviceOrientationChangeListener(refreshAdaptiveBlocks);
	GitHubAnimation.initiate();
	AvatarAnimation.initiate();
});

function refreshAdaptiveBlocks() {
	var header = $("HEADER");
	var header_description = $("#header-description");
	header_description.width(header.width() * 6 / 7 - 30);
	
	var social_bar = $("#social-bar");
	var social_buttons = social_bar.children();
	var social_button_size = header.width() / (5 * social_buttons.length);
	for(var i = 0; i < social_buttons.length; i++) {
		$(social_buttons[i]).width(social_button_size - 10);
	}
	
	var avatar = $("#avatar");
	avatar.width(header.width() / 7);
	
	header.height($("#header-title").height() + header_description.height() + 20);
	
	var header_navbar = $("#header-nav-bar");
	header_navbar.width(header_navbar.width() - 10);
	
	var header_navitems = header_navbar.children(".menu-item");
	var header_navitem_width = (header_navbar.width()) / header_navitems.length;
	for(var i = 0; i < header_navitems.length; i++) {
		var header_item = $(header_navitems[i]);
		header_item.width(header_navitem_width - 30)
	}
}

function openLink(link) {
	console.log(link);
	var link_html = $("<a></a>");
	link_html.attr("href", encodeURI(link));
	$(document.body).append(link_html);
	link_html[0].click();
	link_html.remove();
}