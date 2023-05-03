import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import { render } from 'react-dom'
import { Button, Toast } from 'antd-mobile'
import moment from 'moment'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent, baseUrl, greaterThanCurrentVersion, handlCountDown } from '@utils/utils'
import VipInfo from '../vip-buy-android/components/vip-info'
import VipPrice from '../vip-buy-android/components/vip-price'
import { imgConfig, Info } from '../vip-buy-android/constants'
import { getVipData } from '../vip-buy-android/server'
import { bluedCollectEvent } from '../vip-buy-android/util'

const config = window.CONFIG || {}

const headersParams = sethandleHeaders(config)

const DATA_FORMAT = 'YYYY-MM-DD'

import '../vip-buy-android/index.scss'

export const queryString = (params) => {
  let str = ''
  Object.keys(params).forEach((key) => {
    str += `${key}=${params[key]}&`
  })

  return str.substr(0, str.length - 1)
}
const getQueryVariable = (variable) => {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
}
const App = () => {
  const [index, setIndex] = useState(0)
  const [priceList, setPriceList] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPrice, setCurrentPrice] = useState({})
  const [userStatus, setUserStatus] = useState({ isVip: false })
  const [adBannerHref, setAdBannerHref] = useState() //活动引导链接图片
  const [adBannerImg, setAdBannerImg] = useState() //活动引导链接图片
  const [hour, setHour] = useState(0) //时钟倒计时
  const [day, setDay] = useState(0)
  const [showToast, setShowToast] = useState(false)

  let payPageTemer

  let failTimes = 0

  const loadingToast = () => {
    Toast.loading('正在请求支付,时间较长请耐心等候', 60 * 60 * 1)
  }
  const ClockFun = (time) => {
    let timer = null // 定义一个变量,用来清除定时器
    let dataTime = handlCountDown(time, timer) //每次返回新的时间对象
    setDay(dataTime.day)
    setHour(dataTime.hour)
    timer = setInterval(function () {
      let dataTime = handlCountDown(time, timer) //每次返回新的时间对象
      setDay(dataTime.day)
      setHour(dataTime.hour)
    }, 1000)
  }
  const getUserStatus = () => {
    setLoading(true)
    fetch(`/api/2021/vip-buy-ios/billing/vip/userStatus?userId=${config?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setLoading(false)
        setUserStatus(data)
      })
  }

  const handleCheck = async (orderId) => {
    if (!orderId) return Toast.fail('创建订单失败', 1)

    await fetch(`/api/2021/vip-buy-ios/billing/check?orderId=${orderId}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) return

        if (res.data.status === 'Success') {
          window.clearInterval(payPageTemer)
          payPageTemer = null
          Toast.hide()
          Toast.success('交易成功', 2)
          window.location.reload()
        } else if (res.data.status === 'Close') {
          Toast.hide()
          Toast.fail('交易取消', 2)
          window.clearInterval(payPageTemer)
          payPageTemer = null
          window.location.reload()
        } else {
          failTimes = failTimes + 1

          if (failTimes > 5) {
            window.clearInterval(payPageTemer)
            payPageTemer = null
            Toast.fail('交易取消', 2)
            window.location.reload()
          }
        }
      })
  }

  const handleClick = async () => {
    loadingToast()

    const {
      id = '',
      skuCode = '',
      title = '',
      actCodes = '',
      productType = 1,
      bookingTypeId,
      promoCodes = '',
      price,
      allowanceDay,
      day,
      offers,
      iapId,
      itemId,
      month,
      originPrice,
      perMonthPrice,
    } = currentPrice

    const params = {
      code: id,
      allowanceDay,
      bookingTypeId,
      day,
      id,
      itemId,
      month,
      originPrice,
      perMonthPrice,
      productType,
      receiptType: 'IAP',
      title,
      price,
      iapId,
      skuCode,
      actCodes,
      productId: id,
      promoCodes,
      ownerUserId: config.userId,
      count: 1,
      channel: 0,
      group: 'groupA',
    }
    if (getQueryVariable('ref') == 'setting') {
      params.scene = 8
    }

    bluedCollectEvent({
      event: 'INCREMENT_BUY_VIP',
      level: price,
    })
    if (!params.promoCodes) {
      delete params.promoCodes
    }

    fetch(`/api/2021/vip-buy-android/billingv2/create-order`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          payPageTemer = setInterval(() => {
            handleCheck(res.data.orderId)
          }, 2000)
          let suffix
          try {
            let offerObj = (offers && offers[0]) || false
            if (offerObj) {
              suffix =
                '&iapOfferId=' +
                offerObj.iapOfferId +
                '&iapOfferKeyId=' +
                offerObj.iapOfferKeyId +
                '&nonce=' +
                offerObj.nonce +
                '&sign=' +
                offerObj.sign +
                '&timestamp=' +
                offerObj.timestamp
            }
          } catch (e) {
            console.log(e)
          }
          window.location.href = res?.data?.url.toString() + suffix
        } else {
          Toast.fail(res.message, 1)
        }
      })

    setIndex(index + 1)
  }

  useEffect(() => {
    getUserStatus()
    Toast.loading('Loading...', 60 * 10)
    getVipData().then((res) => {
      Toast.hide()
      setPriceList(res?.data?.vipOptions || [])
      setCurrentPrice(res?.data?.vipOptions[0] || {})
      setAdBannerHref(res?.data?.adBanner?.href || '')
      setAdBannerImg(res?.data?.adBanner?.actImg[0].imageId || '')
      ClockFun(res?.data?.userStrategyEndTime)
    })
    if (getQueryVariable('orderId')) {
      checkOrder()
    }
    collectEvent('predefine_pageview', {
      os_name: 'ios',
      title: '我的会员页',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'BUY_VIP',
    })
    let refStr = getQueryVariable('ref')
    if (refStr) {
      localStorage.setItem('ref', refStr)
    }
  }, [])
  const checkOrder = async () => {
    await fetch(`/api/2021/vip-buy-ios/billing/check?orderId=${getQueryVariable('orderId')}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) return
        if (res.data.status === '支付完成') {
          let ref = localStorage.getItem('ref')
          if (
            greaterThanCurrentVersion(config.version, '5.9.20') &&
            getQueryVariable('orderId') &&
            (ref == 'splash' || ref == 'feed' || ref == 'vipPrivilege')
          ) {
            setShowToast(true)
          }
        }
      })
  }

  return (
    <div className='wrapper'>
      <Layout>
        <div className='vip-buy'>
          <div className='vip-buy__header'>
            <img className='vip-buy__header-bg' src={imgConfig.topImg} />
            <img className='vip-buy__header-vip' src={imgConfig.vipImg} />
          </div>
          <div className='vip-buy__content'>
            <div className='vip-buy__content-header'>
              {!loading && (
                <>
                  <img
                    className='vip-buy__content-lose'
                    src={
                      !userStatus?.isVip
                        ? imgConfig.vipLose
                        : userStatus?.isAnnualVip
                        ? greaterThanCurrentVersion(config.version, '5.9.5')
                          ? imgConfig.newVipYear
                          : imgConfig.vipYear
                        : imgConfig.vipMonth
                    }
                  />
                  <span className='vip-buy__content-font'>
                    {!userStatus?.isVip
                      ? 'VIP已失效或未订阅'
                      : `到期时间：${moment(
                          userStatus?.expireDate ? userStatus?.expireDate : userStatus?.vipExpireDate
                        ).format(DATA_FORMAT)}`}
                  </span>
                </>
              )}
            </div>

            <a
              href={adBannerHref ? adBannerHref : ''}
              className={`vip-buy__content-act ${adBannerHref ? 'active' : ''}`}
            >
              <img
                src={
                  adBannerImg
                    ? adBannerImg
                      ? `https://pic.finkapp.cn/${config?.nodeEnv === 'production' ? '' : 't/'}${adBannerImg}`
                      : ''
                    : ''
                }
              />
            </a>
            {day != '00' && hour != '00' && (
              <div className='vip-buy__endTime'>
                <img className='vip-buy__endTime-icon' src={imgConfig.clockIcon}></img>

                <span>
                  活动倒计时：{day}天{hour}小时
                </span>
              </div>
            )}
            {!loading && !userStatus?.isVip && (
              <>
                <div className='vip-buy__content-buy'>
                  <VipPrice priceList={priceList} setCurrentPrice={setCurrentPrice} />
                </div>

                <div>
                  <Button
                    className='vip-buy__btn'
                    type='button'
                    onClick={() => {
                      collectEvent('WebClick', {
                        element_content: '订阅',
                        title: '我的会员页',
                      })

                      handleClick()
                    }}
                  >
                    订阅
                  </Button>
                </div>
              </>
            )}
            <div className='vip-buy__content-info'>{VipInfo(Info)}</div>
            {!userStatus?.isVip && (
              <div className='vip-buy__footer'>
                如果选择购买订阅，费用将从你的iTunes账户收取。当前缴费期结束前，系统会提前24小时从你的账户扣费。购买之后，你可随时前往iTunes商店的设定界面关闭自动续费功能。点击购买即表示你同意我们的{' '}
                <a className='vip-buy__footer-a' href={`${baseUrl}/doc/add-services/privacy`}>
                  《增值服务条款》
                </a>
                和
                <a className='vip-buy__footer-a' href={`${baseUrl}/doc/url-subscribe`}>
                  《翻咔连续订阅服务条款》
                </a>
                。
              </div>
            )}
          </div>
        </div>
        <div className={`toast ${showToast ? '' : 'none'}`}>
          <div className='toast-flex'>
            <img
              className='toast-flex__close'
              onClick={() => {
                setShowToast(false)
              }}
              src={imgConfig.close}
            />
            <img className='toast-flex__icon' src={imgConfig.successIcon} />
            <p className='toast-flex__text1'>支付成功</p>
            <p className='toast-flex__text2'>立即设置广告特权</p>
            <div
              onClick={() => {
                collectEvent('WebClick', {
                  element_content: '前往设置',
                  title: '支付成功',
                })
                location.href = 'finka2020://vipPrivilege'
              }}
              className='toast-flex__btn'
            >
              前往设置
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
