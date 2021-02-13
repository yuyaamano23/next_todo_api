import React from 'react'
import { Todo } from 'components/Types'
import Link from 'next/link'

type TodoItemProps = {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <>
      <h3>------------------------------------------</h3>
      <h1>id:{todo.id}</h1>
      <h1>内容:{todo.title}</h1>
      <button>削除</button>
      <Link href={`/todos/${todo.id}`}>
        <a>記事詳細へ</a>
      </Link>
      <h3>------------------------------------------</h3>
    </>
  )
}

export default TodoItem
