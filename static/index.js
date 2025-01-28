function init() {
    const content = document.getElementById('content');

    document.querySelectorAll('a[data-file]').forEach((link) => {
        link.addEventListener('click', () => {
            const file = link.getAttribute('data-file');

            fetch(file)
                .then((response) => response.text())
                .then((html) => {
                    content.innerHTML = html;
                    if (file === 'pages/climbs.html') {
                        const imgHeight =
                            document.getElementById('climbImage').clientHeight;
                        const infoHeight =
                            document.getElementById('routeStatic').clientHeight;
                        const comments =
                            document.getElementById('betaComments');
                        comments.style.maxHeight = `${imgHeight - infoHeight}px`;
                    } else if (file === 'pages/overview.html') {
                        init();
                    }
                });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();

    const addClimbModal = new bootstrap.Modal(document.getElementById('modalAddClimb'));
    addClimbModal.hide();

    const newClimbButton = document.getElementById('newClimb')
    newClimbButton.addEventListener('click', () => {
        addClimbModal.show()
    });
});

/*
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
