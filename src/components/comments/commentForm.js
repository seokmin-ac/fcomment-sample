import React from "react"

import "./commentForm.css"

const CommentForm = () => {
  const isValidJWT = false //jwt !== ""

  const redirectToAuth0 = e => {
    e.preventDefault()
    alert("Log in to comment")
    //window.location = 'Auth0'
  }
  return (
    <form className="comment-input">
      <textarea
        placeholder={
          isValidJWT ? "Input your comment here" : "Log in to comment"
        }
        onClick={e => {
          if (isValidJWT) {
            return
          }
          redirectToAuth0(e)
        }}
      />
      <button
        onClick={e => {
          if (isValidJWT) {
            return
          }
          redirectToAuth0(e)
        }}
      >
        Post
      </button>
    </form>
  )
}

export default CommentForm
