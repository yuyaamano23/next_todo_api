import React from 'react'
import TodoList from 'components/TodoList'
import { GetServerSideProps } from 'next'
import { Todo } from 'components/Types'

type ServerSideIndexProps = {
  todos: Todo[]
}

const ServerSideIndex: React.FC<ServerSideIndexProps> = ({
  todos,
}: ServerSideIndexProps) => {
  return (
    <>
      <TodoList todos={todos} />
    </>
  )
}
export default ServerSideIndex

//リクエストごとにデータフェッチ
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:8000/api/todos')
  const todos = await response.json()
  return { props: { todos } }
}
