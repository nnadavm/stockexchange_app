const searchButton = document.getElementById('search-addon');
const searchInput = document.getElementById('search-input');
let dataArray = [];
let companyProfileArr = [];

searchButton.addEventListener('click', () => {
    fetchSearchResults(searchInput.value, 10);
})


async function fetchSearchResults(value, limit) {
    try {
        spinnerDisplay();
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${value}&limit=${limit}&exchange=NASDAQ`);
        dataArray = await response.json();
        displayResults();
        spinnerDisplay('hide');
    }
    catch (e) {
        // spinnerDisplay('hide');
        console.log(e);
    }
};

function displayResults() {
    if (document.querySelector('ul')) {
        document.querySelector('ul').remove()
    };


    const wrapper = document.querySelector('.wrapper');
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    wrapper.appendChild(ul);
    ul.innerHTML = '';

    dataArray.forEach(element => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        const a = document.createElement('a');
        a.setAttribute("href", `/company.html?symbol=${element.symbol}`);
        a.setAttribute("target", `_blank`);
        a.innerText = element.name + element.symbol;
        li.appendChild(a);
        ul.appendChild(li);
    });
}

function spinnerDisplay(command) {
    const searchSpinner = document.getElementById('search-spinner');
    const searchLogo = document.getElementById('search-logo');

    if (command === 'hide') {
        searchSpinner.style.display = 'none';
        searchLogo.style.display = 'inline-block';
    } else {
        searchLogo.style.display = 'none';
        searchSpinner.style.display = 'inline-block';
    }
};
