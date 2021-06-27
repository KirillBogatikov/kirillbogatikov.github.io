onload_functions.push((tools) => {
    tools.actionScrollHandler = () => {
        let universeBlock = tools.query("#universe");
        let actionUniverse = tools.query("#action-universe");

        if (universeBlock.classList.contains("minimized")) {
            actionUniverse.classList.remove("active");
            actionUniverse.classList.add("inactive");
        } else {
            actionUniverse.classList.remove("inactive");
            actionUniverse.classList.add("active");
        }
    };
    tools.actionScrollHandler();
});

onload_functions.push((t) => {
t.addEvent(null, "scroll", function () {
        let universeBlock = t.query("#universe");
        let height = t.query("#initiatives").clientHeight;

        if (t.currentScrollTop() > height) {
            if (!universeBlock.classList.contains("minimized")) {
                universeBlock.classList.add("minimized");
            }
        } else {
            universeBlock.classList.remove("minimized");
        }

        t.actionScrollHandler();
    });

    let currentHandler = null;

    window.scrollToSection = function(selector) {
        let section = t.query(selector);
        let top = Math.max(section.offsetTop - t.query("#header").clientHeight * 1.75, 0);

        let step = screen.availHeight / 30;
        let animator;

        if (t.currentScrollTop() < top) {
            animator = function() {
                return {
                    step: step,
                    shutdown: t.currentScrollTop() >= top
                }
            }
        } else {
            animator = function() {
                return {
                    step: -step,
                    shutdown: t.currentScrollTop() <= top
                }
            }
        }

        if (currentHandler) {
            currentHandler.break = true;
        }

        currentHandler = animate(60, -1, (c, i, p) => {
            let result = animator();
            scroll(0, t.currentScrollTop() + result.step);
            return result.shutdown ? null : p;
        });
    }
});