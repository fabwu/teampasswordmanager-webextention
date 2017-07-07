browser.runtime.onMessage.addListener(dispatch);

function dispatch(message) {
    switch (message.type) {
        case 'search':
            return search(message);
            break;
        case 'auth':
            if (message.args) {
                return auth(message.args.username, message.args.password, message.args.url);
            } else {
                return auth()
            }
            break;
        default:
            throw new Error('Message type not found');
    }
}

function search(message) {
    return request('passwords/search/access:' + encodeURIComponent(message.args.url)).then(loadPasswordDetails);

    function loadPasswordDetails(passwords) {
        return request('passwords/' + passwords[0].id)
    }
}
