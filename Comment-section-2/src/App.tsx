import './App.css'
import NestedComments from './components/NestedComments'
import commentsData from'./data/comment.json';

function App() {
  return (
    <div>
      <h1>Nested Comment System</h1>
      <NestedComments
        comments={commentsData}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onUpvote={() => {}}
        onDownVote={() => {}}
      />
    </div>
  )
}

export default App
