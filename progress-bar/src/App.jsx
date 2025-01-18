import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Progressbar from './components/Progressbar'

function App() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let timer = setInterval(() => {
      setValue((prevVal) => prevVal + 1)
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])
  
  return (
    <div className='app'>
      <span>Progress Bar</span>
      <Progressbar value={value} />
    </div>
  )
}

export default App
