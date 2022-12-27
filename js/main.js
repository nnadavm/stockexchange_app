import { debounce, setQueryParams, loadQueryParams, fetchData, greenOrRed, displayElement } from "./utils.js";
import { searchButton, searchInput, searchSpinner, searchLogo } from "./constants.js";

let dataArray;
let companyProfilesArray;

searchInput.addEventListener('input', () => {
    const searchDebounce = debounce(() => search());
    searchDebounce();
})

searchButton.addEventListener('click', () => {
    search();
})

async function search() {
    if (searchInput.value === '') {
        return
    };

    displayElement(searchLogo, 'none');
    displayElement(searchSpinner, 'inline-block');
    setQueryParams(searchInput.value);
    dataArray = await fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`);
    await saveCompanyProfiles();
    displayResults();
    displayElement(searchSpinner, 'none');
    displayElement(searchLogo, 'inline-block');
}

async function saveCompanyProfiles() {
    const symbolArray = await dataArray.map(a => a.symbol);
    const arr = [];
    for (const symbol of symbolArray) {
        const profile = fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
        arr.push(profile);
    }
    await Promise.all(arr).then((values) => {
        companyProfilesArray = values;
    });
};

function displayResults() {
    if (document.querySelector('ul')) {
        document.querySelector('ul').remove()
    };

    const wrapper = document.querySelector('.wrapper');
    const noResults = document.querySelector('h6');
    noResults.style.display = 'none';
    if (dataArray.length === 0) {
        noResults.style.display = 'block';
    }
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    wrapper.appendChild(ul);
    ul.innerHTML = '';


    dataArray.forEach(function (element, i) {
        const { image, changesPercentage } = companyProfilesArray[i].profile;

        const li = document.createElement('li');
        li.classList.add('list-group-item');
        const a = document.createElement('a');
        a.setAttribute("href", `/company.html?symbol=${element.symbol}`);
        a.setAttribute("target", `_blank`);
        a.innerText = element.name + element.symbol;
        const imageEle = document.createElement('img')
        imageEle.setAttribute('src', image)
        imageEle.style.width = '30px';
        imageEle.style.marginRight = '30px';
        const symbol = document.createElement('p');
        symbol.style.display = 'inline-block'
        symbol.style.marginLeft = '20px'
        symbol.innerText = `(${element.symbol})`;
        const change = document.createElement('p');
        change.style.display = 'inline-block'
        change.style.marginLeft = '20px'
        change.innerText = `(${Math.round(changesPercentage * 100) / 100}%))`;
        greenOrRed(changesPercentage, change);
        li.appendChild(imageEle);
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
        const marquee = document.getElementById('marquee-span');
        await stockListArray.forEach((ele, ) => {
            const symbol = document.createElement('span');
            symbol.innerText = `${ele.symbol}:`;
            symbol.style.fontWeight = '600';
            symbol.style.paddingRight = '5px';
            marquee.appendChild(symbol);
            const price = document.createElement('span');
            price.innerText = `$${ele.price}`;
            price.style.fontWeight = '600';
            price.style.paddingRight = '5px';
            greenOrRed(ele.change, price)
            marquee.appendChild(price);
        });
    }
    catch (e) {
        console.log('error from displayMarquee:', e);
    }
}

function init() {
    displayMarquee();
    loadQueryParams(searchInput, search);
}

init();
