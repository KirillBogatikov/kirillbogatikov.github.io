onload = function() {
	console.log(screen)
	if (screen.width % 1920 == 0 && screen.height % 1080 == 0) {
		prepare_pagination()
	} else {
		$("#loading").hide();
		$("#warning").show();
	}	
}

function accept_warning() {
	console.log("FUCKUP MODE ACTIVATED")
	prepare_pagination()
}

function prepare_pagination() {
	$("#block").hide({ complete: function(){ $("#block").remove() } })
	
	var pagination = $("#pagination")

    var preventIndex = sessionStorage.getItem("preventIndex")
    var onepage_scroll_params = {
        sectionContainer: "section",
        animationTime: 800,
        pagination: false,  
        keyboard: true,
        direction: "vertical",
        beforeMove: function(index) {
            index--;
            
            if (index == preventIndex) return
    
            if(index > 0) {
                $("#pagination #section-0").css("opacity", 1)
                $("#pagination #section-" + index).css("opacity", 1)
            } else {
                $("#pagination #section-0").css("opacity", "")
            }

            if (preventIndex > 0) {
                $("#pagination #section-" + preventIndex).css("opacity", "")
            }

            preventIndex = index
            sessionStorage.setItem("preventIndex", index)
        }    
    }
    $("main").onepage_scroll(onepage_scroll_params)

    if (preventIndex != undefined) {
        preventIndex = parseInt(preventIndex) + 1
        $("main").moveTo(preventIndex)
    }

    pagination.css("top", (document.body.clientHeight - pagination.height()) / 2)
    for(var i in pagination.children()) {
        eval(`function onclick() {
            $("main").moveTo(` + i + ` + 1);
        }`)
        pagination.children()[i].onclick = onclick;
    }
}