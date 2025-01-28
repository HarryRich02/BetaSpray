function init() {
    const content = document.getElementById('content');

    // Get all links on page, then add a click event listener to each
    document.querySelectorAll('a[data-file]').forEach((link) => {
        link.addEventListener('click', () => {
            const file = link.getAttribute('data-file');

            fetch(file)
                .then((response) => response.text())
                .then((html) => {
                    content.innerHTML = html;

                    const overview = document.getElementById('overview');
                    const climbs = document.getElementById('climbs');

                    //If the page is climbs.html, resize the text area to match the image
                    if (file === 'pages/climbs.html') {
                        overview.classList = "nav-link px-2 link-body-emphasis";
                        climbs.classList = "nav-link px-2 link-secondary";

                        const imgHeight =
                            document.getElementById('climbImage').clientHeight;
                        const infoHeight =
                            document.getElementById('routeStatic').clientHeight;
                        const comments =
                            document.getElementById('betaComments');
                        comments.style.maxHeight = `${imgHeight - infoHeight}px`;

                    //Make buttons work on new page load
                    } else if (file === 'pages/overview.html') {
                        climbs.classList = "nav-link px-2 link-body-emphasis";
                        overview.classList = "nav-link px-2 link-secondary";

                        init();
                    }
                });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});

/* To use later:
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
*/
