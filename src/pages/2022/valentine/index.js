import React, { useState, useEffect, useRef } from 'react'
import { Toast } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import req, { GET } from '@utils/req'
import { getQueryValue, copyText, collectEvent, bluedCollectEvent, isWeiXin } from '@utils/utils'
import weixinConfig from '@constants/weixin'
import DownloadApp from '@components/Download-app'
import Question from './components/Question'
import Reward from './components/Reward'
import Result from './components/Result'
import OutResult from './components/OutResult'
import Friends from './components/Friends'
import RewardPool from './components/RewardPool'
import AnswerFirstPage from './components/AnswerFirstPage'
import { imgConfig } from './constants'
import { getRewardQuestionData, getFirstPageData } from './server'

import './index.scss'

const config = window.CONFIG || {}

// if (config.nodeEnv === 'local') {
//   config.userId = 'gWZ68VoW4kM' // 删除删掉
// }

const App = () => {
  const [maskShow, setMaskShow] = useState(false)
  const rewardUserId = getQueryValue('shareBy') || ''
  const joined = getQueryValue('joined') || ''
  const code = getQueryValue('code') || ''

  const [activeIndex, setActiveIndex] = useState(null) // 正确null
  const [rewardDetails, setRewardDetails] = useState(1)
  const [rewardOutDetails, setRewardOutDetails] = useState(1)
  const [resultInfo, setResultInfo] = useState({})
  const [outResultInfo, setOutResultInfo] = useState({})

  const downappRef3 = useRef()

  const initUrl = config.nodeEnv === 'production' ? 'https://finka-h5.finkapp.cn' : 'https://finka-h5.wowkaka.cn'
  const url3 = {
    // 应用宝地址
    yybUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cupidapp.live&ckey=CK1507226084937&android_schema=',
    // 页面地址
    pageUrl: 'finka2020://webview/openNew?url=' + initUrl + `/hd/2022/valentine?rewardUserId=${rewardUserId}`,
    // 安卓下载地址
    androidDownUrl: 'https://datarangers.finkapp.cn/s/lU8PVD9R',
    // ios地址
    iosUrl:
      'https://finkapp.cn/native/universal-link-fi?url=' + initUrl + `/hd/2022/valentine?rewardUserId=${rewardUserId}`,
  }

  // 答题
  const handleAnwerQuestion = (refreshing) => {
    if (!rewardUserId) return // 上线保留

    getRewardQuestionData(rewardUserId).then((res) => {
      const { success, data, message = '' } = res
      if (!success) return Toast.fail(message || '服务器错误')

      Toast.hide()

      setOutResultInfo(data)
      setRewardOutDetails(data || {})
      // 站外添加口令到剪切版
      const { shareToken, isJoined, isSelf } = data

      if (!config.userId) {
        copyText(shareToken || '')
      }

      if (refreshing) {
        return
      }

      if (joined === 'true' || joined === true) {
        setActiveIndex(5)

        return
      }

      // 查看自己结果
      if (isSelf) {
        localStorage.setItem('activeIndex', '4')
        setActiveIndex(4)
        setResultInfo(data || {})
        return
      }

      // 答题
      if (isJoined && !isSelf) {
        setActiveIndex(5)
        return
      }

      // 答题
      if (!isJoined && !isSelf) {
        setActiveIndex(7)
        return
      }

      localStorage.setItem('activeIndex', 'first')
    })
  }

  const handlerRenderPage = () => {
    Toast.loading('Loading...', 60)

    // rewardUserId为空出题人,有值,答题人
    if (!rewardUserId && config.userId) {
      // 站内
      getFirstPageData().then((res) => {
        const { success, data, message = '' } = res
        if (!success) return Toast.fail(message || '服务器错误')

        Toast.hide()

        if (data?.hasInfo) {
          setActiveIndex(4)
          setResultInfo(data || {})
        } else {
          setActiveIndex(0)
        }
      })
    } else {
      // 答题
      handleAnwerQuestion()
    }
  }

  const fetchData = async () => {
    if (config.weiXin) {
      if (!code) {
        const params = window.location.href.includes('actH52022') ? '' : '/actH52022'

        const url =
          config.nodeEnv === 'production'
            ? window.location.href.replace('finka-h5.finkapp.cn', `www.finka.cn${params}`)
            : window.location.href.replace('finka-h5.wowkaka.cn', `finka-www.wowkaka.cn${params}`)

        const redirectUri = encodeURIComponent(url)
        const appId = weixinConfig.appId
        const state = weixinConfig.state
        const initUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
        window.location.href = initUrl
      } else {
        await req({
          endpoint: `/actH52022/api/2022/weixin/unionid?code=${code}`,
          method: GET,
        }).then((res) => {
          const { msg, code, data } = res
          if (code === 200) {
            // 设置cookie，防止后面页面不刷新取不到哈
            window.CONFIG.wxInfo = data
            if (data.errcode == 0) {
              localStorage.setItem('wxInfo', JSON.stringify(data))
            }

            document.cookie = `_mp_openid=${data}`

            handlerRenderPage()
          } else {
            Toast.fail(msg)
          }
        })
      }
    }
  }

  useEffect(() => {
    if (rewardUserId) {
      collectEvent('predefine_pageview', {
        title: '默契大挑战-答题首页',
        alo_refer: isWeiXin ? '微信' : 'null',
      })
      bluedCollectEvent({
        event: 'H5_PAGE_SHOW',
        name: 'VALENTINE_DAY_TACIT_CHALLENGE_ANSWER_HOME_PAGE',
        source: isWeiXin ? 'WECHAT' : 'null',
      })
    } else {
      collectEvent('predefine_pageview', {
        title: '默契大挑战-出题首页',
      })
      bluedCollectEvent({
        event: 'H5_PAGE_SHOW',
        name: 'VALENTINE_DAY_TACIT_CHALLENGE_ASK_HOME_PAGE',
      })
    }

    if (config.nodeEnv === 'local') {
      handlerRenderPage()
    } else if (!rewardUserId && !config.userId) {
      setMaskShow(true)
      return
    }

    if (config.userId) {
      handlerRenderPage()
    } else {
      fetchData()
    }
  }, [])

  return (
    <div className='wrapper'>
      <Layout>
        <div className='valentine' id='resultPage'>
          {/* 首页 */}
          {activeIndex === 0 && (
            <div className='valentine-imgBg'>
              <img src={imgConfig.firstPagechuti} />
              <div className='valentine-container'>
                {config.userId && (
                  <div
                    className='valentine__pool'
                    onClick={() => {
                      localStorage.setItem('activeIndex', 'first')
                      setActiveIndex(6)
                    }}
                  >
                    <div>悬赏池</div>
                    <div>&gt;</div>
                  </div>
                )}

                <div
                  className='valentine-start'
                  onClick={() => {
                    collectEvent('WebClick', {
                      title: '默契大挑战-出题首页',
                      element_content: '开始',
                    })
                    bluedCollectEvent({
                      event: 'H5_BTN_CLICK',
                      name: 'VALENTINE_DAY_TACIT_CHALLENGE_ASK_HOME_PAGE',
                    })

                    setActiveIndex(1)
                  }}
                ></div>
              </div>
            </div>
          )}
          {/* 答题页 1*/}
          {activeIndex === 1 && (
            <Question
              setActiveIndex={setActiveIndex}
              setRewardDetails={setRewardDetails}
              setRewardOutDetails={setRewardOutDetails}
              outResultInfo={outResultInfo}
              code={code}
            />
          )}

          {/* 悬赏令 2*/}
          {activeIndex === 2 && (
            <Reward rewardDetail={rewardDetails} setActiveIndex={setActiveIndex} setResultInfo={setResultInfo} />
          )}

          {/* 结果页 3*/}
          {activeIndex === 3 && <Result setActiveIndex={setActiveIndex} resultInfo={resultInfo} />}

          {/* 默契好友榜 4*/}
          {activeIndex === 4 && <Friends setActiveIndex={setActiveIndex} resultInfo={resultInfo} />}

          {/* 站外结果页 5*/}
          {activeIndex === 5 && <OutResult setActiveIndex={setActiveIndex} rewardOutDetails={rewardOutDetails} />}

          {/* 悬赏池 6*/}
          {activeIndex === 6 && <RewardPool setActiveIndex={setActiveIndex} />}

          {/* 答题首页*/}
          {activeIndex === 7 && (
            <AnswerFirstPage
              outResultInfo={outResultInfo}
              setActiveIndex={setActiveIndex}
              handleAnwerQuestion={handleAnwerQuestion}
            />
          )}
          {/* 站外回流 */}
          <DownloadApp ref={downappRef3} url={url3} />
        </div>

        {maskShow && (
          <div className='mask'>
            <div className='mask__version'>
              <div className='mask__version-title'>
                暂不支持站外出题, <br />
                请前往翻咔客户端出题,或者扫码答题
              </div>
              <div
                className='mask__start'
                onClick={() => {
                  setMaskShow(false)
                  downappRef3.current.downloadApp()
                }}
              >
                去出题
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
