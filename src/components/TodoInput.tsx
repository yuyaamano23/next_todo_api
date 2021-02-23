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
  const [isInputted, setIsInputted] = useState(true)
  const handleSubmit = (e) => {
    // 現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまいます。
    // そのため、event.preventDefault()を呼び出し、buttonのデフォルトの動作をキャンセルするのよ。
    e.preventDefault()

    // 空欄だったら追加できないようにしちゃる
    if (!(title && content)) {
      setIsInputted(false)
      return
    }

    const data: InputData = {
      title: title,
      content: content,
    }
    // 空欄でない場合に追加押したら警告消す
    setIsInputted(true)

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/todos',
      params: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('TodoInput Post success')
        //  検索欄をクリア
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
        {isInputted ? '' : <p style={{ color: 'red' }}>値を入力してください</p>}
        <h3>title</h3>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>content</h3>
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
