class SearchForm {
    constructor(element) {
        this.element = element;

        this.renderForm();
        this.addListeners();
        this.loadQueryParams();
    }

    renderForm() {
        const searchSpinner = document.createElement('div');
        searchSpinner.classList.add("spinner-border", "spinner-border-sm");
        searchSpinner.id = "search-spinner";
        const i = document.createElement('i');
        i.classList.add("fas", "fa-search");
        i.id = "search-logo";
        const span = document.createElement('span');
        span.classList.add("input-group-text", "border-0");
        span.id = "search-spinner";
        span.append(searchSpinner, i);

        const input = document.createElement('input');
        input.classList.add("form-control", "rounded");
        input.setAttribute("type", "search");
        input.setAttribute("placeholder", "Search for company stock symbol");
        input.id = "search-input";
        const containerDiv = document.createElement('div');
        containerDiv.classList.add("input-group", "rounded");
        containerDiv.append(input, span);

        const topDiv = document.createElement('div');
        topDiv.id = "search-container";
        topDiv.append(containerDiv);

        const h6 = document.createElement('h6');
        h6.innerText = 'No stocks found';
        const h6Div = document.createElement('div');
        h6Div.appendChild(h6);

        this.element.append(topDiv, h6Div);

        this.searchButton = span;
        this.searchInput = input;
        this.searchSpinner = searchSpinner;
        this.searchLogo = i;
    }

    addListeners() {
        const searchDebounce = this.debounce(this.search, 700);

        this.searchInput.addEventListener('input', () => {
            searchDebounce();
        })

        this.searchButton.addEventListener('click', () => {
            this.search();
        })

    }

    async search() {
        if (this.searchInput.value === '') {
            return
        };

        this.displayElement(this.searchLogo, 'none');
        this.displayElement(this.searchSpinner, 'inline-block');
        this.setQueryParams(this.searchInput.value);
        this.dataArray = await this.fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchInput.value}&limit=10&exchange=NASDAQ`);
        await this.saveCompanyProfiles();
        this.exportData();
        this.displayElement(this.searchSpinner, 'none');
        this.displayElement(this.searchLogo, 'inline-block');
        await this.renderResults();
    }

    async saveCompanyProfiles() {
        const arr = [];
        for (const ele of this.dataArray) {
            const profile = this.fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${ele.symbol}`);
            arr.push(profile);
        }
        await Promise.all(arr).then((values) => {
            this.companyProfilesArray = values;
        });
    };

    renderResults() {
        console.error('SearchResult class not defined');
    }

    onSearch(callback) {
        this.renderResults = callback;
    }

    displayElement(element, displayState) {
        element.style.display = displayState;
    }

    setQueryParams(value) {
        if (value !== 'undefined') {
            window.history.replaceState(null, null, `?search=${value}`);
        };
    }

    async fetchData(URL) {
        try {
            const response = await fetch(URL);
            return await response.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    debounce(func, timeout = 500) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    loadQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('search') !== null) {
            this.searchInput.value = urlParams.get('search');
            this.search();
        }
    }

    exportData() {
        this.data = {
            dataArray: this.dataArray,
            companyProfilesArray: this.companyProfilesArray,
            searchInputValue: this.searchInput.value
        }


        // this.data = [];
        // this.data.push(this.dataArray, this.companyProfilesArray, this.searchInput.value);
    }

}