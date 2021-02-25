import React from 'react'
import axios from 'axios'
import { Comment } from 'components/Types'
import DeleteIcon from '@material-ui/icons/Delete'
import styles from 'styles/components/UIkit/CommentDeleteButton.module.scss'

type CommentItemProps = {
  comment: Comment
}

const CommentDeleteButton: React.FC<CommentItemProps> = ({ comment }) => {
  const handleDelete = (e) => {
    // ボタンのデフォルトの挙動を葬り去る
    e.preventDefault()

    axios({
      method: 'delete',
      url: `http://localhost:8000/api/comments/${comment.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('comment delete success')
        // ページ更新させる
        // Router.push(`/todos/${comment.todo_id}`)
        // 現在表示されているページをリロードする(route.pushだと削除コメントがまだ残るから。。。おそらくSPA遷移のためリクエストが起きていないのが原因)
        location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <DeleteIcon
      fontSize="large"
      className={styles.deleteIcon}
      onClick={handleDelete}
    >
      コメントを削除
    </DeleteIcon>
  )
}
export default CommentDeleteButton
