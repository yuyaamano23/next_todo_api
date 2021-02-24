import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import SearchIcon from '@material-ui/icons/Search'

import styles from 'styles/components/UIkit/Tabs.module.scss'

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

const ScrollableTabsButtonForce: React.FC<{
  updateTabsStateToTodos: () => void
  updateTabsStateToSearch: () => void
}> = ({ updateTabsStateToTodos, updateTabsStateToSearch }) => {
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
            onClick={() => updateTabsStateToTodos()}
          />
          <Tab
            label="Search"
            icon={<SearchIcon />}
            {...a11yProps(1)}
            onClick={() => updateTabsStateToSearch()}
          />
        </Tabs>
      </AppBar>
    </div>
  )
}
export default ScrollableTabsButtonForce
