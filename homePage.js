// Image Slider JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.news-card img');
    const dots = document.querySelectorAll('.dots label');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].style.backgroundColor = '#d9534f';
        });
        slides[index].classList.add('active');
        dots[index].style.backgroundColor = '#c9302c';
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    let slideInterval = setInterval(nextSlide, 10000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            currentIndex = index;
            slideInterval = setInterval(nextSlide, 10000);
        });
    });

    showSlide(currentIndex);
});
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
//search bar
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.requests-card .header input');
    const requestItems = document.querySelectorAll('.requests-card .request-list .card');

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        requestItems.forEach(item => {
            const name = item.querySelector('h2').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});