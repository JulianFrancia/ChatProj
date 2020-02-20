export const getSearchParam = (url, param) => {
    const searchParams = new URLSearchParams(url);
    return {
        param: searchParams.get(param) || '',
    };
}

export const setSearchParam = ({ paramName = '', paramValue = "" }) => {
    const searchParams = new URLSearchParams();
    searchParams.set(paramName, paramValue);
    return searchParams.toString();
}