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
  const [showToast, setShowToast] = useState(false)
  const [myToast, setMyToast] = useState({})
  const [tabActive, setTabActive] = useState(1)
  const [taskData, setTaskData] = useState([])
  const [boxHeight, setBoxHeight] = useState('100px')
  const getSignData = () => {
    fetch(`/api/live/sign-in/list?userId=${config.userId}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setDate(data?.list || [])
        setCurrentSignDay(data.continuousDay - 1)
        setTodayIsSign(data.todayIsSign)
      })
  }
  const getMissionListData = (type) => {
    fetch(`/api/live/mission/list?userId=${config?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (type) {
          Toast.hide()
        }
        let hasReceivedArr = []
        data.list.map((item) => {
          if (item.status == 1) {
            hasReceivedArr.push(1)
          }
        })
        //如果没有待领取的，取消红点
        if (hasReceivedArr.length == 0) {
          location.href = 'finka2020://liveShow/signIn'
        }

        setTaskData(data.list)
      })
  }
  //签到
  const toSignIn = () => {
    collectEvent('WebClick', {
      title: '每周签到享好礼',
      element_content: '立即领取',
    })
    const params = {
      userId: config.userId || '',
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
          getSignData()
          location.href = 'finka2020://liveShow/signIn'
        } else {
          Toast.fail(res.message, 1.5)
        }
      })
  }
  //领取日常任务奖励
  const claimRewardPost = (id, amount) => {
    const params = {
      id: id,
    }
    fetch(`/api/live/mission/claim-reward`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setMyToast({
            giftSrc: imgConfig.heartImg,
            giftName: '小心心',
            giftNum: amount,
            toastText: '已经发放到您的礼物背包',
          })
          setShowToast(true)
          setTimeout(() => {
            setShowToast(false)
          }, 1500)
          getMissionListData(false)
        } else {
          Toast.fail(res.message, 1.5)
        }
      })
  }
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
  const taskList = (list) => (
    <>
      {list.map((item, index) => (
        <div className='taskList-list' key={index}>
          <div className='taskList-list__left'>
            <div>
              <img
                src={`https://pic.finkapp.cn/${config?.nodeEnv === 'production' ? '' : 't/'}${item.iconImage?.imageId}`}
                className='taskList-list__icon'
              ></img>
            </div>
            <div>
              <div className='taskList-list__title'>{item?.name}</div>
              <div className='taskList-list__rewardBox'>
                <span className='taskList-list__rewardDesc'>任务奖励</span>
                <img src={imgConfig.heartNoBgImg} className='taskList-list__heart'></img>
                <span className='taskList-list__rewardNum'>X{item?.amount}</span>
              </div>
            </div>
          </div>
          <div className='taskList-list__right'>
            <div className={`taskList-list__receiveBtnBox ${item?.status == 1 ? '' : 'none'}`}>
              <div
                className='taskList-list__receiveBtn'
                onClick={() => {
                  collectEvent('WebClick', {
                    title: '观众日常任务',
                    element_content: '领取奖励',
                  })
                  useThrottle(() => {
                    claimRewardPost(item.id, item?.amount)
                  }, 2000)
                }}
              >
                领取奖励
              </div>
            </div>
            <div className={`taskList-list__noComplete  ${item?.status == 0 ? '' : 'none'}`}>未完成</div>
            <div className={`taskList-list__hasReceivedBtn  ${item?.status == 2 ? '' : 'none'}`}>已完成</div>
          </div>
        </div>
      ))}
    </>
  )

  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getSignData()
    getMissionListData(true)
    collectEvent('predefine_pageview', {
      title: '观众日常任务',
    })
    setBoxHeight(document.body.offsetHeight - 70 + 'px')
  }, [])

  return (
    <Layout>
      <div className='center'>
        <img className='center-bg' src={imgConfig.bgImg}></img>
        <div className='center-tabBox'>
          <div
            className={`center-tabBox__button ${tabActive == 1 ? 'center-tabBox__button-active' : ''}`}
            onClick={() => {
              setTabActive(1)
            }}
          >
            日常任务
            <div className={`center-tabBox__button-tabLine ${tabActive == 1 ? '' : 'none'}`}></div>
          </div>
          <div
            className={`center-tabBox__button ${tabActive == 2 ? 'center-tabBox__button-active' : ''}`}
            onClick={() => {
              setTabActive(2)
            }}
          >
            每日签到
            <div className={`center-tabBox__button-tabLine ${tabActive == 2 ? '' : 'none'}`}></div>
          </div>
        </div>
        <div>
          <div style={{ height: boxHeight }} className={`center-tab ${tabActive == 1 ? '' : 'none'}`}>
            <p className='center-toptext'>
              （任务每天0点刷新，主播可以用
              <span className='center-toptext__color'>收到的小心心兑换奖品</span>）
            </p>

            <div className='taskList'>{taskList(taskData)}</div>
          </div>
          <div style={{ height: boxHeight }} className={`center-tab2 ${tabActive == 2 ? '' : 'none'}`}>
            <img className='center-title' src={imgConfig.title}></img>
            <div className='center-listBox'>{listview(data)}</div>
            <div className='center-btnBox'>
              <img
                className={`center-btnBox__signBtnImg ${todayIsSign ? 'none' : ''}`}
                src={imgConfig.signBtnImg}
              ></img>
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
        </div>
      </div>
      <div className={`myToast ${showToast ? '' : 'none'}`}>{MyToast(myToast)}</div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
