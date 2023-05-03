import React, { useEffect, useState } from 'react'
import fetch from 'node-fetch'
import { render } from 'react-dom'
import { Tabs, Toast } from 'antd-mobile'
import moment from 'moment'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'
import { imgConfig, iconList } from './constants'

const config = window.CONFIG || {}

const headersParams = sethandleHeaders(config)

import './index.scss'
const DATA_FORMAT = 'YYYY-MM-DD'

const App = () => {
  const [exchangeList1, setExchangeList1] = useState([])
  const [exchangeList2, setExchangeList2] = useState([])

  const getMissionListData = () => {
    fetch(`/api/live/anchor/redeemable-reward/history?anchorId=${config?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        data.list.map((item) => {
          if (item.rewardCategoryAlias) {
            item.icon = iconList[item.rewardCategoryAlias]
          }
        })
        console.log(data.list)
        setExchangeList1(data.list)
      })
    fetch(`/api/live/anchor/received-history/heartcoin?anchorId=${config?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setExchangeList2(data.list)
      })
  }
  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getMissionListData()
    collectEvent('predefine_pageview', {
      title: '主播商城兑换记录',
    })
  }, [])

  const exchangeList = (list) => (
    <>
      {list.map((item, index) => (
        <div className='taskList-list' key={index}>
          <div className='taskList-list__left'>
            <img src={item.icon} className='taskList-list__icon'></img>
            <div>
              <div className='taskList-list__title'>{item?.title}</div>
              <div className='taskList-list__time'>{moment(item?.createTime).format(DATA_FORMAT)}</div>
            </div>
          </div>
          <div className='taskList-list__right'>
            <div className='taskList-list__right-heart'>
              小心心<img className='taskList-list__right-icon' src={imgConfig.heartImg}></img> - {item.cost}
            </div>
            {item.categoryAlias != 'once-exp-double-card' ? (
              <p className='taskList-list__right-exp'>
                {item.rewardCategoryName} + {item.amount}
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
    </>
  )

  const getList = (list) => (
    <>
      {list.map((item, index) => (
        <div className='expList' key={index}>
          <div className='expList-left'>{item.date}</div>
          <div>
            {item.items.map((o, index) => (
              <p className='expList-p' key={index}>
                <span className='expList-userName'>{o.sender.name}</span> 送
                <img className='expList-icon' src={imgConfig.heartImg}></img> x {o.count}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  )
  const tabs = [{ title: '兑换记录' }, { title: '获得记录' }]
  return (
    <Layout>
      <div className='center'>
        <a className='center-back' href='/hd/live/finka-store'>
          <img className='center-back_icon' src={imgConfig.closeImg} />
        </a>
        <Tabs
          tabs={tabs}
          initialPage={0}
          animated={false}
          useOnPan={false}
          onChange={(tab, index) => {
            if (index === 0) {
              collectEvent('WebClick', {
                title: '主播商城兑换记录',
                element_content: '兑换记录',
              })
            } else {
              collectEvent('WebClick', {
                title: '主播商城兑换记录',
                element_content: '获得记录',
              })
            }
          }}
        >
          <div className='center-tab'>
            <div className='center-tabLine'></div>
            <p className='center-toptext'>（仅展示近30天兑换成功记录，如有问题请联系客服）</p>
            <div className='taskList'>{exchangeList1.length > 0 ? exchangeList(exchangeList1) : ''}</div>
          </div>
          <div className='center-tab2'>
            <div className='center-tabLine center-tabLine2'></div>
            <p className='center-toptext'>
              （仅展示近7天获得的小心心明细，获得记录更新时间为 <br /> 每日0点0分0秒，如有问题请联系客服）
            </p>
            <div>{exchangeList2.length > 0 ? getList(exchangeList2) : ''}</div>
          </div>
        </Tabs>
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
