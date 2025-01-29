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

                    // If the page is climbs.html, resize the text area to match the image
                    if (file === 'pages/climbs.html') {
                        overview.classList = 'nav-link px-2 link-body-emphasis';
                        climbs.classList = 'nav-link px-2 link-secondary';

                        loadClimb(0);

                        const imgHeight =
                            document.getElementById('climbImage').clientHeight;
                        const infoHeight =
                            document.getElementById('routeStatic').clientHeight;
                        const comments =
                            document.getElementById('betaComments');
                        comments.style.maxHeight = `${imgHeight - infoHeight}px`;

                        // Make buttons work on new page load
                    } else if (file === 'pages/overview.html') {
                        climbs.classList = 'nav-link px-2 link-body-emphasis';
                        overview.classList = 'nav-link px-2 link-secondary';

                        init();
                    }
                });
        });
    });
};

async function loadClimb(i){
    const climbName = document.getElementById("climbName");
    const climbDiff = document.getElementById("climbDiff");
    const betaComments = document.getElementById("betaComments");
    const climbImage = document.getElementById("climbImage");

    betaComments.innerHTML = "";

    let climb_resp = await fetch(`api/climb/get?i=${i}`);
    let new_climb = await climb_resp.json();
    console.log(encodeURIComponent(new_climb.name));
    let comment_resp = await fetch(`api/comment/get?climb=${encodeURIComponent(new_climb.name)}`);
    let new_comments = await comment_resp.json();

    climbName.innerHTML = new_climb.name;
    climbDiff.innerHTML = new_climb.difficulty;
    climbImage.src = new_climb.imgURL;

    for (let comment of new_comments){
        betaComments.innerHTML += `${comment} <br />`;
    };
};

document.addEventListener('DOMContentLoaded', () => {
    init();
});

const addClimb = document.getElementById("addClimb");
addClimb.addEventListener("submit", async function(event){
    event.preventDefault();
    const formData = new FormData(addClimb);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log("Form data", formJSON);
    const response = await fetch("/api/climb/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formJSON
    });
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
