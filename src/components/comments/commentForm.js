import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"

import "./commentForm.css"

const CommentForm = ({ parent }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const {
    isAuthenticated,
    loginWithRedirect,
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0()
  const [commentContent, setCommentContent] = useState("")

  const postComment = e => {
    e.preventDefault()
    getAccessTokenSilently()
      .then(token => {
        const endpoint = parent
          ? `comments/${parent}`
          : `articles${window.location.pathname}comments`
        return fetch(`${process.env.GATSBY_API_DOMAIN}/${endpoint}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: commentContent,
          }),
        })
      })
      .then(response => response.json())
      .then(response => console.log(response.id))
  }

  if (!isAuthenticated) {
    return (
      <div className="comment-login sans-serif">
        <div>Sign in to comment</div>
        <button onClick={loginWithRedirect}>Sign in</button>
      </div>
    )
  }

  const { nickname, picture } = user

  return (
    <form className="comment-form">
      <div className="comment-form-user">
        <img
          src={picture}
          alt="icon"
          onClick={e => {
            e.preventDefault()
            setShowUserMenu(!showUserMenu)
          }}
        />
        <div
          className={
            showUserMenu ? "user-dropdown sans-serif" : "user-dropdown-disabled"
          }
        >
          <div className="nickname">{nickname}</div>
          <hr />
          <div
            className="logout"
            onClick={_ => {
              logout({
                returnTo: window.location.origin,
              })
            }}
          >
            Sign out
          </div>
        </div>
      </div>
      <textarea
        placeholder="Input your comment here"
        onChange={e => setCommentContent(e.target.value)}
      />
      <button className="sans-serif" onClick={postComment}>
        Post
      </button>
    </form>
  )
}

export default CommentForm
