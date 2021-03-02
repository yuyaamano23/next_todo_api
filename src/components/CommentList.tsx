import React, { useState, useEffect } from 'react'
import { Todo } from 'components/Types'
import axios from 'axios'
import CommentItem from 'components/CommentItem'

type TodoItemProps = {
  todo: Todo
}

// type InputData = {
//   body: string
// }

const CommentList: React.FC<TodoItemProps> = ({ todo }) => {
  const [resData, setResData] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.endPoint}/api/comments`,
      params: { todo_id: todo.id },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('comment get success')
        setResData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    // 副作用を1度だけ、マウント時とアンマウント時にのみ、実行したいという場合、 [] を第2引数として渡します。
    // 今回はレンダー時に1度だけ、外部APIを呼び出したいので、第二引数に [] を渡します。
  }, [])
  return (
    <div>
      {resData.map((data) => (
        <CommentItem key={data.id} comment={data} />
      ))}
    </div>
  )
}
export default CommentList
