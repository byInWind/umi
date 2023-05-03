import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'
import Layout from '@components/layout'
import moment from 'moment'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'
import VipModelManage from './components/vip-model-manage'
import { imgConfig } from './constants'

const config = window.CONFIG || {}
const DATA_FORMAT = 'YYYY-MM-DD'

const headersParams = sethandleHeaders(config)

import './index.scss'

const App = () => {
  const [userStatus, setUserStatus] = useState({ isVip: false })
  const [userAva, setUserAva] = useState('')
  const [vipRenew, setVipRenew] = useState({})

  const getUserStatus = () => {
    fetch(`/api/2021/vip-buy-ios/billing/vip/userStatus?userId=${config?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        if (data.accessToRenewVisitor == false) {
          Toast.fail('您已经成功取消订阅，不可重复操作！', 3)
        }
        setUserAva(
          `https://pic.finkapp.cn/${config?.nodeEnv === 'production' ? '' : 't/'}${
            data.user?.avatarProfile[0]?.avatarImage?.imageId
          }`
        )
        setUserStatus(data)
      })
  }

  const getVipRenew = () => {
    fetch(`/api/2021/vip-buy-ios/billing/vip/vip-renewV3?type=3&userId=${config?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setVipRenew(data)
      })
  }

  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getUserStatus()
    getVipRenew()

    collectEvent('predefine_pageview', {
      os_name: 'android',
      title: '访客订阅详情',
    })
  }, [])

  const expireDate = moment(userStatus?.visitorExpireDate).format(DATA_FORMAT)

  return (
    <div className='wrapper' style={{ backgroundImage: `url(${imgConfig.bg})` }}>
      <Layout>
        <div className='user-info'>
          <div className='user-info__avatar-border' style={{ backgroundImage: `url(${imgConfig.border})` }}>
            <div
              className='user-info__avatar'
              style={{
                backgroundImage: `url(${userAva})`,
              }}
            ></div>
          </div>
          <div className='user-info__right'>
            <span className='user-info__right-name'>{userStatus.user?.name}</span>
            <img className='user-info__right-icon' src={imgConfig.icon} />
            <p className='user-info__right-p'>已开通自动续费</p>
          </div>
        </div>
        <VipModelManage expireDate={expireDate} vipRenew={vipRenew} />
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
