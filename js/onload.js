onload_functions = [];

onload = function() {
    const tools = {
        query: s => {
            return document.querySelector(s)
        },
        queryAll: s => {
            return document.querySelectorAll(s)
        },
        addEvent: (element, event, handler) => {
            (element || document).addEventListener(event, handler);
        },
        currentScrollTop: () => {
            return document.scrollingElement.scrollTop
        },
    };
    onload_functions.forEach(f => f(tools));
}