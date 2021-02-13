import React from 'react'
import { Todo } from 'components/Types'

type TodoItemProps = {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <>
      <div>{todo.id}</div>
      <div>{todo.title}</div>
      <div>{todo.content}</div>
      <button>削除</button>
    </>
  )
}

export default TodoItem
