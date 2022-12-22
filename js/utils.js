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

export const loadQueryParams = (target, callback) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('search') !== '') {
        target.value = urlParams.get('search');
        callback();
    }
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

export const roundDown = (value) => {
    return (Math.round(value * 100) / 100)
}

export const greenOrRed = (value, element) => {
    if (value > 0) {
        element.style.color = 'green'
    } else if (value < 0) {
        element.style.color = 'red'
    } if (value === 0) {
        element.style.color = 'grey'
    }

}

export const displayElement = (element, displayState) => {
    element.style.display = displayState;
}
