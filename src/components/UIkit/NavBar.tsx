import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useDispatch } from 'react-redux'
import authSlice from 'ducks/auth/slice'
import { useAuthState } from 'ducks/auth/selectors'
import { removeAuthToken, getUserName } from 'utils/tokenStorage'

import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import PersonIcon from '@material-ui/icons/Person'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      textAlign: 'center',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    menuButton: {
      // marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    appBarMenuItem: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    appBarMenuItemLink: {
      color: 'white',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    userProfile: {
      textAlign: 'center',
    },
    userName: {
      fontSize: '20px',
      paddingTop: '5px',
    },
    san: {
      fontSize: '10px',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
    },
  })
)

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const NavBar: React.FC<Props> = (props) => {
  const [userName, setUserName] = React.useState('ゲストユーザ')

  React.useEffect(() => {
    const name = getUserName()
    setUserName(name)
  }, [])
  const dispatch = useDispatch()
  const state = useAuthState().auth

  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const onClickLoggedOut = () => {
    removeAuthToken()
    dispatch(authSlice.actions.loggedOut())
    location.reload()
  }

  const MENU_LIST = [
    {
      title: 'TODOS',
      icon: <FormatListBulletedIcon />,
      href: '/todos',
    },
    {
      title: 'MYPAGE',
      icon: <PersonIcon />,
      href: '/user/mypage',
    },
    state.isLoggedIn
      ? {
          title: 'LOGOUT',
          icon: <ExitToAppIcon />,
          href: '/todos',
        }
      : {
          title: 'LOGIN',
          icon: <ExitToAppIcon />,
          href: '/user/signIn',
        },
    state.isLoggedIn
      ? {
          title: '',
          icon: null,
          href: '',
        }
      : {
          title: 'SIGNUP',
          icon: <ExitToAppIcon />,
          href: '/user/signUp',
        },
  ]

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className={classes.userProfile}>
          {state.isLoggedIn ? (
            <div className={classes.userName}>{userName}</div>
          ) : (
            <div className={classes.userName}>ゲストユーザー</div>
          )}
          <span className={classes.san}>さん</span>
        </div>
      </div>
      <Divider />
      <List>
        {MENU_LIST.map(({ title, icon, href }) => (
          <ListItem
            button
            key={title}
            onClick={() => {
              setMobileOpen(false)
              router.push(href)
              if (title == 'LOGOUT') {
                onClickLoggedOut()
              }
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{
              margin: '0 auto',
              paddingRight: '15px',
            }}
          >
            Hello, ToDoList👋
          </Typography>
          {MENU_LIST.map(({ title, href }) => {
            return (
              <Typography className={classes.appBarMenuItem} key={title} noWrap>
                <Link href={href}>
                  <span className={classes.appBarMenuItemLink}>{title}</span>
                </Link>
              </Typography>
            )
          })}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.toolbar} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  )
}
export default NavBar
