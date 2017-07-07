const urlInput = document.querySelector("#url");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

document.querySelector("#login").addEventListener('click', login);

function login() {
    hideLoginError();

    const url = urlInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password || !url) {
        return showError('All fields are required');
    }

    return request('passwords', username, password, url)
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

function showSuccess() {
    passwordInput.value = '';
    document.querySelector('#success').classList.remove('hidden');
    document.querySelector('#login-form').classList.add('hidden');
}

function showLoginError() {
    showError('Incorrect username or password');
}

function showError(message) {
    passwordInput.value = '';
    let error = document.querySelector('#login-error');
    error.classList.remove('hidden');
    error.innerHTML = message;
}

function hideLoginError() {
    document.querySelector('#login-error').classList.add('hidden');
}