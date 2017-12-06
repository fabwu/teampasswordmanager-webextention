const passwordFields = document.querySelectorAll("input[type='password']");
const usernameFields = [];

passwordFields.forEach(passwordField => {
    usernameFields.push(passwordField.form.querySelector("input[type='text']"));
});

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
    passwordFields.forEach(addIconToField);
    passwordFields.forEach(passwordField => {
    passwordFields.forEach(addEventListener);
        passwordField.value = auth.password;
    });

    usernameFields.forEach(addIconToField);
    usernameFields.forEach(addEventListener);
    usernameFields.forEach(usernameField => {
        usernameField.value = auth.username;
    })
}

function addEventListener(element) {
    element.addEventListener('mousemove', changeCursor);
    element.addEventListener('click', (e) => {
        if (isMouseOnIcon(e)) {
            console.log('Show panel');
        }
    });
}

function changeCursor (e) {
    let cursor = 'auto';
    if (isMouseOnIcon(e)) {
        cursor = 'pointer';
    }
    e.target.style.cursor = cursor;
}

function isMouseOnIcon(e) {
    const boundingRect = e.target.getBoundingClientRect();
    const leftLimit = boundingRect.left + boundingRect.width - 22;
    return e.clientX > leftLimit;
}

function addIconToField(field) {
    const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QcCFRkfBQCzagAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABlUlEQVQ4y32TMUgcURCGv3m7osTYGEsLi4TgNgk2ImKVUgg5kxRezs4yHHYiaexsRSy9KgeXQr0UwTRpxBRiUgbOgBARQRAkRVKdt+9PsfG82711yjf/fDPzD8/oEePFnWcEwQowCYB0JLR2XJ37ktZaprhUL5uxDpbKSRJLjWphIxfwuLQ9FRB+xXCSdkW8kYiCspnNIbyPNX1cKxze1ISdAEewjOGQ9hrVwsuO1H60UP+E2awLbRko3NZ0bzQDIIs3s7v6ZHQx0920U2QMA5j3p2lA3HS/EpGGcwFtkAuVfYvVbpM2MXq92qeBJwuGVRK//ZrgsruTjWD2DsDLL7auzt+ffC43ExMHnhYNKreruBUjP5y5rfDBKEAlWcEzlBZJOlOr9Qg1HyJOe3CGMmdM2X7QqL06AYhK9QOwsV6yXICJ5+Pz25ELnZd4kae7a4L7Xte/g5ZiBfcGc/3IBYijnx/mL37UipcyHd49gUmZf2X0RW8+vv0P68+k5dQGSP674f5g1nENm8Ax0Xs4/jribwD/ACnZjCv36DmJAAAAAElFTkSuQmCC';
    field.style.backgroundImage = "url('" + icon + "')";
    field.style.backgroundRepeat = "no-repeat";
    field.style.backgroundAttachment = "scroll";
    field.style.backgroundSize = "16px 16px";
    field.style.backgroundPosition = "calc(100% - 4px) 50%";
}
