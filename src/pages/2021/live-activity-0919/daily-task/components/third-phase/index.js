import React, { useState, useEffect } from 'react'
import Qs from 'qs'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme } from '@utils/utils'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const parameter = Qs.parse(window.location.search, { ignoreQueryPrefix: true })
const ThirdPhase = () => {
  const [soarRankList, setSoarRankListData] = useState([])

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
  // 列表数据
  const getSoarRankList = () => {
    fetch(`/api/liveAct202109/querySoarRankForStage3`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setSoarRankListData(data.soarRankList)
      })
  }

  useEffect(() => {
    getSoarRankList()
  }, [])

  return (
    <div className='rule-box'>
      <div className='rule-box__center'>
        <ul className='rule-list'>
          {soarRankList?.map((item, index) => (
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
                <span>飙升{item.value}名</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ThirdPhase
