import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import jwt_decode from "jwt-decode"

const CommentAuthContext = createContext({
  token: "",
  permissions: [],
  users: [],
  currentUser: {
    id: "",
    nickname: "",
    picture: "",
  },
})

const CommentAuthProvider = ({ children }) => {
  const [context, setContext] = useState({
    token: "",
    permissions: [],
  })
  const { getAccessTokenSilently } = useAuth0()
  useEffect(
    _ => {
      getAccessTokenSilently()
        .then(token => {
          setContext({
            token,
            permissions: jwt_decode(token).permissions,
          })
        })
        .catch(_ =>
          setContext({
            token: "",
            permissions: [],
          })
        )
    },
    [getAccessTokenSilently]
  )

  const [users, setUsers] = useState()
  const [currentUser, setCurrentUser] = useState({
    id: "",
    nickname: "",
    picture: "",
  })
  const updateUsers = useCallback(
    _ => {
      fetch(`${process.env.GATSBY_API_DOMAIN}/users`, {
        method: "GET",
      })
        .then(response => response.json())
        .then(body => setUsers(body.users))
    },
    [setUsers]
  )

  useEffect(updateUsers, [])

  useEffect(() => {
    if (context.token !== "") {
      fetch(`https://${process.env.GATSBY_DOMAIN}/userinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${context.token}`,
        },
      })
        .then(response => response.json())
        .then(body => {
          const newUser = {
            id: body.sub,
            nickname: body.nickname,
            picture: body.picture,
          }
          fetch(`${process.env.GATSBY_API_DOMAIN}/users`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${context.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }).then(updateUsers)
          setCurrentUser(newUser)
        })
    }
  }, [context.token, updateUsers])

  return (
    <CommentAuthContext.Provider
      value={{ ...context, users: users || [], currentUser }}
    >
      {children}
    </CommentAuthContext.Provider>
  )
}

const useCommentAuth = () => useContext(CommentAuthContext)

export default CommentAuthContext
export { CommentAuthProvider, useCommentAuth }
