export const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export const setQueryParams = (value) => {
    if (value !== 'undefined') { 
    window.history.replaceState(null, null, `?search=${value}`);
    };

    //----------OTHER METHODS BELOW- ASK IN MENTORING TIME---------

    // const searchParams = new URLSearchParams(window.location.search)
    // searchParams.set("foo", "bar");
    // var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    // history.pushState(null, '', newRelativePathQuery);


    // const searchParams = new URLSearchParams(window.location.search);
    // searchParams.set("foo", "bar");
    // window.location.search = searchParams.toString();
}

export const fetchData = async (URL) => {
    try {
        const response = await fetch(URL);
        return await response.json();
    }
    catch (e) {
        console.log(e);
    }
};
