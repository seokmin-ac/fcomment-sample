import React, { useState } from "react"
import { MdReply, MdDelete, MdEdit } from "react-icons/md"

import CommentForm from "./commentForm"

import "./commentItem.css"

const CommentItem = ({ comment, users }) => {
  const { userId, content, datetime, replies } = comment
  const user = users.find(u => {
    return u.id === userId
  })
  const [showReplyForm, setShowReplyForm] = useState(false)
  return (
    <div className="comment-item">
      <div className="comment-content">
        <div className="comment-icon">
          <img src={user.picture} alt="icon" />
        </div>
        <div className="comment">
          <div className="header">
            <span className="comment-user">{user.name}</span>
            <time dateTime={datetime}>
              {Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              }).format(new Date(datetime))}
            </time>
          </div>
          <div>{content}</div>
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
            {
              // (isManager() || isAuthor()) &&
              <>
                <button className="comment-button">
                  <MdEdit />
                  Edit
                </button>
                <button className="comment-button">
                  <MdDelete />
                  Delete
                </button>
              </>
            }
          </div>
        </div>
      </div>
      {showReplyForm && <CommentForm />}
      <div className="replies">
        {replies?.map(comment => {
          return (
            <CommentItem comment={comment} users={users} key={comment.id} />
          )
        })}
      </div>
    </div>
  )
}

export default CommentItem
