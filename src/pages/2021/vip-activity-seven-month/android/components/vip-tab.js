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
              os_name: 'android',
              title: '2021会员6.1折活动页',
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
              os_name: 'android',
              title: '2021会员6.1折活动页',
              element_content: '3个月',
            })
          }}
          className='change_box'
        ></div>
      </div>
      <div className='tab_img'>
        <img className={isToggleOn ? 'active' : 'none'} src={imgConfig.selectedYearImg} />
        <img className={isToggleOn ? 'none' : 'active'} src={imgConfig.selectedMonthImg} />
      </div>
    </div>
  )
}

VipTab.propTypes = {
  priceList: PropType.array,
  setCurrentPrice: PropType.func,
}

export default VipTab
