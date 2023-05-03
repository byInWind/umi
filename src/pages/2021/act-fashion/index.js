import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'
import { imgConfig } from './constants'
import list1view from './components/list1view'
import list2view from './components/list2view'
import list3view from './components/list3view'

const config = window.CONFIG || {}

const headersParams = sethandleHeaders(config)

import './index.scss'

const App = () => {
  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  const [list3, setList3] = useState([])

  const getData = () => {
    fetch(`/api/2021/act-fashion/getDate`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(1)
        Toast.hide()
        setList1(data?.rankList?.slice(0, 1) || [])
        setList2(data?.rankList?.slice(1, 10) || [])
        setList3(data?.rankList?.slice(10) || [])
      })
  }

  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getData()
    collectEvent('predefine_pageview', {
      title: '潮流生活大玩家榜单',
    })
  }, [])

  return (
    <div className='wrapper'>
      <Layout>
        <img className='mainImg' src={imgConfig.mainImg}></img>
        <section className='page-box'>
          <div className='page-box__top'>{list1view(list1)}</div>
          <div className='page-box__center'>{list2view(list2)}</div>
          <div className='page-box__bottom'>{list3view(list3)}</div>
        </section>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
