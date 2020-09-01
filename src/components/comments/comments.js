import React from "react"

import CommentForm from "./commentForm"
import CommentItem from "./commentItem"
import "./comments.css"

const Comments = () => {
  const dummyComments = {
    count: 3,
    comments: [
      {
        id: 1,
        user: "Gatsby",
        icon: "https://www.gatsbyjs.com/Gatsby-Monogram.svg",
        content: "This is a dummy comment!",
        datetime: "2020-09-01T16:01:15",
        replies: [
          {
            id: 3,
            user: "Netlify",
            icon: "https://www.netlify.com/img/press/logos/logomark.svg",
            content: "Reply for a first comment",
            datetime: "2020-09-05T10:00:13",
          },
        ],
      },
      {
        id: 2,
        user: "Netlify",
        icon: "https://www.netlify.com/img/press/logos/logomark.svg",
        content: "Second comment!",
        datetime: "2020-09-03T11:00:13",
      },
    ],
  }
  return (
    <div className="comments">
      <div className="title monospace">
        {dummyComments.count} Comment{dummyComments.count !== 1 ? "s" : ""}
      </div>
      <hr />
      <div>
        {dummyComments.comments.map(comment => {
          return <CommentItem comment={comment} key={comment.id} />
        })}
      </div>
      <CommentForm />
    </div>
  )
}

export default Comments
