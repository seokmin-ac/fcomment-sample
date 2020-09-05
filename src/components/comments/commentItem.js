import React, { useState } from "react"

import CommentForm from "./commentForm"
import CommentContextButtons from "./commentContextButtons"

import "./commentItem.css"

const CommentItem = ({ comment, users, id }) => {
  const { user, content, datetime, replies } = comment
  const currentUser = users.find(u => {
    return u.id === user
  }) ?? {
    name: "unknown",
    picture: "",
  }
  const [showReplyForm, setShowReplyForm] = useState(false)
  return (
    <div className="comment-item">
      <div className="comment-content">
        <div className="comment-icon">
          <img src={currentUser.picture} alt="icon" />
        </div>
        <div className="comment">
          <div className="header sans-serif">
            <span className="comment-user">{currentUser.name}</span>
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
          <CommentContextButtons
            showReplyForm={showReplyForm}
            setShowReplyForm={setShowReplyForm}
            user={user}
          />
        </div>
      </div>
      {showReplyForm && <CommentForm id={id} />}
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
