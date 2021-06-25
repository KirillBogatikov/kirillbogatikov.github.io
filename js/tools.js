const PORTRAIT = "portrait", LANDSCAPE = "landscape";

onload_functions.push((t) => {
    let landscape = getComputedStyle(t.query("#landscape"));
    let portrait = getComputedStyle(t.query("#portrait"));

    if (landscape.getPropertyValue("display") !== "none") {
        window.ORIENTATION = LANDSCAPE;
    } else if (portrait.getPropertyValue("display") !== "none") {
        window.ORIENTATION = PORTRAIT;
    }
})