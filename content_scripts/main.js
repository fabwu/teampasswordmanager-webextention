const usernameFields = document.querySelectorAll("input[name*='username']");
const passwordFields = document.querySelectorAll("input[type='password']");
const url = window.top.location.host;

if (passwordFields.length > 0) {
    request('passwords/search/access:' + encodeURIComponent(url))
        .then(loadPasswordDetails)
        .catch(handleError);
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
    let request = new Request('http://localhost/teampasswordmanager/index.php/api/v4/' + url + '.json', {
        headers: new Headers({
            'Authorization': 'Basic ' + btoa('fabian:password'),
            'Content-Type': 'application/json; charset=utf-8'
        })
    });
    return fetch(request).then(response => response.json());
}