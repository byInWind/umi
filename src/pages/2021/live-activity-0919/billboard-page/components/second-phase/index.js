import React, { useState, useEffect } from 'react'
import Qs from 'qs'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme } from '@utils/utils'
import { imgConfig } from '../../constants'
const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const SecondPhase = () => {
  const [listVisible, setListVisible] = useState(1)
  const [anchorVisible, setAnchorVisible] = useState(0)
  const [anchorInfo, setAnchorInfo] = useState([]) // 获得的礼物数
  const [viewerRankList, setViewerRankList] = useState([]) // 观众榜
  const [trackRankList, setTrackRank] = useState([]) // 主播榜

  const tabBg = listVisible === 1 ? imgConfig.tabIcon1 : imgConfig.tabIcon2

  const handleClickSpan = (num) => {
    // 1=主播榜 2=观众榜
    setListVisible(num)
  }

  const handleClickTab = (num) => {
    setAnchorVisible(num)
  }

  // 列表数据
  const getSecondList = () => {
    fetch(`/api/liveAct202109/queryRankForStage2?anchorId=${parameter?.anchorId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        let attData = [data.trackRank_1, data.trackRank_2, data.trackRank_3, data.trackRank_4]
        setTrackRank(attData)
        setAnchorInfo(data.anchorInfo)
        setViewerRankList(data.viewerRankList)
      })
  }

  useEffect(() => {
    getSecondList()
  }, [])

  // 点击头像
  const handleClickUser = (item) => {
    const userId = item.user?.userId
    const liveShowId = item.liveShowId
    if (parameter.isBanner === 'true') {
      if (liveShowId && liveShowId != '') {
        location.href = appUrlScheme + '://live/' + liveShowId
      } else if (userId && userId != '') {
        // 没有直播，跳转miniprofile
        location.href = appUrlScheme + '://user/' + userId
      }
    } else {
      // 直播间 一律 跳转miniprofile
      if (userId && userId != '') {
        location.href = appUrlScheme + '://miniUser/' + userId
      }
    }
  }

  const listDataFun = (dataList, isVisible) => {
    return (
      <ul className={`rule-list ${isVisible ? 'rule-list2' : ''}`}>
        {dataList.map((item, index) => (
          <li key={index}>
            <p>{index + 1}</p>
            <p onClick={() => handleClickUser(item)}>
              <img
                src={`https://pic.finkapp.cn/${config?.nodeEnv === 'production' ? '' : 't/'}${
                  item.user?.avatarImage?.imageId
                }`}
              />
            </p>
            <p>{item.user.name}</p>
            <p>
              <span>{item.value}</span>
              {isVisible && <span>STAR值</span>}
            </p>
          </li>
        ))}
      </ul>
    )
  }
  const giftListFun = () => {
    return (
      <div className='gift'>
        <div className='gift-title'>-主播各赛道所获得的礼物个数-</div>
        <ul className='gift-list'>
          <li>
            <p>吉他</p>
            <span>{anchorInfo.trackGift1Value}</span>
          </li>
          <li>
            <p>化妆镜</p>
            <span>{anchorInfo.trackGift2Value}</span>
          </li>
          <li>
            <p>麦克风</p>
            <span>{anchorInfo.trackGift3Value}</span>
          </li>
          <li>
            <p>花束</p>
            <span>{anchorInfo.trackGift4Value}</span>
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
      <div className={`rule-box__center ${listVisible === 1 ? 'show' : 'hide'}`}>
        <ul className='gift-list border-bottom'>
          {trackRankList.map((item, index) => (
            <li key={index} className={`${anchorVisible === index ? 'select' : ''}`}>
              <p onClick={() => handleClickTab(index)}>{item.name}</p>
              <span>{item.total}</span>
            </li>
          ))}
        </ul>
        {trackRankList.map((item, index) => (
          <div key={index} className={`${anchorVisible === index ? 'show' : 'hide'}`}>
            {listDataFun(item.list, true)}
          </div>
        ))}
      </div>
      <div className={`rule-box__center ${listVisible === 2 ? 'show' : 'hide'}`}>
        {listDataFun(viewerRankList, false)}
      </div>
    </div>
  )
}

export default SecondPhase
