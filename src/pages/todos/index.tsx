import React from 'react'
import TodoInput from 'components/TodoInput'
import TodoList from 'components/TodoList'
import TodoSearch from 'components/TodoSearch'
import { GetStaticProps } from 'next'
import { Todo } from 'components/Types'

type TodosServerSideIndexProps = {
  todos: Todo[]
}

const Index: React.FC<TodosServerSideIndexProps> = ({
  todos,
}: TodosServerSideIndexProps) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <h1>Hello, ToDoList👋</h1>
          <TodoInput />
          <TodoList todos={todos} />
        </div>
        <TodoSearch />
      </div>
    </>
  )
}
export default Index

//  revalidateを追加することで ISR化
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:8000/api/todos')
  const todos = await res.json()
  //   pageディレクトリ配下のコンポーネントでは↓このようにreturn{ props: hoge }とするとhogeで参照できる
  return { props: { todos }, revalidate: 1 }
}
