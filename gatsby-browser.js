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
      domain={process.env.AUTH_DOMAIN}
      clientId={process.env.AUTH_CLIENT_ID}
      audience={process.env.AUTH_AUDIENCE}
      scope="read:users"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {element}
    </Auth0Provider>
  )
}
