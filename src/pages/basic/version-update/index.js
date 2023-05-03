import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'

import versionIcon from '@images/basic/versionIcon.png'
import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [versiondata, setVersiondata] = useState()

  const getTaskDetails = () => {
    fetch(`/api/forceUpdate`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setVersiondata(data)
        initPageView(data.window.title)
      })
  }

  const handerClickBut = () => {
    if (config.IOS) {
      window.location.href = 'https://apps.apple.com/cn/app/apple-store/id898533490?mt=8'
      initWebClick()
    } else {
      window.location.href = versiondata?.window.newAppDownloadUrl
      initWebClick()
    }
  }

  // 初始化埋点
  const initPageView = (title) => {
    collectEvent('predefine_pageview', {
      os_name: config.IOS ? 'ios' : 'android',
      title: title,
    })
  }

  // 点击埋点
  const initWebClick = () => {
    collectEvent('WebClick', {
      os_name: config.IOS ? 'ios' : 'android',
      title: versiondata?.window.title,
      element_content: '立即更新',
    })
  }

  useEffect(() => {
    getTaskDetails()
  }, [])

  return (
    <Layout>
      <div className='version'>
        <img src={versionIcon} className='version-icon' />
        <p className='version-text'>{versiondata?.window?.content}</p>
        <div
          className='version-button'
          onClick={() => {
            handerClickBut()
          }}
        >
          立即更新
        </div>
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
