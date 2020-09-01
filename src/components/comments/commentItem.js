import React, { useState } from "react"
import { MdReply, MdDelete, MdEdit } from "react-icons/md"

import CommentForm from "./commentForm"

import "./commentItem.css"

const CommentItem = ({ comment }) => {
  const { user, icon, content, datetime, replies } = comment
  const [showReplyForm, setShowReplyForm] = useState(false)
  return (
    <div className="comment-item">
      <div className="comment-content">
        <div className="comment-icon">
          <img src={icon} alt="icon" />
        </div>
        <div className="comment">
          <div className="header">
            <span className="comment-user">{user}</span>
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
        <span>
          {replies?.map(comment => {
            return <CommentItem comment={comment} key={comment.id} />
          })}
        </span>
      </div>
    </div>
  )
}

export default CommentItem
