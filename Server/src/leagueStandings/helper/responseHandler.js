
exports.responseHandler = ( response, league, queryName ) => {

    if (response.status === 200) {
        if (response.data.response.length > 0) {
            return {
                success: true,
                msj: `League ${league} ${queryName} in 2022`,
                content: response.data.response
            };
        } else {
            return {
                success: false,
                msj: response.data,
                content: []
            };
        }
    };

    if (response.status === 204) {
        return {
            success: false,
            msj: response.data.errors,
            content: []
        };
    };

    if (response.status === 499 || response.status === 500) {
        return {
            success: false,
            msj: response.message,
            content: []
        };
    } else {
        return {
            success: false,
            msj: `Something went wrong fetching ${queryName} data`,
            content: []
        };
    };
}