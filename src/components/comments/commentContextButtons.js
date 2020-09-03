import React from "react"
import { MdReply, MdDelete, MdEdit } from "react-icons/md"
import { useAuth0 } from "@auth0/auth0-react"

const CommentContextButtons = ({ showReplyForm, setShowReplyForm, userId }) => {
  const { isAuthenticated, user } = useAuth0()
  const { sub } = user
  return (
    isAuthenticated && (
      <div className="context-buttons">
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
        {sub === userId /* || isManager() */ && (
          <button className="comment-button">
            <MdDelete />
            Delete
          </button>
        )}
      </div>
    )
  )
}

export default CommentContextButtons
