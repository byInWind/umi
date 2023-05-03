import React, { useState, useEffect } from 'react'
import Qs from 'qs'
import { imgConfig } from '../../constants'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme } from '@utils/utils'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const FirstPhase = () => {
  const [anchorListData, setAnchorListData] = useState([])

  // 列表数据
  const getFirstList = () => {
    fetch(`/api/carnival/queryList`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setAnchorListData(data.list)
      })
  }

  // 点击头像
  const handleClickUser = (item) => {
    const userId = item.user?.userId
    const liveShowId = item.liveShowId
    if (parameter.isBanner === 'true') {
      //如果当前用户正在直播，跳直播
      if (liveShowId && liveShowId != '') {
        location.href = appUrlScheme + '://live/' + liveShowId
      } else if (userId && userId != '') {
        // 没有直播，跳转user
        location.href = appUrlScheme + '://user/' + userId
      }
    } else {
      //如果当前主播是自己
      if (parameter?.anchorId === config.userId) {
        location.href = appUrlScheme + '://miniUser/' + userId
      } else {
        //如果当前用户在直播
        if (liveShowId && liveShowId != '' && userId !== config.userId) {
          location.href = appUrlScheme + '://live/' + liveShowId
        } else if (userId && userId != '') {
          // 直播间 一律 跳转miniprofile
          location.href = appUrlScheme + '://miniUser/' + userId
        }
      }
    }
  }

  useEffect(() => {
    getFirstList()
  }, [])

  const listDataFun = (dataList) => {
    return (
      <ul className='rule-list'>
        {dataList.map((item, index) => (
          <li key={index}>
            <p>{index + 1}</p>
            <p onClick={() => handleClickUser(item)}>
              <img src={item?.user.avatarUrl} />
              {item?.liveShowId && <img src={imgConfig.liveShow} className='video-icon' />}
            </p>
            <p>{item.user.name}</p>
            <p>
              <span>{item.value}</span>
              <span>狂欢值</span>
            </p>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className='rule-box'>
      <div className='rule-box_title'>
        <img src={imgConfig.title2} />
      </div>
      <div className='rule-kuang'>
        <div className='rule-kuang__center'>
          <div className='topbg'></div>
          {listDataFun(anchorListData, true)}
          <div className='bottombg'></div>
        </div>
      </div>
    </div>
  )
}

export default FirstPhase
