export function apiRequest(method, url, params, onSuccess, onFail) {
    const ErrorCode = function (data) {
        if (data == null) {
            return 0;
        }
        return 'error';
    };

    const success = function (data) {
        const errorCode = ErrorCode(data);

        if (errorCode == null) {
            onSuccess(data);
        } else {
            onFail(errorCode, data);
        }
    };

    const apiError = function (error) {
        console.log(error, 'here')
    };

    const fetchParams = {
        method: method,
        body: params == null ? null : JSON.stringify(params).toString(),
        headers: {
            'Content-Type': params == null ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json;charset=UTF-8'
        },
        credentials: 'include'
    };

    console.log(url, fetchParams, JSON.stringify(params));
    fetch(url, fetchParams).then(function (response) {
        if (response.status < 500) {
            const combine = new Promise(function (resolve) {
                return response.json().then(function (data) {
                    resolve({
                        status: response.status,
                        responseJSON: data
                    });
                });
            });
            return combine;
        }

    }).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response.responseJSON;
        }
        throw error = new Error(response);
    }).then(function (data) {
        success(data);
    }).catch(function (error) {
        apiError(error);
    });
}