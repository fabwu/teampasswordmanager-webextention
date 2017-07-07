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
        return browser.storage.local.get('auth')
            .then(settings => {
                if (!settings.auth) {
                    showWrongCredentials();
                }

                return fireRequest(settings.auth.baseUrl, settings.auth.username, settings.auth.password)
            }, showWrongCredentials);
    }

    function fireRequest(baseUrl, username, password) {
        let request = new Request(baseUrl + '/index.php/api/v4/' + url + '.json', {
            headers: new Headers({
                'Authorization': 'Basic ' + btoa(username + ':' + password),
                'Content-Type': 'application/json; charset=utf-8'
            })
        });
        return fetch(request).then(handleResponse);
    }

    function handleResponse(response) {
        if (response.ok) {
            return response.json();
        }
        if (response.status === 401) {
            showWrongCredentials();
        }
        throw new Error('Network response was not ok');
    }

    function showWrongCredentials() {
        throw new Error('Wrong credentials');
    }
}