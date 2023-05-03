import React, { useState, useEffect } from 'react'
import Qs from 'qs'
import PropType from 'prop-types'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme } from '@utils/utils'
import { imgConfig } from '../../constants'
const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const FourthPhase = ({ rulePageVisible }) => {
  const [listVisible, setListVisible] = useState(1)
  const [viewerList, setViewerList] = useState([]) // 观众榜
  const [anchorList, setAnchorList] = useState([]) // 主播榜
  const [starsList, setStarsList] = useState([]) // 人气榜

  const tabBg =
    listVisible === 1
      ? imgConfig.fourthTabIcon1
      : listVisible === 2
      ? imgConfig.fourthTabIcon2
      : imgConfig.fourthTabIcon3

  const handleClickSpan = (num) => {
    // 1=主播榜 2=人气榜 3=观众榜
    setListVisible(num)
  }

  // 列表数据
  const getFourthList = () => {
    fetch(`/api/ceremony2022/queryFourthList`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setAnchorList(data.anchorList)
        setViewerList(data.viewerList)
        setStarsList(data.starsList)
      })
  }

  useEffect(() => {
    console.log(rulePageVisible)
    rulePageVisible === 4 && getFourthList()
  }, [])

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

  const listDataFun = (dataList, type) => {
    return (
      <ul className={`rule-list ${type === 2 ? 'rule-list4' : 'rule-list2'}`}>
        {dataList.map((item, index) => (
          <li key={index}>
            <p>{index + 1}</p>
            <p onClick={() => handleClickUser(item)}>
              <img src={item.user.avatarUrl} />
              {item?.liveShowId && <img src={imgConfig.liveShow} className='video-icon' />}
            </p>
            <p>{item.user.name}</p>
            <p>
              <span>
                {item.value}
                {type === 2 && '个'}
              </span>
              {type === 1 && <span>巅峰值</span>}
            </p>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className='rule-box'>
      <div className='rule-box__head' style={{ backgroundImage: 'url(' + tabBg + ')' }}>
        <span onClick={() => handleClickSpan(1)}></span>
        <span onClick={() => handleClickSpan(2)}></span>
        <span onClick={() => handleClickSpan(3)}></span>
      </div>
      <div className='rule-kuang'>
        <div className={`rule-kuang__center ${listVisible === 1 ? 'show' : 'hide'}`}>
          <div className='topbg'></div>
          {listDataFun(anchorList, 1)}
          <div className='bottombg'></div>
        </div>
        <div className={`rule-kuang__center ${listVisible === 2 ? 'show' : 'hide'}`}>
          <div className='topbg'></div>
          {listDataFun(starsList, 2)}
          <div className='bottombg'></div>
        </div>
        <div className={`rule-kuang__center ${listVisible === 3 ? 'show' : 'hide'}`}>
          <div className='topbg'></div>
          {listDataFun(viewerList, 3)}
          <div className='bottombg'></div>
        </div>
      </div>
    </div>
  )
}

FourthPhase.propTypes = {
  rulePageVisible: PropType.number,
}
export default FourthPhase
