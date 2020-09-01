import React from "react"
import "./commentForm.css"

const CommentForm = () => {
  return (
    <form className="comment-input">
      <textarea placeholder="Input your comment here" />
      <button>Post</button>
    </form>
  )
}

export default CommentForm
