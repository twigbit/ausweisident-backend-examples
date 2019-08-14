# AusweisIDent Backend Examples

☛ [twigbit](https://twigbit.com/)  
☛ [AusweisIDent](https://www.ausweisident.de/)  

See [twigbit/ident-sdk](https://github.com/twigbit/ident-sdk) for our Android SDK to implement the AusweisIdent functionality in your app.

## Brief description

The AusweisIDent service implements standard OpenID Connect protocols. See [auth0.com/docs/protocols/oidc](https://auth0.com/docs/protocols/oidc) for a good overview.

If you use our client-side [IdentSDK](https://github.com/twigbit/ident-sdk), the URL to this serverless function should be provided in the `AusweisIdentBuilder().redirectUrl("your-redirect-url")` function in your Android App. Set the `state` parameter with the `.state("...")` function.

After a successful authentication this url will be called from your client after some redirects from the AusweisIDent service and be provided with your `state` parameter and a `code`.

Follow the following steps to receive the user data read from the ID card:

1. **Verify the state parameter** (not shown in the example code) to [mitigate CSRF attacks](https://auth0.com/docs/protocols/oauth2/oauth-state).
1. Use the `code` to obtain an `access token` from the AusweisIdent OAuth2 Token Endpoint.
2. Use the `access token` to get an `user info token` via the OAuth2 User Info Endpoint containing the personal data from the identification document.

See the example source code for a detailed implementation.

## Examples

|   |   |   |
| - | - | - |
| **Node.js** | TypeScript | [ts-serverless](./ts-serverless) |

