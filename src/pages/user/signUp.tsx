import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authSlice from 'ducks/auth/slice'
import { saveAuthToken } from 'utils/tokenStorage'
import axios from 'axios'
import Router from 'next/router'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  formFirst: {
    paddingTop: '50px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const signUp: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isConfirm, setIsConfirm] = useState(true)
  const [isInputted, setIsInputted] = useState(true)

  type InputData = {
    name: string
    email: string
    password: string
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 空欄だったら追加できないようにしちゃる
    if (!(name && email && password && confirmPassword)) {
      setIsInputted(false)
      return
    }

    // 空欄でない場合に押したら警告消す
    setIsInputted(true)

    if (!(password == confirmPassword)) {
      setIsConfirm(false)
      return
    }

    // パス一致している場合に押したら警告消す
    setIsConfirm(true)

    const data: InputData = {
      name: name,
      email: email,
      password: password,
    }

    axios({
      method: 'post',
      url: `${process.env.endPoint}/api/register`,
      params: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        saveAuthToken(res.data.api_token, res.data.email, res.data.name)
        dispatch(authSlice.actions.loggedIn())
        // ページ遷移させる
        Router.push('/todos')
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <form
                className={(classes.form, classes.formFirst)}
                noValidate
                onSubmit={enterEvent}
              >
                <TextField
                  autoComplete="fname"
                  name="Name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.form} noValidate onSubmit={enterEvent}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.form} noValidate onSubmit={enterEvent}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.form} noValidate onSubmit={enterEvent}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </form>
            </Grid>
          </Grid>
          {isInputted ? (
            ''
          ) : (
            <p style={{ color: 'red' }}>値を入力してください</p>
          )}
          {isConfirm ? (
            ''
          ) : (
            <p style={{ color: 'red' }}>パスワードが一致しません</p>
          )}
          <Button
            //   type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/user/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  )
}
export default signUp
