import React, { useState, useEffect } from 'react'
import Qs from 'qs'
import { imgConfig } from '../../constants'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme } from '@utils/utils'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const ThirdPhase = () => {
  const [listVisible, setListVisible] = useState(1)
  const [anchorListData, setAnchorListData] = useState([])
  const [viewerListData, setViewerListData] = useState([])
  const [challengeAnchor, setChallengeAnchor] = useState({})

  const tabBg = listVisible === 1 ? imgConfig.tabIcon1 : imgConfig.tabIcon2

  const handleClickSpan = (num) => {
    // 1=主播榜 2=观众榜
    setListVisible(num)
  }

  // 列表数据
  const getThirdList = () => {
    fetch(`/api/liveAct202109/queryRankForStage3`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setAnchorListData(data.anchorRankList)
        setViewerListData(data.viewerRankList)
        setChallengeAnchor(data.challengeAnchor)
      })
  }

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
            <p>{item.user.nickname}</p>
            <p>
              <span>{item.value}</span>
              {isVisible && <span>STAR值</span>}
            </p>
          </li>
        ))}
      </ul>
    )
  }

  const challengerFun = () => {
    return (
      <div className='challenger-user'>
        <p onClick={() => handleClickUser(challengeAnchor)}>
          <img
            src={`https://pic.finkapp.cn/${config?.nodeEnv === 'production' ? '' : 't/'}${
              challengeAnchor.user?.avatarImage?.imageId
            }`}
          />
        </p>
        <p>{challengeAnchor.user?.nickname}</p>
        <p>
          <span>{challengeAnchor.value}</span>
          <span>STAR值</span>
        </p>
      </div>
    )
  }

  useEffect(() => {
    getThirdList()
  }, [])

  return (
    <div className='rule-box'>
      <div className='challenger'>
        <div className='challenger-title'>- 挑战者 -</div>
        {challengerFun()}
      </div>
      <div className='rule-box__head' style={{ backgroundImage: 'url(' + tabBg + ')' }}>
        <span onClick={() => handleClickSpan(1)}></span>
        <span onClick={() => handleClickSpan(2)}></span>
      </div>
      <div className={`rule-box__center ${listVisible === 1 ? 'show' : 'hide'}`}>
        {listDataFun(anchorListData, true)}
      </div>
      <div className={`rule-box__center ${listVisible === 2 ? 'show' : 'hide'}`}>
        {listDataFun(viewerListData, false)}
      </div>
    </div>
  )
}

export default ThirdPhase
