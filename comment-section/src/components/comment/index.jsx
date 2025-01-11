import React, { useState } from 'react'
import styles from './styles.module.css'

const CommentItem = ({ comment, addNewReply }) => {
  const [showReply, toggleReply] = useState(false)
  const [showAddReply, toggleAddReply] = useState(false)


  const addComment = (e) => {
    const newComment = e.target.value
    addNewReply(comment.id, newComment)
    toggleAddReply(false)
    toggleReply(true)
  }

  const handleBlur = (e) => {
    addComment(e)
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter' || e.keyCode == 13) {
      addComment(e)
    }
  }
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentDetail}>
        <div>{comment.comment}</div>
        <div className={styles.controls}>
          {comment.subComment.length > 0 && <span onClick={() => toggleReply(!showReply)}>View Reply</span>}
          <span onClick={() => {toggleAddReply(!showAddReply)}}>Add Reply</span>
        </div>
      </div>
      {showReply &&
        <Comment commentsData={comment.subComment} addNewReply={addNewReply}/>
      }
      {showAddReply &&
        <input
          type='text'
          autoFocus
          className={styles.replyBox}
          placeholder='Enter your reply'
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      }
    </div>
  )
}

const Comment = ({ commentsData, addNewReply }) => {
  return (
    <>
     {commentsData?.map((comment)=> <CommentItem key={comment.id} comment={comment} addNewReply={addNewReply} />)}
    </>
  )
}

export default Comment
