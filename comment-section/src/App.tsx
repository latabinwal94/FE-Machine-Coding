import { useState } from 'react'
import Comment from './components/comment'
import commentsData from './data/comment'

const updateComment = (id, newComment, comments) => {
  const commentsCopy = JSON.parse(JSON.stringify(comments))
  for(const comment of commentsCopy) {
    if(comment.id === id) {
      comment.subComment.push({
        id: new Date().getTime(),
        comment: newComment,
        subComment: []
      })
    }
    if(comment.subComment.length > 0) {
      comment.subComment = updateComment(id, newComment, comment.subComment)
    }
  }
  return commentsCopy
}

function App() {
  const [comments, setComments] = useState(commentsData)
  const addNewReply = (targetId, newComment) => {
    const newUpdatedComment = updateComment(targetId, newComment, comments)
    setComments(newUpdatedComment)
  }
  return (
   <div>
    <Comment commentsData={comments} addNewReply={addNewReply} />
   </div>
  )
}

export default App
