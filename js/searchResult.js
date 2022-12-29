class SearchResult {
    constructor(element) {
        this.element = element;
    }

    renderResults(data) {
        this.importData(data);
        if (document.querySelector('ul')) {
            document.querySelector('ul').remove()
        };

        if (document.querySelector('h6')) {
            document.querySelector('h6').remove();
        }

        const noResults = document.createElement('h6');
        noResults.innerText = 'No stocks found';
        noResults.style.display = 'none';
        this.element.appendChild(noResults);
        if (this.dataArray.length === 0) {
            noResults.style.display = 'block';
        }
        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        this.element.appendChild(ul);
        ul.innerHTML = '';


        this.dataArray.forEach((element, i) => {
            const { image, changesPercentage } = this.companyProfilesArray[i].profile;

            const li = document.createElement('li');
            li.classList.add('list-group-item');
            const a = document.createElement('a');
            a.setAttribute("href", `/company.html?symbol=${element.symbol}`);
            a.setAttribute("target", `_blank`);
            a.innerText = element.name + element.symbol;
            this.highlightText(this.searchInputValue, a);
            const imageEle = document.createElement('img')
            imageEle.setAttribute('src', image)
            imageEle.style.width = '30px';
            imageEle.style.marginRight = '30px';
            const symbol = document.createElement('p');
            symbol.style.display = 'inline-block'
            symbol.style.marginLeft = '20px'
            symbol.innerText = `(${element.symbol})`;
            this.highlightText(this.searchInputValue, symbol);
            const change = document.createElement('p');
            change.style.display = 'inline-block'
            change.style.marginLeft = '20px'
            change.innerText = `(${Math.round(changesPercentage * 100) / 100}%))`;
            this.greenOrRed(changesPercentage, change);
            const compareButton = document.createElement('button')
            compareButton.innerText = 'Compare';
            compareButton.classList.add("btn", "btn-primary");
            compareButton.id = i;
            compareButton.setAttribute('type', 'button');
            compareButton.style.float = 'right';
            li.append(imageEle, a, symbol, change, compareButton);
            
            ul.appendChild(li);
        });
        ul.addEventListener('click', (e) => {
            if(e.target.type === 'button')
            console.log(this.dataArray[e.target.id]);
        })
    }

    greenOrRed(value, element) {
        if (value > 0) {
            element.style.color = 'green'
        } else if (value < 0) {
            element.style.color = 'red'
        } if (value === 0) {
            element.style.color = 'grey'
        }

    }

    highlightText(text, element) {
        const elementText = element.innerText.toLowerCase();
        const index = elementText.indexOf(text.toLowerCase());
        if (index >= 0) {
            const span1 = document.createElement('span');
            const span2 = document.createElement('span');
            const span3 = document.createElement('span');
            span2.style.backgroundColor = "yellow";

            span1.innerText = elementText.substring(0, index);
            span2.innerText = elementText.substring(index, index + text.length);
            span3.innerText = elementText.substring(index + text.length);

            element.innerText = '';
            element.append(span1, span2, span3);
        }

    }

    importData(data) {
        this.dataArray = data.dataArray;
        this.companyProfilesArray = data.companyProfilesArray;
        this.searchInputValue = data.searchInputValue;
    }
}