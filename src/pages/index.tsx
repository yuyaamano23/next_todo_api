import React from 'react'
import TodoItem from 'components/TodoItem'

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
  console.log(todos)
  return (
    <>
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  )
}
export default Index
