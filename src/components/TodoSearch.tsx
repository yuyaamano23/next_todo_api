import React, { useState } from 'react'
import axios from 'axios'
import TodoItem from 'components/TodoItem'

const TodoSearch: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [resData, setResData] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios({
      method: 'get',
      url: 'http://localhost:8000/api/todo/search',
      params: { keyword: keyword },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Search success')
        //  検索欄をクリア
        setKeyword('')
        // 検索結果をセットする
        setResData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <h1>Search Me🔎</h1>
      <p>keyword</p>
      <input
        type="text"
        placeholder="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSubmit}>検索</button>
      {resData.map((data) => (
        <TodoItem key={data.id} todo={data} />
      ))}
    </div>
  )
}
export default TodoSearch
