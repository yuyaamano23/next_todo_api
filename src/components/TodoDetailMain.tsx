import React, { useState } from 'react'
import { Todo } from 'components/Types'
import TodoEdit from 'components/TodoEdit'
import TodoDeleteButton from 'components/UIkit/TodoDeleteButton'
import EditIcon from '@material-ui/icons/Edit'
import styles from 'styles/components/TodoDetailMain.module.scss'

type TodoItemProps = {
  todo: Todo
}

const TodoDetailMain: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <h1>ID: {todo.id}</h1>
          <h1>TITLE: {todo.title}</h1>
          <h1>内容: {todo.content}</h1>

          <TodoDeleteButton size="large" todo={todo} />

          <EditIcon
            fontSize="large"
            className={styles.editIcon}
            onClick={() => setIsEditOpen(!isEditOpen)}
          />
          <div id="edit" className={isEditOpen ? styles.formVisible : ''}>
            <TodoEdit todo={todo} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoDetailMain
