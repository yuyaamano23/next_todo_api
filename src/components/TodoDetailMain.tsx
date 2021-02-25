import React, { useState } from 'react'
import { Todo } from 'components/Types'
import TodoEdit from 'components/TodoEdit'
import TodoDeleteButton from 'components/UIkit/TodoDeleteButton'
import EditIcon from '@material-ui/icons/Edit'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import CommentPostForm from 'components/CommentPostForm'
import styles from 'styles/components/TodoDetailMain.module.scss'

type TodoItemProps = {
  todo: Todo
}

const TodoDetailMain: React.FC<TodoItemProps> = ({ todo }) => {
  const [isTodoEditOpen, setIsTodoEditOpen] = useState(true)
  const [isCommentPostOpen, setIsCommentPostOpen] = useState(true)
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
            onClick={() => {
              setIsTodoEditOpen(!isTodoEditOpen)
              setIsCommentPostOpen(true)
            }}
          />

          <InsertCommentIcon
            fontSize="large"
            className={styles.commentIcon}
            onClick={() => {
              setIsCommentPostOpen(!isCommentPostOpen)
              setIsTodoEditOpen(true)
            }}
          />

          <div className={isTodoEditOpen ? styles.formVisible : ''}>
            <TodoEdit todo={todo} />
          </div>

          <div className={isCommentPostOpen ? styles.formVisible : ''}>
            <CommentPostForm todo={todo} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoDetailMain
