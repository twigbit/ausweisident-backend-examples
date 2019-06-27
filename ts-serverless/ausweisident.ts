import * as jwt from 'jsonwebtoken'
import * as fetch from 'node-fetch'

export interface AusweisIdentConfig {
  discoveryEndpoint?: string
  openid: {
    authorization_endpoint: string
    token_endpoint: string
    userinfo_endpoint: string
    jwks_uri: string
  }
  redirectUri: string
  clientId: string
  clientSecret: string
}

export class AusweisIdent {
  private config: AusweisIdentConfig

  constructor(config: AusweisIdentConfig) {
    this.config = config

    if (!config.clientId) console.log('[WARNING] No AusweisIdent Client Id provided')
    if (!config.clientSecret) console.log('[WARNING] No AusweisIdent Client Secret provided')
  }

  // curl -v -X POST https://ref-ausweisident.eid-service.de/oic/token \
  // >   -H 'Authorization: Basic base64(client_id:client_secret)' \
  // >   -H 'Content-Type: application/x-www-form-urlencoded' \
  // >   --data 'code=[access_code]&grant_type=authorization_code&redirect_uri=[redirect_uri]'
  async getToken(code) {
    const { clientId, clientSecret } = this.config
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    const res = await fetch(this.config.openid.token_endpoint, {
      method: 'post',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${code}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(
        this.config.redirectUri
      )}`,
    })
    if (res.status !== 200) throw new Error(`AusweisIdent Unauthorized (${res.status})`)
    return res.json()
  }

  // curl -v https://ref-ausweisident.eid-service.de/oic/user-info -H 'Authorization: Bearer <token from get token>'
  async getUserInfo(token) {
    const res = await fetch(this.config.openid.userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const ui = await res.text()
    return jwt.decode(ui, { json: true })
  }
}
