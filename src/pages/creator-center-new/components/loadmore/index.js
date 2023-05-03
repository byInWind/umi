import React, { useState, useEffect, useRef } from 'react'
import PropType from 'prop-types'
import { Toast, PullToRefresh } from 'antd-mobile'
import moment from 'moment'
import { sethandleHeaders } from '@utils/headers'
import { imgConfig } from '../../constants'

const config = window.CONFIG || {}
const DATA_FORMAT = 'YYYY-MM-DD'
const headersParams = sethandleHeaders(config)

import './index.scss'

const LoadingMore = ({ nextCursorId, dataList }) => {
  const [pageNo, setPageNo] = useState('') //当前页数
  const [list, setList] = useState([]) //当前数据
  const lv = useRef()
  useEffect(() => {
    setPageNo(nextCursorId)
    setList(dataList)
  }, [dataList])

  //获取列表数据
  const getExperienceList = (pageNum) => {
    fetch(`/api/rcmd/creative/page/list?cursor=${pageNum}&count`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (!pageNum) {
          Toast.hide()
        } else {
          setList([...list, ...data.list])
        }
        setPageNo(data?.nextCursorId)
      })
  }

  // 加载更多
  const onEndReached = function () {
    if (pageNo) {
      getExperienceList(pageNo)
    }
  }
  const transformationNum = (num) => {
    return num >= 10000 ? (num / 10000).toFixed(1) + '万' : num == 0 ? '0' : num
  }
  const renderList = (data) =>
    data.map((item, index) => (
      <div key={index} className='creator__dynamic-list'>
        <div
          className='creator__dynamic-ava'
          style={{
            backgroundImage: `url(${item?.image?.variants[0]?.url})`,
          }}
        ></div>
        <div className='creator__dynamic-time'>
          {moment(item?.createTime).format(DATA_FORMAT)}
          {item?.officialRcmd && <img className='creator__dynamic-recommendIcon' src={imgConfig.recommendIcon}></img>}
        </div>
        <div className='creator__dynamic-desc'>{item?.desc}</div>
        <div className='creator__dynamic-flex'>
          <div className='creator__dynamic-box'>
            <div className='creator__dynamic-num'>
              {transformationNum(item?.exposeAll) || (
                <>
                  <img className='creator__dynamic-clockIcon' src={imgConfig.clockIcon}></img>
                  <div className='creator__dynamic-calculation'>计算中</div>
                </>
              )}
            </div>
            <div className='creator__dynamic-name'>曝光</div>
          </div>
          <div className='creator__dynamic-box'>
            <div className='creator__dynamic-num'>
              {transformationNum(item?.exposeRcmd) || (
                <>
                  <img className='creator__dynamic-clockIcon' src={imgConfig.clockIcon}></img>
                  <div className='creator__dynamic-calculation'>计算中</div>
                </>
              )}
            </div>
            <div className='creator__dynamic-name'>推荐曝光</div>
          </div>
          <div className='creator__dynamic-box'>
            <div className='creator__dynamic-num'>
              {transformationNum(item?.likeAll) || (
                <>
                  <img className='creator__dynamic-clockIcon' src={imgConfig.clockIcon}></img>
                  <div className='creator__dynamic-calculation'>计算中</div>
                </>
              )}
            </div>
            <div className='creator__dynamic-name'>点赞</div>
          </div>
          <div className='creator__dynamic-box'>
            <div className='creator__dynamic-num'>
              {transformationNum(item?.commentAll) || (
                <>
                  <img className='creator__dynamic-clockIcon' src={imgConfig.clockIcon}></img>
                  <div className='creator__dynamic-calculation'>计算中</div>
                </>
              )}
            </div>
            <div className='creator__dynamic-name'>评论</div>
          </div>
        </div>
      </div>
    ))

  return (
    <PullToRefresh
      damping={60}
      ref={lv}
      style={{
        height: 'auto',
        overflow: 'auto',
      }}
      indicator={{}}
      direction={'up'}
      onRefresh={() => {
        onEndReached()
      }}
    >
      {renderList(list)}
    </PullToRefresh>
  )
}
LoadingMore.propTypes = {
  nextCursorId: PropType.string,
  dataList: PropType.array,
}

export default LoadingMore
