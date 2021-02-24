import React, { useState } from 'react'
import axios from 'axios'
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

type InputData = {
  title: string
  content: string
}

const TodoInput: React.FC = () => {
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
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
    // 空欄でない場合に追加押したら警告消す
    setIsInputted(true)

    axios({
      method: 'post',
      url: 'http://localhost:8000/api/todos',
      params: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('TodoInput Post success')
        //  検索欄をクリア
        setTitle('')
        setContent('')
        // ページ更新させる
        Router.push('/todos')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className={styles.todoInputWrapper}>
      {isInputted ? '' : <p style={{ color: 'red' }}>値を入力してください</p>}
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="title"
          variant="outlined"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={classes.input}
        />
        <TextField
          id="outlined-basic"
          label="content"
          variant="outlined"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={classes.input}
        />
      </form>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        追加
      </Button>
    </div>
  )
}
export default TodoInput
