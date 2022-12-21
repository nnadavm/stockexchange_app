const searchButton = document.getElementById('search-addon');
const searchInput = document.getElementById('search-input');
let dataArray = [];
let percentChangeArray = [];

searchInput.addEventListener('input', () => {
    const searchDebounce = debounce(() => search());
    searchDebounce();
})

searchButton.addEventListener('click', () => {
    search();
})

function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

async function search() {
    spinnerDisplay();
    setQueryParams();
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

async function displayMarquee() {
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse`);
        const stockListArray = await response.json();
        let newArray = [];
        await stockListArray.forEach((e) => {
            newArray.push(e.symbol, e.price)
        });

        const marquee = document.getElementById('marquee-span');
        newArray.forEach((e, i) => {
            if (i % 2 === 0) {
                const symbol = document.createElement('span');
                symbol.innerText = `${e}:`;
                symbol.style.fontWeight = '600';
                symbol.style.paddingRight = '5px';
                marquee.appendChild(symbol);
            } else {
                const price = document.createElement('span');
                price.innerText = `$${e}`;
                price.style.fontWeight = '600';
                price.style.paddingRight = '5px';
                price.style.color = 'green';
                marquee.appendChild(price);
            }
        })
    }
    catch (e) {
        console.log(e);
    }
}

function setQueryParams() {
    window.history.replaceState(null, null, `?search=${searchInput.value}`);

    //----------OTHER METHODS BELOW- ASK IN MENTORING TIME---------

    // const searchParams = new URLSearchParams(window.location.search)
    // searchParams.set("foo", "bar");
    // var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    // history.pushState(null, '', newRelativePathQuery);


    // const searchParams = new URLSearchParams(window.location.search);
    // searchParams.set("foo", "bar");
    // window.location.search = searchParams.toString();
}

function loadQueryParams() {
    if(window.location.search !== '') {
        searchInput.value = window.location.search.slice(8);
        search();
    }
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

function init() {
    displayMarquee();
    loadQueryParams();
}

init();
