const usernameFields = document.querySelectorAll("input[name*='username']");
const passwordFields = document.querySelectorAll("input[type='password']");

if (passwordFields.length > 0) {
    browser.runtime
        .sendMessage({
            type: 'search',
            args: {
                url: window.top.location.host
            }
        })
        .then(fillInCredentials);
}

function fillInCredentials(auth) {
    populateFields(usernameFields, auth.username);
    populateFields(passwordFields, auth.password)
}

function populateFields(fields, value) {
    fields.forEach(field => {
        field.value = value;
    })
}
