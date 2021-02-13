import React from 'react'
import TodoList from 'components/TodoList'

const todos = [
  {
    id: 1,
    title: 'fuck you',
    content: 'why does not work!!',
  },
  {
    id: 2,
    title: 'fuck you bitch',
    content: 'why does not work!!',
  },
  {
    id: 3,
    title: 'fuck you bitch',
    content: 'why does not work!!',
  },
]

const Index: React.FC = () => {
  return (
    <>
      <TodoList todos={todos} />
    </>
  )
}
export default Index
