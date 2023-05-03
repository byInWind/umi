import React, { useState, useEffect } from 'react'
import Qs from 'qs'
import { render } from 'react-dom'
import { NoticeBar } from 'antd-mobile'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme, handlCountDown } from '@utils/utils'
import Layout from '@components/layout'
import { imgConfig } from './constants'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [timeText, setTimeText] = useState('00:00')
  const [hourList, setHourList] = useState({})
  let timer = null // 定时器

  // 列表数据
  const getHourList = () => {
    fetch(
      `/api/ceremony2022/queryHoursList?anchorId=${parameter?.anchorId || ''}&liveShowId=${
        parameter?.liveShowId || ''
      }`,
      {
        method: 'get',
        headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
      }
    )
      .then((res) => res.json())
      .then(({ data }) => {
        setHourList(data)
        timer = setInterval(function () {
          let dataTime = handlCountDown(data?.endTimeMillis, timer)
          setTimeText(dataTime.minute + ':' + dataTime.second)
        }, 1000)
      })
  }

  // 点击头像
  const handleClickUser = (item) => {
    const userId = item.user?.userId
    // 直播间 一律 跳转miniprofile
    if (userId && userId != '') {
      location.href = appUrlScheme + '://miniUser/' + userId
    }
  }

  // 点击直播按钮
  const handleClickLiveBut = (item) => {
    const liveShowId = item.liveShowId
    location.href = appUrlScheme + '://live/' + liveShowId
  }

  // 点击支持按钮
  const handleClickSupport = () => {
    location.href = appUrlScheme + '://liveShow/openGift'
  }

  const listDataFun = (dataList) => {
    return (
      <ul className='hour-list'>
        {dataList.anchorList.map((item, index) => (
          <li key={index}>
            <p>{index + 1}</p>
            <p onClick={() => handleClickUser(item)}>
              <img src={item.user.avatarUrl} />
            </p>
            <p>
              <span>{item.user.name}</span>
              <span>{item.value} 饭票</span>
            </p>
            {hourList.support && (
              <>
                {item.liveShowId && (
                  <p>
                    <img src={imgConfig.liveButtun} onClick={() => handleClickLiveBut(item)} />
                  </p>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    )
  }

  useEffect(() => {
    getHourList()
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className='hour'>
      <Layout>
        <div className='hour-title'>
          <img src={imgConfig.hourTitle} />
        </div>
        <div className='hour-time'>
          <p>
            <img src={imgConfig.crown} />
          </p>
          <p>
            倒计时 <span>{timeText}</span>
          </p>
          <p>
            <NoticeBar icon={null} marqueeProps={{ loop: true }}>
              <span className='text'>本小时最终TOP5可在下一小时享受巅峰值BUFF加成</span>
            </NoticeBar>
          </p>
        </div>
        {hourList?.anchorList?.length > 0 ? (
          <>
            {listDataFun(hourList)}
            <div className='hour-userown'>
              {hourList?.rank ? <p className='num'>{hourList.rank}</p> : <p>暂未上榜</p>}
              <p onClick={() => handleClickUser(hourList.anchor[0])}>
                <img src={hourList.anchor[0]?.user?.avatarUrl} />
              </p>
              <p>
                <span>{hourList.anchor[0]?.user?.name}</span>
                {hourList?.rank && (
                  <>
                    {hourList.gap ? (
                      <span>
                        距离上一名还有 <em>{hourList.gap}</em> 饭票
                      </span>
                    ) : (
                      <span>目前位列小时榜第一</span>
                    )}
                  </>
                )}
              </p>
              {hourList.support && (
                <p>
                  <img src={imgConfig.support} onClick={() => handleClickSupport()} />
                </p>
              )}
            </div>
          </>
        ) : (
          <div className='hour-noList'>
            <img src={imgConfig.noList} className='hour-noList__img1' />
            <img src={imgConfig.hourBg} className='hour-noList__img2' />
          </div>
        )}
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
