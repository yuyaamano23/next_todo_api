import React from 'react'
import TodoItem from 'components/TodoItem'
import { Todo } from 'components/Types'

type TodoListProps = {
  todos: Todo[]
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
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
export default TodoList
