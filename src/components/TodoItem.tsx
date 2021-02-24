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
  })
)

type TodoItemProps = {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const classes = useStyles()
  return (
    <>
      <div className={(classes.root, styles.todoItemWrapper)}>
        <Alert
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
          severity="success"
        >
          id:{todo.id}
          内容:{todo.title}
          <p>
            <TodoDeleteButton todo={todo} />
            <Link href={`/todos/${todo.id}`}>
              <button>記事詳細へ</button>
            </Link>
          </p>
        </Alert>
      </div>

      {/* <h5>------------------------------------------</h5>
      <h5>id:{todo.id}</h5>
      <h5>内容:{todo.title}</h5>
      <TodoDeleteButton todo={todo} />
      <Link href={`/todos/${todo.id}`}>
        <button>記事詳細へ</button>
      </Link>
      <h5>------------------------------------------</h5> */}
    </>
  )
}

export default TodoItem
