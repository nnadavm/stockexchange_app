export class Marquee {
    constructor(URL) {
        this.URL = URL
    }

    async fetchData() {
        try {
            const response = await fetch(this.URL);
            const stockListArray = await response.json();

            const newArray = [];
            await stockListArray.forEach((e) => {
                newArray.push(e.symbol, e.price)
            });
            this.data = newArray;
        }
        catch (e) {
            console.log(e);
        }
    }

    async displayMarquee(element, data) {
        const marquee = document.createElement('span');

        data.forEach((e, i) => {
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

        element.style.height = '25px';
        element.style.width = '100%';
        element.style.overflow = 'hidden';
        element.style.position = 'relative';
        element.appendChild(spanContainer);

    }

}