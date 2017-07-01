const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

function storeSettings() {
    browser.storage.local.set({
        auth: {
            username: usernameInput.value,
            password: passwordInput.value
        }
    });
}

function updateUI(settings) {
    usernameInput.value = settings.auth.username || "";
    passwordInput.value = settings.auth.password || "";
}

browser.storage.local.get().then(updateUI);

usernameInput.addEventListener("blur", storeSettings);
passwordInput.addEventListener("blur", storeSettings);