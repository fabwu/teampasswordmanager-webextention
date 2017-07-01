const usernameFields = document.querySelectorAll("input[name*='username']");
const passwordFields = document.querySelectorAll("input[type='password']");
const url = window.top.location.host;

if (passwordFields.length > 0) {
    request('passwords/search/access:' + encodeURIComponent(url)).then(loadPasswordDetails);
}

function loadPasswordDetails(passwords) {
    passwords.forEach(password => {
        request('passwords/' + password.id).then(passwordDetail => {
            populateFields(usernameFields, passwordDetail.username);
            populateFields(passwordFields, passwordDetail.password)
        })
    })
}

function populateFields(fields, value) {
    fields.forEach(field => {
        field.value = value;
    })
}

function handleError(e) {
    console.log(e)
}

function request(url) {
    return browser.storage.local.get('auth').then(fireRequest, showWrongCredentials);

    function fireRequest(settings) {
        let request = new Request('http://localhost/teampasswordmanager/index.php/api/v4/' + url + '.json', {
            headers: new Headers({
                'Authorization': 'Basic ' + btoa(settings.auth.username + ':' + settings.auth.password),
                'Content-Type': 'application/json; charset=utf-8'
            })
        });
        return fetch(request)
            .then(handleResponse)
            .catch(handleError);
    }

    function handleResponse(response) {
        if (response.ok) {
            return response.json();
        }
        if (response.status === 401) {
            showWrongCredentials();
            throw new Error('Wrong credentials');
        }
        throw new Error('Network response was not ok');
    }

    function showWrongCredentials() {
        alert('Wrong Credentials')
    }
}
