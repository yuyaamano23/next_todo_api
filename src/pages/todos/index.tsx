import React from 'react'
import TodoList from 'components/TodoList'
import { GetServerSideProps } from 'next'
import { Todo } from 'components/Types'

type TodosServerSideIndexProps = {
  todos: Todo[]
}

const Index: React.FC<TodosServerSideIndexProps> = ({
  todos,
}: TodosServerSideIndexProps) => {
  return (
    <>
      <h1>Hello, ToDoList👋</h1>
      <TodoList todos={todos} />
    </>
  )
}
export default Index

//リクエストごとにデータフェッチ
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:8000/api/todos')
  const todos = await res.json()
  //   pageディレクトリ配下のコンポーネントでは↓このようにreturn{ props: hoge }とするとhogeで参照できる
  return { props: { todos } }
}
