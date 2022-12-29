class SearchForm {
    constructor(element) {
        this.element = element;
        this.renderForm();
        this.addListeners();
        // this.loadQueryParams('goog', this.search);
    }

    renderForm() {
        this.element.innerHTML = `
        <div id="search-container">
            <div class="input-group rounded">
                <input type="search" class="form-control rounded" id="search-input" placeholder="Search" />
                <span class="input-group-text border-0" id="search-addon">
                    <div class="spinner-border spinner-border-sm" id="search-spinner"></div>
                    <i class="fas fa-search" id="search-logo"></i>
                </span>
            </div>
        </div>
        <div>
            <h6>No stocks found</h6>
        </div>
        `;

        this.searchButton = document.getElementById('search-addon');
        this.searchInput = document.getElementById('search-input');
        this.searchSpinner = document.getElementById('search-spinner');
        this.searchLogo = document.getElementById('search-logo');
    }

    addListeners() {
        this.searchInput.addEventListener('input', () => {
            const searchDebounce = this.debounce(() => this.search());
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
        // displayResults();
        this.displayElement(this.searchSpinner, 'none');
        this.displayElement(this.searchLogo, 'inline-block');
        this.renderResults();
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

    onSearch(callback){
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
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    // loadQueryParams(target, callback) {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     if (urlParams.get('search') !== '') {
    //         target = urlParams.get('search');
    //         callback();
    //     }
    // }

}