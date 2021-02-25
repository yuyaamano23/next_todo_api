import React, { useState } from 'react'
import { Todo } from 'components/Types'
import axios from 'axios'
import Router from 'next/router'

import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import styles from 'styles/components/TodoEdit.module.scss'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& > *': {
        marginTop: '25px',
        width: '85%',
      },
    },
    input: {
      backgroundColor: 'white',
    },
    button: {
      marginTop: '15px',
      marginBottom: '15px',
    },
  })
)

type TodoItemProps = {
  todo: Todo
}

type InputData = {
  title: string
  content: string
}

const TodoEdit: React.FC<TodoItemProps> = ({ todo }) => {
  const classes = useStyles()

  const [title, setTitle] = useState(todo.title)
  const [content, setContent] = useState(todo.content)
  const [isInputted, setIsInputted] = useState(true)

  const handleSubmit = (e) => {
    // 現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまいます。
    // そのため、event.preventDefault()を呼び出し、buttonのデフォルトの動作をキャンセルするのよ。
    e.preventDefault()

    // 空欄だったら追加できないようにしちゃる
    if (!(title && content)) {
      setIsInputted(false)
      return
    }

    const data: InputData = {
      title: title,
      content: content,
    }

    axios({
      method: 'put',
      url: `http://localhost:8000/api/todos/${todo.id}`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('Edit success')
        setTitle('')
        setContent('')
        // ページ更新させる
        Router.push(`/todos/${todo.id}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Enter（リターン）キーの発火イベント動作
  const enterEvent = (e) => {
    console.log('enter event')
    handleSubmit(e)
    return false
  }

  return (
    <>
      <div className={styles.todoEditWrapper}>
        {isInputted ? '' : <p style={{ color: 'red' }}>値を入力してください</p>}
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={enterEvent}
        >
          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={classes.input}
          />
        </form>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={enterEvent}
        >
          <TextField
            id="outlined-basic"
            label="content"
            variant="outlined"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={classes.input}
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            編集
          </Button>
        </form>
      </div>
    </>
  )
}

export default TodoEdit
