import { fetchData } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.toString().slice(7)
// const symbol = window.location.search.slice(8)
let companyProfileArr = [];
let dateHistory = [];
let priceHistory = [];

async function fetchCompanyProfile() {
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
        companyProfileArr = await response.json();
        console.log(companyProfileArr)
    }
    catch (e) {
        console.log(e);
    }
};

// async function fetchData(URL) {
//     try {
//         const response = await fetch(URL);
//         return await response.json();
//     }
//     catch (e) {
//         console.log(e);
//     }
// };

const mainFunction = async (key) => {
    companyProfileArr = await fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);

    
    console.log(companyProfileArr);
}


async function fetchCompanyHistory() {
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}`);
        const historyArray = await response.json();
        historyArray.historical.forEach(element => {
            dateHistory.push(element.date);
            priceHistory.push(element.close);
        });
    }
    catch (e) {
        console.log(e);
    }

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
    companyProfileArr = await fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
    // await mainFunction()
    // await fetchCompanyProfile();
    await fetchCompanyHistory();
    spinnerDisplay('hide');
    displayData();
    makeChart();
}

init();


