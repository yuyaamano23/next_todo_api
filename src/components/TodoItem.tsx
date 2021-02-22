import React from 'react'
import { Todo } from 'components/Types'
import Link from 'next/link'
import TodoDeleteButton from 'components/UIkit/TodoDeleteButton'

type TodoItemProps = {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <>
      <h5>------------------------------------------</h5>
      <h5>id:{todo.id}</h5>
      <h5>内容:{todo.title}</h5>
      <TodoDeleteButton todo={todo} />
      <Link href={`/todos/${todo.id}`}>
        <button>記事詳細へ</button>
      </Link>
      <h5>------------------------------------------</h5>
    </>
  )
}

export default TodoItem
