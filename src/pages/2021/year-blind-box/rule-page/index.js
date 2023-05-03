import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Qs from 'qs'
import Layout from '@components/layout'
import { imgConfig } from './constants'
import { sethandleHeaders } from '@utils/headers'
import Footer from '@components/activity/Footer'

import FirstPhase from './components/first-phase'
import SecondPhase from './components/second-phase'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [rulePageVisible, setRulePageVisible] = useState(1) // 判断第几阶段
  const [buttonVisible, setButtonVisible] = useState(false) // 判断是否显示 活动榜单

  //判断数据是第几阶段
  const getStageInfo = () => {
    fetch(`/api/blindbox/querySwitch?actId=` + parameter?.actId, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setButtonVisible(data?.show)
      })
  }

  // Tab点击
  const handleClickTab = (num) => {
    setRulePageVisible(num)
  }

  const goAudiencePage = () => {
    const pageUrl =
      '/hd/2021/year-blind-box/billboard-page?isBanner=' +
        parameter.isBanner +
        '&actId=' +
        parameter?.actId +
        '&anchorId=' +
        parameter?.anchorId || ''
    location.href = pageUrl
  }

  useEffect(() => {
    getStageInfo()
  }, [])

  return (
    <Layout>
      <div className='rule'>
        <div className='banner'>
          {buttonVisible && (
            <>
              <img src={imgConfig.listIcon} className='banner-img3' onClick={() => goAudiencePage()} />
            </>
          )}
        </div>
        <div className='rule-tab'>
          <div className='rule-tab__img'>
            <img src={rulePageVisible === 1 ? imgConfig.ruleTab1 : rulePageVisible === 2 ? imgConfig.ruleTab2 : ''} />
            <div className='rule-tab__img-box'>
              <span onClick={() => handleClickTab(1)}></span>
              <span onClick={() => handleClickTab(2)}></span>
            </div>
          </div>
        </div>
        <div className={`${rulePageVisible === 1 ? 'show' : 'hide'}`}>
          <FirstPhase />
        </div>
        <div className={`${rulePageVisible === 2 ? 'show' : 'hide'}`}>
          <SecondPhase />
        </div>
        <Footer />
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
