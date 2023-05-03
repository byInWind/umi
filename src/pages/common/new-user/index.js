import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { queryString, handlCountDown } from '@utils/utils'
import { imgConfig } from './constants'
import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [taskInfo, setTaskInfo] = useState()
  const [isRemindClick, setIsRemindCLick] = useState(false)
  const [hasRemind, setHasRemind] = useState(false) //是否开了push
  const [hour, setHour] = useState('00') //时钟倒计时
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')

  let timer = null // 定义一个变量,用来清除定时器

  const ClockFun = (endTime) => {
    let dataTime = handlCountDown(endTime, timer) //每次返回新的时间对象
    setHour(Number(dataTime.day) * 24 + Number(dataTime.hour))
    setMinute(dataTime.minute)
    setSecond(dataTime.second)
    timer = setInterval(function () {
      let dataTime = handlCountDown(endTime, timer) //每次返回新的时间对象
      setHour(Number(dataTime.day) * 24 + Number(dataTime.hour))
      setMinute(dataTime.minute)
      setSecond(dataTime.second)
    }, 1000)
  }
  const newUserTask = () => {
    fetch(`/api/activity/new-user/task/list?userId=${config?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        console.log(111, data)
        if (data.taskInfo.pushRemindStatus == 1) {
          setHasRemind(true)
        }
        setTaskInfo(data?.taskInfo)
        ClockFun(data?.taskInfo?.residueSeconds)
      })
  }
  const postRemind = () => {
    const params = {
      userId: config?.userId || '',
    }
    fetch(`/api/activity/new-user/enable/remind`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          Toast.success('开启成功', 1500)
          setIsRemindCLick(true)
          localStorage.setItem('isRemindCLick', true)
          setHasRemind(true)
        } else {
          Toast.fail(res.message, 1.5)
        }
      })
  }
  const item1Stages = (stages) => {
    let item1Stage
    if (stages == 0) {
      item1Stage = (
        <>
          <img className='main-center__box-ava' src={imgConfig.ava1}></img>
          <div>
            <div className='main-center__box-title'>
              <img className='main-center__box-num' src={imgConfig[50]}></img>次曝光机会
            </div>
            <div className='main-center__box-desc'>上传真实头像可得</div>
          </div>
        </>
      )
    } else if (stages == 2) {
      item1Stage = (
        <>
          <img className='main-center__box-ava' src={imgConfig.ava1}></img>
          <div>
            <div className='main-center__box-title'>
              <img className='main-center__box-num' src={imgConfig[50]}></img>次曝光机会
            </div>
            <div className='main-center__box-desc main-center__box-miss'>头像正在审核中...</div>
          </div>
        </>
      )
    } else if (stages == 1) {
      item1Stage = (
        <>
          <img className='main-center__box-ava' src={imgConfig.hasAva}></img>
          <div>
            <div className='main-center__box-title'>
              <img className='main-center__box-num' src={imgConfig[50]}></img>次曝光机会
            </div>
            <div className='main-center__box-desc'>头像已通过审核！</div>
          </div>
        </>
      )
    } else if (stages == 3) {
      item1Stage = (
        <>
          <img className='main-center__box-ava' src={imgConfig.missAva}></img>
          <div>
            <div className='main-center__box-title'>
              <img className='main-center__box-num' src={imgConfig[50]}></img>次曝光机会
            </div>
            <div className='main-center__box-desc'>上传真实头像可得</div>
          </div>
        </>
      )
    } else if (stages == 4) {
      item1Stage = (
        <>
          <img className='main-center__box-ava' src={imgConfig.ava1}></img>
          <div>
            <div className='main-center__box-title'>
              <img className='main-center__box-num' src={imgConfig[50]}></img>次曝光机会
            </div>
            <div className='main-center__box-desc main-center__box-miss'>
              头像未通过审核 <br></br> 请重新上传
            </div>
          </div>
        </>
      )
    }
    return item1Stage
  }

  const ava2Stage = (stage) => {
    let ava2Stage
    if (stage == 0) {
      ava2Stage = <img className='main-center__box-ava' src={imgConfig.ava1}></img>
    } else if (stage == 1) {
      ava2Stage = <img className='main-center__box-ava' src={imgConfig.hasAva}></img>
    } else if (stage == 3) {
      ava2Stage = <img className='main-center__box-ava' src={imgConfig.missAva}></img>
    }
    return ava2Stage
  }

  const receiveBtn = () => {
    let render
    if (taskInfo?.firstTaskList[0]?.taskStatus == 0 || taskInfo?.firstTaskList[0]?.taskStatus == 4) {
      render = (
        <img
          className='main-footer__box-img'
          src={imgConfig.text1}
          onClick={() => {
            location.href = 'finka2020://editProfile?source=webview&scene=“NewUserActivity'
            location.href = 'finka2020://webview/close'
          }}
        ></img>
      )
    } else if (taskInfo?.firstTaskList[0]?.taskStatus == 2) {
      render = <img className='main-footer__box-img' src={imgConfig.text2}></img>
    } else if (taskInfo?.firstTaskList[1]?.taskStatus == 0) {
      render = (
        <img
          className='main-footer__box-img'
          src={imgConfig.text3}
          onClick={() => {
            location.href = 'finka2020://webview/close'
          }}
        ></img>
      )
    } else if (taskInfo?.firstTaskList[1]?.taskStatus == 1) {
      render = (
        <img
          className='main-footer__box-img'
          src={imgConfig.text4}
          onClick={() => {
            location.href = 'finka2020://webview/close'
          }}
        ></img>
      )
    } else {
      render = (
        <img
          className='main-footer__box-img'
          src={imgConfig.text4}
          onClick={() => {
            location.href = 'finka2020://webview/close'
          }}
        ></img>
      )
    }
    return render
  }
  useEffect(() => {
    Toast.loading('Loading...', 600)
    newUserTask()
    setIsRemindCLick(localStorage.getItem('isRemindCLick'))
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Layout>
      <div
        className='bg'
        onClick={() => {
          location.href = 'finka2020://webview/close'
        }}
      ></div>
      <div className='main'>
        <img className='main-title' src={imgConfig.title}></img>
        <div className='main-center'>
          <div className='main-center__timebox'>
            <div className='main-center__timebox-time'>剩余可领取时间</div>
            <div className='main-center__timebox-box'>
              <span className='main-center__timebox-span'>{hour}</span>:
              <span className='main-center__timebox-span'>{minute}</span>:
              <span className='main-center__timebox-span'>{second}</span>
            </div>
          </div>
          <div className='main-center__box'>
            <div className='main-center__box-left'>
              <div
                className={`main-center__box-span ${taskInfo?.firstTaskList[0]?.taskStatus == 1 ? 'active' : ''}  ${
                  taskInfo?.firstTaskList[0]?.taskStatus == 2 ? 'error' : ''
                } ${hour}`}
              >
                {hour >= 24 ? '今日' : '昨日'}
              </div>
              <div
                className={`main-center__box-line ${taskInfo?.secondTaskList[0]?.taskStatus == 1 ? 'active' : ''} ${
                  taskInfo?.firstTaskList[0]?.taskStatus == 2 ? 'error' : ''
                }`}
              ></div>
              <div
                className={`main-center__box-span ${taskInfo?.firstTaskList[1]?.taskStatus == 1 ? 'active' : ''} ${
                  taskInfo?.firstTaskList[0]?.taskStatus == 2 ? 'error' : ''
                }`}
              >
                {hour >= 24 ? '今日' : '昨日'}
              </div>
              <div
                className={`main-center__box-line ${taskInfo?.secondTaskList[0]?.taskStatus == 1 ? 'active' : ''} ${
                  taskInfo?.firstTaskList[0]?.taskStatus == 2 ? 'error' : ''
                }`}
              ></div>
              <div
                className={`main-center__box-span ${taskInfo?.secondTaskList[0]?.taskStatus == 1 ? 'active' : ''} ${
                  taskInfo?.firstTaskList[0]?.taskStatus == 2 ? 'error' : ''
                }`}
              >
                {hour >= 24 ? '明日' : '今日'}
              </div>
            </div>
            <div className='main-center__box-right'>
              <div className='main-center__box-item item1'>{item1Stages(taskInfo?.firstTaskList[0]?.taskStatus)}</div>
              <div className='main-center__box-item item2'>
                {ava2Stage(taskInfo?.firstTaskList[1]?.taskStatus)}
                <div>
                  <div className='main-center__box-title'>
                    <img className='main-center__box-num' src={imgConfig[50]}></img>次曝光机会
                  </div>
                  <div className='main-center__box-desc'>
                    {taskInfo?.firstTaskList[1]?.taskStatus == 2 ? '翻牌子右滑动已满10次！' : '翻牌子右滑动10次可得'}
                  </div>
                </div>
              </div>
              <div className='main-center__box-item item3'>
                <img
                  className='main-center__box-ava'
                  src={taskInfo?.secondTaskList[0]?.taskStatus == 2 ? imgConfig.hasAva : imgConfig.ava2}
                ></img>
                <div>
                  <div className='main-center__box-title'>
                    <img className='main-center__box-num' src={imgConfig[100]}></img>次曝光机会
                  </div>
                  <div className='main-center__box-desc'>
                    {taskInfo?.secondTaskList[0]?.taskStatus == 2 ? '已连续两日登陆！' : '登陆即得'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='main-footer'>
          <div
            className={`main-footer__tips ${isRemindClick ? 'none' : ''} ${hour >= 24 ? '' : 'none'} `}
            onClick={() => {
              if (hasRemind) {
                setIsRemindCLick(true)
                localStorage.setItem('isRemindCLick', true)
              } else {
                postRemind()
              }
            }}
          >
            <p>提醒我明天来领</p>
            <div className='main-footer__tips-box'>
              <img className='main-footer__tips-bg' src={imgConfig.iconBox}></img>
              <img className={`main-footer__tips-img ${isRemindClick ? '' : 'none'}`} src={imgConfig.icon}></img>
            </div>
          </div>
          <div
            className='main-footer__box'
            onClick={() => {
              console.log('sss')
            }}
          >
            <img className='main-footer__box-bg' src={imgConfig.btn}></img>
            {receiveBtn()}
          </div>
          <div
            className='main-footer__giveUpbtn'
            onClick={() => {
              location.href = 'finka2020://webview/close'
            }}
          >
            放弃奖励
          </div>
        </div>
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
