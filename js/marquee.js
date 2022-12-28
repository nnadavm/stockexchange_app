export class Marquee {
    constructor(element) {
        this.element = element;
        this.URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse`
    }

    async fetchData() {
        try {
            const response = await fetch(this.URL);
            this.data = await response.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    async displayMarquee() {
        const marquee = document.createElement('span');
            await this.data.forEach((ele) => {
                const symbol = document.createElement('span');
                symbol.innerText = `${ele.symbol}:`;
                symbol.style.fontWeight = '600';
                symbol.style.paddingRight = '5px';
                marquee.appendChild(symbol);
                const price = document.createElement('span');
                price.innerText = `$${ele.price}`;
                price.style.fontWeight = '600';
                price.style.paddingRight = '5px';
                if (ele.change > 0) {
                    price.style.color = 'green'
                } else if (ele.change < 0) {
                    price.style.color = 'red'
                } if (ele.change === 0) {
                    price.style.color = 'grey'
                }
                marquee.appendChild(price);
            });

        const spanContainer = document.createElement('div');
        spanContainer.style.position = 'absolute';
        spanContainer.style.overflow = 'hidden';

        const keyframes = [
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-100%)' }
        ];

        const options = {
            duration: 400000,
            iterations: Infinity
        };

        spanContainer.animate(keyframes, options);
        spanContainer.appendChild(marquee);

        this.element.style.height = '25px';
        this.element.style.width = '100%';
        this.element.style.overflow = 'hidden';
        this.element.style.position = 'relative';
        this.element.appendChild(spanContainer);
    }

    async load () {
        await this.fetchData();
        this.displayMarquee();
    }
}