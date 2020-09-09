import React, { useState } from "react"

import { useCommentAuth } from "./commentAuthContext"
import CommentForm from "./commentForm"
import CommentContextButtons from "./commentContextButtons"

import "./commentItem.css"
import { useComments } from "./comments"

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
  const { token } = useCommentAuth()

  const { fetchComments } = useComments()

  const fetchDelete = _ => {
    return fetch(`${process.env.GATSBY_API_DOMAIN}/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(fetchComments)
  }

  return (
    <div className="comment-item">
      {isEditing ? (
        <>
          <CommentForm
            id={id}
            cancelCallback={_ => setIsEditing(false)}
            method="PATCH"
            content={content}
            exitForm={_ => setIsEditing(false)}
          />
        </>
      ) : (
        <div className="comment-content">
          <div className="comment-icon">
            {comment.removed ? (
              <div className="removed-icon" />
            ) : (
              <img src={currentUser.picture} alt="icon" />
            )}
          </div>
          <div className={`comment${comment.removed ? " removed" : ""}`}>
            <div className="header sans-serif">
              <span className="comment-user">
                {comment.removed ? "" : currentUser.nickname}
              </span>
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
            <div className="comment-text">
              {comment.removed ? "Removed comment" : content}
            </div>
            {!comment.removed && (
              <CommentContextButtons
                toggleReplyForm={_ => setShowReplyForm(!showReplyForm)}
                setIsEditing={_ => setIsEditing(true)}
                fetchDelete={fetchDelete}
                user={user}
              />
            )}
          </div>
        </div>
      )}
      {showReplyForm && (
        <CommentForm id={id} exitForm={_ => setShowReplyForm(false)} />
      )}
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
