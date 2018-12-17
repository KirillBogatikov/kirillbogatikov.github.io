$(window).on("load", function() {
    loadProjects();
    initiateSlider();
    initiateCards();
    
    registerOnResize(updateSlider);
    registerOnResize(updateCards);
});

function loadProjects() {
    PROJECTS = [];
    var raw = fetchJson("/projects/summary.json?6");
    
    for(var pid in raw) {
        var project = new Project(raw[pid]);
        PROJECTS.push(project);
    }
}

function initiateCards() {
    for(var pid in PROJECTS) {
        var card = PROJECTS[pid].createCard(pid % 2 == 0);
        $("#projects").append(card.root);
    }
    updateCards();
}

function updateCards() {
    var cards = $(".project-card-root");
    cards.height(cards.height());
}

function initiateSlider() {
    var width = Math.floor($("#preview").width() * 0.80);
    
    slider = new Slider($("#preview"), width, "#slider");
    
    for(var pid in PROJECTS) {
        var preview = PROJECTS[pid].createPreview(width);
        slider.add(preview.root);
    }
    
    slider.start(3500);
    
    var size = Math.floor($("#preview").width() - width) / 2 - 30;
    $(".slider-buttons").width(size).height(size).css("top", ($("#preview").height() - size) / 2);
    
    $("#slider-last").on("click", slider.last.bind(slider));
    $("#slider-next").on("click", slider.next.bind(slider));
}

function updateSlider() {
    var width = Math.floor($("#preview").width() * 0.80);
    slider.resize(width);
    
    var size = Math.floor($("#preview").width() - width) / 2 - 30;
    $(".slider-buttons").width(size).height(size).css("top", ($("#preview").height() - size) / 2);
}