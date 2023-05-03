import React, { useEffect, useState } from 'react'
import PropType from 'prop-types'
import { collectEvent } from '../../../../../utils/utils'

import './index.scss'

const VipPrice = ({ priceList = [], setCurrentPrice }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeItem, setActiveItem] = useState({})
  const renderOriginPrice = (originPrice, price) => {
    if (originPrice <= 0 || originPrice == price) {
      return <div className='vip-price__original'></div>
    } else {
      return <div className='vip-price__original'>¥{originPrice >= 1000 ? originPrice / 100 : originPrice}</div>
    }
  }

  const handleClick = (item, activeIndex) => {
    setCurrentPrice(item)
    setActiveItem(item)
    setActiveIndex(activeIndex)
    collectEvent('WebClick', {
      title: '我的会员页',
      button_name: item.name,
    })
  }

  useEffect(() => {
    setActiveItem(priceList[activeIndex])
    setCurrentPrice(priceList[activeIndex])
    setActiveIndex(activeIndex)
  }, [priceList])

  return (
    <>
      <ul className='vip' style={{ width: `${7.6 + 2.61 * (priceList.length - 3)}rem` }}>
        {priceList?.map((item, index) => (
          <li
            onClick={() => handleClick(item, index)}
            key={index}
            className={`vip-price  ${activeIndex === index ? 'active-border' : ''}`}
          >
            {item.cornerMark?.cornerImgUrlDesc && (
              <div className={`vip-price__discount ${activeIndex === index ? 'active-discount' : ''}`}>
                {item.cornerMark?.cornerImgUrlDesc}
              </div>
            )}
            <div className={`vip-price__time ${activeIndex === index ? 'active-fontColor' : ''}`}>{item.name}</div>
            <div className={`vip-price__price ${activeIndex === index ? 'active-fontColor' : ''}`}>
              <span className='vip-price__price-unit'>¥</span>
              <span className='vip-price__price-number'>{item.price}</span>
            </div>
            {renderOriginPrice(item?.crossedPrice || item?.originPrice, item?.price)}
            <div className={`vip-price__average ${activeIndex === index ? 'active-fontColor' : ''}`}>
              ¥{item.perMonthPrice}/月
            </div>
          </li>
        ))}
      </ul>
      <div className='vip__tip'>{activeItem?.description || ''}</div>
    </>
  )
}

VipPrice.propTypes = {
  priceList: PropType.array,
  setCurrentPrice: PropType.func,
}

export default VipPrice
