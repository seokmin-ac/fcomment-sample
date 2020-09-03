import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"

import "./commentForm.css"

const CommentForm = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0()

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
      <textarea placeholder="Input your comment here" />
      <button
        className="sans-serif"
        onClick={e => {
          e.preventDefault()
        }}
      >
        Post
      </button>
    </form>
  )
}

export default CommentForm
