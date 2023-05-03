import React from 'react'
import { imgConfig } from '../../constants'
import 'swiper/css'
import 'swiper/css/navigation'
const SecondPhase = () => {
  return (
    <div className='rule-box'>
      <div className='rule-box__h3'>主播榜·奖励</div>
      <div className='rule-box__img padidng20'>
        <img src={imgConfig.ruleOneIcon2} />
      </div>
      <div className='rule-box__h3 top12'>观众榜·奖励</div>
      <div className='rule-box__img'>
        <img src={imgConfig.ruleOneIcon3} />
      </div>
      <ul className='rule-box__content'>
        <li>
          <p>*【专属头像框】可与一名主播共享</p>
        </li>
      </ul>
    </div>
  )
}

export default SecondPhase
