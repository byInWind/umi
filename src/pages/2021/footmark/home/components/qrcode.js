import React from 'react'
import { imgConfig } from '../constants'

const Qrcode = () => {
  return (
    <div>
      <div className='qrCode'>
        <img src={imgConfig.qrCode} />
      </div>
      <div className='sideup'>
        <img src={imgConfig.slideUp} />
      </div>
      <div className='rightPull'>
        <img src={imgConfig.pull} />
      </div>
    </div>
  )
}

export default Qrcode
