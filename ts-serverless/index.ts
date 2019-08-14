import { AusweisIdent } from './ausweisident'

/**
 * ###########################
 * ADJUST THE FOLLOWING VALUES
 *
 * discoveryEndpoint: provided to you via your AusweisIDent credential request
 * redirectUri: the uri to this function
 * ###########################
 */
const discoveryEndpoint = 'https://ref-ausweisident.eid-service.de/.well-known/openid-configuration'
const redirectUri = 'https://example.com'

const clientId = process.env.AUSWEISIDENT_CLIENT_ID || ''
const clientSecret = Buffer.from(process.env.AUSWEISIDENT_CLIENT_SECRET, 'base64').toString() || ''

// TODO: fetch discovery endpoint
const eidOAuth = new AusweisIdent({
  discoveryEndpoint,
  openid: {
    authorization_endpoint: 'https://ref-ausweisident.eid-service.de/oic/authorize',
    token_endpoint: 'https://ref-ausweisident.eid-service.de/oic/token',
    userinfo_endpoint: 'https://ref-ausweisident.eid-service.de/oic/user-info',
    jwks_uri: 'https://ref-ausweisident.eid-service.de/jwks.json',
  },
  redirectUri,
  clientId,
  clientSecret,
})

/**
 * Request Handler
 */
const handler = async (req, res) => {
  try {
    const { code, state } = req.query

    if (!code) throw Error('Bad request. Missing code parameter')

    // TODO: verify state parameter

    const token = await eidOAuth.getToken(code)
    const userInfo = await eidOAuth.getUserInfo(token.access_token)

    res.status(200).json(userInfo)
    console.log('Successful auth')
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}

export default handler
