import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { imgConfig } from './constants'

import FirstPhase from './components/first-phase'
import SecondPhase from './components/second-phase'
import ThirdPhase from './components/third-phase'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [rulePageVisible, setRulePageVisible] = useState() // 判断第几阶段

  // 判断数据是第几阶段
  const getStageInfo = () => {
    fetch(`/api/liveAct202109/queryStageInfo`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setRulePageVisible(data.status)
      })
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
    } else {
      num !== 3 ? Toast.info('该阶段已经结束', 1) : setRulePageVisible(num)
    }
  }

  const handleClickGoPage = (type) => {
    const pageUrl = '/hd/2021/live-activity-0919/rule-page?type=' + type
    location.href = pageUrl
  }

  useEffect(() => {
    getStageInfo()
  }, [])

  return (
    <div className='rule'>
      <Layout>
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
                  : ''
              }
            />
            <div className='rule-tab__img-box'>
              <span onClick={() => handleClickTab(1)}></span>
              <span onClick={() => handleClickTab(2)}></span>
              <span onClick={() => handleClickTab(3)}></span>
            </div>
          </div>

          <img
            className='rule-tab__img2'
            src={
              rulePageVisible === 1
                ? imgConfig.timeIcon1
                : rulePageVisible === 2
                ? imgConfig.timeIcon2
                : rulePageVisible === 3
                ? imgConfig.timeIcon3
                : ''
            }
          />
          <div className='rule-tab__go'>
            <img src={imgConfig.ruleIcon} onClick={() => handleClickGoPage(rulePageVisible)} />
          </div>
        </div>
        {rulePageVisible === 1 ? (
          <FirstPhase />
        ) : rulePageVisible === 2 ? (
          <SecondPhase />
        ) : rulePageVisible === 3 ? (
          <ThirdPhase />
        ) : null}
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
