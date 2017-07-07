browser.runtime
    .sendMessage({
        type: 'auth'
    })
    .then(showSuccess)
    .catch(showLoginForm);

function showSuccess(r) {
    document.querySelector("#password").value = '';
    document.querySelector('#success').classList.remove('hidden');
    document.querySelector('#login-form').classList.add('hidden');
}

function showLoginForm() {
    document.querySelector('#success').classList.add('hidden');
    document.querySelector('#login-form').classList.remove('hidden');

    document.querySelector("#login").addEventListener('click', login);
}

function login() {
    hideLoginError();

    const url = document.querySelector("#url").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (!username || !password || !url) {
        return showError('All fields are required');
    }

    browser.runtime
        .sendMessage({
            type: 'auth',
            args: {
                username: username,
                password: password,
                url: url,
            }
        })
        .then(saveCredentials)
        .catch(showLoginError);

    function saveCredentials() {
        return browser.storage.local.set({
            auth: {
                baseUrl: url,
                username: username,
                password: password
            }
        }).then(showSuccess);
    }
}

function showLoginError() {
    showError('Incorrect username or password');
}

function showError(message) {
    document.querySelector("#password").value = '';
    let error = document.querySelector('#login-error');
    error.classList.remove('hidden');
    error.innerHTML = message;
}

function hideLoginError() {
    document.querySelector('#login-error').classList.add('hidden');
}