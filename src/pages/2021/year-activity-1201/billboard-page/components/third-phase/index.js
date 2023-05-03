import React, { useState, useEffect } from 'react'
import Qs from 'qs'
import PropType from 'prop-types'
import { imgConfig } from '../../constants'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme } from '@utils/utils'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const ThirdPhase = ({ rulePageVisible }) => {
  const [listVisible, setListVisible] = useState(1)
  const [otherList, setOtherList] = useState([]) //主播其它榜单
  const [viewerList, setViewerList] = useState([]) //主观众榜单
  const [firstRoundData, setFirstRoundData] = useState({}) //第一轮数据
  const [secondRoundData, setSecondRoundData] = useState({}) //第二轮数据
  const [thirdRoundData, setThirdRoundData] = useState({}) //第三轮数据
  const [thirdData1, setThirdData1] = useState([])
  const [thirdData2, setThirdData2] = useState([])

  const tabBg = listVisible === 1 ? imgConfig.tabIcon1 : imgConfig.tabIcon2

  const handleClickSpan = (num) => {
    // 1=主播榜 2=观众榜
    setListVisible(num)
  }

  // 列表数据
  const getThirdList = () => {
    fetch(`/api/ceremony2022/queryThirdList`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setViewerList(data.viewerList)
        setOtherList(data.otherList)
        setFirstRoundData(data.first)
        setSecondRoundData(data.second)
        setThirdRoundData(data.third)
        let thirdData = data.third.anchorList.slice(0, 1)
        let thirdTowData = data.third.anchorList.slice(1, 4)
        setThirdData1(thirdData)
        setThirdData2(thirdTowData)
        console.log(data.third)
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
        if (liveShowId && liveShowId != '') {
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
      <ul className='rule-list'>
        {dataList.map((item, index) => (
          <li key={index}>
            {!isVisible ? <p>{index + 1}</p> : <p className='noWidth'></p>}
            <p onClick={() => handleClickUser(item)}>
              <img src={item.user.avatarUrl} />
              {item?.liveShowId && <img src={imgConfig.liveShow} className='video-icon' />}
            </p>
            <p>{item.user.name}</p>
            <p>
              <span>{item.value}</span>
              {isVisible && <span>巅峰值</span>}
            </p>
          </li>
        ))}
      </ul>
    )
  }

  // 阶段列表数据
  const stageDataFun = (data, type, time) => {
    // type:代表第几阶段
    return (
      <div className='content'>
        <div className='content-head'>
          <div className='content-head__title'>
            {type === 1 && <img src={data.status === 1 ? imgConfig.firstRound1 : imgConfig.firstRound2} />}
            {type === 2 && (
              <img
                src={
                  data.status === 0
                    ? imgConfig.secondRound1
                    : data.status === 1
                    ? imgConfig.secondRound2
                    : data.status === 2
                    ? imgConfig.secondRound3
                    : ''
                }
              />
            )}
            {type === 3 && (
              <img
                src={
                  data.status === 0
                    ? imgConfig.thirdRound1
                    : data.status === 1
                    ? imgConfig.thirdRound2
                    : data.status === 2
                    ? imgConfig.thirdRound3
                    : ''
                }
              />
            )}
          </div>
          <div className='content-head__time'>{time}</div>
          <div className='content-head__line'>
            <img src={imgConfig.line1} />
          </div>
        </div>
        {type === 3 ? (
          <>
            <div className='third-round'>
              <div className='user-img' onClick={thirdData1.length > 0 ? () => handleClickUser(thirdData1[0]) : null}>
                <img src={thirdData1[0]?.user?.avatarUrl} />
                {thirdData1[0]?.liveShowId && <img src={imgConfig.liveShow} className='video-icon' />}
              </div>
              {thirdData1[0] && (
                <div className='user-box'>
                  <p>{thirdData1[0]?.user?.name}</p>
                  <p>{thirdData1[0]?.value}</p>
                  <p>巅峰值</p>
                </div>
              )}
            </div>
            <ul className='content-list content-list2'>
              {thirdData2?.map((item, index) => (
                <li key={index}>
                  <div className='user-img' onClick={item ? () => handleClickUser(item) : null}>
                    {item && <img src={item?.user?.avatarUrl} />}
                    {item?.liveShowId && <img src={imgConfig.liveShow} className='video-icon' />}
                  </div>
                  {item && (
                    <div className='user-box'>
                      <p>{item?.user?.name}</p>
                      <p>{item?.value}</p>
                      <p>巅峰值</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className='content-list'>
            {data?.anchorList?.map((item, index) => (
              <li key={index}>
                <div className='user-img' onClick={item ? () => handleClickUser(item) : null}>
                  {item && <img src={item?.user?.avatarUrl} />}
                  {item?.liveShowId && <img src={imgConfig.liveShow} className='video-icon' />}
                </div>
                {item && (
                  <div className='user-box'>
                    <p>{item?.user?.name}</p>
                    <p>{item?.value}</p>
                    <p>巅峰值</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  useEffect(() => {
    rulePageVisible === 3 && getThirdList()
  }, [])

  return (
    <div className='rule-box'>
      <div className='rule-box__head' style={{ backgroundImage: 'url(' + tabBg + ')' }}>
        <span onClick={() => handleClickSpan(1)}></span>
        <span onClick={() => handleClickSpan(2)}></span>
      </div>
      <div className={`rule-kuang ${listVisible === 1 ? 'show' : 'hide'}`}>
        <div className='rule-kuang__center'>
          <div className='topbg'></div>
          {stageDataFun(firstRoundData, 1, '12月09日00:00～12月12日23:59')}
          <div className='bottombg'></div>
        </div>
        <div className='rule-kuang__center'>
          <div className='topbg'></div>
          {stageDataFun(secondRoundData, 2, '12月14日00:00～12月16日23:59')}
          <div className='bottombg'></div>
        </div>
        <div className='rule-kuang__center'>
          <div className='topbg'></div>
          {stageDataFun(thirdRoundData, 3, '12月18日00:00～12月19日23:59')}
          <div className='bottombg'></div>
        </div>
        <div className='rule-kuang__center'>
          <div className='topbg2'></div>
          {listDataFun(otherList, true)}
          <div className='bottombg'></div>
        </div>
      </div>
      <div className={`rule-kuang ${listVisible === 2 ? 'show' : 'hide'}`}>
        <div className='rule-kuang__center'>
          <div className='topbg'></div>
          {listDataFun(viewerList, false)}
          <div className='bottombg'></div>
        </div>
      </div>
    </div>
  )
}

ThirdPhase.propTypes = {
  rulePageVisible: PropType.number,
}

export default ThirdPhase
