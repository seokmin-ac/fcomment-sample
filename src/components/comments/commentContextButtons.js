import React from "react"
import { MdReply, MdDelete, MdEdit } from "react-icons/md"
import { useAuth0 } from "@auth0/auth0-react"

import { useCommentAuth } from "./commentAuthContext"

import "./commentContextButtons.css"

const CommentContextButtons = ({
  toggleReplyForm,
  setIsEditing,
  fetchDelete,
  user,
}) => {
  const { isAuthenticated, user: authUser } = useAuth0()
  const { permissions } = useCommentAuth()
  let sub = null
  if (authUser) {
    sub = authUser.sub
  }
  return (
    isAuthenticated && (
      <div className="context-buttons sans-serif">
        <button
          className="comment-button"
          onClick={e => {
            e.preventDefault()
            toggleReplyForm()
          }}
        >
          <MdReply />
          Reply
        </button>
        {sub === user && (
          <button
            className="comment-button"
            onClick={e => {
              e.preventDefault()
              setIsEditing()
            }}
          >
            <MdEdit />
            Edit
          </button>
        )}
        {(sub === user || permissions.includes("delete:comments")) && (
          <button
            className="comment-button"
            onClick={e => {
              e.preventDefault()
              fetchDelete()
            }}
          >
            <MdDelete />
            Delete
          </button>
        )}
      </div>
    )
  )
}

export default CommentContextButtons
