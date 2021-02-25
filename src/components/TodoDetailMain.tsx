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
  const [isEditOpen, setIsEditOpen] = useState(true)
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.content}>
            <div className={styles.contentText}>
              <h4>ID: {todo.id}</h4>
              <h4>TITLE: {todo.title}</h4>
              <h4>内容: {todo.content}</h4>
            </div>
          </div>

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
