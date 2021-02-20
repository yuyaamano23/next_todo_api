import React from 'react'
import axios from 'axios'
import { Todo } from 'components/Types'
import Router from 'next/router'

type TodoItemProps = {
  todo: Todo
}

const TodoDeleteButton: React.FC<TodoItemProps> = ({ todo }) => {
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
        Router.push('/todos')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return <button onClick={handleDelete}>削除</button>
}
export default TodoDeleteButton
