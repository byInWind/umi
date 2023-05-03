import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { imgConfig, taskFirstList, taskSecondList } from './constants'
import FirstPhase from './components/first-phase'
import SecondPhase from './components/second-phase'
import ThirdPhase from './components/third-phase'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [rulePageVisible, setRulePageVisible] = useState() // 判断第几阶段
  const [taskFirstListData, setTaskFirstListData] = useState([])

  // 获取数据
  const queryUserTaskList = (dataList) => {
    fetch(`/api/liveAct202109/queryUserTaskList`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data?.list?.length > 0) {
          const newDataList = [...dataList]
          data.list.forEach((item) => {
            newDataList.forEach((item2) => {
              if (item.taskType == item2.taskType) {
                item2.taskIdList = item.taskIdList
                item2.status = parseInt(item.status)
                item2.extra = item.extra
              }
            })
          })
          setTaskFirstListData(newDataList)
        }
      })
  }

  // 判断数据是第几阶段
  const getStageInfo = () => {
    fetch(`/api/liveAct202109/queryStageInfo`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setRulePageVisible(data.status)
        if (data.status === 1) {
          queryUserTaskList(taskFirstList)
        } else if (data.status === 2) {
          queryUserTaskList(taskSecondList)
        }
      })
  }

  // 点击领取后刷新页面
  const resetDataList = () => {
    if (rulePageVisible === 1) {
      queryUserTaskList(taskFirstList)
    } else if (rulePageVisible === 2) {
      queryUserTaskList(taskSecondList)
    }
  }
  const emptyFun = () => {
    return (
      <div className='rule-empty'>
        <p>
          现在是休息时间哦，下一阶段正式开启后
          <br />
          再来完成每日任务吧～
        </p>
        <img src={imgConfig.emptyIcon} />
      </div>
    )
  }

  useEffect(() => {
    console.log(taskFirstListData?.length)
    getStageInfo()
  }, [])

  return (
    <div className='rule'>
      <Layout>
        <div className='rule-task'>
          <img
            src={
              rulePageVisible === 1
                ? imgConfig.taskTitle1
                : rulePageVisible === 2
                ? imgConfig.taskTitle1
                : rulePageVisible === 3
                ? imgConfig.taskTitle2
                : ''
            }
          />
        </div>
        {rulePageVisible === 1 ? (
          taskFirstListData?.length > 0 ? (
            <FirstPhase taskFirstListData={taskFirstListData} resetDataList={resetDataList} />
          ) : (
            emptyFun()
          )
        ) : rulePageVisible === 2 ? (
          taskFirstListData?.length > 0 ? (
            <SecondPhase taskFirstListData={taskFirstListData} resetDataList={resetDataList} />
          ) : (
            emptyFun()
          )
        ) : rulePageVisible === 3 ? (
          <ThirdPhase />
        ) : null}
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
