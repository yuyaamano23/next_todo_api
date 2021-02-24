import React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import { Todo } from 'components/Types'
import Link from 'next/link'
import TodoDeleteButton from 'components/UIkit/TodoDeleteButton'

import styles from 'styles/components/TodoItem.module.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    circleIcon: {
      paddingTop: '7px',
    },
  })
)

type TodoItemProps = {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const classes = useStyles()
  return (
    <>
      <Link href={`/todos/${todo.id}`}>
        <div className={(classes.root, styles.todoItemWrapper)}>
          <Alert
            icon={
              <CheckCircleOutlineIcon
                className={classes.circleIcon}
                fontSize="default"
              />
            }
            severity="success"
          >
            <div className={styles.content}>
              id:{todo.id}
              内容:{todo.title}
              <div className={styles.todoItemDeleteButton}>
                <TodoDeleteButton todo={todo} />
              </div>
            </div>
          </Alert>
        </div>
      </Link>
    </>
  )
}

export default TodoItem
