import React from 'react'
import { Todo } from 'components/Types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

type TodoItemProps = {
  todo: Todo
}

const TodoItemDetail: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <>
      <h1>ID: {todo.id}</h1>
      <h1>TITLE: {todo.title}</h1>
      <h1>内容 {todo.content}</h1>
      <div>
        <button>削除</button>
      </div>
      <Link href="/todos">
        <a>back</a>
      </Link>
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