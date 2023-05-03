import React, { useState, useEffect, useRef } from 'react'
import { InputItem, Icon, Toast, ListView, PullToRefresh } from 'antd-mobile'
import PropTypes from 'prop-types'
import Empty from '@components/empty'
import { collectEvent, bluedCollectEvent } from '@utils/utils'

import { imgConfig } from '../../constants'

import { getRewardPoolList } from '../../server'

import './index.scss'

const pageSize = 12 //每页条数

const rewardPoolPool = ({ setActiveIndex }) => {
  const [userName, setUserName] = useState('')
  const couponList = useRef([]) //列表数据
  const lv = useRef()
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
      searchContent: userName,
      currentPage: pageNum,
      pageSize,
    }
    setIsLoading(true)

    getRewardPoolList(params).then((res) => {
      const { data } = res
      setIsLoading(false)

      if (pageNum === 0) {
        if (data.rewardInfoList.length === 0) {
          setIsPage(false)
          setNeedLoading(false)
        } else {
          setIsPage(true)
          dataSource.current = dataSource.current.cloneWithRows(data.rewardInfoList)
          couponList.current = data.rewardInfoList
          setRefreshing(false)
          setIsLoadingVisible(false)
        }
        Toast.hide()
      } else {
        if (data.rewardInfoList.length === 0) {
          setNeedLoading(false)
        }
        dataSource.current = dataSource.current.cloneWithRows([...couponList.current, ...data.rewardInfoList])
        couponList.current = [...couponList.current, ...data.rewardInfoList]

        setIsLoading(false)
      }
      setcurrentPage(pageNum + 1)
    })
  }

  useEffect(() => {
    setcurrentPage(0)
    handleGetList(0)
  }, [userName])

  useEffect(() => {
    collectEvent('predefine_pageview', {
      title: '默契大挑战-查看悬赏池',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'VALENTINE_DAY_TACIT_CHALLENGE_TASK_PAGE',
    })
  }, [])

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

  const row = (item, index) => {
    return (
      <div
        onClick={() => {
          collectEvent('WebClick', {
            title: '默契大挑战-悬赏池列表',
            element_content: '查看其他悬赏任务',
          })
          bluedCollectEvent({
            event: 'H5_BTN_CLICK',
            name: 'VALENTINE_DAY_TACIT_CHALLENGE_TASK_FERIEND',
          })

          location.href = `/hd/2022/valentine?shareBy=${item?.uuid || ''}&joined=${item?.joined}`
        }}
        key={index}
        className='rewardPool__list-item'
      >
        {item?.joined && (
          <div className='rewardPool__list-item--finish'>
            <img src={imgConfig.finish} />
          </div>
        )}

        <div className='rewardPool__list-item--avatar'>
          <img src={item?.rewardImageUrl || imgConfig.placeImg} />
        </div>
        <div>
          <div className='rewardPool__list-item--reward'>{item.rewardNickName || '-'}</div>
          <div className='rewardPool__list-item--tip'>
            {item?.finishCount
              ? `第${item.finishCount || ''}个答对${item.finishScore || ''}道题`
              : '你是我等待的默契度最高的人吗'}
          </div>
          <div className='rewardPool__list-item--name'>{item.des || '等待你的挑战'}</div>
        </div>
      </div>
    )
  }

  // 键盘处理
  const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
  let moneyKeyboardWrapProps
  if (isIPhone) {
    moneyKeyboardWrapProps = {
      onTouchStart: (e) => e.preventDefault(),
    }
  }

  return (
    <div className='rewardPool'>
      <div className='rewardPool__search'>
        <Icon className='icon' type='search' />
        <InputItem
          type='text'
          placeholder='搜索昵称'
          clear
          onChange={(v) => {
            setUserName(v)
          }}
          moneyKeyboardAlign='left'
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
        ></InputItem>
      </div>
      <div className='rewardPool__header'>
        <img src={imgConfig.banner} />
        <div
          className='rewardPool__header-friends'
          onClick={() => {
            const backIndex = localStorage.getItem('activeIndex') === 'first' ? 0 : 4
            setActiveIndex(backIndex)
          }}
        >
          <div>返回</div>
          <div>&lt;</div>
        </div>
      </div>
      <div className='rewardPool__list'>
        {isPage ? (
          // <div className='rewardPool__list-container'>
          <ListView
            className='rewardPool__list-container'
            ref={lv}
            dataSource={dataSource.current}
            renderFooter={() => (
              <div className={`${isLoadingVisible ? 'show' : 'hide'} exp-list__isLoading`}>
                {isLoading ? (
                  '正在加载...'
                ) : needLoading ? (
                  <span
                    onClick={() => {
                      handleGetList(currentPage)
                    }}
                  >
                    点击加载更多
                  </span>
                ) : (
                  '加载完毕'
                )}
              </div>
            )}
            initialListSize={10}
            renderRow={row}
            style={{
              height: 'calc(100vh - 5.8rem)',
              overflow: 'auto',
            }}
            // useBodyScroll //使用 html 的 body 作为滚动容器
            distanceToRefresh={15}
            pullToRefresh={<PullToRefresh refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={500}
            pageSize={pageSize}
            scrollEventThrottle={1} //滑动频率控制
            scrollRenderAheadDistance={500}
          />
        ) : (
          // </div>
          <Empty />
        )}
      </div>
    </div>
  )
}

rewardPoolPool.propTypes = {
  setActiveIndex: PropTypes.func,
  url: PropTypes.string,
  name: PropTypes.string,
}

export default rewardPoolPool
;('-')
