import React, { useState } from 'react'
import { imgConfig } from '../constants'
import PropType from 'prop-types'
import { collectEvent } from '@utils/utils'

const VipTab = ({ priceList = [], setCurrentPrice }) => {
  const [isToggleOn, setIsToggleOn] = useState(true)

  return (
    <div className='tab_box'>
      <div className='tab'>
        <div
          onClick={() => {
            setIsToggleOn(true)
            setCurrentPrice(priceList[1])
            collectEvent('WebClick', {
              os_name: 'ios',
              title: '翻咔会员限时6.1折',
              element_content: '12个月',
            })
          }}
          className='change_box'
        ></div>
        <div
          onClick={() => {
            setIsToggleOn(false)
            setCurrentPrice(priceList[0])
            collectEvent('WebClick', {
              os_name: 'ios',
              title: '翻咔会员限时6.1折',
              element_content: '3个月',
            })
          }}
          className='change_box'
        ></div>
      </div>
      <div className='tab_img'>
        <div className={isToggleOn ? 'active' : 'none'}>
          <img src={imgConfig.selectedYearImg} />
          <p className='ios_text'>到期按298元自动续费，可随时取消。优惠折扣仅限参与1次 </p>
        </div>
        <div className={isToggleOn ? 'none' : 'active'}>
          <img src={imgConfig.selectedMonthImg} />
          <p className='ios_text'>到期按88元自动续费，可随时取消。优惠折扣仅限参与1次 </p>
        </div>
      </div>
    </div>
  )
}

VipTab.propTypes = {
  priceList: PropType.array,
  setCurrentPrice: PropType.func,
}

export default VipTab
