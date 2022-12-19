const searchButton = document.getElementById('search-addon');
const searchInput = document.getElementById('search-input');
let dataArray = [];
let percentChangeArray = [];

searchButton.addEventListener('click', () => {
    getSearchResults();
})

async function getSearchResults() {
    spinnerDisplay();
    await fetchSearchResults(searchInput.value, 10);
    await fetchPercentChange();
    displayResults();
    spinnerDisplay('hide');
}

async function fetchSearchResults(value, limit) {
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${value}&limit=${limit}&exchange=NASDAQ`);
        dataArray = await response.json();
    }
    catch (e) {
        console.log(e);
    }
};

async function fetchPercentChange() {
    const symbolArray = dataArray.map(a => a.symbol);
    const symbolString = symbolArray.toString();
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-price-change/${symbolString}`);
        percentChangeArray = await response.json();
    }
    catch (e) {
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


    dataArray.forEach(function (element, i) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        const a = document.createElement('a');
        a.setAttribute("href", `/company.html?symbol=${element.symbol}`);
        a.setAttribute("target", `_blank`);
        a.innerText = element.name + element.symbol;
        const image = document.createElement('img')
        image.setAttribute('src', `https://fmpcloud.io/image-stock/${element.symbol}.png`)
        image.style.width = '30px';
        image.style.marginRight = '30px';
        const symbol = document.createElement('p');
        symbol.style.display = 'inline-block'
        symbol.style.marginLeft = '20px'
        symbol.innerText = `(${element.symbol})`;
        const change = document.createElement('p');
        change.style.display = 'inline-block'
        change.style.marginLeft = '20px'
        change.innerText = `(${percentChangeArray[i]['1D']}%))`;
        greenOrRed(percentChangeArray[i]['1D'], change);
        li.appendChild(image);
        li.appendChild(a);
        li.appendChild(symbol);
        li.appendChild(change);
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

function greenOrRed(value, element) {
    if (value > 0) {
        element.style.color = 'green'
    } else if (value < 0) {
        element.style.color = 'red'
    } if (value === 0) {
        element.style.color = 'grey'
    }

}
