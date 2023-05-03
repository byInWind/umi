import React, { useState, useEffect } from 'react'
import { Button, Toast } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { queryString } from '@utils/utils'
import { collectEvent } from '@utils/utils'
import { imgConfig } from './constants'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [isAppointment, setIsAppointment] = useState(false)
  const [isShowToast, setIsShowToast] = useState(false)
  // const [currentBtnTop, setCurrentBtnTop] = useState(0)
  // const [startBtnTop, setStartBtnTop] = useState()
  const [day, setDay] = useState()
  const [hour, setHour] = useState()
  const [minute, setMinute] = useState()
  const [second, setSecond] = useState()
  const [qrcode, setQrCode] = useState()
  // const [wechat, setWechat] = useState()
  const imageUrl = config?.nodeEnv === 'production' ? 'https://pic.finkapp.cn/' : 'https://pic.finkapp.cn/t/'

  let activityStartTime = ''
  const getData = () => {
    fetch(`/api/activity/daydreamer-2021/appointment`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setIsAppointment(data.appointmentQrCodeView?.alreadyAppointment)
        setQrCode(`${imageUrl + data.appointmentQrCodeView?.qrImage.imageId}`)
        // setWechat(data.appointmentQrCodeView?.wechat)
        activityStartTime = data.activityStartTime
        changeTimeHandle()
        Toast.hide()
      })
  }
  const changeTimeHandle = () => {
    setInterval(function () {
      let now = new Date().getTime()
      let end = activityStartTime
      /*两个时间相减,得到的是毫秒ms,变成秒*/
      let result = Math.floor(end - now) / 1000
      result = result > 0 ? result : 0
      if (result == 0) {
        location.href = '/hd/2021/day-dream/invita'
      }
      let second = Math.floor(result % 60) //计算秒
      let minute = Math.floor((result / 60) % 60) //计算分 ，换算有多少分，取余，余出多少秒
      let hour = Math.floor((result / 3600) % 24) //计算小时，换算有多少小时，取余，24小时制除以24，余出多少小时
      let day = Math.floor(result / (3600 * 24)) //计算天 ，换算有多少天
      if (second < 10) {
        second = '0' + second
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (day < 10) {
        day = '0' + day
      }
      setDay(day)
      setHour(hour)
      setMinute(minute)
      setSecond(second)
    }, 1000)
  }

  const handleClick = () => {
    collectEvent('WebClick', {
      title: '白日梦想家活动',
      element_content: '立即预约活动',
    })
    fetch(`/api/activity/daydreamer-2021/appointment`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString({}),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setIsAppointment(true)
          setQrCode(`${imageUrl + res.data.appointmentQrCodeView?.qrImage.imageId}`)
          // setWechat(res.data.appointmentQrCodeView?.wechat)
          setIsShowToast(true)
        } else {
          Toast.fail(res.message, 2.5)
        }
      })
  }
  // const ref = useRef(null)

  // const handleScroll = () => {
  //   if (ref.current) {
  //     console.log(2, ref.current.getBoundingClientRect().top)
  //     setCurrentBtnTop(ref.current.getBoundingClientRect().top)
  //   }
  // }
  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getData()
    collectEvent('predefine_pageview', {
      title: '白日梦想家活动',
    })
    // setStartBtnTop(ref.current.offsetTop)
    // console.log(ref.current.offsetTop)
    // window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='wrapper'>
      <Layout>
        <div className='ruleBtn'>
          <a href='https://www.finka.cn/event/day-dream-rule'>活动规则</a>
        </div>
        <div className='appointment'>
          <img src={imgConfig.header} />
          <div className='appointment__content'>
            <img src={imgConfig.infoImg} />
            <p className='appointment__content-time-p'>
              活动<span className='appointment__content-time'>{day}</span>天
              <span className='appointment__content-time'>{hour}</span>小时
              <span className='appointment__content-time'>{minute}</span>分
              <span className='appointment__content-time'>{second}</span>秒后开始
            </p>
            <div className='appointment__content-btnbox'>
              {!isAppointment ? (
                <Button
                  className={`appointment__content-btn`}
                  type='button'
                  onClick={() => {
                    handleClick()
                  }}
                >
                  立即预约活动
                </Button>
              ) : (
                <Button className='appointment__content-over' type='button'>
                  已预约
                </Button>
              )}

              <p className={`appointment__content-tips ${!isAppointment ? '' : 'none'}`}>
                预约后，活动开始将第一时间通知你
              </p>
              <div
                className={`appointment__content-over-tips ${!isAppointment ? 'none' : ''}`}
                onClick={() => {
                  setIsShowToast(true)
                }}
              >
                <img className='appointment__content-qrcodeIcon' src={imgConfig.qrcodeIcon} /> 点击加入官方福利群
              </div>
            </div>
          </div>

          <div className='appointment__info'>
            <a href='finka2020://user/FShBihJwrHw' className='appointment__info--user1'></a>
            <a href='finka2020://user/yojT-SwTwzo' className='appointment__info--user2'></a>
            <a href='finka2020://user/2s4_KVys7XI' className='appointment__info--user3'></a>
            <a href='finka2020://user/yReHcaobiLk' className='appointment__info--user4'></a>
            <img src={imgConfig.info} />
          </div>
          <div className={`appointment__popup ${isShowToast == true ? '' : 'none'}`}>
            <div className='appointment__popup--box'>
              <img
                className='appointment__popup--close'
                src={imgConfig.close}
                onClick={() => {
                  setIsShowToast(false)
                }}
              />
              <div className='appointment__popup--center'>
                <img className='appointment__popup--bg' src={imgConfig.popup} />
                <div className='popup__header'>
                  <div className='popup__header--title'>
                    <img className='popup__header--icon' src={imgConfig.icon} />
                    预约成功
                  </div>
                  <p>活动开始后，将通过站内信通知你</p>
                </div>
                <div className='popup__body'>
                  <img className='popup__body--qrcode' src={qrcode} />
                  <p>添加翻咔福利群</p>
                  <p>第一时间获取各种官方福利</p>
                </div>
                <div className='popup__bottom'>
                  <p className='popup__bottom--title popup__bottom--p'>添加方式：</p>
                  <p className='popup__bottom--p'>截图保存二维码，打开微信扫一扫识别图片</p>
                  {/* <p className='popup__bottom--p'>
                    2.添加微信号{wechat}即可入群
                    <span
                      className='popup__bottom--copy'
                      onClick={() => {
                        collectEvent('WebClick', {
                          title: '白日梦想家活动',
                          element_content: '去微信粘贴',
                        })
                        location.href = `finka2020://pasteboardCopy?content=${wechat}`
                        Toast.success('已复制')
                      }}
                    >
                      复制名称
                    </span>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
