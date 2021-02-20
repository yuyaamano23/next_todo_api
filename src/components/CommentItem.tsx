import React from 'react'
import { Comment } from 'components/Types'
// import Link from 'next/link'

type CommentItemProps = {
  comment: Comment
}

const TodoItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <>
      <h5>------------------------------------------</h5>
      <h5>コメントid:{comment.todo_id}</h5>
      <h5>内容:{comment.body}</h5>

      <h5>------------------------------------------</h5>
    </>
  )
}

export default TodoItem
