# ZEIT Now Example written in TypeScript

> **Disclaimer.** The source code provided in this folder must not be used
> in any production product and serves only for a demonstrational purpose.
> The example was created with care, but cannot guarantee in any means that this is
> a secure implementation.

## Brief description

The AusweisIDent service implements standard OpenID Connect protocols. See [auth0.com/docs/protocols/oidc](https://auth0.com/docs/protocols/oidc) for a good overview.

If you use our client-side [IdentSDK](https://github.com/twigbit/ident-sdk), the URL to this serverless function should be provided in the `AusweisIdentBuilder().redirectUrl("your-redirect-url")` function in your Android App.

This url will be called from your client after some redirects from the AusweisIDent service and be provided with your `state` parameter and a `code`.

1. **Verify the state parameter** (not shown in the example code) to [mitigate CSRF attacks](https://auth0.com/docs/protocols/oauth2/oauth-state).
1. Use the `code` to obtain an `access token` from the AusweisIdent OAuth2 Token Endpoint.
2. Use the `access token` to get an `user info token` via the OAuth2 User Info Endpoint containing the personal data from the identification document.

## Deploy to now

```
$ now secrets add ausweisident-client-id "<your client id>"
$ now secrets add ausweisident-client-secret "$(echo "<your client secret>" | base64)"

$ now
```

