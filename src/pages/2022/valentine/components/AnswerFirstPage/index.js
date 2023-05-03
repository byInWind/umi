import React from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import { getQueryValue, collectEvent, bluedCollectEvent, isWeiXin } from '@utils/utils'
import { imgConfig } from '../../constants'
import './index.scss'

const config = window.CONFIG || {}

const AnswerFirstPage = ({ setActiveIndex, outResultInfo = {}, handleAnwerQuestion }) => {
  let rewardUserId = getQueryValue('shareBy')

  return (
    <div className='answerFirstPage valentine-imgBg'>
      <img src={imgConfig.answer} />
      <div className='answerFirstPage__content'>
        <div className='valentine__user'>
          <div className='answerFirstPage__content-avatar'>
            <div
              className='answerFirstPage__content-avatar-img'
              onClick={() => {
                if (config.userId) {
                  location.href = `finka2020://user/${outResultInfo?.rewardContent?.uid || ''}`
                }
              }}
            >
              <img src={outResultInfo?.rewardImageUrl || imgConfig.placeImg} />
            </div>
            <div className='answerFirstPage__content-avatar-name'>{outResultInfo?.rewardNickName || '-'}</div>
          </div>
        </div>

        {config.userId && !rewardUserId && (
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
              title: '默契大挑战-答题首页',
              element_content: '开始',
              alo_refer: isWeiXin ? '微信' : 'null',
            })
            bluedCollectEvent({
              event: 'H5_BTN_CLICK',
              name: 'VALENTINE_DAY_TACIT_CHALLENGE_BEGIN_ANSWER',
              source: isWeiXin ? 'WECHAT' : 'null',
            })

            setActiveIndex(1)
            copy(outResultInfo?.shareToken || '')

            if (!outResultInfo) {
              handleAnwerQuestion('refreshing')
            }
          }}
        ></div>
      </div>
    </div>
  )
}

AnswerFirstPage.propTypes = {
  setActiveIndex: PropTypes.func,
  handleAnwerQuestion: PropTypes.func,
  outResultInfo: PropTypes.object,
}

export default AnswerFirstPage
