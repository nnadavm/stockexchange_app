import { fetchData, } from "./utils.js";

const symbol = window.location.search.slice(8)
let companyProfileArr = await fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
let dateHistory = [];
let priceHistory = [];

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
    const { companyName, description, price, changes, website } = companyProfileArr.profile;

    const title = document.querySelector('h1');
    title.innerText = companyName;

    const descEle = document.querySelector('p');
    descEle.innerText = description;

    const priceEle = document.getElementById('price');
    priceEle.innerText = `Stock Price: $${price}`

    const changeEle = document.getElementById('change');
    if (changes > 0) {
        changeEle.style.color = 'green'
    } else if (changes < 0) {
        changeEle.style.color = 'red'
    } if (changes === 0) {
        changeEle.style.color = 'grey'
    }
    const percent = (price / 100) * changes;
    changeEle.innerText = `${changes} (${Math.round(percent * 100) / 100}%))`;
    const a = document.getElementById('company-website');
    a.setAttribute("href", website);
}

function makeChart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateHistory,
            datasets: [{
                label: 'Closing price at date',
                data: priceHistory,
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }

        }
    });
}

function spinnerDisplay() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
};

async function init() {
    await saveCompanyHistory();
    spinnerDisplay('hide');
    displayData();
    makeChart();
}

init();


