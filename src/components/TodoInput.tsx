import React from 'react'
import axios from 'axios'
import Router from 'next/router'

const data = {
  title: 'postもしかして行けたんご？？？',
  content: 'post行けたかもまじでクソ嬉しい！',
}

const TodoInput: React.FC = () => {
  const handleSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/todos',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('success')
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
        <input type="text" />
        <button onClick={handleSubmit}>追加</button>
      </div>
    </>
  )
}
export default TodoInput
