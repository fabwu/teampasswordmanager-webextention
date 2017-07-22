function auth(username, password, baseUrl) {
    return request('generate_password', username, password, baseUrl);
}

function request(url, username, password, baseUrl) {
    if (!username && !password && !baseUrl) {
        return useCredentialsFromStorage();
    } else {
        return fireRequest(baseUrl, username, password);
    }

    function useCredentialsFromStorage() {
        return browser.storage.local.get()
            .then(settings => {
                if (!settings.url || !settings.username || !settings.password) {
                    wrongCredentialsError();
                }

                return fireRequest(settings.url, settings.username, settings.password)
            }, wrongCredentialsError);
    }

    function fireRequest(baseUrl, username, password) {
        baseUrl = removeTrailingSlash(baseUrl);
        let request = new Request(baseUrl + '/index.php/api/v4/' + url + '.json', {
            headers: new Headers({
                'Authorization': 'Basic ' + btoa(username + ':' + password),
                'Content-Type': 'application/json; charset=utf-8'
            })
        });
        return fetch(request).then(handleResponse);
    }

    function removeTrailingSlash(baseUrl) {
        if (baseUrl.substr(-1) === '/') {
            baseUrl = baseUrl.substr(0, baseUrl.length - 1);
        }
        return baseUrl;
    }

    function handleResponse(response) {
        if (response.ok) {
            return response.json();
        }
        if (response.status === 401) {
            wrongCredentialsError();
        }
        throw new Error('Network response was not ok');
    }

    function wrongCredentialsError() {
        throw new Error('Wrong credentials');
    }
}