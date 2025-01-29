import React, { useState } from 'react'
import useCommentData from '../hooks/useCommentData'
import Comment from './Comment'

const NestedComments = ({
  comments
}) => {
  const { commentData, insertComment, editComment, deleteComment } = useCommentData(comments)
  const[comment, setComment] = useState('')

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleReply = (commentId, content) => {
    insertComment(commentId, content)
  }

  const handleSubmit = () => {
    if(comment) {
      // do something
      handleReply(undefined, comment)
      setComment('')
    }
  }

  const handleEditComment = (commentId, content) => {
    editComment(commentId, content)
  }

  return (
    <div>
      <div className='add-comment'>
        <textarea
          className='comment-text'
          value={comment}
          rows='6'
          cols='50'
          placeholder='Add a new comment'
          onChange={handleChange}
        />
        <button className='comment-button' onClick={handleSubmit}>Add Comment</button>
      </div>
      {commentData.map((comment) => {
        return <Comment
          key={comment.id}
          comment={comment}
          handleReply={handleReply}
          onEditComment={handleEditComment}
          onDeleteComment={deleteComment}
        />
      })}
    </div>
  )
}

export default NestedComments
