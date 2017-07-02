const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

document.querySelector("#login").addEventListener('click', login);

function login() {
    // Icon is grey
    // Check if auth is successful
    // When successful light up icon and show success popup with logout button
    // When not successful grey out icon and show login form

    hideLoginError();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        return showLoginError();
    }

    return request('passwords', username, password)
        .then(saveCredentials)
        .catch(showLoginError);

    function saveCredentials() {
        return browser.storage.local.set({
            auth: {
                username: usernameInput.value,
                password: passwordInput.value
            }
        }).then(showSuccess);
    }
}

function showSuccess() {
    passwordInput.value = '';
    document.querySelector('#success').classList.remove('hidden');
    document.querySelector('#login-form').classList.add('hidden');
}

function showLoginError() {
    passwordInput.value = '';
    document.querySelector('#login-error').classList.remove('hidden');
}

function hideLoginError() {
    document.querySelector('#login-error').classList.add('hidden');
}