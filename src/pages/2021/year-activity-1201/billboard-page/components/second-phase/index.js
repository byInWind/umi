import React, { useState, useEffect } from 'react'
import Qs from 'qs'
import PropType from 'prop-types'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme } from '@utils/utils'
import { imgConfig } from '../../constants'
const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const SecondPhase = ({ rulePageVisible }) => {
  const [listVisible, setListVisible] = useState(1)
  const [medalList, setMedalList] = useState([]) // 主播获得的勋章数
  const [viewerRankList, setViewerRankList] = useState([]) // 观众榜
  const [trackRankList, setTrackRank] = useState([]) // 主播榜

  const tabBg = listVisible === 1 ? imgConfig.tabIcon1 : imgConfig.tabIcon2

  const handleClickSpan = (num) => {
    // 1=主播榜 2=观众榜
    setListVisible(num)
  }

  // 列表数据
  const getSecondList = () => {
    fetch(`/api/ceremony2022/querySecondList?anchorId=${parameter?.anchorId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setTrackRank(data.anchorList)
        setViewerRankList(data.viewerList)
        setMedalList(data.medalList)
      })
  }

  useEffect(() => {
    rulePageVisible === 2 && getSecondList()
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

  const listDataFun = (dataList, isVisible) => {
    return (
      <ul className={`rule-list ${isVisible ? 'rule-list3' : ''}`}>
        {dataList.map((item, index) => (
          <li key={index}>
            <p>{index + 1}</p>
            <p onClick={() => handleClickUser(item)}>
              <img src={item.user.avatarUrl} />
              {item?.liveShowId && <img src={imgConfig.liveShow} className='video-icon' />}
            </p>
            <p>{item.user.name}</p>
            <p>
              <span>{item.value}</span>
              {isVisible && <span>功勋值</span>}
            </p>
          </li>
        ))}
      </ul>
    )
  }
  const giftListFun = () => {
    return (
      <div className='gift'>
        <ul className='gift-list'>
          <li>
            <p>
              <img src={imgConfig.badge1} />
            </p>
            <span>勋章碎片1</span>
            <span>{medalList[0]}</span>
          </li>
          <li>
            <p>
              <img src={imgConfig.badge2} />
            </p>
            <span>勋章碎片2</span>
            <span>{medalList[1]}</span>
          </li>
          <li>
            <p>
              <img src={imgConfig.badge3} />
            </p>
            <span>勋章碎片3</span>
            <span>{medalList[2]}</span>
          </li>
          <li>
            <p>
              <img src={imgConfig.badge4} />
            </p>
            <span>勋章碎片4</span>
            <span>{medalList[3]}</span>
          </li>
        </ul>
      </div>
    )
  }
  return (
    <div className='rule-box'>
      {parameter.isBanner === 'false' && giftListFun()}
      <div className='rule-box__head' style={{ backgroundImage: 'url(' + tabBg + ')' }}>
        <span onClick={() => handleClickSpan(1)}></span>
        <span onClick={() => handleClickSpan(2)}></span>
      </div>

      <div className='rule-kuang'>
        <div className={`rule-kuang__center ${listVisible === 1 ? 'show' : 'hide'}`}>
          <div className='topbg'></div>
          {listDataFun(trackRankList, true)}
          <div className='bottombg'></div>
        </div>
        <div className={`rule-kuang__center ${listVisible === 2 ? 'show' : 'hide'}`}>
          <div className='topbg'></div>
          {listDataFun(viewerRankList, false)}
          <div className='bottombg'></div>
        </div>
      </div>
    </div>
  )
}

SecondPhase.propTypes = {
  rulePageVisible: PropType.number,
}

export default SecondPhase
