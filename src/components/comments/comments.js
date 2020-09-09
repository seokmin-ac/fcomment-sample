import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useContext,
} from "react"

import { useCommentAuth } from "./commentAuthContext"
import CommentForm from "./commentForm"
import CommentItem from "./commentItem"
import "./comments.css"

const CommentContext = createContext({ fetchComments: _ => {} })

const Comments = () => {
  const [response, setResponse] = useState({ count: 0, comments: [] })
  const fetchComments = useCallback(async () => {
    await fetch(
      `${process.env.GATSBY_API_DOMAIN}/articles${window.location.pathname}comments`,
      {
        method: "GET",
      }
    )
      .then(response => response.json())
      .then(body => setResponse(body))
  }, [setResponse])

  useEffect(
    _ => {
      fetchComments()
    },
    [fetchComments]
  )

  const { users } = useCommentAuth()
  return (
    <CommentContext.Provider value={{ fetchComments }}>
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
                users={users}
                id={comment.id}
                key={comment.id}
              />
            )
          })}
        </div>
        <CommentForm />
      </div>
    </CommentContext.Provider>
  )
}

const useComments = () => useContext(CommentContext)

export default Comments
export { useComments }
