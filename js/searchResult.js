class SearchResult {
    constructor(element) {
        this.element = element;
    }
    
    renderResults(data, profiles) {
        this.dataArray = data;
        this.companyProfilesArray = profiles;
        if (document.querySelector('ul')) {
            document.querySelector('ul').remove()
        };
    
        const noResults = document.createElement('h6');
        noResults.innerText = 'No stocks found';
        noResults.style.display = 'none';
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
            this.greenOrRed(changesPercentage, change);
            li.appendChild(imageEle);
            li.appendChild(a);
            li.appendChild(symbol);
            li.appendChild(change);
            ul.appendChild(li);
    
        });
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
}