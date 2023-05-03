import React, { useState } from 'react'
import { Icon, Modal, Toast } from 'antd-mobile'
import PropType from 'prop-types'
import { queryString } from '@utils/utils'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'

import { imgConfig, modelInfo } from '../../constants'

import './index.scss'

const config = window.CONFIG || {}

const headersParams = sethandleHeaders(config)

const VipModelManage = ({ vipRenew = {}, expireDate }) => {
  const [warningVisible, setWarningVisible] = useState(false)
  const [cancelVisible, setCancelVisible] = useState(false)

  const handlerModelManage = () => {
    const params = {
      userCode: config.userId || '',
      contractCode: vipRenew?.contractCode,
    }

    fetch(`/api/2021/vip-buy-android/billingv2/cancel-contract`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setWarningVisible(false)
          setCancelVisible(true)
        } else {
          Toast.fail('取消订阅失败', 1)
        }
      })
  }

  return (
    <div className='manage'>
      <div className='manage__content'>
        <div className='clearfix manage__content-list'>
          <div className='manage__content-left'>VIP会员（自动续费）</div>
          <div
            className='manage__content-right'
            onClick={() => {
              collectEvent('WebClick', {
                os_name: 'android',
                title: '会员订阅详情',
                element_content: '取消',
              })
              setWarningVisible(true)
            }}
          >
            取消
          </div>
        </div>
        <div className='clearfix manage__content-list'>
          <div className='manage__content-left'>下次续费日期</div>
          <div className='manage__content-right'>{expireDate}</div>
        </div>
        <div className='clearfix manage__content-list'>
          <div className='manage__content-left'>下次续费金额</div>
          <div className='manage__content-right'>{vipRenew?.contract?.renewPriceCent / 100}元</div>
        </div>
        <div className='clearfix manage__content-list'>
          <div className='manage__content-left'>支付方式</div>
          <div className='manage__content-right'>
            {vipRenew?.contract?.paymentSupplier === 'WECHAT_PAY' ? '微信支付' : '支付宝'}
          </div>
        </div>
        <div className='clearfix manage__content-list'>
          <div className='manage__content-left'>自动续费权益</div>
        </div>
      </div>
      <div className='clearfix manage__panel'>
        <div className='manage__panel-left'>
          <div className='manage__panel-img'>
            <img src={imgConfig.money} />
          </div>
          <div className='manage__panel-font'>超值优惠</div>
          <div className='manage__panel-tip'>开通立享</div>
          <div className='manage__panel-tip'>九五折优惠</div>
        </div>
        <div className='manage__panel-right'>
          <div className='manage__panel-img'>
            <img src={imgConfig.android} />
          </div>
          <div className='manage__panel-font'>智能省心</div>
          <div className='manage__panel-tip'>到期自动续费</div>
          <div className='manage__panel-tip'>随时可取消</div>
        </div>
      </div>
      <Modal visible={warningVisible} className='warning' transparent maskClosable={false} title='' footer={false}>
        <div className='circle'>
          <img src={imgConfig.tanhao} />
        </div>
        <div
          className='close'
          onClick={() => {
            collectEvent('WebClick', {
              os_name: 'android',
              title: '会员订阅详情',
              element_content: '关闭',
            })
            setWarningVisible(false)
          }}
        >
          <Icon type='cross' />
        </div>
        <div className='warningModal'>
          <div className='warningModal__title'>取消自动续费，会员到期后</div>
          <div className='warningModal__title'>将无法享受以下特权</div>
          <div className='warningModal__panel'>
            {modelInfo.map((item, index) => (
              <div key={index} className='warningModal__panel-left'>
                <div className='warningModal__panel-img'>
                  <img src={item.img} />
                </div>
                <div className='warningModal__panel-font'>{item.title}</div>
                <div className='warningModal__panel-tip'>{item.tip1}</div>
                <div className='warningModal__panel-tip'>{item.tip2}</div>
              </div>
            ))}
          </div>
          <div
            className='warningModal__btn'
            onClick={() => {
              collectEvent('WebClick', {
                os_name: 'android',
                title: '会员订阅详情',
                element_content: '再用用看',
              })
              setWarningVisible(false)
            }}
          >
            再用用看
          </div>

          <div
            className='warningModal__cancel'
            onClick={() => {
              collectEvent('WebClick', {
                os_name: 'android',
                title: '会员订阅详情',
                element_content: '继续取消',
              })
              handlerModelManage()
            }}
          >
            继续取消
          </div>
        </div>
      </Modal>

      <Modal visible={cancelVisible} className='cancel' transparent maskClosable={false} title='' footer={false}>
        <div className='cancelModal'>
          <div className='cancelModal__title'>您已成功取消自动续费服务</div>
          <div
            className='cancelModal__btn'
            onClick={() => {
              setCancelVisible(false)
              window.location.reload()
            }}
          >
            我知道了
          </div>
        </div>
      </Modal>
    </div>
  )
}

VipModelManage.propTypes = {
  visible: PropType.bool,
  vipRenew: PropType.object,
  expireDate: PropType.string,
}

export default VipModelManage
