import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

import CommentForm from "./commentForm"
import CommentItem from "./commentItem"
import "./comments.css"

const Comments = () => {
  const dummyComments = {
    count: 3,
    users: [
      {
        id: "auth0|5f3e92f9fe4527006d9383bc",
        name: "manager",
        picture:
          "https://s.gravatar.com/avatar/ad5c2c75bd08bbf326ace2a8addf1e05?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png",
      },
      {
        id: "google-oauth2|106050262959037228016",
        name: "Seokmin Hong",
        picture:
          "https://lh3.googleusercontent.com/a-/AOh14GjMf9yTMjCKqGatcK6jobRnE6MAltUX6TOgPVh6-A",
      },
    ],
    comments: [
      {
        id: 1,
        userId: "auth0|5f3e92f9fe4527006d9383bc",
        content: "This is a dummy comment!",
        datetime: "2020-09-01T16:01:15",
        replies: [
          {
            id: 3,
            userId: "google-oauth2|106050262959037228016",
            content: "Reply for a first comment",
            datetime: "2020-09-05T10:00:13",
          },
        ],
      },
      {
        id: 2,
        userId: "google-oauth2|106050262959037228016",
        content: "Second comment!",
        datetime: "2020-09-03T11:00:13",
      },
    ],
  }
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0()
  return (
    <div className="comments">
      <div className="title monospace">
        {dummyComments.count} Comment{dummyComments.count !== 1 ? "s" : ""}
      </div>
      <hr />
      <div>
        {dummyComments.comments.map(comment => {
          return (
            <CommentItem
              comment={comment}
              users={dummyComments.users}
              key={comment.id}
            />
          )
        })}
      </div>
      {isAuthenticated ? (
        <CommentForm />
      ) : (
        <div>
          <div>Log in to comment</div>
          <div>
            <button>Login</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Comments
