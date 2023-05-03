import React, { useState, useEffect } from 'react'
import { Modal, Toast } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'
import { queryString } from '@utils/utils'
import { imgConfig } from '../appointment/constants'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [isWon, setIsWon] = useState()
  const [myRanksInfo, setMyRanksInfo] = useState([])
  const [codeLength, setCodeLength] = useState(0)

  const [isShowDialog, setIsShowDialog] = useState(false)

  const imageUrl = config?.nodeEnv === 'production' ? 'https://pic.finkapp.cn/' : 'https://pic.finkapp.cn/t/'
  const domainUrl = config?.nodeEnv === 'production' ? 'https://www.finka.cn' : 'https://finka-www.wowkaka.cn'

  const getMainlandData = () => {
    fetch(`/api/activity/daydreamer-2021/mainland`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        setIsShowDialog(data?.needUpdate)
        setMyRanksInfo(data?.userTeamInfoListView.concat())
        setCodeLength(data?.userTeamInfoListView?.length)
        setIsWon(data?.isLoginUserWonAwards)
      })
  }
  const takeAwardsPost = () => {
    fetch(`/api/activity/daydreamer-2021/take_awards`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString({}),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          if (res.data.need2RealVerify) {
            location.href = `${domainUrl}/user/cloudauth?activity=daydreamer`
          } else {
            location.href = 'https://www.wjx.top/vj/mLINDhP.aspx'
          }
        } else {
          Toast.fail(res.message, 3)
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
                <img
                  src={
                    item.currentTeamWonAwards
                      ? imgConfig.wonIcon
                      : item.goldenTeam
                      ? imgConfig.goldCodeBg
                      : imgConfig.codeBg
                  }
                ></img>
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
              <img src={imgConfig.invitaBtn}></img>
            )}
          </div>
        ))}
      </>
    )
  }

  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getMainlandData()
    collectEvent('predefine_pageview', {
      title: '白日梦想家活动',
    })
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
            <div className={`${isWon ? '' : 'none'}`}>
              <p className='invita__won-text'>恭喜您，中奖啦~</p>
              <div className={`invita__content-btnbox`}>
                <div
                  className='invita__content-btn'
                  onClick={() => {
                    collectEvent('WebClick', {
                      title: '白日梦想家活动',
                      element_content: '立即领奖',
                    })
                    takeAwardsPost()
                  }}
                >
                  立即领奖
                </div>
              </div>
            </div>
            <div className={`${isWon ? 'none' : ''}`}>
              <p className='invita__won-text'>很遗憾，未中奖</p>
              <div className={`invita__content-btnbox`}>
                <div className='invita__content-btn-gray'>活动已结束</div>
              </div>
            </div>
          </div>

          <div className='invita__mycodebox'>
            <div className='invita__mycodebox-top'>
              <div className='invita__mycodebox-title'>我的抽奖码({codeLength}/6)</div>
              <p
                className='invita__mycodebox-text'
                onClick={() => {
                  collectEvent('WebClick', {
                    title: '白日梦想家活动',
                    element_content: '查看中奖名单',
                  })
                  location.href = '/hd/2021/day-dream/wonlist'
                }}
              >
                查看中奖名单
                <img className='invita__mycodebox-rightIcon' src={imgConfig.rightIcon} />
              </p>
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
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
