import React, { useState, useEffect, useRef } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { MdCancel } from "react-icons/md"

import "./commentForm.css"

const CommentForm = ({ id, cancelCallback, content = "", method = "POST" }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const {
    isAuthenticated,
    loginWithRedirect,
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0()
  const [commentContent, setCommentContent] = useState(content)
  const textArea = useRef()
  useEffect(_ => {
    if (textArea.current) {
      textArea.current.value = commentContent
    }
  })

  const fetchComment = _ => {
    if (commentContent === "") {
      return
    }
    getAccessTokenSilently().then(token => {
      const endpoint = id
        ? `comments/${id}`
        : `articles${window.location.pathname}comments`
      return fetch(`${process.env.GATSBY_API_DOMAIN}/${endpoint}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentContent,
        }),
      })
    })
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
      <div className="text-wrapper">
        <textarea
          placeholder="Input your comment here"
          onChange={e => setCommentContent(e.target.value)}
          ref={textArea}
        />
        {cancelCallback && (
          <button
            className="comment-button cancel sans-serif"
            onClick={cancelCallback}
          >
            <MdCancel /> Cancel
          </button>
        )}
      </div>
      <button
        className="post sans-serif"
        onClick={e => {
          e.preventDefault()
          fetchComment()
        }}
      >
        Post
      </button>
    </form>
  )
}

export default CommentForm
