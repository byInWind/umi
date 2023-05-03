import React, { useState, useEffect } from 'react'
import { Toast } from 'antd-mobile'
import PropTypes from 'prop-types'
import { sethandleHeaders } from '@utils/headers'
import { queryString, getQueryValue, clearParams, collectEvent, bluedCollectEvent } from '@utils/utils'
import { orderList, optionList, imgConfig } from '../../constants'
import { getQuestionData } from '../../server'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const Question = ({ setActiveIndex, setRewardDetails, setRewardOutDetails, outResultInfo }) => {
  let rewardUserId = getQueryValue('shareBy')

  const [userInfo, setUserInfo] = useState({})
  const [number, setNumber] = useState(1)
  const [selected, setSelected] = useState(null)
  const [question, setQuestion] = useState({})
  const [userAnswer, setUsernswer] = useState([])

  // 提交答题
  const handlerSubmit = (result) => {
    Toast.info('正在提交,请稍后')

    const storage = localStorage.getItem('wxInfo')
    const wx = JSON.parse(storage)

    const { openid, nickname, avatar } = window.CONFIG?.wxInfo || wx || {}
    const outUserinfo = {
      openId: openid || '',
      extImageUrl: avatar || '',
      extNickName: nickname || '',
    }

    const userRecordInfo = {
      ...outUserinfo,
      recordDetails: result,
      rewardUid: rewardUserId,
    }

    const params = {
      openId: openid || '',
      source: config?.userId ? 1 : 0,
      userRecordInfo: JSON.stringify(clearParams(userRecordInfo)),
    }

    if (!openid && !config?.userId) {
      return Toast.fail('请先登录或授权后重试')
    }

    fetch(`/actH52022/api/act/valentine-2021/save-user-record`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(clearParams(params)),
    })
      .then((res) => res.json())
      .then((res) => {
        Toast.hide()

        const { status, data = {} } = res

        if (status === 200) {
          setActiveIndex(5)

          setRewardOutDetails(data)
        } else {
          Toast.fail(res.message || '服务器错误')
        }
      })
  }

  const handleGetQuestion = (nopeId = '') => {
    if (!config?.userId) return

    const list = userAnswer.map((item) => item.questionId)

    const ids = [...list, nopeId].filter((item) => item).join(',')

    getQuestionData(ids).then((res) => {
      const { success, data, message = '' } = res
      if (!success) return Toast.fail(message || '服务器错误')

      Toast.hide()

      setUserInfo({
        rewardImageUrl: data?.rewardImageUrl,
        rewardNickName: data?.rewardNickName,
        rewardUid: data?.rewardContent?.uid || '',
      })
      setSelected(null)
      setQuestion(data?.question || {})
    })
  }

  const renderOrder = (orderList, number = 1) => {
    return orderList.map((ele) => (
      <span key={ele} className={`question__order-item ${number >= ele ? 'acitve' : ''}`}>
        {ele}
      </span>
    ))
  }

  const renderOption = (optionList, answersList = [], selected = 0) =>
    answersList?.map((item, index) => (
      <div
        onClick={() => {
          setSelected(index)

          userAnswer.forEach((answer) => {
            if (answer.sort === number) {
              userAnswer.pop()
            }
          })

          const result = [
            ...userAnswer,
            {
              answer: index + 1,
              questionId: question?.id || '',
              sort: number,
            },
          ]

          setUsernswer(result)
        }}
        key={optionList[index]}
        className={`question__panel-options--item ${selected === index ? 'acitve' : ''}`}
      >
        <span>{optionList[index]}</span>
        {item?.choiceContent || ''}
      </div>
    ))

  useEffect(() => {
    if (rewardUserId) {
      const { rewardContent = {}, rewardNickName = '-', rewardImageUrl } = outResultInfo
      setSelected(null)
      setQuestion((rewardContent?.questions && rewardContent?.questions[number - 1]) || {})

      setUserInfo({
        rewardNickName,
        rewardImageUrl,
        rewardUid: rewardContent?.uid,
      })

      return
    } else {
      handleGetQuestion()
    }
  }, [number])

  return (
    <div className='question valentine-imgBg'>
      <div className='valentine-imgBg'>
        <img src={imgConfig.questionbg} />

        <div className='question__content'>
          <div className='question__order'>{renderOrder(orderList, number)}</div>
          <div className='question__panel'>
            <div className='question__panel-header'>
              <span className='question__panel-left'>
                <div
                  className='question__panel-avatar'
                  onClick={() => {
                    if (config.userId) {
                      location.href = `finka2020://user/${userInfo?.rewardUid || config.userId || ''}`
                    }
                  }}
                >
                  <img src={userInfo?.rewardImageUrl || imgConfig.placeImg} />
                </div>
                <div className='question__panel-name'>{userInfo.rewardNickName}</div>
              </span>
              <span className='question__panel-right'>{question?.content || ''}</span>
            </div>
            <div className='question__panel-options'>{renderOption(optionList, question?.choiceList, selected)}</div>
            {/* <div className='question__panel-options'>{renderOption(optionList, choiceList, selected)}</div> */}
            <div className='question__panel-btn'>
              {!rewardUserId && (
                <span
                  className='question__panel-change'
                  onClick={() => {
                    handleGetQuestion(question?.id)
                  }}
                >
                  <img src={imgConfig.change} />
                  <span>换一题</span>
                </span>
              )}
              <span
                className='question__panel-next'
                onClick={() => {
                  if (selected === null) {
                    Toast.info('请至少选择一个选项')

                    return
                  }

                  const count = number + 1

                  if (rewardUserId && count === 7) {
                    handlerSubmit(userAnswer)
                  } else if (config?.userId && !rewardUserId && count === 7) {
                    setRewardDetails(userAnswer)
                    setActiveIndex(2)

                    collectEvent('WebClick', {
                      title: '默契大挑战-出题首页',
                      element_content: '悬赏任务',
                    })
                    bluedCollectEvent({
                      event: 'H5_BTN_CLICK',
                      name: 'VALENTINE_DAY_TACIT_CHALLENGE_TASK_PAGE',
                    })
                  } else {
                    setNumber(count)
                  }
                }}
              >
                <span>下一步</span>
                <img src={imgConfig.next} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Question.propTypes = {
  setActiveIndex: PropTypes.func,
  setRewardOutDetails: PropTypes.func,
  setRewardDetails: PropTypes.func,
  outResultInfo: PropTypes.object,
}

export default Question
