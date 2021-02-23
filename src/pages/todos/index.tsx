import React from 'react'
import Tabs from 'components/UIkit/Tabs'
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
      <Tabs todos={todos} />
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
