import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

type InputData = {
  title: string
  content: string
}

const TodoInput: React.FC = () => {
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
      method: 'post',
      url: 'http://localhost:8000/api/todos',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('TodoInput Post success')
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
      <div>
        <p>title</p>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>content</p>
        <input
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSubmit}>追加</button>
      </div>
    </>
  )
}
export default TodoInput
