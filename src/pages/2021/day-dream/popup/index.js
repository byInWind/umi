import React, { useState, useEffect } from 'react'
import { Toast } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'
import { imgConfig } from './constants'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const domainUrl = config?.nodeEnv === 'production' ? 'https://finka-h5.finka.cn' : 'https://finka-h5.wowkaka.cn'
const imageUrl = config?.nodeEnv === 'production' ? 'https://pic.finkapp.cn/' : 'https://pic.finkapp.cn/t/'

const App = () => {
  const [userAva, setUserAva] = useState()
  const [userName, setUserName] = useState()

  const getQueryVariable = (variable) => {
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      } else {
        return ''
      }
    }
  }
  const handleClick = () => {
    collectEvent('WebClick', {
      title: '白日梦想家口令识别',
      element_content: '立即加入',
    })
    const url =
      encodeURIComponent(`${domainUrl + '/hd/2021/day-dream/invita'}?token=${getQueryVariable('token')}`) +
      `&closeFirst=1`

    location.href = `finka2020://webview/openNew?url=${url}`
  }
  const joinTeamH5Data = () => {
    fetch(`/api/activity/daydreamer-2021/joinTeamH5?token=${getQueryVariable('token')}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        console.log('信息', data)
        setUserAva(`${imageUrl + data.joinTeamH5View[0]?.userAvatarImage.avatarImage.imageId}`)
        setUserName(data.joinTeamH5View[0]?.sendInviteUserNickname)
      })
  }
  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    joinTeamH5Data()
    collectEvent('predefine_pageview', {
      title: '白日梦想家口令识别',
    })
  }, [])
  return (
    <Layout>
      <img
        src={imgConfig.close}
        className='pasteboard-close'
        onClick={() => {
          location.href = 'finka2020://webview/close'
        }}
      />
      <div className='pasteboard-copy'>
        <div className='pasteboard-copy__content'>
          <div
            className='pasteboard-copy__content-avatar'
            style={{
              backgroundImage: `url(${userAva})`,
            }}
          ></div>
          <div>
            <p className='pasteboard-copy__content-title'>{userName} 邀请你加入他的梦想家队伍</p>
            <p className='pasteboard-copy__content-desc'> 中奖后一起去环球影城 </p>
          </div>
          <div>
            <div
              className='pasteboard-copy__btn'
              type='button'
              onClick={() => {
                handleClick()
              }}
            >
              立即加入
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
