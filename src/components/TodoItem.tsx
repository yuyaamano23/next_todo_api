import React from 'react'
import { Todo } from 'components/Types'
import Link from 'next/link'
import axios from 'axios'

type TodoItemProps = {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const handleDelete = (e) => {
    // ボタンのデフォルトの挙動を葬り去る
    e.preventDefault()

    axios({
      method: 'delete',
      url: `http://localhost:8000/api/todos/${todo.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('delete success')
        // ページ更新させる
        // Router.push('/todos')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <h5>------------------------------------------</h5>
      <h5>id:{todo.id}</h5>
      <h5>内容:{todo.title}</h5>
      <button onClick={handleDelete}>削除</button>
      <Link href={`/todos/${todo.id}`}>
        <a>記事詳細へ</a>
      </Link>
      <h5>------------------------------------------</h5>
    </>
  )
}

export default TodoItem
