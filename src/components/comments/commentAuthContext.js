import React, { createContext, useEffect, useState, useContext } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import jwt_decode from "jwt-decode"

const CommentAuthContext = createContext({
  token: "",
  permissions: [],
})

const CommentAuthProvider = ({ children }) => {
  const [context, setContext] = useState({
    token: "",
    permissions: [],
  })
  const { getAccessTokenSilently } = useAuth0()
  useEffect(
    _ => {
      getAccessTokenSilently().then(token => {
        setContext({
          token,
          permissions: jwt_decode(token).permissions,
        })
      })
    },
    [getAccessTokenSilently]
  )
  return (
    <CommentAuthContext.Provider value={context}>
      {children}
    </CommentAuthContext.Provider>
  )
}

const useCommentAuth = () => useContext(CommentAuthContext)

export default CommentAuthContext
export { CommentAuthProvider, useCommentAuth }
