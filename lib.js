function request(url, username, password) {
    if (!username && !password) {
        return useCredentialsFromStorage();
    } else {
        return fireRequest(username, password);
    }

    function useCredentialsFromStorage() {
        return browser.storage.local.get('auth')
            .then(settings => {
                return fireRequest(settings.auth.username, settings.auth.password)
            }, showWrongCredentials);
    }

    function fireRequest(username, password) {
        let request = new Request('http://localhost/teampasswordmanager/index.php/api/v4/' + url + '.json', {
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