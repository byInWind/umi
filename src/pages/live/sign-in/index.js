import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'
import { queryString } from '@utils/utils'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent, useThrottle } from '@utils/utils'
import { imgConfig } from './constants'

const config = window.CONFIG || {}

const headersParams = sethandleHeaders(config)

import './index.scss'

const App = () => {
  const [data, setDate] = useState([])
  const [todayIsSign, setTodayIsSign] = useState(true)
  const [currentSignDay, setCurrentSignDay] = useState([])
  const [currentSignDayGift, setCurrentSignDayGift] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [myToast, setMyToast] = useState({})

  const MyToast = (myToast) => {
    return (
      <>
        <p className='myToast-title'>恭喜获得</p>
        <img className={`myToast-img ${myToast?.giftSrc ? '' : 'none'}`} src={myToast?.giftSrc}></img>
        <p className='myToast-name'>
          {myToast.giftName} ×{myToast.giftNum}
        </p>
        <p className='myToast-tips'>{myToast.toastText}</p>
      </>
    )
  }
  const getSignData = () => {
    fetch(`/api/live/sign-in/list?userId=${config.userId}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        setDate(data?.list || [])
        setCurrentSignDay(data.continuousDay - 1)
        if (data.continuousDay > 0) {
          setCurrentSignDayGift(data.list[data.continuousDay - 1])
        }
        setTodayIsSign(data.todayIsSign)
      })
  }
  const getSignDataNoLoading = () => {
    fetch(`/api/live/sign-in/list?userId=${config.userId}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setDate(data?.list || [])
        setCurrentSignDay(data.continuousDay - 1)
        if (data.continuousDay > 0) {
          setCurrentSignDayGift(data.list[data.continuousDay - 1])
        }
        setTodayIsSign(data.todayIsSign)
      })
  }
  const toSignIn = () => {
    collectEvent('WebClick', {
      title: '每周签到享好礼',
      element_content: '立即领取',
    })
    const params = {
      userId: config.userId || 'eA_SV81JHnk',
    }
    fetch(`/api/live/sign-in`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          if (res.data?.signInfo?.safeLimit) {
            Toast.fail('由于该礼物被领取次数已达上限，系统已为您替换成其他礼物，感谢理解！', 1.5)
          } else {
            setMyToast({
              giftSrc: null,
              giftName: res.data.signInfo.rewardName,
              giftNum: res.data.signInfo.rewardNum,
              toastText: '礼物和道具将储存在您的背包内，不要忘记使用哦～',
            })
            setShowToast(true)
            setTimeout(() => {
              setShowToast(false)
            }, 1500)
          }
          getSignDataNoLoading()
        } else {
          Toast.fail(res.message, 1.5)
        }
      })
  }

  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getSignData()
    collectEvent('predefine_pageview', {
      title: '每周签到享好礼',
    })
  }, [])
  const listview = (list) => (
    <>
      {list.map((item, index) => (
        <>
          <div className='list' key={index}>
            <div className='list-iconBox'>
              <img
                className={`list-iconBox__active ${currentSignDay >= index ? '' : 'none'}`}
                src={imgConfig.activeImg}
              ></img>
              <img
                className='list-iconBox__icon'
                src={`https://pic.finkapp.cn/${config?.nodeEnv === 'production' ? '' : 't/'}${item.imageView?.imageId}`}
              ></img>
              <p className='list-iconBox__p' style={{ backgroundImage: `url(${imgConfig.icon})` }}>
                {item.rewardUnit ? '' : 'X'}
                <span className='list-iconBox__number'>{item.rewardUnit ? item.expireDay : item.rewardNum}</span>
                {item.rewardUnit ? item.rewardUnit : ''}
              </p>
            </div>
            <p className='list-name'>{item.name}</p>
            <p className='list-day'>第{item.triggerDay}天</p>
          </div>
        </>
      ))}
    </>
  )

  return (
    <Layout>
      <div>
        <div className='center'>
          <img
            className='close'
            onClick={() => {
              collectEvent('WebClick', {
                title: '每周签到享好礼',
                element_content: '关闭',
              })
              location.href = 'finka2020://webview/close'
            }}
            src={imgConfig.closeImg}
          ></img>
          <img className='center-title' src={imgConfig.title}></img>
          <div className='center-listBox'>{listview(data)}</div>

          <div className='center-btnBox'>
            <img className={`center-btnBox__signBtnImg ${todayIsSign ? 'none' : ''}`} src={imgConfig.signBtnImg}></img>
            <img
              className={`center-btnBox__signBtnImg ${todayIsSign ? '' : 'none'}`}
              src={imgConfig.hasSignBtnImg}
            ></img>
            <div
              className={`center-btnBox__signBtn ${todayIsSign ? 'none' : ''}`}
              onClick={useThrottle(() => {
                toSignIn()
              }, 2000)}
            ></div>
          </div>
        </div>
        <p className={`tips ${todayIsSign ? '' : 'none'}`}>
          已成功领取 {currentSignDayGift.name}x{currentSignDayGift.rewardNum}
          ，礼物和道具将储存在您的背包内，不要忘记使用哦～
        </p>
      </div>
      <div className={`myToast ${showToast ? '' : 'none'}`}>{MyToast(myToast)}</div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
