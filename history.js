// Search functionality
document.getElementById('search').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
});

// Select All functionality
document.getElementById('select-all').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('.card-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

// Filter cards based on salary
document.getElementById('salaryFilter').addEventListener('change', function () {
    const filterValue = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const salaryText = card.querySelector('.details p:nth-child(3)').textContent;
        const salary = parseInt(salaryText.replace('Salary: ', '').replace(' AED', ''));

        if ((filterValue === 'low' && salary < 1500) ||
            (filterValue === 'high' && salary >= 1500) ||
            filterValue === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});


// Filter and Paginate function
function filterAndPaginateCards(searchQuery, salaryFilter) {
    const cards = Array.from(document.querySelectorAll('.card'));
    let filteredCards = cards.filter(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        const salaryText = card.querySelector('.details p:nth-child(3)').textContent;
        const salary = parseInt(salaryText.replace('Salary: ', '').replace(' AED', ''));

        let matchesSearch = name.includes(searchQuery.toLowerCase());
        let matchesSalary = (salaryFilter === 'low' && salary < 1500) ||
            (salaryFilter === 'high' && salary >= 1500) ||
            salaryFilter === '';

        return matchesSearch && matchesSalary;
    });

    // Paginate the filtered results
    const cardsPerPage = 6;
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    for (let i = 0; i < totalPages; i++) {
        let page = document.getElementById(`page${i + 1}`);
        page.innerHTML = '';
        let pageCards = filteredCards.slice(i * cardsPerPage, (i + 1) * cardsPerPage);
        pageCards.forEach(card => page.appendChild(card));
    }

    // Display only the first page and update pagination buttons
    showPage('page1', totalPages);
}

// Pagination functionality
function showPage(pageId, totalPages) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    const buttons = document.querySelectorAll('.pagination button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.pagination button[onclick="showPage('${pageId}', ${totalPages})"]`).classList.add('active');

    // Adjust pagination buttons based on the total number of pages
    adjustPaginationButtons(totalPages);
}

// Adjust pagination buttons dynamically
function adjustPaginationButtons(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.setAttribute('onclick', `showPage('page${i}', ${totalPages})`);
        if (i === 1) {
            button.classList.add('active');
        }
        paginationContainer.appendChild(button);
    }
}
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

// Initial setup to show the first page
filterAndPaginateCards('', '');