import React from 'react'
import axios from 'axios'
import { Todo } from 'components/Types'
import Router from 'next/router'
import DeleteIcon from '@material-ui/icons/Delete'

type TodoDeleteProps = {
  todo: Todo
  size?: 'small' | 'inherit' | 'default' | 'large'
}

const TodoDeleteButton: React.FC<TodoDeleteProps> = ({ todo, size }) => {
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
        console.log('todo delete success')
        // ページ更新させる
        Router.push('/todos')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return <DeleteIcon fontSize={size} onClick={handleDelete} />
}
export default TodoDeleteButton
