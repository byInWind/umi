import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Qs from 'qs'
import { Toast } from 'antd-mobile'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { imgConfig } from './constants'

import FirstPhase from './components/first-phase'
import SecondPhase from './components/second-phase'
import ThirdPhase from './components/third-phase'
import FourthPhase from './components/fourth-phase'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [rulePageVisible, setRulePageVisible] = useState() // 判断第几阶段
  const [backtopVisible, setBacktopVisible] = useState(false) // 返回顶部按钮

  // 判断数据是第几阶段
  const getStageInfo = () => {
    fetch(`/api/ceremony2022/queryStageInfo`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setRulePageVisible(data.stage)
      })
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

  // 显示第几阶段模版
  const listTemplate = (type) => {
    if (type === 1) {
      return <FirstPhase rulePageVisible={rulePageVisible} />
    } else if (type === 2) {
      return <SecondPhase rulePageVisible={rulePageVisible} />
    } else if (type === 3) {
      return <ThirdPhase rulePageVisible={rulePageVisible} />
    } else if (type === 4) {
      return <FourthPhase rulePageVisible={rulePageVisible} />
    }
  }

  // Tab点击
  const handleClickTab = (num) => {
    if (rulePageVisible === 1) {
      num === 1 ? setRulePageVisible(num) : Toast.info('该阶段暂未开启', 1)
    } else if (rulePageVisible === 2) {
      if (num === 1) {
        Toast.info('该阶段已经结束', 1)
      } else if (num === 2) {
        setRulePageVisible(num)
      } else {
        Toast.info('该阶段暂未开启', 1)
      }
    } else if (rulePageVisible === 3) {
      if (num === 1 || num === 2) {
        Toast.info('该阶段已经结束', 1)
      } else if (num === 3) {
        setRulePageVisible(num)
      } else {
        Toast.info('该阶段暂未开启', 1)
      }
    } else {
      num !== 4 ? Toast.info('该阶段已经结束', 1) : setRulePageVisible(num)
    }
  }

  const handleClickGoPage = () => {
    const pageUrl =
      '/hd/2021/year-activity-1201/audience-list?isBanner=' + parameter.isBanner + '&anchorId=' + parameter?.anchorId ||
      ''
    location.href = pageUrl
  }

  const goAudiencePage = () => {
    const pageUrl =
      '/hd/2021/year-activity-1201/rule-page?isBanner=' + parameter.isBanner + '&anchorId=' + parameter?.anchorId || ''
    location.href = pageUrl
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    getStageInfo()
  }, [])

  return (
    <div className='rule'>
      <Layout>
        <div className='banner'>
          <img src={imgConfig.audienceIcon} className='banner-img2' onClick={() => handleClickGoPage()} />
          <img src={imgConfig.activityIcon} className='banner-img3' onClick={() => goAudiencePage()} />
        </div>
        <div className='rule-tab'>
          <div className='rule-tab__img'>
            <img
              src={
                rulePageVisible === 1
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
            {rulePageVisible > 0 && (
              <div className='rule-tab__img-box'>
                <span onClick={() => handleClickTab(1)}></span>
                <span onClick={() => handleClickTab(2)}></span>
                <span onClick={() => handleClickTab(3)}></span>
                <span onClick={() => handleClickTab(4)}></span>
              </div>
            )}
          </div>
          <div className='rule-tab__title'>
            <img src={imgConfig.title1} />
          </div>
          <img
            className='rule-tab__img2'
            src={
              rulePageVisible === 1
                ? imgConfig.time1
                : rulePageVisible === 2
                ? imgConfig.time2
                : rulePageVisible === 3
                ? imgConfig.time3
                : rulePageVisible === 4
                ? imgConfig.time4
                : ''
            }
          />
        </div>
        {listTemplate(rulePageVisible)}
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
