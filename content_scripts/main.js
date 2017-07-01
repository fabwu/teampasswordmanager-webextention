const url = window.top.location.host;

request('passwords/search/access:' + encodeURIComponent(url))
    .then(loadPasswordDetails)
    .catch(handleError);

function loadPasswordDetails(passwords) {
    passwords.forEach(password => {
        request('passwords/' + password.id).then(passwordDetail => {
            console.log(passwordDetail)
        })
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