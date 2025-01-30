/* global bootstrap */

document.addEventListener('DOMContentLoaded', () => {
    init(climbIndex);

    const addClimb = document.getElementById('addClimb');
    addClimb.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(addClimb);
        const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log('Form data', formJSON);
        await fetch('/api/climb/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formJSON,
        });

        const modalElement = document.getElementById('modalAddClimb');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    });
});

async function loadClimb(i) {
    const climbName = document.getElementById('climbName');
    const climbDiff = document.getElementById('climbDiff');
    const betaComments = document.getElementById('betaComments');
    const climbImage = document.getElementById('climbImage');

    const climbResp = await fetch(`api/climb/get?i=${i}`);
    if (!climbResp.ok) {
        console.error('Failed to fetch climb:', climbResp.statusText);
        return;
    }
    const newClimb = await climbResp.json();

    const commentResp = await fetch(
        `api/comment/get?climb=${encodeURIComponent(newClimb.name)}`,
    );
    if (!commentResp.ok) {
        console.error('Failed to fetch comments:', commentResp.statusText);
        return;
    }
    const newComments = await commentResp.json();

    climbName.innerHTML = newClimb.name;
    climbDiff.innerHTML = newClimb.difficulty;
    climbImage.src = newClimb.imgURL;
    betaComments.innerHTML = '';
    for (const comment of newComments) {
        betaComments.innerHTML += `
        <a class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <img src="img/user.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0">
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <p class="mb-0 opacity-75">${comment}</p>
                </div>
            </div>
        </a>
        `;
    }

    climbImage.addEventListener('load', () => {
        const imgHeight = climbImage.clientHeight;
        const infoHeight = document.getElementById('routeStatic').clientHeight;
        betaComments.style.maxHeight = `${imgHeight - infoHeight}px`;
    });

    const addComment = document.getElementById('addComment');
    const newAddComment = addComment.cloneNode(true);
    addComment.parentNode.replaceChild(newAddComment, addComment);

    newAddComment.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(newAddComment);
        const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log('Form data', formJSON);
        await fetch(
            `/api/comment/add?climb=${encodeURIComponent(newClimb.name)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formJSON,
            },
        );

        await loadComments(newClimb.name);
    });
}

async function loadComments(climbName) {
    const betaComments = document.getElementById('betaComments');
    const commentResp = await fetch(
        `api/comment/get?climb=${encodeURIComponent(climbName)}`,
    );
    if (!commentResp.ok) {
        console.error('Failed to fetch comments:', commentResp.statusText);
        return;
    }
    const newComments = await commentResp.json();

    betaComments.innerHTML = '';
    for (const comment of newComments) {
        betaComments.innerHTML += `
        <a class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <img src="img/user.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0">
            <div class="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <p class="mb-0 opacity-75">${comment}</p>
                </div>
            </div>
        </a>
        `;
    }
}

function init(climbIndex) {
    const content = document.getElementById('content');

    document.querySelectorAll('a[data-file]').forEach((link) => {
        link.addEventListener('click', () => {
            const file = link.getAttribute('data-file');

            fetch(file)
                .then((response) => response.text())
                .then((html) => {
                    content.innerHTML = html;

                    const overview = document.getElementById('overview');
                    const climbs = document.getElementById('climbs');

                    if (file === 'pages/climbs.html') {
                        overview.classList = 'nav-link px-2 link-body-emphasis';
                        climbs.classList = 'nav-link px-2 link-secondary';

                        const prev = document.getElementById('prev');
                        const next = document.getElementById('next');

                        prev.disabled = true;
                        prev.addEventListener('click', async () => {
                            climbIndex -= 1;
                            await loadClimb(climbIndex);
                            if (climbIndex === 0) {
                                prev.disabled = true;
                            }
                            next.disabled = false;
                        });
                        next.addEventListener('click', async () => {
                            climbIndex += 1;
                            await loadClimb(climbIndex);
                            const lenResp = await fetch('api/climb/length');
                            const length = parseInt(await lenResp.text(), 10);
                            if (climbIndex === length - 1) {
                                next.disabled = true;
                            }
                            prev.disabled = false;
                        });

                        loadClimb(climbIndex);

                        const imgHeight =
                            document.getElementById('climbImage').clientHeight;
                        const infoHeight =
                            document.getElementById('routeStatic').clientHeight;
                        const comments =
                            document.getElementById('betaComments');
                        comments.style.maxHeight = `${imgHeight - infoHeight}px`;
                    } else if (file === 'pages/overview.html') {
                        climbs.classList = 'nav-link px-2 link-body-emphasis';
                        overview.classList = 'nav-link px-2 link-secondary';

                        init();
                    }
                });
        });
    });
}

let climbIndex = 0;

window.onload = () => {
    init(climbIndex);
};
window.onresize = () => {
    const imgHeight = document.getElementById('climbImage').clientHeight;
    const infoHeight = document.getElementById('routeStatic').clientHeight;
    const comments = document.getElementById('betaComments');
    comments.style.maxHeight = `${imgHeight - infoHeight}px`;
};
