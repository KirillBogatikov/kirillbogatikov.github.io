onload_functions.push((tools) => {
    window.animate = function(fps, duration, animate) {
        let useDuration = duration > 0;
        let timeout;

        let handler = {
            id: 0,
            break: false
        };
        
        let params = {
            count: Math.round(fps * duration),
            iteration: 0,
            custom: {}
        };

        if (useDuration) {
            timeout = 1.0 / fps * duration;
        }

        let func = function() {
            console.log(params.iteration + "/" + params.count)

            params.custom = animate(params.count, params.iteration, params.custom);

            if (handler.break) {
                return;
            }

            if ((useDuration && params.iteration++ < params.count) ||
                (!useDuration && params.custom)) {
                handler.id = setTimeout(func, timeout);
            }
        };
        func();

        return handler;
    };
});