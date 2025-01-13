import React, { useCallback, useEffect, useRef, useState } from 'react'

const InfiniteScroll = (props) => {
    const { renderListItem, getData, query, listData } = props
    const pageNumber = useRef(1)
    const [loading, setLoading] = useState(false)
    const observer = useRef(null)
    const lastElemObserver = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                pageNumber.current += 1
                setLoading(true)
                getData(query, pageNumber.current)
                    .finally(() => {
                        setLoading(false)
                    })
            }
        })
        if(node) observer.current.observe(node)
    })
    useEffect(() => {
        setLoading(true)
        getData(query, pageNumber.current)
            .finally(() => {
                setLoading(false)
            })
    }, [query])

    const renderList = useCallback(() => {
        return listData.map((data, index) => {
            if (index === listData.length - 1) return renderListItem(data, index, lastElemObserver)
            return renderListItem(data, index, null)
        })
    })

    return (
        <>
            {renderList()}
            {loading && <div>Loading....</div>}
        </>
    )
}

export default InfiniteScroll
