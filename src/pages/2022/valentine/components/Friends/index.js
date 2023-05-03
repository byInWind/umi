import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Toast, ListView, PullToRefresh } from 'antd-mobile'
import { collectEvent, bluedCollectEvent } from '@utils/utils'
import { imgConfig } from '../../constants'
import { getFirstPageData } from '../../server'

import './index.scss'

const pageSize = 12 //每页条数

const Friends = ({ setActiveIndex }) => {
  const lv = useRef()
  const couponList = useRef([]) //列表数据
  const [currentPage, setcurrentPage] = useState(0) //当前页数
  const listDataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  })

  const dataSource = useRef(listDataSource)

  const [refreshing, setRefreshing] = useState(true) // 是否显示刷新状态
  const [isLoading, setIsLoading] = useState(true) //是否显示加载状态
  const [needLoading, setNeedLoading] = useState(true) //是否继续加载
  const [isPage, setIsPage] = useState(true) // 判断展示无内容情况
  const [isLoadingVisible, setIsLoadingVisible] = useState(true) //是否显示renderFooter

  const handleGetList = (pageNum) => {
    const params = {
      currentPage: pageNum,
      pageSize,
    }
    setIsLoading(true)

    if (!needLoading) return

    getFirstPageData(params).then((res) => {
      const { data } = res
      setIsLoading(false)

      if (pageNum === 0) {
        if (data.recordList.length === 0) {
          setIsPage(false)
          setNeedLoading(false)
        } else {
          setIsPage(true)
          dataSource.current = dataSource.current.cloneWithRows(data.recordList)
          couponList.current = data.recordList
          setRefreshing(false)
          setIsLoadingVisible(false)
        }
        Toast.hide()
      } else {
        if (data.recordList.length === 0) {
          setNeedLoading(false)
        }
        dataSource.current = dataSource.current.cloneWithRows([...couponList.current, ...data.recordList])
        couponList.current = [...couponList.current, ...data.recordList]

        setIsLoading(false)
      }
      setcurrentPage(pageNum + 1)
    })
  }

  // 下拉刷新
  const onRefresh = () => {
    setcurrentPage(0)

    setNeedLoading(true)
    handleGetList(0)
  }

  // 加载更多
  const onEndReached = () => {
    if (!needLoading) return

    setIsLoadingVisible(true)

    handleGetList(currentPage)
  }

  useEffect(() => {
    handleGetList(currentPage)

    collectEvent('predefine_pageview', {
      title: '默契大挑战-默契好友页',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'VALENTINE_DAY_TACIT_CHALLENGE_FRIEND_PAGE',
    })
  }, [])

  const row = (item, index) => {
    const { imageUrl, source, uuid, nickName, finish } = item

    return (
      <div
        onClick={() => {
          collectEvent('WebClick', {
            title: '默契大挑战-默契好友页',
            element_content: '查看默契好友',
            alo_refer: source === '站外' ? '微信' : 'null',
          })
          bluedCollectEvent({
            event: 'H5_BTN_CLICK',
            name: 'VALENTINE_DAY_TACIT_CHALLENGE_TASK_FERIEND',
            source: source === '站外' ? 'WECHAT' : 'null',
          })

          if (source === '站外') {
            location.href = 'finka2020://openapp?url=weixin://'
          } else {
            location.href = `finka2020://user/${uuid}`
          }
        }}
        key={index}
        className='friends__list-item'
      >
        <div className='friends__list-item--avatar'>
          <img src={imageUrl || imgConfig.placeImg} />
        </div>
        <div>
          <div className='friends__list-item--name'>{nickName}</div>
          <div className='friends__list-item--tip'>和你的默契评分是</div>
        </div>
        <div>
          <div className='friends__list-item--hello'>{`${source === '站外' ? '微信' : ''}打招呼>`} </div>
          <div className='friends__list-item--score'>{item?.score || 0}</div>
        </div>
        {finish && (
          <div className='friends__list-item--finish'>
            <img src={imgConfig.reward} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='friends valentine-imgBg'>
      <img src={imgConfig.friend} />
      <div className='friends__content'>
        <div className='friends__list'>
          {isPage ? (
            <div className='friends__list-container'>
              <ListView
                ref={lv}
                dataSource={dataSource.current}
                renderFooter={() => (
                  <div className={`${isLoadingVisible ? 'show' : 'hide'} exp-list__isLoading`}>
                    {isLoading ? '正在加载...' : needLoading ? '...' : '加载完毕'}
                  </div>
                )}
                initialListSize={12}
                renderRow={row}
                style={{
                  height: 'calc(100vh - 11.8rem)',
                  overflow: 'auto',
                }}
                distanceToRefresh={15}
                pullToRefresh={<PullToRefresh refreshing={refreshing} onRefresh={onRefresh} />}
                onEndReached={onEndReached}
                onEndReachedThreshold={15}
                pageSize={pageSize}
                scrollEventThrottle={1}
                scrollRenderAheadDistance={500}
              />
            </div>
          ) : (
            <div>
              <span className='friends__content-empty'>还没有好友跟你匹配呢，快去邀请好友吧</span>
            </div>
          )}
        </div>
        <span
          className='friends__content-friends'
          onClick={() => {
            localStorage.setItem('activeIndex', '6')
            setActiveIndex(6)

            collectEvent('WebClick', {
              title: '默契大挑战-默契好友页',
              element_content: '查看悬赏池',
            })
            bluedCollectEvent({
              event: 'H5_BTN_CLICK',
              name: 'VALENTINE_DAY_TACIT_CHALLENGE_TASK',
            })
          }}
        >
          <div>悬赏池</div>
          <div>&gt;</div>
        </span>
      </div>
      <div
        onClick={() => {
          setActiveIndex(3)
          setTimeout(() => {
            location.href = 'finka2020://webview/snapWebContent?album=1&callback=finish'
          }, 500)

          collectEvent('WebClick', {
            title: '默契大挑战-出题结果页',
            element_content: '发给TA测试默契',
          })
          bluedCollectEvent({
            event: 'H5_BTN_CLICK',
            name: 'VALENTINE_DAY_TACIT_CHALLENGE_SEND_TO_HIM',
          })
        }}
        className='friends__content-share'
      >
        <img src={imgConfig.send} />
      </div>
      <div className='friends__content-footer'>
        <img src={imgConfig.footer} />
      </div>
    </div>
  )
}

Friends.propTypes = {
  setActiveIndex: PropTypes.func,
  resultInfo: PropTypes.object,
}

export default Friends
