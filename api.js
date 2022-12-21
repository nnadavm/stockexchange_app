export const fetchData = async (URL) => {
    try {
        const response = await fetch(URL);
        return await response.json();
    }
    catch (e) {
        console.log(e);
    }
};