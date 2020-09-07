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
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="comment-item">
      {isEditing ? (
        <>
          <CommentForm
            id={id}
            cancelCallback={_ => setIsEditing(false)}
            method="PATCH"
            content={content}
          />
        </>
      ) : (
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
                  hourCycle: "h23",
                }).format(new Date(datetime))}
              </time>
            </div>
            <div>{content}</div>
            <CommentContextButtons
              toggleReplyForm={_ => setShowReplyForm(!showReplyForm)}
              setIsEditing={_ => setIsEditing(true)}
              user={user}
            />
          </div>
        </div>
      )}
      {showReplyForm && <CommentForm id={id} />}
      <div className="replies">
        {replies?.map(comment => {
          return (
            <CommentItem
              comment={comment}
              users={users}
              id={comment.id}
              key={comment.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CommentItem
