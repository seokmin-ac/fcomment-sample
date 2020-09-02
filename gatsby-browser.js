import React from "react"
import { navigate } from "gatsby"
import { Auth0Provider } from "@auth0/auth0-react"

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"

const onRedirectCallback = appState => navigate(appState?.returnTo || "/")

export const wrapRootElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_DOMAIN}
      clientId={process.env.GATSBY_CLIENT_ID}
      audience={process.env.GATSBY_AUDIENCE}
      scope="read:users"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  )
}
