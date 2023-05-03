import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Qs from 'qs'
import Layout from '@components/layout'
import { imgConfig } from './constants'
import { handlCountDown } from '@utils/utils'
import { sethandleHeaders } from '@utils/headers'
import FirstPhase from './components/first-phase'
import SecondPhase from './components/second-phase'
import ThirdPhase from './components/third-phase'
import FourthPhase from './components/fourth-phase'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [rulePageVisible, setRulePageVisible] = useState(0) // 判断第几阶段
  const [backtopVisible, setBacktopVisible] = useState(false) // 回到顶部按钮
  const [buttonVisible, setButtonVisible] = useState(false) // 判断是否显示 活动榜单和观众总榜按钮
  const [countdown, setCountdown] = useState('')
  let timer = null // 定时器

  //判断数据是第几阶段
  const getStageInfo = () => {
    fetch(`/api/ceremony2022/queryStageInfo`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setRulePageVisible(data?.stage)
        timer = setInterval(function () {
          let dataTime = handlCountDown(data?.endTimeMillis, timer)
          setCountdown(
            '<span>' +
              dataTime.day +
              '</span>' +
              '<span>天</span>' +
              '<span>' +
              dataTime.hour +
              '</span>' +
              '<span>时</span>' +
              '<span>' +
              dataTime.minute +
              '</span>' +
              '<span>分</span>' +
              '<span>' +
              dataTime.second +
              '</span>' +
              '<span>秒</span>'
          )
        }, 1000)
        if (data?.stage > 0) {
          setButtonVisible(true)
        }
      })
  }

  // Tab点击
  const handleClickTab = (num) => {
    setRulePageVisible(num)
  }

  const handleClickGoPage = () => {
    const pageUrl =
      '/hd/2021/year-activity-1201/audience-list?isBanner=' + parameter.isBanner + '&anchorId=' + parameter?.anchorId ||
      ''
    location.href = pageUrl
  }

  const goAudiencePage = () => {
    const pageUrl =
      '/hd/2021/year-activity-1201/billboard-page?isBanner=' +
        parameter.isBanner +
        '&anchorId=' +
        parameter?.anchorId || ''
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
    getStageInfo()
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className='rule'>
      <Layout>
        <div className='banner'>
          {buttonVisible && (
            <>
              <img src={imgConfig.audienceIcon} className='banner-img2' onClick={() => handleClickGoPage()} />
              <img src={imgConfig.listIcon} className='banner-img3' onClick={() => goAudiencePage()} />
            </>
          )}
          <img src={imgConfig.countdownTime} className='banner-img4' />
          <div className='banner-time' dangerouslySetInnerHTML={{ __html: countdown }}></div>
          <img src={imgConfig.preface} className='banner-img5' />
        </div>
        <div className='rule-tab'>
          <div className='rule-tab__img'>
            <img
              src={
                rulePageVisible === 0 || rulePageVisible === 1
                  ? imgConfig.ruleTab1
                  : rulePageVisible === 2
                  ? imgConfig.ruleTab2
                  : rulePageVisible === 3
                  ? imgConfig.ruleTab3
                  : rulePageVisible === 4
                  ? imgConfig.ruleTab4
                  : ''
              }
            />
            <div className='rule-tab__img-box'>
              <span onClick={() => handleClickTab(1)}></span>
              <span onClick={() => handleClickTab(2)}></span>
              <span onClick={() => handleClickTab(3)}></span>
              <span onClick={() => handleClickTab(4)}></span>
            </div>
          </div>
        </div>
        <div className={`${rulePageVisible === 0 || rulePageVisible === 1 ? 'show' : 'hide'}`}>
          <FirstPhase />
        </div>
        <div className={`${rulePageVisible === 2 ? 'show' : 'hide'}`}>
          <SecondPhase />
        </div>
        <div className={`${rulePageVisible === 3 ? 'show' : 'hide'}`}>
          <ThirdPhase />
        </div>
        <div className={`${rulePageVisible === 4 ? 'show' : 'hide'}`}>
          <FourthPhase />
        </div>
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
