import React, { useState } from 'react'
import { Todo } from 'components/Types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'

type TodoItemProps = {
  todo: Todo
}

type InputData = {
  title: string
  content: string
}

const TodoItemDetail: React.FC<TodoItemProps> = ({ todo }) => {
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
      <h1>ID: {todo.id}</h1>
      <h1>TITLE: {todo.title}</h1>
      <h1>内容 {todo.content}</h1>
      <button>削除</button>
      <Link href="/todos">
        <button>戻る</button>
      </Link>
      <p>----------------------------------------</p>
      <h1>自由に編集しろ</h1>
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

export default TodoItemDetail

export const getStaticPaths: GetStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch('http://localhost:8000/api/todos')
  const todos = await res.json()

  // 事前ビルドしたいパスを指定
  const paths = todos.map((todo) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      id: todo.id.toString(),
    },
  }))
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  //   blocking, revalidateについてはREADME参照
  return { paths, fallback: 'blocking' }
}

// todosには上記pathsで指定した値が入る（1postずつ）
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`http://localhost:8000/api/todos/${params.id}`)
  const todo = await res.json()

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      todo,
    },
  }
}
