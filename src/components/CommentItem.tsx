import React from 'react'
// import { Todo } from 'components/Types'
// import Link from 'next/link'
// import TodoDeleteButton from 'components/UIkit/TodoDeleteButton'

// type CommentItemProps = {
//   id: number
//   body: string
//   todo_id: number
//   created_at: string
//   updated_at: string
// }

// <CommentItemPrps>にするとなぜかエラークソが

const TodoItem: React.FC<any> = ({ comment }) => {
  return (
    <>
      <h5>------------------------------------------</h5>
      <h5>コメントid:{comment.id}</h5>
      <h5>内容:{comment.body}</h5>

      <h5>------------------------------------------</h5>
    </>
  )
}

export default TodoItem
