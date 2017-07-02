const loginBtn = document.querySelector("#login");

loginBtn.addEventListener('click', login);

function login() {
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");

    browser.storage.local.set({
        auth: {
            username: usernameInput.value,
            password: passwordInput.value
        }
    });
}
