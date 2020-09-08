import React, { useEffect, useState } from "react"

import { CommentAuthProvider } from "./commentAuthContext"
import CommentForm from "./commentForm"
import CommentItem from "./commentItem"
import "./comments.css"

const Comments = () => {
  const [response, setResponse] = useState({ count: 0, comments: [] })
  useEffect(() => {
    fetch(
      `${process.env.GATSBY_API_DOMAIN}/articles${window.location.pathname}comments`,
      {
        method: "GET",
      }
    )
      .then(response => response.json())
      .then(body => setResponse(body))
  }, [])

  const dummyUsers = [
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
  ]
  return (
    <CommentAuthProvider>
      <div className="comments">
        <div className="title sans-serif">
          {response.count} Comment{response.count !== 1 ? "s" : ""}
        </div>
        <hr />
        <div>
          {response.comments.map(comment => {
            return (
              <CommentItem
                comment={comment}
                users={dummyUsers}
                id={comment.id}
                key={comment.id}
              />
            )
          })}
        </div>
        <CommentForm />
      </div>
    </CommentAuthProvider>
  )
}

export default Comments
