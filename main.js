const searchButton = document.getElementById('search-addon');
const searchInput = document.getElementById('search-input');
let dataArray = [];
let companyProfileArr = [];
let changeArray = [];
let priceArray = [];

searchButton.addEventListener('click', () => {
    searchResults();
})

async function searchResults() {
    spinnerDisplay();
    await fetchSearchResults(searchInput.value, 10);
    await makePriceArray();
    await fetchChange();
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

async function fetchPrice(symbol) {
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote-short/${symbol}`);
        const price = await response.json();
        console.log(price);
        priceArray.push(price[0].price);
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
        console.log(changeArray[i]['1D']);
        const percent = (priceArray[i] / 100) * changeArray[i]['1D'];
        // changeEle.innerText = `${changes} (${Math.round(percent * 100) / 100}%))`;
        change.innerText = `(${Math.round(percent * 100) / 100}%))`;
        // greenOrRed(companyProfileArr[i].change, change);
        li.appendChild(image);
        li.appendChild(a);
        li.appendChild(symbol);
        li.appendChild(change);
        ul.appendChild(li);
    });
}

async function fetchChange() {
    const symbolArray = dataArray.map(a => a.symbol);
    const symbolString = symbolArray.toString();
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-price-change/${symbolString}`);
        changeArray = await response.json();
    }
    catch (e) {
        console.log(e);
    }
};

async function makePriceArray() {
    const symbolArray = dataArray.map(a => a.symbol);
    await fetchPrice(symbolArray[0]);
    await fetchPrice(symbolArray[1]);
    await fetchPrice(symbolArray[2]);
    await fetchPrice(symbolArray[3]);
    await fetchPrice(symbolArray[4]);
    await fetchPrice(symbolArray[5]);
    await fetchPrice(symbolArray[6]);
    await fetchPrice(symbolArray[7]);
    await fetchPrice(symbolArray[8]);
    await fetchPrice(symbolArray[9]);
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
