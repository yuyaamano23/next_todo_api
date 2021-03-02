import React, { useState } from 'react'
import axios from 'axios'
import TodoItem from 'components/TodoItem'

import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import styles from 'styles/components/TodoSearch.module.scss'

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

const TodoSearch: React.FC = () => {
  const classes = useStyles()

  const [keyword, setKeyword] = useState<string>('')
  const [resData, setResData] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios({
      method: 'get',
      url: `${process.env.endPoint}/api/todo/search`,
      params: { keyword: keyword },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Search success')
        //  検索欄をクリア
        setKeyword('')
        // 検索結果をセットする
        setResData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Enter（リターン）キーの発火イベント動作
  const enterEvent = (e) => {
    handleSubmit(e)
    return false
  }

  return (
    <div className={styles.todoSearchWrapper}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={enterEvent}
      >
        <TextField
          id="outlined-basic"
          label="keyword"
          variant="outlined"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={classes.input}
        />
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          検索
        </Button>
      </form>
      {resData.map((data) => (
        <TodoItem key={data.id} todo={data} />
      ))}
    </div>
  )
}
export default TodoSearch
