document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    document.querySelectorAll("a[data-file]"). forEach((link) => {
        link.addEventListener("click", () => {
                const file = link.getAttribute("data-file");

                fetch(file)
                    .then((response) => {
                        return response.text();
                    })
                    .then((html) => {
                        content.innerHTML = html;
                        if (file == "pages/climbs.html") {
                            var img = document.getElementById("climbImage");
                            var comments = document.getElementById("betaComments");
                            comments.style.maxHeight = img.height + "px";
                        };
                    });
            });
    });
});

/*
try {
    window.onload = function() {
        var img = document.getElementById("climbImage");
        var comments = document.getElementById("betaComments");
        comments.style.maxHeight = img.height + "px";
    };
    window.onresize = function() {
        var img = document.getElementById("climbImage");
        var comments = document.getElementById("betaComments");
        comments.style.maxHeight = img.height + "px";
    };
} catch(error) {
    console.log("climbs.html not loaded");
};
*/