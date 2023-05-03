import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { imgConfig, taskFirstList } from './constants'
import FirstPhase from './components'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [taskFirstListData, setTaskFirstListData] = useState([])

  // 获取数据
  const queryUserTaskList = (dataList) => {
    fetch(`/api/ceremony2022/queryTaskList`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data?.list?.length > 0) {
          const newDataList = [...dataList]
          data.list.forEach((item) => {
            newDataList.forEach((item2) => {
              if (item2.id === item.id) {
                item2.id = item.id
                item2.status = item.status
                item2.extra = item.extra
              }
            })
          })
          setTaskFirstListData(newDataList)
        }
      })
  }

  // 点击领取后刷新页面
  const resetDataList = () => {
    queryUserTaskList(taskFirstList)
  }

  const handleClickGoPage = () => {
    const pageUrl = '/hd/2021/year-activity-1201/rule-page?type=1'
    location.href = pageUrl
  }

  useEffect(() => {
    queryUserTaskList(taskFirstList)
  }, [])

  return (
    <div className='rule'>
      <Layout>
        <div className='banner'>
          <img src={imgConfig.activityIcon} className='banner-img3' onClick={() => handleClickGoPage()} />
        </div>
        <div className='rule-task'>
          <img src={imgConfig.title3} />
        </div>
        <FirstPhase taskFirstListData={taskFirstListData} resetDataList={resetDataList} />
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
