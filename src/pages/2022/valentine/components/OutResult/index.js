import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import { getQueryValue, collectEvent, bluedCollectEvent, isWeiXin } from '@utils/utils'
import DownloadApp from '@components/Download-app'

import { imgConfig } from '../../constants'

import './index.scss'

const token = '3http://finka.cn##1d6os@Ibm0lDblVTOHxavFpyG5kdEMbCegr4uVGocDJGBKo0uxvAMStgDAm7typYgR+xTX##'

const config = window.CONFIG || {}
const OutResult = ({ rewardOutDetails = {} }) => {
  let rewardUserId = getQueryValue('shareBy')

  const { shareToken = '' } = rewardOutDetails

  const [currentBoy, setCurrentBoys] = useState({})
  const {
    score,
    imageUrl = '',
    nickName = '',
    finish = false,
  } = rewardOutDetails?.userRecord || rewardOutDetails?.rewardContent || {}

  const downappRef = useRef()
  const downappRef2 = useRef()

  const initUrl = config.nodeEnv === 'production' ? 'https://finka-h5.finkapp.cn' : 'https://finka-h5.wowkaka.cn'
  const url = {
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

  const url2 = {
    // 应用宝地址
    yybUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cupidapp.live&ckey=CK1507226084937&android_schema=',
    // 页面地址
    pageUrl: `finka2020://webview/openNew?url=finka2020://user/${currentBoy?.userId || ''}`,
    // 安卓下载地址
    androidDownUrl: 'https://datarangers.finkapp.cn/s/lU8PVD9R',
    // ios地址
    //       https://finkapp.cn/native/universal-link-shareuser?url=finka2020://user/kE68FnV10D8?shareby=kE68FnV10D8

    iosUrl: `https://finkapp.cn/native/universal-link-fi?url=finka2020://user/${currentBoy?.userId || ''}}`,
  }

  const renderBoys = (users) => {
    return users.map((user, index) => (
      <div
        onClick={() => {
          setCurrentBoys(user)

          collectEvent('WebClick', {
            title: '默契大挑战-答题首页',
            element_content: '查看推荐用户',
            alo_refer: isWeiXin ? '微信' : 'null',
          })
          bluedCollectEvent({
            event: 'H5_BTN_CLICK',
            name: 'VALENTINE_DAY_TACIT_CHALLENGE_JOIN_IN',
            source: isWeiXin ? 'WECHAT' : 'null',
          })
          if (config.userId) {
            location.href = `finka2020://user/${user?.userId}`
          } else {
            setTimeout(() => {
              copy(shareToken || token)
              downappRef2.current.downloadApp()
            }, 100)
          }
        }}
        key={index}
        className='user'
      >
        <img src={user.avatarUrl || ''} />
      </div>
    ))
  }

  const { rewardImageUrl = '', rewardNickName = '', popularUsers = [], rewardUid } = rewardOutDetails || {}

  useEffect(() => {
    collectEvent('predefine_pageview', {
      title: '默契大挑战-答题结果页',
      alo_refer: isWeiXin ? '微信' : 'null',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'VALENTINE_DAY_TACIT_CHALLENGE_ANSWER_RESULT_PAGE',
      source: isWeiXin ? 'WECHAT' : 'null',
    })
  }, [])

  return (
    <div className='outResult valentine-imgBg'>
      <img style={{ width: '100%' }} src={imgConfig.outResult} />
      <div className='outResult__content'>
        <div className='outResult__content-compare'>
          <div className='outResult__content-heart'>
            <img src={imgConfig.heart} />
          </div>
          <div className='outResult__content-avatar'>
            <div
              onClick={() => {
                if (config.userId) {
                  location.href = `finka2020://user/${rewardUid}`
                } else {
                  setCurrentBoys({ userId: rewardUid })

                  setTimeout(() => {
                    copy(shareToken || token)
                    downappRef2.current.downloadApp()
                  }, 100)
                }
              }}
              className='outResult__content-avatar-img'
            >
              <img src={rewardImageUrl || imgConfig.placeImg} />
            </div>
            <div className='outResult__content-avatar-name'>{rewardNickName || ''}</div>
          </div>
          <div className='outResult__content-compare--score'>
            <div className='score'>{score || 0}</div>
            <div className='desc'>默契值</div>
          </div>
          <div className='outResult__content-avatar'>
            <div className='outResult__content-avatar-img'>
              <img src={imageUrl || ''} />
            </div>
            <div className='outResult__content-avatar-name'>{nickName || ''}</div>
          </div>
        </div>
        <div className='outResult__content-rewardStatus'>
          {finish ? (
            <>
              <img className='outResult__content-rewardStatus-icon' src={imgConfig.givefive} />
              <span>恭喜完成悬赏任务并获得他的奖励</span>
              <img className='outResult__content-rewardStatus-img' src={imgConfig.reward} />
            </>
          ) : (
            '去看看其他人的悬赏邀约吧'
          )}
        </div>

        <>
          <div className='outResult__content-boy'>{renderBoys(popularUsers)}</div>
          <div className='outResult__content-caihong'>还有他们向你发出约会邀请哦</div>
        </>

        <span
          onClick={() => {
            collectEvent('WebClick', {
              title: '默契大挑战-答题首页',
              element_content: '我也要发起挑战',
              alo_refer: isWeiXin ? '微信' : 'null',
            })
            bluedCollectEvent({
              event: 'H5_BTN_CLICK',
              name: 'VALENTINE_DAY_TACIT_CHALLENGE_JOIN_IN',
              source: isWeiXin ? 'WECHAT' : 'null',
            })

            if (config?.userId) {
              location.href = '/hd/2022/valentine'
            } else {
              copy(shareToken || token)
              downappRef.current.downloadApp()
            }
          }}
          className='outResult__content-send'
        ></span>
        <div className='outResult__content-footer'>
          <img src={imgConfig.footer} />
        </div>
      </div>

      {/* 站外回流 */}
      <DownloadApp ref={downappRef} url={url} />
      {/* 站外点击优质头像跳转 */}
      <DownloadApp ref={downappRef2} url={url2} />
    </div>
  )
}

OutResult.propTypes = {
  rewardOutDetails: PropTypes.object,
}

export default OutResult
