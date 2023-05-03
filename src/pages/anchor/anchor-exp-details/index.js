import React, { useState, useEffect, useRef } from 'react'
import { render } from 'react-dom'
import Empty from '@components/empty'
import Qs from 'qs'
import { sethandleHeaders } from '@utils/headers'
import { DatePicker, List, PullToRefresh, ListView, Toast } from 'antd-mobile'
import { collectEvent } from '@utils/utils'

import Layout from '@components/layout'

import './index.scss'
const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const userInfo = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const nowTimeStamp = Date.now()
  const now = new Date(nowTimeStamp)
  const formatInfoData = (now) => {
    const pad = (n) => (n < 10 ? `0${n}` : n)
    const infoTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`
    return `${infoTime}`
  }
  const infoTime = formatInfoData(now)
  const listDataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  })
  const pageSize = 15 //每页条数
  const [month, setMonth] = useState(now)
  const [pageNo, setPageNo] = useState('') //当前页数
  const couponList = useRef([]) //列表数据
  const lv = useRef()
  const dataSource = useRef(listDataSource)
  const [refreshing, setRefreshing] = useState(true) // 是否显示刷新状态
  const [isLoading, setIsLoading] = useState(true) //是否显示加载状态
  const [isPage, setIsPage] = useState(true) // 判断展示无内容情况
  const [isLoadingVisible, setIsLoadingVisible] = useState(true) //是否显示renderFooter
  const handleChange = (data) => {
    const searchTime = formatInfoData(data)
    setMonth(data)
    loadingShow()
    getExperienceList('', searchTime)
  }

  const formatDate = (date) => {
    const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月}`
    return `${dateStr}`
  }

  //获取列表数据
  const getExperienceList = (pageNum, searchTime) => {
    fetch(
      `/api/anchor/experience/list?userId=${userInfo.userId}&searchTime=${searchTime}&dateFormatType=1&cursorId=${pageNum}&limit=${pageSize}`,
      {
        method: 'get',
        headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
      }
    )
      .then((res) => res.json())
      .then(({ data }) => {
        if (pageNum === '') {
          if (data.list.length === 0) {
            setIsPage(false)
          } else {
            setIsPage(true)
            if (data.nextCursorId === '0') {
              setIsLoadingVisible(false)
            }
            dataSource.current = dataSource.current.cloneWithRows(data.list)
            couponList.current = data.list
            setRefreshing(false)
            setIsLoadingVisible(false)
          }
          Toast.hide()
        } else {
          dataSource.current = dataSource.current.cloneWithRows([...couponList.current, ...data.list])
          couponList.current = [...couponList.current, ...data.list]
          setIsLoading(false)
        }
        setPageNo(data.nextCursorId)
      })
  }

  useEffect(() => {
    collectEvent('predefine_pageview', {
      title: '主播经验值明细',
    })
    getExperienceList(pageNo, infoTime)
  }, [])

  const loadingShow = () => {
    Toast.loading('Loading...', 60 * 10)
  }
  // 下拉刷新
  const onRefresh = () => {
    getExperienceList('', infoTime)
  }

  // 加载更多
  const onEndReached = () => {
    setIsLoadingVisible(true)
    if (pageNo != '0') {
      setIsLoading(true)
      getExperienceList(pageNo, infoTime)
    } else {
      setIsLoading(false)
    }
  }

  // 定义Row，从数据源(dataSurce)中接受一条数据循环到ListView
  const row = (rowData, rowID) => {
    return (
      <li key={rowID}>
        <p>
          <span>{rowData.week}</span>
          <span>
            + {rowData.experienceQuota} 经验值{rowData.anchorTaskType == 9 ? '(经验卡翻倍)' : ''}
          </span>
        </p>
        <p>
          <span>{rowData.day}</span>
          <span>{rowData.showText}</span>
        </p>
      </li>
    )
  }

  return (
    <Layout>
      <div className='exp'>
        <div className='exp-head'>
          <DatePicker
            mode='month'
            format={(val) => `${formatDate(val).substring(0, 7)}`}
            title=''
            extra='Optional'
            value={month}
            onChange={(date) => handleChange(date)}
          >
            <List.Item arrow='horizontal'></List.Item>
          </DatePicker>
        </div>
        {isPage ? (
          <>
            <ul className='exp-list'>
              <ListView
                ref={lv}
                dataSource={dataSource.current}
                renderFooter={() => (
                  <div className={`${isLoadingVisible ? 'show' : 'hide'} exp-list__isLoading`}>
                    {isLoading ? '正在加载...' : '已经到底部了'}
                  </div>
                )}
                initialListSize={12}
                renderRow={row}
                style={{
                  height: 'calc(100vh - 52px)',
                  overflow: 'auto',
                }}
                distanceToRefresh={15}
                pullToRefresh={<PullToRefresh refreshing={refreshing} onRefresh={onRefresh} />}
                onEndReached={onEndReached}
                onEndReachedThreshold={15}
                pageSize={pageSize}
                scrollRenderAheadDistance={500}
              />
            </ul>
          </>
        ) : (
          <Empty />
        )}
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
