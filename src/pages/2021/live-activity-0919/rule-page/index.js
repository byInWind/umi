import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Qs from 'qs'
import Layout from '@components/layout'
import { imgConfig } from './constants'
import { sethandleHeaders } from '@utils/headers'
import FirstPhase from './components/first-phase'
import SecondPhase from './components/second-phase'
import ThirdPhase from './components/third-phase'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [rulePageVisible, setRulePageVisible] = useState(0) // 判断第几阶段

  //判断数据是第几阶段
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
    setRulePageVisible(num)
  }

  const handleClickGoPage = () => {
    window.history.go(-1)
  }

  useEffect(() => {
    let parameterArr = Object.keys(parameter)
    if (parameterArr.length === 0) {
      getStageInfo()
    } else {
      setRulePageVisible(parseInt(parameter.type))
    }
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
          {Object.keys(parameter).length !== 0 && (
            <div className='rule-tab__go'>
              <img src={imgConfig.goBillboardPage} onClick={() => handleClickGoPage()} />
            </div>
          )}
        </div>
        <div className={`${rulePageVisible === 1 ? 'show' : 'hide'}`}>
          <FirstPhase />
        </div>
        <div className={`${rulePageVisible === 2 ? 'show' : 'hide'}`}>
          <SecondPhase />
        </div>
        <div className={`${rulePageVisible === 3 ? 'show' : 'hide'}`}>
          <ThirdPhase />
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
