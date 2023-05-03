import React, { useEffect, useState } from 'react'
import fetch from 'node-fetch'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'
import { queryString } from '@utils/utils'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent, useThrottle } from '@utils/utils'
import { imgConfig, imgObg } from './constants'

const config = window.CONFIG || {}

const headersParams = sethandleHeaders(config)

import './index.scss'

const App = () => {
  const [newMinute, setNewMinute] = useState(0) //更新时间
  const [newHour, setNewHour] = useState(0) //更新时间
  const [heartCoins, setHeartCoins] = useState(0) //拥有小心心
  const [inventoriesList, setInventoriesList] = useState([])

  const getRedeemableRewardData = () => {
    fetch(`/api/live/anchor/redeemable-reward`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        console.log(data)
        setHeartCoins(data?.assets?.heartCoins)
        data.inventories.map((item) => {
          item.icon = imgObg[item.title]
        })
        setInventoriesList(data?.inventories)
      })
  }
  //兑换
  const toExchange = (inventoryId) => {
    const params = {
      id: inventoryId,
    }
    fetch(`/api/live/anchor/redeemable-reward/redeem`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          Toast.success(res.message, 3)
        } else {
          Toast.fail(res.message, 3)
        }
      })
  }
  const changeTime = () => {
    setInterval(() => {
      let date = new Date()
      let hour = date.getHours()
      let minute = date.getMinutes()
      //一共4小时 ,剩余时间
      setNewMinute(60 - minute)
      setNewHour(3 - (hour % 4))
    }, 1000)
  }
  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    changeTime()
    getRedeemableRewardData()
    collectEvent('predefine_pageview', {
      title: '主播商城',
    })
  }, [])
  const listview = (list) => (
    <>
      {list.map((item, index) => (
        <>
          <div className='exchangebox' key={index}>
            <img className='exchangebox-mainImg' src={item?.icon}></img>
            <p className='exchangebox-title'>{item?.title}</p>
            <p className='exchangebox-desc'>{item?.desc}</p>
            <div className='exchangebox-bottom'>
              <div>
                <p>
                  价格：<span className='exchangebox-num'>{item?.cost}</span>
                  <img className='exchangebox-heart' src={imgConfig.heartImg}></img>
                </p>
                <p>
                  库存：<span className='exchangebox-num'>{item?.allotment}</span>
                </p>
              </div>
              <img
                className={`exchangebox-btn ${item?.allotment == 0 ? 'none' : ''}`}
                src={imgConfig.exchangeImg}
                onClick={() => {
                  collectEvent('WebClick', {
                    title: '主播商城',
                    element_content: '兑换',
                  })
                  useThrottle(() => {
                    toExchange(item?.id)
                  }, 2000)
                }}
              ></img>
              <img className={`exchangebox-btn ${item?.allotment == 0 ? '' : 'none'}`} src={imgConfig.noneImg}></img>
            </div>
          </div>
        </>
      ))}
    </>
  )

  return (
    <Layout>
      <div>
        <div className='body'>
          <img className='body-mainImg' src={imgConfig.mainImg} />
          <span
            className='close'
            onClick={() => {
              collectEvent('WebClick', {
                title: '主播商场',
                element_content: '关闭',
              })
              location.href = 'finka2020://webview/close'
            }}
          ></span>
          <div className='center'>
            <div className='center-header'>
              <div className='center-header__data'>
                <div className='center-header__box'>
                  拥有小心心：
                  <span className='center-header__num'>
                    {heartCoins}
                    <img className='center-header__heart' src={imgConfig.heartImg}></img>
                  </span>
                </div>
                <div
                  onClick={() => {
                    collectEvent('WebClick', {
                      title: '每周签到享好礼',
                      element_content: '关闭',
                    })
                    location.href = '/hd/live/exchange-record'
                  }}
                >
                  查看兑换记录 <img className='center-rightIcon' src={imgConfig.rightIcon}></img>
                </div>
              </div>
              <div className='center-header__time'>
                奖池更新时间：剩余{newHour}小时{newMinute}分
              </div>
            </div>
            <div className='center-exchangebox'>{inventoriesList.length > 0 ? listview(inventoriesList) : ''}</div>
            <div className='center-intro'>
              <div className='center-intro__title'>商品说明</div>
              <p className='center-intro__list'>1.小心心不进行礼物分成，只用来兑换商城中的奖品</p>
              <p className='center-intro__list'>2.商城中的礼物每人每天只能兑换一次</p>
              <p className='center-intro__list'>
                3.商城每天零点开始刷新，每4小时刷新1次，每次刷新出现的礼物都可能不相同哦
              </p>
              <p className='center-intro__list'>4.小咔宝箱中包含饭票奖励和主播经验奖励</p>
              <p className='center-intro__list'>
                5.本场主播经验翻倍卡，兑换后本场剩余时间内获得的主播经验会翻倍（上限1000 ）
              </p>
              <p className='center-intro__list'> 6.饭票奖励兑换后会直接根据主播当前的结算结算后发放</p>
              <p className='center-intro__list'>7.经验值礼物兑换后直接增加相应的经验，可在主播等级经验值详情中查看</p>
              <p className='center-intro__list'>8.本活动的最终解释权归翻咔所有</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
