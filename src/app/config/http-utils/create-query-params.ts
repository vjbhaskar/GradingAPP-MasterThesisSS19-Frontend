export const createRequestParams = (obj?: any) => {
    let queryParams = {};
    if (obj) {
        Object.keys(obj).forEach(function (key) {
            if (!obj[key]) {
                // Do nothing
            } else {
                queryParams[key] = obj[key];
            }
        });
    }
    return queryParams
}