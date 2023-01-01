import { fetchData, roundDown, displayElement } from "./utils.js";
import { dateHistory, priceHistory, ctx, spinner } from "./constants.js";
import { makeChart } from "./chart.js";

let symbol;
let companyProfileArr;

async function fetchCompanyData() {
    const urlParams = new URLSearchParams(window.location.search);
    symbol = urlParams.get('symbol');
    companyProfileArr = await fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);

}

async function saveCompanyHistory() {
    const historyArray = await fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}`);
    historyArray.historical.forEach(element => {
        dateHistory.push(element.date);
        priceHistory.push(element.close);
    });
};

function displayData() {
    const image = document.querySelector('img')
    image.setAttribute('src', `https://fmpcloud.io/image-stock/${companyProfileArr.symbol}.png`)
    const { companyName, description, price, changes, website, changesPercentage } = companyProfileArr.profile;

    const title = document.querySelector('h1');
    title.innerText = companyName;

    const descEle = document.querySelector('p');
    descEle.innerText = description;

    const priceEle = document.getElementById('price');
    priceEle.innerText = `Stock Price: $${roundDown(price)}`

    const changeEle = document.getElementById('change');
    if (changes > 0) {
        changeEle.style.color = 'green'
    } else if (changes < 0) {
        changeEle.style.color = 'red'
    } if (changes === 0) {
        changeEle.style.color = 'grey'
    }
    changeEle.innerText = `${roundDown(changes)} (${roundDown(changesPercentage)}%))`;
    const a = document.getElementById('company-website');
    a.setAttribute("href", website);
}

async function init() {
    await fetchCompanyData();
    await saveCompanyHistory();
    displayElement(spinner, 'hide')
    displayData();
    makeChart(ctx, dateHistory, priceHistory);
}

init();


