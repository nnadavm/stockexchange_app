class Compare {
    constructor(element) {
        this.element = element;

        this.renderComparisonBar();
    }

    renderComparisonBar() {
        const container = document.createElement('div');
        container.style.height = '45px';
        container.style.backgroundColor = '#EAECEF';
        container.style.padding = '10px'
        container.style.display = 'flex';
        container.style.justifyContent = 'space-between';
        container.style.alignItems = 'center';

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

        container.append(symbolContainer, compareButton);
        this.element.appendChild(container);
        this.container = symbolContainer;

        compareButton.addEventListener('click', () => {
            this.addCompany();
        })
    }

    addCompany() {
        const symbolButton = document.createElement('button')
        symbolButton.classList.add("btn", "btn-secondary", ".btn-sm");
        symbolButton.innerText = 'goog ';
        symbolButton.setAttribute('type', 'button');
        symbolButton.style.marginRight = '5px';

        const xButton = document.createElement('button');
        xButton.classList.add("btn", "btn-dark");
        xButton.style.padding = '0';
        xButton.innerText = 'x';

        symbolButton.appendChild(xButton);
        this.container.prepend(symbolButton);

        xButton.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })

    }
}