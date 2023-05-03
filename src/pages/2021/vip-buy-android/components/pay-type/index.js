import React from 'react'
// import PropType from 'prop-types'
import { collectEvent, greaterThanCurrentVersion } from '../../../../../utils/utils'
import { Icon, Modal } from 'antd-mobile'
import { imgConfig, PAY_TYPE, PAY_TYPE_KEY } from '../../constants'
const config = window.CONFIG || {}
const alert = Modal.operation

const VipPayType = ({ setPayType, setPriceList, wechatPriceList, alipayPriceList, payType }) => {
  const renderPayType = ({ img, title }) => {
    return (
      <div className='vip-buy__payModel clearfix'>
        <div className='vip-buy__payModel-type'>
          <img src={img} />
        </div>
        <div className='vip-buy__payModel-type'>{title}</div>
        <div className='vip-buy__payModel-item'>
          <Icon type='right' />
        </div>
      </div>
    )
  }

  return (
    <div
      className='vip-buy__pay clearfix'
      onClick={() => {
        collectEvent('WebClick', {
          os_name: 'android',
          title: '我的会员页',
          element_content: '切换支付方式',
        })
        return alert([
          {
            text: <div className='vip-buy__pay-title'>选择支付方式</div>,
            onPress: () => {
              setPayType(PAY_TYPE_KEY.Alipay)
              if (greaterThanCurrentVersion(config.version, '1.6.0')) {
                setPriceList(alipayPriceList)
              }
            },
          },
          {
            text: renderPayType({ img: imgConfig.alipay, title: '支付宝' }),
            onPress: () => {
              setPayType(PAY_TYPE_KEY.Alipay)
              if (greaterThanCurrentVersion(config.version, '1.6.0')) {
                setPriceList(alipayPriceList)
              }
            },
          },
          {
            text: renderPayType({ img: imgConfig.wechart, title: '微信支付' }),
            onPress: () => {
              setPayType(PAY_TYPE_KEY.WeixinOpen)
              if (greaterThanCurrentVersion(config.version, '1.6.0')) {
                setPriceList(wechatPriceList)
              }
            },
          },
        ])
      }}
    >
      <div className='vip-buy__pay-type'>支付方式:</div>

      <div className='vip-buy__pay-item'>
        <Icon type='right' />
      </div>
      <div className='vip-buy__pay-item'>{PAY_TYPE[payType]}</div>
    </div>
  )
}

// VipPayType.propTypes = {
//   wechatPriceList: PropType.Array,
//   alipayPriceList: PropType.Array,
//   payType: PropType.Array,
//   setPayType: PropType.func,
//   setPriceList: PropType.func,
//   setCurrentPrice: PropType.func,
// }

export default VipPayType
