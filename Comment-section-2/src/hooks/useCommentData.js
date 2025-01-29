import { useState } from "react"

const useCommentData = (comments) => {
    const [commentData, setComments] = useState(comments)

    const insertNode = (tree, commentId, content) => {
        return tree.map((comment) => {
            if(comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, content]
                }
            } else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: insertNode(comment.replies, commentId, content)
                }
            }
            return comment
        })
    }

    const insertComment = (commentId, content) => {
        const newComment = {
            id: Date.now(),
            content,
            vote: 0,
            replies: []
        }
        if(commentId) {
            setComments(prevComment => insertNode(prevComment, commentId, newComment))
        } else {
            setComments(prevComment => [newComment, ...prevComment])
        }
    }

    const editNode = (tree, commentId, content) => {
        return tree.map((comment) => {
            if(comment.id === commentId) {
                return {
                    ...comment,
                    content
                }
            } else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: editNode(comment.replies, commentId, content)
                }
            }
            return comment
        })
    }

    const deleteNode = (tree, commentId) => {
        return tree.reduce((acc, comment) => {
            if(comment.id === commentId) {
                
                return acc
            } else if (comment.replies && comment.replies.length > 0) {
                comment.replies = deleteNode(comment.replies, commentId);
            }
            return [...acc, comment]
        },[])
    }


    const editComment = (commentId, content) => {
        setComments(prevComment => editNode(prevComment, commentId, content))
    }

    const deleteComment = (commentId) => {
        setComments(prevComment => deleteNode(prevComment, commentId))
    }

    return {
        commentData,
        insertComment,
        editComment,
        deleteComment
    }
}

export default useCommentData