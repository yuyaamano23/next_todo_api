import React, { useState } from 'react'
import Tabs from 'components/UIkit/Tabs'
import { GetStaticProps } from 'next'
import { Todo } from 'components/Types'
import TodoSearch from 'components/TodoSearch'
import TodoList from 'components/TodoList'
import TodoPostForm from 'components/TodoPostForm'

type TodosServerSideIndexProps = {
  todos: Todo[]
}

const Index: React.FC<TodosServerSideIndexProps> = ({
  todos,
}: TodosServerSideIndexProps) => {
  const [TabState, setTabState] = useState<number>(0)
  const updateTabsStateToTodos = (): void => setTabState(0)
  const updateTabsStateToSearch = (): void => setTabState(1)
  return (
    <>
      <Tabs
        updateTabsStateToTodos={updateTabsStateToTodos}
        updateTabsStateToSearch={updateTabsStateToSearch}
      />
      {TabState == 0 ? (
        <div>
          <TodoPostForm />
          <TodoList todos={todos} />
        </div>
      ) : (
        <TodoSearch />
      )}
    </>
  )
}
export default Index

//  revalidateを追加することで ISR化
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.endPoint}/api/todos`)
  const todos = await res.json()
  //   pageディレクトリ配下のコンポーネントでは↓このようにreturn{ props: hoge }とするとhogeで参照できる
  return { props: { todos }, revalidate: 1 }
}
