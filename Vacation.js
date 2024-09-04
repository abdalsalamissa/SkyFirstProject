document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const salaryFilter = document.getElementById('salaryFilter');
    const selectAllCheckbox = document.getElementById('selectAll');
    const cards = document.querySelectorAll('.card');

    // Filter cards based on search input
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase();
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchText)) {
                card.style.display = 'inline-block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Filter cards based on salary
    salaryFilter.addEventListener('change', function() {
        const filterValue = salaryFilter.value;
        cards.forEach(card => {
            const salaryText = card.querySelector('p:nth-child(5)').textContent;
            const salary = parseInt(salaryText.replace('Salary: ', '').replace(' AED', ''));

            if ((filterValue === 'low' && salary < 1500) || 
                (filterValue === 'high' && salary >= 1500) || 
                filterValue === '') {
                card.style.display = 'inline-block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Add individual checkboxes to each card
    cards.forEach(card => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('cardCheckbox');
        card.insertBefore(checkbox, card.firstChild);
    });

    // Select or deselect all cards based on "Select All" checkbox
    selectAllCheckbox.addEventListener('change', function() {
        const cardCheckboxes = document.querySelectorAll('.cardCheckbox');
        cardCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });
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