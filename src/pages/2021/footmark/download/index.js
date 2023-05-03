import React, { useRef, useEffect, useState } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import copy from 'copy-to-clipboard'
import { collectEvent, bluedCollectEvent } from '@utils/utils'
import { imgConfig } from './constants'
import { sethandleHeaders } from '@utils/headers'

import DownloadApp from '@components/Download-app'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const downappRef = useRef()
  const commonTitle = '2021记忆罐头-站外'
  const [shareToken, setShareToken] = useState('')
  const initUrl = config.nodeEnv === 'production' ? 'https://finka-h5.finkapp.cn' : 'https://finka-h5-qa.wowkaka.cn'
  const url = {
    // 应用宝地址
    yybUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cupidapp.live&ckey=CK1507226084937&android_schema=',
    // 页面地址
    pageUrl: 'finka2020://webview/openNew?url=' + initUrl + '/hd/2021/footmark/home',
    // 安卓下载地址
    androidDownUrl: 'https://datarangers.finkapp.cn/s/lU8PVD9R',
    // ios地址
    //iosUrl: 'finka2020://webview/openNew?url=' + initUrl + '/hd/2021/footmark/home',
    iosUrl: 'https://finkapp.cn/native/universal-link-fi?url=' + initUrl + '/hd/2021/footmark/home',
  }
  //点击打开翻咔
  const handleDownload = () => {
    copy(shareToken)
    downappRef.current.downloadApp()
    collectEvent('WebClick', {
      element_content: '打开App',
      title: commonTitle,
      os_name: config?.android ? 'android' : 'ios',
    })
    bluedCollectEvent({
      event: 'H5_BTN_CLICK',
      page_name: '2021_MEMORY_CAN_OUTSIDE',
      name: '2021_MEMORY_CAN_OPEN_APP',
    })
  }

  // 列表数据
  const getCodeData = () => {
    fetch(`/api/2021/activity/footmark/share`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
    })
      .then((res) => res.json())
      .then((res) => {
        setShareToken(
          res.data?.shareToken ||
            '3http://finka.cn##1d6os@H/bZeyUgn0yuNggj6Vn0OAX8ROvnY/yBOzYsQO0SQJ+EDCqmeAlrKvi87mGZTC5G##'
        )
      })
  }

  useEffect(() => {
    getCodeData()
    collectEvent('predefine_pageview', {
      title: commonTitle,
      os_name: config?.android ? 'android' : 'ios',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: '2021_MEMORY_CAN_OUTSIDE',
    })
  }, [])
  return (
    <Layout>
      <div className='homepage'>
        <img src={imgConfig.logo2} className='homepage-logo' />
        <img src={imgConfig.homeTitle1} className='homepage-title' />
        <img src={imgConfig.homeTitle3} className='homepage-title' />
        <div className='homepage-can'>
          <img src={imgConfig.homeCan} />
          <img src={imgConfig.download} className='homepage-button' onClick={() => handleDownload()} />
          <div className='circleBox' onClick={() => handleDownload()}>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <div className='circle3'></div>
            <div className='circle4'></div>
            <div className='circle5'></div>
          </div>
        </div>
      </div>
      <DownloadApp ref={downappRef} url={url} />
    </Layout>
  )
}
render(<App {...config} />, document.querySelector('#app'))

export default App
