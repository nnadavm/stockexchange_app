export class Marquee {

    static async fetchData() {
        try {
            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse`);
            const stockListArray = await response.json();

            const newArray = [];
            await stockListArray.forEach((e) => {
                newArray.push(e.symbol, e.price)
            });
            // console.log(newArray);
            this.data = newArray;
        }
        catch (e) {
            console.log(e);
        }
    }

    static async displayMarquee(element) {
        try {
            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse`);
            const stockListArray = await response.json();

            const newArray = [];
            await stockListArray.forEach((e) => {
                newArray.push(e.symbol, e.price)
            });

            const marquee = document.createElement('span');

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
        catch (e) {
            console.log(e);
        }
    }

}