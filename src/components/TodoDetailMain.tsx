import React from 'react'
import { Todo } from 'components/Types'
import TodoEdit from 'components/TodoEdit'
import TodoDeleteButton from 'components/UIkit/TodoDeleteButton'

import styles from 'styles/components/TodoDetailMain.module.scss'

type TodoItemProps = {
  todo: Todo
}

const TodoDetailMain: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <h1>ID: {todo.id}</h1>
          <h1>TITLE: {todo.title}</h1>
          <h1>内容: {todo.content}</h1>

          <details>
            <summary>✏️編集する</summary>
            <TodoEdit todo={todo} />
          </details>

          <TodoDeleteButton size="large" todo={todo} />
        </div>
      </div>
    </>
  )
}

export default TodoDetailMain
