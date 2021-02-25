import React from 'react'
import { Comment } from 'components/Types'
import CommentDeleteButton from 'components/UIkit/CommentDeleteButton'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import Alert from '@material-ui/lab/Alert'
import styles from 'styles/components/CommentItem.module.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    commentIcon: {
      marginTop: '3px',
    },
  })
)

type CommentItemProps = {
  comment: Comment
}

const TodoItem: React.FC<CommentItemProps> = ({ comment }) => {
  const classes = useStyles()
  return (
    <div className={(classes.root, styles.commentItemWrapper)}>
      <Alert
        icon={
          <InsertCommentIcon
            className={classes.commentIcon}
            fontSize="default"
          />
        }
        severity="info"
      >
        <div className={styles.content}>
          <p>{comment.body}</p>
          <div className={styles.commentItemDeleteButton}>
            <CommentDeleteButton comment={comment} />
          </div>
        </div>
      </Alert>
    </div>
  )
}

export default TodoItem
