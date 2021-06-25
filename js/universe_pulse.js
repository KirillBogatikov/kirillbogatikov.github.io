onload_functions.push((tools) => {
    let cores = tools.queryAll(".core");
    cores.forEach(e => {
        if (e.id === "strange-target") {
            return
        }

        tools.addEvent(e, "mouseenter", function (event) {
            if (event.automotive) {
                if (this.classList.contains("mouseenter")) {
                    return;
                }

                this.classList.add("automotive");
            } else {
                this.classList.remove("automotive");
            }

            this.classList.remove("mouseleave")
            this.classList.add("mouseenter")
        });
        tools.addEvent(e, "mouseleave", function(event) {
            if (event.automotive){
                if (this.classList.contains("mouseenter") &&
                    !this.classList.contains("automotive")) {
                    return;
                }

                this.classList.remove("automotive");
            }

            this.classList.remove("mouseenter")
            this.classList.add("mouseleave")
        })
    });

    tools.actionScrollHandler(0);

    let items = ["#red-light-holdings", "#dark-horse", "#pharaon", "#projector-solutions", "#viva-victoria"];
    let index = 0;

    let func = function() {
        let previousItem = tools.query(items[index]), currentItem;

        if (index + 1 === items.length) {
            currentItem = tools.query(items[0]);
            index = 0;
        } else {
            currentItem = tools.query(items[++index]);
        }

        let leave = document.createEvent("HTMLEvents");
        leave.initEvent("mouseleave", true, false);
        leave.automotive = true;
        previousItem.dispatchEvent(leave);

        let enter = document.createEvent("HTMLEvents");
        enter.initEvent("mouseenter", true, true);
        enter.automotive = true;
        currentItem.dispatchEvent(enter);

        setTimeout(function() {
            currentItem.dispatchEvent(leave);
            setTimeout(func, 1000);
        }, 500);
    };
    func();
})