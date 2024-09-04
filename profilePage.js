// Load the navbar
document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbar-container');

    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;

            // Highlight the current page in the navbar
            const currentPage = document.body.getAttribute('data-page');
            const links = navbarContainer.querySelectorAll('.navbar a');
            links.forEach(link => {
                if (link.getAttribute('data-page') == currentPage) {
                    link.classList.add('active');
                }
            });
        });
});