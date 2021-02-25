import React, { useState } from 'react'
import axios from 'axios'
import { Todo } from 'components/Types'
import Router from 'next/router'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import styles from 'styles/components/TodoInput.module.scss'

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
  body: string
  todo_id: number
}

const CommentPostForm: React.FC<TodoItemProps> = ({ todo }) => {
  const classes = useStyles()

  const [commentBody, setCommentBody] = useState('')
  const [isInputted, setIsInputted] = useState(true)
  const handleSubmit = (e) => {
    // 現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまいます。
    // そのため、event.preventDefault()を呼び出し、buttonのデフォルトの動作をキャンセルするのよ。
    e.preventDefault()

    // 空欄だったら追加できないようにしちゃる
    if (!commentBody) {
      setIsInputted(false)
      return
    }

    const data: InputData = {
      body: commentBody,
      todo_id: todo.id,
    }
    // 空欄でない場合に追加押したら警告消す
    setIsInputted(true)

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/comments',
      params: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('TodoInput Post success')
        //  検索欄をクリア
        setCommentBody('')
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
    <div className={styles.todoInputWrapper}>
      {isInputted ? '' : <p style={{ color: 'red' }}>値を入力してください</p>}
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
          //   value={content}
          onChange={(e) => setCommentBody(e.target.value)}
          className={classes.input}
        />
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          コメントを追加
        </Button>
      </form>
    </div>
  )
}
export default CommentPostForm
