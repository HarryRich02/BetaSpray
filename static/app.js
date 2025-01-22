document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    const climbsNav = document.getElementById("climbsNav");

    fetch("pages/overview.html")
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("content").innerHTML = html;
        })
});