import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import TodoSearch from 'components/TodoSearch'
import { Todo } from 'components/Types'
import TodoList from 'components/TodoList'
import TodoInput from 'components/TodoInput'

import styles from 'styles/components/UIkit/Tabs.module.scss'

type TodoListProps = {
  todos: Todo[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      className={styles.TodosBodyWrapper}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

const ScrollableTabsButtonForce: React.FC<TodoListProps> = ({ todos }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          //   scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Todos"
            icon={<FormatListBulletedIcon />}
            {...a11yProps(0)}
          />
          <Tab label="Search" icon={<SearchIcon />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          <TodoInput />
          <TodoList todos={todos} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TodoSearch />
      </TabPanel>
    </div>
  )
}
export default ScrollableTabsButtonForce
