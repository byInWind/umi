import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import moment from 'moment'
import { collectEvent, bluedCollectEvent } from '@utils/utils'
import { imgConfig } from './constants'

import './index.scss'

const config = window.CONFIG || {}

const domainUrl = config.nodeEnv === 'production' ? 'https://finka-h5.finka.cn' : 'https://finka-h5-qa.wowkaka.cn'
const url = `${domainUrl}/hd/2022/valentine?closeFirst=1`
const title = '情人节默契大挑战'
const name = '2022_VALENTINE_POPUP'
const App = () => {
  const [imageUrl, setImageUrl] = useState('https://pic.finkapp.cn/uP2Mjf_QiKtqRPIj7cLlMQ')

  const handleClick = () => {
    collectEvent('WebClick', {
      title: title,
      element_content: '开始默契大挑战',
      os_name: config?.android ? 'android' : 'ios',
    })
    bluedCollectEvent({
      event: 'H5_BTN_CLICK',
      page_name: '2022_VALENTINE_VIEW_MEMORIES',
      name: name,
    })
    location.href = `finka2020://webview/openNew?url=${url}`
  }
  useEffect(() => {
    document.title = '情人节默契大挑战'
    collectEvent('predefine_pageview', {
      title: title,
      os_name: config?.android ? 'android' : 'ios',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: name,
    })

    const time = moment().unix()
    const valentineTime = moment('2022-02-14 00:00:00').unix()

    if (time >= valentineTime) {
      setImageUrl('https://pic.finkapp.cn/BsqL-34mJBVqRPIj7cLlMQ')
    }
  }, [])
  return (
    <Layout>
      <div className='main'>
        <div className='pasteboard-copy'>
          <img
            src={imgConfig.close}
            className='pasteboard-close'
            onClick={() => {
              collectEvent('WebClick', {
                title: title,
                element_content: '关闭',
                os_name: config?.android ? 'android' : 'ios',
              })
              bluedCollectEvent({
                event: 'H5_BTN_CLICK',
                page_name: '2022_VALENTINE_CLOSE',
                name: name,
              })
              location.href = 'finka2020://webview/close'
            }}
          />
          <img
            src={imageUrl}
            className='pasteboard-copy__content'
            onClick={() => {
              handleClick()
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
