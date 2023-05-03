import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Qs from 'qs'
import Layout from '@components/layout'
import { imgConfig } from './constants'
import FirstPhase from './components/first-phase'

import './index.scss'

const config = window.CONFIG || {}
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [backtopVisible, setBacktopVisible] = useState(false) // 回到顶部按钮

  const goAudiencePage = () => {
    const pageUrl = '/hd/2021/year-carnival/billboard-page?isBanner=' + parameter.isBanner
    location.href = pageUrl
  }

  const handleClickBackTop = () => {
    scrollTo(0, 0)
  }

  const handleScroll = () => {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollTop > 300) {
      setBacktopVisible(true)
    } else {
      setBacktopVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='rule'>
      <Layout>
        <div className='banner'>
          <img src={imgConfig.listIcon} className='banner-img3' onClick={() => goAudiencePage()} />
        </div>
        <FirstPhase />
        <div className={`back-top ${backtopVisible ? 'show' : 'hide'}`}>
          <img src={imgConfig.backTop} onClick={() => handleClickBackTop()} />
        </div>
        <div className='rule-footer'>
          本次活动及所有奖品与苹果公司（APPLE INC）无关
          <br />
          All Rights Reserved Finka
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
