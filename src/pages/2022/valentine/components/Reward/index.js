import React, { useState } from 'react'
import { Toast } from 'antd-mobile'
import PropTypes from 'prop-types'
import { sethandleHeaders } from '@utils/headers'
import { queryString } from '@utils/utils'
import { imgConfig, chioseList } from '../../constants'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const Reward = ({ rewardDetail, setActiveIndex, setResultInfo }) => {
  const [selected, setSelected] = useState(null)
  const [limit, setLimit] = useState(0)
  const [order, setOrder] = useState(1)
  const [count, setCount] = useState(1)
  const [option, setOptions] = useState('')

  function uniqueByAttr(array, key) {
    const hash = {}
    const arr = array.reduce((preVal, curVal) => {
      hash[curVal[key]] ? '' : (hash[curVal[key]] = true && preVal.push(curVal))
      return preVal
    }, [])
    return arr
  }

  const handlerSubmit = (jump = '') => {
    Toast.info('正在提交,请稍后')
    let result = rewardDetail

    if (result.length > 6) {
      result = uniqueByAttr(rewardDetail, 'sort')
    }

    if (result.length < 6) return Toast.info('服务异常,请退出重新出题')

    let param = {
      rewardInfo: JSON.stringify(result),
      des: option,
      finishCount: order,
      finishScore: count,
    }

    if (jump) {
      param = {
        rewardInfo: JSON.stringify(result),
      }
    }

    if (!option) return Toast.info('请选择悬赏条件')

    fetch(`/api/act/valentine-2021/record-reward`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(param),
    })
      .then((res) => res.json())
      .then((res) => {
        Toast.hide()
        const { status, data = {} } = res

        if (status === 200) {
          setActiveIndex(3)
          setResultInfo(data)
        } else {
          Toast.fail(res.message, 4)
        }
      })
  }

  const renderAnwers = (chioseList, selected) =>
    chioseList.map((item, index) => (
      <div
        onClick={() => {
          setSelected(index)
          setOptions(item?.option)
        }}
        key={index}
        className={`reward__option-item ${selected === index ? 'active' : ''}`}
      >
        {item?.option || ''}
      </div>
    ))

  return (
    <div className='reward valentine-imgBg'>
      <img src={imgConfig.xuanshangling} />

      <div className='reward__content'>
        <span
          onClick={() => {
            handlerSubmit('jump')
          }}
          className='reward__content-jump'
        >
          <span>跳过</span>
        </span>
        <div className='reward__desc'>设置并发布悬赏，寻找完成悬赏的他，一起约会吧！</div>
        <div className='reward__title'>完成者要求: </div>
        <div className='reward__condition'>
          <span className='reward__condition-font'>第</span>
          <span className='reward__condition-count'>
            <span
              className='sign'
              onClick={() => {
                setOrder(order > 1 ? order - 1 : 1)
              }}
            >
              -
            </span>
            <span className='number'>{order}</span>
            <span
              className='sign'
              onClick={() => {
                setOrder(order + 1)
              }}
            >
              +
            </span>
          </span>
          <span className='reward__condition-font' style={{ textAlign: 'right' }}>
            个
          </span>
        </div>
        <div className='reward__condition'>
          <span className='reward__condition-font'>答对</span>
          <span className='reward__condition-count'>
            <span
              className='sign'
              onClick={() => {
                setCount(count > 1 ? count - 1 : 1)
              }}
            >
              -
            </span>
            <span className='number'>{count}</span>
            <span
              className='sign'
              onClick={() => {
                setCount(count === 6 ? count : count + 1)
              }}
            >
              +
            </span>
          </span>
          <span className='reward__condition-font'>道题</span>
        </div>
        <div className='reward__choice'>
          <span className='reward__choice-name'>约会奖励:</span>
          <span
            className='reward__choice-change'
            onClick={() => {
              if (limit === 3) {
                setLimit(0)
              } else {
                setLimit(limit + 1)
              }
            }}
          >
            <img src={imgConfig.change} />
            <span>换一下</span>
          </span>
        </div>
        <div className='reward__option'>{renderAnwers(chioseList[limit], selected)}</div>
        <div
          className='reward__submit'
          onClick={() => {
            console.log(option)
            handlerSubmit()
          }}
        >
          <img src={imgConfig.sure} />
          {/* 完成出题 */}
        </div>
        <div className='reward__content-footer'>
          <img src={imgConfig.footer} />
        </div>
      </div>
    </div>
  )
}

Reward.propTypes = {
  rewardDetail: PropTypes.object,
  setActiveIndex: PropTypes.func,
  setResultInfo: PropTypes.func,
}

export default Reward
