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
    passwordFields.forEach(passwordField => {
        passwordField.value = auth.password;

        const usernameField = passwordField.form.querySelector("input[type='text']");
        usernameField.value = auth.username;
    })
}
