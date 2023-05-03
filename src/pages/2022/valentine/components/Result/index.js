import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MyQrcode from '@components/my-qrcode'
import { collectEvent, bluedCollectEvent } from '@utils/utils'
import { imgConfig } from '../../constants'
import './index.scss'
const config = window.CONFIG || {}

const Result = ({ setActiveIndex, resultInfo = {} }) => {
  const [showBtn, setShowBtn] = useState(false)

  const { finishCount = '', finishScore = '', des } = resultInfo?.rewardInfo || {}

  const initUrl =
    config.nodeEnv === 'production' ? 'https://www.finkapp.cn/actH52022' : 'https://finka-www.wowkaka.cn/actH52022'

  useEffect(() => {
    setTimeout(() => {
      setShowBtn(true)
    }, 1500)

    collectEvent('predefine_pageview', {
      title: '默契大挑战-出题结果页',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'VALENTINE_DAY_TACIT_CHALLENGE_ASK_RESULT_PAGE',
    })
  }, [])

  return (
    <div className='result valentine-imgBg'>
      <img src={imgConfig.result} />
      <div className='result__content'>
        <div className='result__header'>
          <span className='result__header-avatar'>
            <div className='result__header-avatar--img'>
              <img src={resultInfo?.rewardImageUrl || imgConfig.placeImg} />
            </div>
            <div className='result__header-avatar--name'>{resultInfo?.rewardNickName || ''}</div>
          </span>
          <span className='result__header-title'>
            {finishCount ? `第 ${finishCount} 个答对 ${finishScore} 道题的人` : '你是我等待的默契度最高的人吗?'}
            {des ? des : '等待你的挑战'}
          </span>
        </div>
        <div className='result__content-code'>
          <span className='result__content-code--detail'>
            <MyQrcode url={`${initUrl}/fLhSqsEYKLNdPrCYDWVbkEQ?shareBy=${config.userId}`} />
          </span>
          <div className='result__content-code--font'>
            <img src={imgConfig.code} />
          </div>
        </div>
        <span
          className='result__content-send'
          onClick={() => {
            setShowBtn(false)
            setTimeout(() => {
              setShowBtn(true)
            }, 1500)

            collectEvent('WebClick', {
              title: '默契大挑战-出题结果页',
              element_content: '发给TA测试默契',
            })
            bluedCollectEvent({
              event: 'H5_BTN_CLICK',
              name: 'VALENTINE_DAY_TACIT_CHALLENGE_SEND_TO_HIM',
            })

            location.href = 'finka2020://webview/snapWebContent?album=1&callback=finish'
          }}
        >
          {showBtn && <img src={imgConfig.send} />}
        </span>

        {showBtn && (
          <div
            className='result__content-friends'
            onClick={() => {
              setActiveIndex(4)
              collectEvent('WebClick', {
                title: '默契大挑战-出题结果页',
                element_content: '查看谁和我默契最好',
              })
              bluedCollectEvent({
                event: 'H5_BTN_CLICK',
                name: 'VALENTINE_DAY_TACIT_CHALLENGE_SEE_OTHER_TASK',
              })
            }}
          >
            <div>默契好友榜</div>
            <div> &gt;</div>
          </div>
        )}

        <div className='result__content-footer'>
          <img src={imgConfig.footer} />
        </div>
      </div>
    </div>
  )
}

Result.propTypes = {
  setActiveIndex: PropTypes.func,
  resultInfo: PropTypes.object,
}

export default Result
