import React, { useState, useEffect } from 'react'
import { bgimg } from '../constants'
import PropType from 'prop-types'

const Progress = ({ setIsProgress }) => {
  const [progressNum, setProgressNum] = useState(0)

  useEffect(() => {
    bgimg.forEach((v, idx, arr) => {
      var img = new Image()
      img.src = v
      img.onload = () => {
        arr.successLength = (arr.successLength || 0) + 1
        let progress = Math.ceil((arr.successLength / arr.length) * 100)
        setProgressNum(progress)
        if (progress === 100) {
          setIsProgress(false)
        }
      }
    })
  }, [])
  return (
    <div className='progress'>
      <div className='progress-box'>
        <div className='progress-box__right'>{progressNum}%</div>
        <div className='progress-box__left'>
          <div className='progress-box__bar' style={{ width: progressNum + '%' }}></div>
        </div>
      </div>
    </div>
  )
}
Progress.propTypes = {
  setIsProgress: PropType.bool,
}
export default Progress
