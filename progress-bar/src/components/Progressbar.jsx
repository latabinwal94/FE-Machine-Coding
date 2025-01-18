import React, { useEffect, useState } from 'react'

const Progressbar = ({value=0}) => {
  const [percent, setPercent] = useState(value)

  useEffect(() => {
    setPercent(Math.min(100, Math.max(value, 0)))
  }, [value])

  return (
    <div className='progress'>
        <span style={{color: percent > 49 ? 'white' : 'black'}}>{percent.toFixed()}%</span>
        <div
          style={{ transform: `scaleX(${percent / 100})`, transformOrigin: 'left' }}
          role='progressbar'
          area-aria-valuemin={0}
          area-aria-valuemax={100}
          area-aria-valuenow={percent}
        />
    </div>
  )
}

export default Progressbar
