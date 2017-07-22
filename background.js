browser.runtime.onMessage.addListener(dispatch);

function dispatch(message) {
    switch (message.type) {
        case 'search':
            return search(message);
            break;
        case 'auth':
            let result;
            if (message.args) {
                result = auth(message.args.username, message.args.password, message.args.url);
            } else {
                result = auth()
            }
            return result
                .then(turnIconActive)
                .catch(turnIconInactive);
            break;
        default:
            throw new Error('Message type not found');
    }
}

function turnIconActive() {
    browser.browserAction.setIcon({
        path: {
            16: 'icons/logo-16.png',
            32: 'icons/logo-32.png',
            48: 'icons/logo-48.png',
        }
    })
}

function turnIconInactive(e) {
    browser.browserAction.setIcon({
        path: {
            16: 'icons/logo-16-grey.png',
            32: 'icons/logo-32-grey.png',
            48: 'icons/logo-48-grey.png',
        }
    });
    throw e;
}

function search(message) {
    return request('passwords/search/access:' + encodeURIComponent(message.args.url)).then(loadPasswordDetails);

    function loadPasswordDetails(passwords) {
        return request('passwords/' + passwords[0].id)
    }
}
