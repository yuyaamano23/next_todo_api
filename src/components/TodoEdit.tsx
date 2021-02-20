import React, { useState } from 'react'
import { Todo } from 'components/Types'
import axios from 'axios'
import Router from 'next/router'

type TodoItemProps = {
  todo: Todo
}

type InputData = {
  title: string
  content: string
}

const TodoEdit: React.FC<TodoItemProps> = ({ todo }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const handleSubmit = (e) => {
    // 現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまいます。
    // そのため、event.preventDefault()を呼び出し、buttonのデフォルトの動作をキャンセルするのよ。
    e.preventDefault()

    const data: InputData = {
      title: title,
      content: content,
    }

    axios({
      method: 'put',
      url: `http://localhost:8000/api/todos/${todo.id}`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('Edit success')
        setTitle('')
        setContent('')
        // ページ更新させる
        Router.push('/todos')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <p>----------------------------------------</p>
      <h1>Todoを自由に編集しろ</h1>
      <p>title:</p>
      <input
        type="text"
        placeholder={todo.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>content:</p>
      <input
        type="text"
        placeholder={todo.content}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div>
        <button onClick={handleSubmit}>編集</button>
      </div>
    </>
  )
}

export default TodoEdit
