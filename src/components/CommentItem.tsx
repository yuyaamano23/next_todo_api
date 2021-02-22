import React from 'react'
import { Comment } from 'components/Types'
import CommentDeleteButton from 'components/UIkit/CommentDeleteButton'

type CommentItemProps = {
  comment: Comment
}

const TodoItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <>
      <h5>------------------------------------------</h5>
      <h5>コメントid:{comment.id}</h5>
      <h5>内容:{comment.body}</h5>
      <CommentDeleteButton comment={comment} />
      <h5>------------------------------------------</h5>
    </>
  )
}

export default TodoItem
