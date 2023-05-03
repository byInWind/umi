import React, { useEffect } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { collectEvent } from '@utils/utils'
import { imgConfig } from './constants'
import { bluedCollectEvent } from './util'
import './index.scss'

const config = window.CONFIG || {}

const App = () => {
  useEffect(() => {
    collectEvent('predefine_pageview', {
      title: '小蓝导流页',
      url: window.location.href,
    })

    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'BLUED_FINKA_NEW_USER_CAMPAIGN',
    })
  }, [])

  return (
    <div className='wrapper'>
      <Layout>
        <div className='drainage'>
          <div className='drainage__content'>
            <img className='drainage__content-imgBg' src={imgConfig.bg} />
            <img className='drainage__content-imgContent' src={imgConfig.content} />
            <div className='drainage__content-handle'>
              <div
                onClick={() => {
                  collectEvent('WebClick', {
                    title: '小蓝导流页',
                    url: window.location.href,
                    element_content: '下载',
                  })
                  bluedCollectEvent({
                    event: 'H5_BTN_CLICK',
                    name: 'BLUED_FINKA_NEW_USER_CAMPAIGN_DOWNLOAD_CLICK',
                  })
                }}
                id='downloadButton'
                className='drainage__content-btn'
              >
                立即下载
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
