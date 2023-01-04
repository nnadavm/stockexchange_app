class Compare {
    constructor(element) {
        this.element = element;
        this.selectedCompanies = [];

        this.renderComparisonBar();
    }

    renderComparisonBar() {
        const container = document.createElement('div');
        container.id = 'compareContainer'
        container.style.height = '45px';
        container.style.backgroundColor = '#EAECEF';
        container.style.padding = '10px'
        container.style.marginBottom = '20px'
        container.style.display = 'flex';
        container.style.justifyContent = 'space-between';
        container.style.alignItems = 'center';
        container.style.borderRadius = '10px';

        const symbolContainer = document.createElement('div');
        symbolContainer.style.width = '100%';
        symbolContainer.style.height = '100%';
        symbolContainer.style.display = 'flex';
        symbolContainer.style.alignItems = 'center';

        const compareButton = document.createElement('button')
        compareButton.innerText = 'Compare';
        compareButton.classList.add("btn", "btn-light");
        compareButton.setAttribute('type', 'button');
        compareButton.style.float = 'right';

        const a = document.createElement('a');
        a.setAttribute('href', `../compare.html?symbols=${this.selectedCompanies}`);
        a.setAttribute('target', "_blank");

        a.appendChild(compareButton)

        container.append(symbolContainer, compareButton);
        this.element.appendChild(container);
        this.container = symbolContainer;

        compareButton.addEventListener('click', () => {
            if (this.selectedCompanies.length < 2) {
                alert('Please choose companies for comparison');
            } else {
            window.open((`../compare.html?symbols=${this.selectedCompanies}`), '_blank');
            }
        })
    }   

    importSelectedCompanies(data) {
        let result = data.map(a => a.symbol);
        this.selectedCompanies = result;
    }
}