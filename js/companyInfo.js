class CompanyInfo {
    constructor(element, symbol) {
        this.element = element;
        this.symbol = symbol;
        this.dateHistory = [];
        this.priceHistory = [];
    }

    async load() {
        this.makeSpinner(this.element);
        this.companyProfileArr = await this.fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.symbol}`);
        await this.saveCompanyHistory();
        await this.displayData();
        this.displayElement(document.getElementById('spinner'), 'none')
        this.makeChart(this.element, this.dateHistory, this.priceHistory);
    }

    async fetchData(URL) {
        try {
            const response = await fetch(URL);
            return await response.json();
        }
        catch (e) {
            console.log(e);
        }
    };

    async saveCompanyHistory() {
        const historyArray = await this.fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.symbol}`);
        historyArray.historical.forEach(element => {
            this.dateHistory.push(element.date);
            this.priceHistory.push(element.close);
        });
    };

    displayData() {
        const p = document.createElement('p');
        p.classList.add('card-text');

        const h4price = document.createElement('h4');
        const h4change = document.createElement('h4');
        h4price.id = 'price';
        h4change.id = 'change';
        const h4Div = document.createElement('div');
        h4Div.id = 'stock-price';
        h4Div.append(h4price, h4change);

        const image = document.createElement('img');
        image.classList.add('card-img-top');
        const a = document.createElement('a');
        a.id = "company-website";
        const h1 = document.createElement('h1');
        h1.classList.add('card-title');
        const headerDiv = document.createElement('div');
        headerDiv.id = 'header';
        a.appendChild(h1);
        headerDiv.append(image, a);

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');
        cardBodyDiv.append(headerDiv, h4Div, p)

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.appendChild(cardBodyDiv);

        this.element.appendChild(cardDiv);

        image.setAttribute('src', this.companyProfileArr.profile.image)
        const { companyName, description, price, changes, website, changesPercentage } = this.companyProfileArr.profile;

        h1.innerText = companyName;

        p.innerText = description;

        h4price.innerText = `Stock Price: $${this.roundDown(price)}`

        if (changes > 0) {
            h4change.style.color = 'green'
        } else if (changes < 0) {
            h4change.style.color = 'red'
        } if (changes === 0) {
            h4change.style.color = 'grey'
        }
        h4change.innerText = `${this.roundDown(changes)} (${this.roundDown(changesPercentage)}%))`;
        a.setAttribute("href", website);
    }

    roundDown(value) {
        return (Math.round(value * 100) / 100)
    }

    displayElement(element, displayState) {
        element.style.display = displayState;
    }

    makeChart(targetElement, lables, data) {
        const canvas = document.createElement('canvas');
        const canvasDiv = document.createElement('div');
        canvasDiv.appendChild(canvas);
        targetElement.appendChild(canvasDiv);

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: lables,
                datasets: [{
                    label: 'Closing price at date',
                    data: data,
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

    makeSpinner(targetElement) {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner-border');
        spinner.id = 'spinner';

        targetElement.appendChild(spinner);
    }

}
