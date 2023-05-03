import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Qs from 'qs'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { imgConfig, activityListData } from './constants'
import Footer from '@components/activity/Footer'
import List from '@components/activity/List'
import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [listData, setListData] = useState({})
  const [userInfo, setUserInfo] = useState({}) // 自己数据

  // 列表数据
  const getFourthList = async () => {
    await fetch(`/api/blindbox/ruleList?actId=` + parameter?.actId, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        activityListData.data[0].list = data?.anchorList || []
        activityListData.data[1].list = data?.viewerList || []
        if (data?.anchor) {
          const userInfo = {
            user: data?.anchor[0]?.user,
            anchorVal: data?.anchor[0]?.value,
            viewerVal: data?.viewer[0]?.value,
            anchorName: '福气值',
            viewerName: '神气值',
          }
          setUserInfo(userInfo)
        }
        setListData(activityListData)
        console.log(userInfo)
      })
  }

  const goAudiencePage = () => {
    const pageUrl =
      '/hd/2021/year-blind-box/rule-page?isBanner=' +
        parameter.isBanner +
        '&actId=' +
        parameter?.actId +
        '&anchorId=' +
        parameter?.anchorId || ''
    location.href = pageUrl
  }

  useEffect(() => {
    getFourthList()
  }, [listData])

  return (
    <Layout>
      <div className='main'>
        <div className='header'>
          <img src={imgConfig.ruleIcon} className='header-icon' onClick={() => goAudiencePage()} />
        </div>
        {Object.keys(listData).length !== 0 && <List activityListData={activityListData} userInfo={userInfo} />}
        <Footer />
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
