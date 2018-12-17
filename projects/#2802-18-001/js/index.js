Callbacks.__update();
Callbacks.addOnloadListener(function() {
    ScrollView.countScrollbarsSize();
    scroll = new ScrollView($(document.body));
    c = $("<p style='color:white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>");
    
    scroll.setContentView(c);
    scroll.setWidth(150);
    scroll.setHeight(150);
});