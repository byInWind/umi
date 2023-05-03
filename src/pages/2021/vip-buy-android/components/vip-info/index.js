import React, { useState } from 'react'
import { Popover } from 'antd-mobile'
import { collectEvent, greaterThanCurrentVersion } from '../../../../../utils/utils'
import { imgConfig } from '../../constants'

import './index.scss'

const config = window.CONFIG || {}

const VipInfo = (info) => {
  const Item = Popover.Item
  const [visible, setVisible] = useState(false)
  const handleVisibleChange = (visible) => {
    collectEvent('WebClick', {
      title: '我的会员页',
      element_content: '广告特权',
    })
    setVisible(visible)
  }

  const rendermarkTab = () => {
    return (
      <>
        广告特权
        <Popover
          visible={visible}
          placement='bottomRight'
          onVisibleChange={handleVisibleChange}
          overlayClassName='fortest'
          overlay={[
            <Item key='6' style={{ height: 189, width: 173, margin: 0 }}>
              <div className='mark-text'>
                <p className='mark-text__p'>vip会员用户专享广告特权，为您消除开屏广告及信息流广告的打扰</p>
                <p>注：部分与翻咔有单独合作的第三方品牌，仍可能向您提供不同类型的广告服务，可手动关闭，敬请谅解</p>
              </div>
            </Item>,
          ]}
        >
          <img className='mark-img' src={visible ? imgConfig.markActive : imgConfig.mark} />
        </Popover>
      </>
    )
  }
  const renderImg = () => {
    return <img className='mark-img-new' src={imgConfig.new} />
  }

  const renderList = (item, index) => {
    const jsx = (
      <>
        <li key={index} className='vip-wapper'>
          <div className='vip-info'>
            <div className='vip-info__left'>
              <div className='vip-info__left-img'>
                <img src={item.img} />
                {item.title === '广告特权' ? renderImg() : ''}
              </div>
            </div>
            <div className='vip-info__right'>
              <div className='vip-info__right-title'>{item.title === '广告特权' ? rendermarkTab() : item.title}</div>
              <div className='vip-info__right-tip'>{item.tip1}</div>
              <div className='vip-info__right-tip'>{item.tip2}</div>
            </div>
          </div>
        </li>
      </>
    )
    // android安卓1.5.8 ios 5.9.2才支持免广告

    if (!config.IOS) {
      if (!greaterThanCurrentVersion(config.version, '1.5.8')) {
        if (item.version === false) {
          return jsx
        }
      } else {
        return jsx
      }
    } else {
      if (!greaterThanCurrentVersion(config.version, '5.9.2')) {
        if (item.version === false) {
          return jsx
        }
      } else {
        return jsx
      }
    }
  }
  return (
    <ul>
      {info.map((item, index) => (
        <React.Fragment key={index}>{renderList(item, index)}</React.Fragment>
      ))}
    </ul>
  )
}

export default VipInfo
