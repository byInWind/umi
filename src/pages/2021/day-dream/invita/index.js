import React, { useState, useEffect, useRef } from 'react'
import { Toast, Modal } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { queryString } from '@utils/utils'
import { collectEvent } from '@utils/utils'
import { imgConfig } from '../appointment/constants'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [day, setDay] = useState()
  const [hour, setHour] = useState()
  const [minute, setMinute] = useState()
  const [second, setSecond] = useState()
  const [isShowShareToast, setIsShowShareToast] = useState(false)
  const [isShowGoldShareToast, setIsShowGoldShareToast] = useState(false)
  const [isShowGetCode, setIsShowGetCode] = useState(false)
  const [isShowGetGoldCode, setIsShowGetGoldCode] = useState(false)
  const [isVerificationToast, setIsVerificationToast] = useState(false)
  const [isVerification, setIsVerification] = useState(false)
  const [isShowSubmitToast, setIsShowSubmitToast] = useState(false)
  const [userAva, setUserAva] = useState()
  const [currentTeamId, setCurrentTeamId] = useState()
  const [myRanksInfo, setMyRanksInfo] = useState([])
  const [codeLength, setCodeLength] = useState(0)
  const [currentGoldenTeamsCount, setCurrentGoldenTeamsCount] = useState('0')
  const [num1, setNum1] = useState()
  const [num2, setNum2] = useState()
  const [num3, setNum3] = useState()
  const [num4, setNum4] = useState()
  const [currentBtnTop, setCurrentBtnTop] = useState(0)
  const [userAvatarImage, setUserAvatarImage] = useState() //发起邀请人头像
  const [recvUserAvatarImage, setRecvUserAvatarImage] = useState() //接受邀请用户头像通用返回
  const [isShowDialog, setIsShowDialog] = useState(false)

  const imageUrl = config?.nodeEnv === 'production' ? 'https://pic.finkapp.cn/' : 'https://pic.finkapp.cn/t/'

  let activityStartTime = ''
  const getQueryVariable = (variable) => {
    let query = window.location.search.substring(1)
    let vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      } else {
        return ''
      }
    }
  }
  const getTimeData = () => {
    fetch(`/api/activity/daydreamer-2021/appointment`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        activityStartTime = data.activityEndTime
        changeTimeHandle()
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
        location.href = '/hd/2021/day-dream/result'
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
  const toWechatCopyClick = () => {
    setIsShowShareToast(true)
    fetch(`/api/activity/daydreamer-2021/gen_token`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString({}),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          location.href = `finka2020://pasteboardCopy?content=${encodeURIComponent(res.data.fullContent)}`
        } else {
          Toast.fail(res.message, 5)
        }
      })
  }

  const getMainlandData = () => {
    fetch(`/api/activity/daydreamer-2021/mainland?token=${getQueryVariable('token')}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setIsShowDialog(data?.needUpdate)
        setUserAva(`${imageUrl + data.currentUserAvatarView?.avatarImage.imageId}`)
        setMyRanksInfo(data?.userTeamInfoListView.concat())
        setCodeLength(data?.userTeamInfoListView?.length)
        setCurrentGoldenTeamsCount(data?.currentGoldenTeamsCount)
        setIsVerificationToast(data?.needVerifyIdcard4)
        setIsVerification(data?.needVerifyIdcard4)
        setIsShowGoldShareToast(data?.needShowGoldenSwitch)
      })
  }
  const buildTeam = () => {
    //如果有token，调组队接口
    if (`${getQueryVariable('token')}`) {
      fetch(`/api/activity/daydreamer-2021/build_team`, {
        method: 'post',
        credentials: 'include',
        headers: Object.assign({}, headersParams, {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        }),
        body: queryString({ token: `${getQueryVariable('token')}` }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setCurrentTeamId(res.data?.actDaydreamer2021UserTeamsView?.teamId)
            setUserAvatarImage(
              `${imageUrl + res.data?.actDaydreamer2021UserTeamsView?.userAvatarImage.avatarImage.imageId}`
            )
            setRecvUserAvatarImage(
              `${imageUrl + res.data?.actDaydreamer2021UserTeamsView?.recvUserAvatarImage.avatarImage.imageId}`
            )
            if (res.data?.actDaydreamer2021UserTeamsView?.goldenTeam) {
              setIsShowGetGoldCode(true)
            } else {
              setIsShowGetCode(true)
            }
          } else {
            Toast.hide()
            Toast.fail(res.message, 5)
          }
          getMainlandData()
        })
    } else {
      getMainlandData()
    }
  }

  const idcardPost = () => {
    const params = {
      idcard4: '' + num1 + num2 + num3 + num4,
    }
    fetch(`/api/activity/daydreamer-2021/idcard_4`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          Toast.success('验证成功', 2.5)
          setIsVerification(false)
        } else {
          Toast.fail(res.message, 5)
        }
      })
  }
  const codeListView = () => {
    //强制设置数组为6
    if (myRanksInfo.length < 6) {
      for (let i = 0; i < 6; i++) {
        myRanksInfo.push(i)
      }
      myRanksInfo.length = 6
    }
    return (
      <>
        {myRanksInfo.map((item, index) => (
          <div key={index} className='list__box'>
            {item.teamId ? (
              <>
                <img src={item.goldenTeam ? imgConfig.goldCodeBg : imgConfig.codeBg}></img>
                <div
                  className='list__box-user'
                  style={{
                    backgroundImage: `url(${imageUrl + item.userAvatarImage?.avatarImage.imageId})`,
                  }}
                ></div>
                <div
                  className='list__box-user list__box-user2'
                  style={{
                    backgroundImage: `url(${imageUrl + item.recvUserAvatarImage?.avatarImage.imageId})`,
                  }}
                ></div>
                <div className='list__box-code-box'>
                  <p className='list__box-code-box-p'>{item.goldenTeam ? '黄金' : ''}抽奖码</p>
                  <p className='list__box-code'>{item.teamId}</p>
                </div>
              </>
            ) : (
              <img
                src={imgConfig.invitaBtn}
                onClick={() => {
                  collectEvent('WebClick', {
                    title: '白日梦想家活动',
                    element_content: '邀请好友组队',
                  })
                  toWechatCopyClick()
                }}
              ></img>
            )}
          </div>
        ))}
      </>
    )
  }
  const refBtn = useRef()

  const handleScroll = () => {
    const current = refBtn.current.getBoundingClientRect().top
    setCurrentBtnTop(current)
  }
  let firstFoucs = useRef()
  let secondFoucs = useRef()
  let tridFoucs = useRef()
  let fourFoucs = useRef()
  //验证光标后移
  const handleInputValue = (e, type) => {
    const { value = '' } = e.target
    if (type == 'A') {
      if (value) secondFoucs.current.focus()
      setNum1(e.target.value)
    } else if (type == 'B') {
      if (value) tridFoucs.current.focus()
      setNum2(e.target.value)
    } else if (type == 'C') {
      if (value) fourFoucs.current.focus()
      setNum3(e.target.value)
    } else {
      setNum4(e.target.value)
    }
  }
  const handleDel = (e) => {
    const BACK_SPACE = 8
    const isBackSpaceKey = e.keyCode === BACK_SPACE
    if (isBackSpaceKey && e.target.value.length === 0) {
      let previous = e.target
      previous = previous.previousElementSibling
      while (previous) {
        if (previous === null) break
        if (previous.tagName.toLowerCase() === 'input') {
          previous.focus()
          break
        }
      }
    }
  }

  useEffect(() => {
    getTimeData()
    buildTeam()
    collectEvent('predefine_pageview', {
      title: '白日梦想家活动',
    })
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='wrapper'>
      <Layout>
        <div className='ruleBtn'>
          <a href='https://www.finka.cn/event/day-dream-rule'>活动规则</a>
        </div>
        <div className='invita'>
          <Modal
            visible={isShowDialog}
            transparent
            maskClosable={true}
            footer={[
              {
                text: '知道了,去更新',
                onPress: () => {
                  if (config.IOS) {
                    location.href = 'https://apps.apple.com/cn/app/id898533490'
                  } else {
                    location.href = 'https://app.finkapp.cn/app-release-1.6.1-20211016-1357-Official.apk'
                  }
                  setIsShowDialog(false)
                },
              },
            ]}
          >
            <div>当前应用版本太低，会影响您活动的正常流程，请将软件升级至最新版本后，继续参与活动</div>
          </Modal>
          <img src={imgConfig.header} />
          <div className='invita__content'>
            <img src={imgConfig.infoImg} />
            <p className='invita__content-time-p'>
              活动<span className='invita__content-time'>{day}</span>天
              <span className='invita__content-time'>{hour}</span>小时
              <span className='invita__content-time'>{minute}</span>分
              <span className='invita__content-time'>{second}</span>秒后结束
            </p>
            <div className={`invita__content-btnbox`}>
              <div
                className='invita__content-btn'
                onClick={() => {
                  collectEvent('WebClick', {
                    title: '白日梦想家活动',
                    element_content: '邀请好友组队',
                  })
                  toWechatCopyClick()
                }}
              >
                立即组队领门票
              </div>
              <p className={`invita__content-tips ${isVerification ? 'none' : ''}`}>
                组队成功后，你和好友都将获得抽奖资格
              </p>
              <div className={`${isVerification ? '' : 'none'}`}>
                <img className='invita__content-warningIcon' src={imgConfig.warningIcon} />
                <p className='invita__content-tips-red'>
                  由于环球影城入场须实名认证，需要验证你的身份后才能继续参与抽奖。
                  <span
                    className='invita__content-tips-yz'
                    onClick={() => {
                      setIsVerificationToast(true)
                    }}
                  >
                    现在去验证
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={`${currentBtnTop && currentBtnTop <= 0 ? 'fixed' : 'none'}`}>
            <div
              className='invita__content-btn'
              onClick={() => {
                collectEvent('WebClick', {
                  title: '白日梦想家活动',
                  element_content: '邀请好友组队',
                })
                toWechatCopyClick()
              }}
            >
              立即组队领门票
            </div>
          </div>
          <div id='btn' ref={refBtn} className='invita__goldbox'>
            <img className='invita__goldbox-img' src={imgConfig.goldCode}></img>
            <p className='invita__goldbox-des'>当前仅{currentGoldenTeamsCount}个队伍获得黄金抽签码</p>
            <div
              className='invita__goldbox-btn'
              onClick={() => {
                setIsShowGoldShareToast(true)
              }}
            >
              立即获取
            </div>
          </div>
          <div className='invita__mycodebox'>
            <div className='invita__mycodebox-top'>
              <div className='invita__mycodebox-title'>我的抽奖码({codeLength}/6)</div>
              <p className='invita__mycodebox-text'>抽奖码越多，中奖机会越大</p>
            </div>
            <div className='invita__mycodebox-line'></div>
            <div className='list'>{codeListView()}</div>
          </div>
          <div className='appointment__info'>
            <div
              onClick={() => {
                collectEvent('WebClick', {
                  title: '白日梦想家活动',
                  element_content: '用户头像',
                })
                location.href = 'finka2020://user/FShBihJwrHw'
              }}
              className='appointment__info--user1'
            ></div>
            <div
              onClick={() => {
                collectEvent('WebClick', {
                  title: '白日梦想家活动',
                  element_content: '用户头像',
                })
                location.href = 'finka2020://user/yojT-SwTwzo'
              }}
              className='appointment__info--user2'
            ></div>
            <div
              onClick={() => {
                collectEvent('WebClick', {
                  title: '白日梦想家活动',
                  element_content: '用户头像',
                })
                location.href = 'finka2020://user/2s4_KVys7XI'
              }}
              className='appointment__info--user3'
            ></div>
            <div
              onClick={() => {
                collectEvent('WebClick', {
                  title: '白日梦想家活动',
                  element_content: '用户头像',
                })
                location.href = 'finka2020://user/yReHcaobiLk'
              }}
              className='appointment__info--user4'
            ></div>
            <img src={imgConfig.info} />
          </div>
          <div className={`invita__popup ${isShowShareToast == true ? '' : 'none'}`}>
            <div className='invita__popup--box'>
              <div className='invita__popup--mainbox'>
                <img
                  className='invita__popup--close'
                  src={imgConfig.close}
                  onClick={() => {
                    setIsShowShareToast(false)
                  }}
                />
                <img className='invita__popup--main' src={imgConfig.gif} />
                <div
                  className='invita__popup--copybtn'
                  onClick={() => {
                    collectEvent('WebClick', {
                      title: '白日梦想家活动',
                      element_content: '去微信粘贴',
                    })
                    setIsShowShareToast(false)
                    location.href = 'finka2020://openapp?url=weixin://'
                    Toast.success('已复制')
                  }}
                >
                  口令已复制，去微信粘贴
                </div>
              </div>
            </div>
          </div>
          <div className={`invita__popup ${isShowGoldShareToast == true ? '' : 'none'}`}>
            <div className='invita__popup--box'>
              <div className='invita__popup--mainbox'>
                <img
                  className='invita__popup--close '
                  src={imgConfig.close}
                  onClick={() => {
                    setIsShowGoldShareToast(false)
                  }}
                />
                <img className='invita__popup--main' src={imgConfig.goldCodeToast} />
                <div
                  className='invita__popup--ava'
                  style={{
                    backgroundImage: `url(${userAva})`,
                  }}
                ></div>
                <div
                  className='invita__popup--invitabtn'
                  onClick={() => {
                    setIsShowGoldShareToast(false)
                    collectEvent('WebClick', {
                      title: '白日梦想家活动',
                      element_content: '现在去邀请',
                    })
                    toWechatCopyClick()
                  }}
                ></div>
                <p className='invita__popup--des'>当前仅{currentGoldenTeamsCount}个队伍获得黄金抽签码</p>
              </div>
            </div>
          </div>
          <div className={`invita__popup ${isVerificationToast ? '' : 'none'}`}>
            <div className='invita__popup--box'>
              <div className='invita__popup--mainbox'>
                <img
                  className='invita__popup--close '
                  src={imgConfig.close}
                  onClick={() => {
                    setIsVerificationToast(false)
                  }}
                />
                <img className='invita__popup--main' src={imgConfig.getVerificationBg2} />
                <p className='invita__popup--verification-title'>填写您的身份证后4位</p>
                <div>
                  <input
                    type='tel'
                    className='invita__popup-input'
                    value={num1}
                    ref={firstFoucs}
                    maxLength={1}
                    onKeyDown={(e) => handleDel(e)}
                    onChange={(e) => handleInputValue(e, 'A')}
                  ></input>
                  <input
                    type='tel'
                    className='invita__popup-input invita__popup-input2'
                    value={num2}
                    ref={secondFoucs}
                    maxLength={1}
                    onKeyDown={(e) => handleDel(e)}
                    onChange={(e) => handleInputValue(e, 'B')}
                  ></input>
                  <input
                    type='tel'
                    className='invita__popup-input invita__popup-input3'
                    value={num3}
                    ref={tridFoucs}
                    maxLength={1}
                    onKeyDown={(e) => handleDel(e)}
                    onChange={(e) => handleInputValue(e, 'C')}
                  ></input>
                  <input
                    type='text'
                    className='invita__popup-input invita__popup-input4'
                    value={num4}
                    ref={fourFoucs}
                    maxLength={1}
                    onKeyDown={(e) => handleDel(e)}
                    onChange={(e) => handleInputValue(e, 'D')}
                  ></input>
                </div>
                <div
                  className='invita__popup--cancelBtn'
                  onClick={() => {
                    setIsVerificationToast(false)
                  }}
                >
                  拒绝填写
                </div>
                <div
                  className='invita__popup--submitBtn'
                  onClick={() => {
                    const num = '' + num1 + num2 + num3 + num4
                    if (num.length === 4) {
                      setIsVerificationToast(false)
                      setIsShowSubmitToast(true)
                    } else {
                      Toast.fail('请输入完整的信息', 2.5)
                    }
                  }}
                >
                  确定
                </div>
              </div>
            </div>
          </div>
          <div className={`invita__popup ${isShowSubmitToast == true ? '' : 'none'}`}>
            <div className='invita__popup--box'>
              <div className='invita__popup--mainbox'>
                <img
                  className='invita__popup--close '
                  src={imgConfig.close}
                  onClick={() => {
                    setIsShowSubmitToast(false)
                  }}
                />
                <p className='invita__popup--verification-title'>确认身份信息</p>

                <img className='invita__popup--main' src={imgConfig.getVerificationBg} />
                <div className='invita__popup-input invita__popup-input1'>{num1}</div>
                <div className='invita__popup-input invita__popup-input2'>{num2}</div>
                <div className='invita__popup-input invita__popup-input3'>{num3}</div>
                <div className='invita__popup-input invita__popup-input4'>{num4}</div>
                <p className='invita__popup--verification-text'>务必保证号码的正确性，否则将会影响您中奖 </p>
                <div
                  className='invita__popup--cancelBtn'
                  onClick={() => {
                    setIsShowSubmitToast(false)
                    setIsVerificationToast(true)
                  }}
                >
                  返回修改
                </div>
                <div
                  className='invita__popup--submitBtn'
                  onClick={() => {
                    idcardPost()
                    setIsShowSubmitToast(false)
                  }}
                >
                  确定
                </div>
              </div>
            </div>
          </div>
          <div className={`invita__popup ${isShowGetCode ? '' : 'none'}`}>
            <div className='invita__popup--box'>
              <div className='invita__popup--mainbox'>
                <img
                  className='invita__popup--close '
                  src={imgConfig.close}
                  onClick={() => {
                    setIsShowGetCode(false)
                  }}
                />
                <div className='invita__popup-top'>
                  <div
                    className='invita__popup-top__ava'
                    style={{
                      backgroundImage: `url(${userAvatarImage})`,
                    }}
                  ></div>
                  <span className='invita__popup-top__x'>X</span>
                  <div
                    className='invita__popup-top__ava'
                    style={{
                      backgroundImage: `url(${recvUserAvatarImage})`,
                    }}
                  ></div>
                  <span className='invita__popup-top__text'>恭喜组队成功</span>
                </div>
                <img className='invita__popup--main' src={imgConfig.getCodeBg} />
                <p className='invita__popup--title'>获得抽奖码一张</p>
                <div className='invita__popup--codeBox'>抽奖码 </div>
                <span className='invita__popup--code'>{currentTeamId}</span>

                <p className='invita__popup--text'>若中奖你和好友都得一张环球影城门票</p>
                <p className='invita__popup--text invita__popup--text2'>（开奖后会在第一时间通知你哦）</p>
                <div
                  className='invita__popup--againabtn'
                  onClick={() => {
                    setIsShowGetCode(false)
                    collectEvent('WebClick', {
                      title: '白日梦想家活动',
                      element_content: '我再组一队',
                    })
                    toWechatCopyClick()
                  }}
                >
                  知道了，我再组一队
                </div>
              </div>
            </div>
          </div>
          <div className={`invita__popup ${isShowGetGoldCode ? '' : 'none'}`}>
            <div className='invita__popup--box'>
              <div className='invita__popup--mainbox'>
                <img
                  className='invita__popup--close '
                  src={imgConfig.close}
                  onClick={() => {
                    setIsShowGetGoldCode(false)
                  }}
                />
                <div className='invita__popup-top'>
                  <div
                    className='invita__popup-top__ava'
                    style={{
                      backgroundImage: `url(${userAvatarImage})`,
                    }}
                  ></div>
                  <span className='invita__popup-top__x'>X</span>
                  <div
                    className='invita__popup-top__ava'
                    style={{
                      backgroundImage: `url(${recvUserAvatarImage})`,
                    }}
                  ></div>
                  <span className='invita__popup-top__text'>恭喜组队成功</span>
                </div>
                <img className='invita__popup--main' src={imgConfig.getGoldCodeBg} />
                <p className='invita__popup--title'>获得黄金抽奖码一张</p>
                <div className='invita__popup--codeBox invita__popup--goldCodeBox'>黄金抽奖码 </div>
                <span className='invita__popup--code'>{currentTeamId}</span>

                <p className='invita__popup--text'>若中奖你和好友都得一张环球影城门票</p>
                <p className='invita__popup--text invita__popup--text2'>（开奖后会在第一时间通知你哦）</p>
                <div
                  className='invita__popup--againabtn'
                  onClick={() => {
                    setIsShowGetGoldCode(false)
                    collectEvent('WebClick', {
                      title: '白日梦想家活动',
                      element_content: '我再组一队',
                    })
                    toWechatCopyClick()
                  }}
                >
                  知道了，我再组一队
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
