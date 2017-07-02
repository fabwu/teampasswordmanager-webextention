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
