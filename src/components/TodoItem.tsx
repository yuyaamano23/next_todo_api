import React from 'react'
import { TodoItem } from 'components/Types'

type Props = {
  todos: TodoItem
}

const TodoItem: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <div>{todos.id}</div>
      <div>{todos.title}</div>
      <div>{todos.content}</div>
      <button>削除</button>
    </>
  )
}

export default TodoItem
