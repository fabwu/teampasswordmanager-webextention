browser.runtime.onMessage.addListener(notify);

function notify(message) {
    return request('passwords/search/access:' + encodeURIComponent(message.url))
        .then(loadPasswordDetails);
}

function loadPasswordDetails(passwords) {
    return request('passwords/' + passwords[0].id)
}