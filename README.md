# Team Password Manager Webextention (Deprecated)

Team Password Manager Add-on allows Firefox users to fill in login forms from credentials stored in Team Password Manager.

[Team Password Manager](http://teampasswordmanager.com/) is a self hosted web based password manager for groups.

## Development

In order to get ready for development you should install the following tool:

```
npm install --global web-ext
```

Listed below are some useful commands for an easy development:

-   `web-ext run --browser-console --start-url twitter.com`

    Open a Firefox instance with debugging and auto reload enabled

-   `web-ext lint`

    Check the source code for errors and bad practices

-   `web-ext build`
    
    Builds the extension

-   `web-ext sign --api-key <YOUR_KEY> --api-secret <YOUR_SECRET>`
    
    Sign your extension for self-distribution

