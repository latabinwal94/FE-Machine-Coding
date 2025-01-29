import React, { useState } from 'react'

const Comment = ({ comment, handleReply, onEditComment, onDeleteComment }) => {
    const [expand, setExpend] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [replyContent, setReplyContent] = useState("")
    const[ editContent, setEditContent] = useState('')

    const toggleExpand = () => {
        setExpend(!expand)
    }
    const handleChange = (e) => {
        setReplyContent(e.target.value)
    }

    const handleReplySubmit = () => {
        if (replyContent) {
            handleReply(comment.id, replyContent)
            setReplyContent('')
        }
    }

    const handleEdit = () => {
        setToggleEdit(!toggleEdit)
        setEditContent(comment.content)
    }

    const handleChangeEdit = (e) => {
      setEditContent(e.target.value)
    }

    const handleEditSubmit = () => {
      onEditComment(comment.id, editContent);
      setToggleEdit(false);
    };

    const handleCancelEditComment = () => {
      setToggleEdit(false);
    };

    const handleDeleteComment = () => {
      onDeleteComment(comment.id);
      setToggleEdit(false);
    }
  

    return (
        <div className='comment'>
            <>
            {toggleEdit 
                ? <div className='comment-edit'>
                    <textarea cols="50" rows="3" value={editContent} onChange={handleChangeEdit} className='comment-text'/>
                    <button className='comment-button' onClick={handleEditSubmit}>Save Comment</button>
                    <button className='comment-button' onClick={handleCancelEditComment}>Cancel Comment</button>
                </div>
                : <p className='comment-content'>{comment.content}</p>
            }
                <p className='comment-info'>Votes: {comment.vote}</p>
            </>
            <div className='comment-actions'>
                <button className='comment-button' onClick={toggleExpand}>{expand ? 'Hide reply' : 'Reply'}</button>
                <button className='comment-button' onClick={handleEdit}>Edit</button>
                <button className='comment-button' onClick={handleDeleteComment}>Delete</button>
            </div>
            {expand &&
                <div>
                    <div className='comment-reply'>
                        <textarea
                            className='comment-text'
                            value={replyContent}
                            rows='6'
                            cols='50'
                            placeholder='Add a new comment'
                            onChange={handleChange}
                        />
                        <button className='comment-button' onClick={handleReplySubmit}>Add Comment</button>
                    </div>
                    {comment?.replies?.map((reply) => {
                        return <Comment key={reply.id} comment={reply} handleReply={handleReply} onEditComment={onEditComment} onDeleteComment={onDeleteComment}/>
                    }
                    )}
                </div>
            }
        </div>
    )
}

export default Comment
