import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { imgConfig } from './constants'
import FirstPhase from './components'

import './index.scss'

const config = window.CONFIG || {}

const App = () => {
  const [backtopVisible, setBacktopVisible] = useState(false) // 返回顶部按钮

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

  const handleClickGoPage = () => {
    window.history.go(-1)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='rule'>
      <Layout>
        <div className='banner'>
          <img src={imgConfig.back} className='banner-img3' onClick={() => handleClickGoPage()} />
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
