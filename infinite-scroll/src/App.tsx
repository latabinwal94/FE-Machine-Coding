import { useCallback, useRef, useState } from 'react'
import InfiniteScroll from './InfiniteScroll'

function App() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const controllerRef = useRef(null)
  const handleInput = useCallback((e) => {
    setData([])
    setQuery(e.target.value)
  }, [])

  const getData = useCallback((query, pageNumber) => {
    return new Promise(async(resolve, reject) => {
      try {
        if(controllerRef.current) controllerRef.current.abort()
        controllerRef.current = new AbortController()
        const promise =  await fetch('https://openlibrary.org/search.json?' + new URLSearchParams({
          q: query,
          page: pageNumber
        }), { signal: controllerRef.current.signal })
        const data = await promise.json() || []
        console.log(data, 'data')
        setData((prevData) => [...prevData, ...data?.docs])
        resolve()
      } catch(e) {
        console.log(e)
        reject()
      }
    })
  },[])

  const renderList = useCallback(({title}, key, ref) => {
    return <div ref={ref} key={key}>{title}</div>
  }, [])
  return (
    <>
      <input type='text' onChange={handleInput}/>
      <InfiniteScroll
        renderListItem={renderList}
        getData={getData}
        listData={data}
        query={query}
        />
    </>
  )
}

export default App
