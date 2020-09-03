import React from "react"
import { MdReply, MdDelete, MdEdit } from "react-icons/md"
import { useAuth0 } from "@auth0/auth0-react"

import "./commentContextButtons.css"

const CommentContextButtons = ({ showReplyForm, setShowReplyForm, userId }) => {
  const { isAuthenticated, user } = useAuth0()
  let sub = null
  if (user) {
    sub = user.sub
  }
  return (
    isAuthenticated && (
      <div className="context-buttons sans-serif">
        <button
          className="comment-button"
          onClick={e => {
            e.preventDefault()
            setShowReplyForm(!showReplyForm)
          }}
        >
          <MdReply />
          Reply
        </button>
        {sub === userId && (
          <button className="comment-button">
            <MdEdit />
            Edit
          </button>
        )}
        {
          /* prettier-ignore */
          (sub === userId /* || isManager() */) && (
            <button className="comment-button">
              <MdDelete />
              Delete
            </button>
          )
        }
      </div>
    )
  )
}

export default CommentContextButtons
