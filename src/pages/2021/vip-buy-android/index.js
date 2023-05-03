import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'
import { render } from 'react-dom'
import { Button, Toast, Modal } from 'antd-mobile'
// import Layout from '@components/layout'
import moment from 'moment'
import { sethandleHeaders } from '../../../utils/headers'
import { collectEvent, queryString, baseUrl, greaterThanCurrentVersion, handlCountDown } from '../../../utils/utils'
import VipInfo from './components/vip-info'
import VipPrice from './components/vip-price'
import VipPayType from './components/pay-type'
import VipModelManage from './components/vip-model-manage'
import { imgConfig, Info, PAY_TYPE_KEY } from './constants'
import { getVipData } from './server'
import { bluedCollectEvent } from './util'

const config = window.CONFIG || {}
const DATA_FORMAT = 'YYYY-MM-DD'

const headersParams = sethandleHeaders(config)

import './index.scss'

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
  const [wechatPriceList, setWechatPriceList] = useState([])
  const [alipayPriceList, setAlipayPriceList] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPrice, setCurrentPrice] = useState({})
  const [payType, setPayType] = useState(PAY_TYPE_KEY.Alipay)
  const [userStatus, setUserStatus] = useState({ isVip: false })
  const [vipRenew, setVipRenew] = useState({})
  const [visible, setVisible] = useState(false)
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

  const getVipRenew = () => {
    fetch(`/api/2021/vip-buy-ios/billing/vip/vip-renewV3?type=1&userId=${config?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setVipRenew(data)
      })
  }

  const handleCheck = async (orderId) => {
    if (!orderId) return Toast.fail('创建订单失败', 2.5)

    await fetch(`/api/2021/vip-buy-android/billingv2/check-pay-result?payOrderId=${orderId}`, {
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
          Toast.fail('交易取消', 2.5)
          window.clearInterval(payPageTemer)
          payPageTemer = null
          window.location.reload()
        } else {
          failTimes = failTimes + 1

          Toast.loading('正在确认支付结果...', 60 * 60 * 1, () => {
            console.log('Load complete !!!')
          })

          if (failTimes > 7) {
            window.clearInterval(payPageTemer)
            payPageTemer = null
            Toast.fail('等待超时，请刷新重试', 2)
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
      receiptType: payType,
      title,
      price,
      iapId,
      skuCode,
      actCodes,
      promoCodes,
      ownerUserId: config.userId,
      productId: id,
      count: 1,
      channel: 1,
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
          window.location.href = res?.data?.url.toString() //需要调用toString()
        } else {
          Toast.fail(res.message, 2.5)
        }
      })

    setIndex(index + 1)
  }

  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getUserStatus()
    getVipData().then((res) => {
      Toast.hide()
      if (greaterThanCurrentVersion(config.version, '1.6.0')) {
        setPriceList(res?.data?.vipAlipayOptions || [])
        setCurrentPrice(res?.data?.vipAlipayOptions[0] || {})
        setWechatPriceList(res?.data?.vipWechatOptions || [])
        setAlipayPriceList(res?.data?.vipAlipayOptions || {})
      } else {
        setPriceList(res?.data?.vipOptions || [])
        setCurrentPrice(res?.data?.vipOptions[0] || {})
      }

      ClockFun(res.data?.userStrategyEndTime)

      setAdBannerHref(res?.data?.adBanner?.href || '')
      setAdBannerImg(res?.data?.adBanner?.actImg[0]?.imageId || '')
      let refStr = getQueryVariable('ref')
      if (refStr) {
        localStorage.setItem('ref', refStr)
      }
    })

    getVipRenew()
    if (getQueryVariable('orderId')) {
      checkOrder()
    }
    collectEvent('predefine_pageview', {
      os_name: 'android',
      title: '我的会员页',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'BUY_VIP',
    })
  }, [])

  const vipToRenew = (userStatus) => {
    if (!greaterThanCurrentVersion(config.version, '1.5.7')) {
      return (
        <>
          {userStatus?.accessToRenewVip && !userStatus?.accessToRenew && (
            <span
              className='vip-buy__content-manage'
              onClick={() => {
                setVisible(true)
              }}
            >
              续费管理
            </span>
          )}
        </>
      )
    }
  }
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
            greaterThanCurrentVersion(config.version, '1.7.4') &&
            getQueryVariable('orderId') &&
            (ref == 'splash' || ref == 'feed' || ref == 'vipPrivilege')
          ) {
            setShowToast(true)
          }
        }
      })
  }

  const expireDate = moment(userStatus?.expireDate ? userStatus?.expireDate : userStatus?.vipExpireDate).format(
    DATA_FORMAT
  )

  return (
    <div className='wrapper'>
      <div>
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
                          ? greaterThanCurrentVersion(config.version, '1.7.0')
                            ? imgConfig.newVipYear
                            : imgConfig.vipYear
                          : imgConfig.vipMonth
                    }
                  />
                  <span className='vip-buy__content-font'>
                    {!userStatus?.isVip ? 'VIP已失效或未订阅' : `到期时间：${expireDate}`}
                  </span>
                  {vipToRenew(userStatus)}
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
            <div className='vip-buy__content-buy'>
              <VipPrice priceList={priceList} setCurrentPrice={setCurrentPrice} />
            </div>
            <div>
              <VipPayType
                wechatPriceList={wechatPriceList}
                alipayPriceList={alipayPriceList}
                payType={payType}
                setPayType={setPayType}
                setPriceList={setPriceList}
                setCurrentPrice={setCurrentPrice}
              ></VipPayType>
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
                {userStatus?.isVip ? '立即续费' : '立即开通'}
              </Button>
            </div>

            <div className='vip-buy__content-info'>{VipInfo(Info)}</div>

            <div className='vip-buy__footer '>
              购买会员即表示您同意
              <a className='vip-buy__footer-a' href={`${baseUrl}/doc/add-services/privacy`}>
                《增值服务条款》
              </a>
              和
              <a className='vip-buy__footer-a' href={`${baseUrl}/doc/url-subscribe`}>
                《翻咔连续订阅服务条款》
              </a>
              。如果您选择了订阅服务，可随时在订阅详情中或微信/支付宝的支付设置中取消续订。
            </div>
          </div>
        </div>
        <Modal visible={visible} className='modal' transparent maskClosable={false} title='' footer={false}>
          <VipModelManage visible={visible} setVisible={setVisible} expireDate={expireDate} vipRenew={vipRenew} />
        </Modal>
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
      </div>
    </div>
  )
}

// render(<App {...config} />, document.querySelector('#app'))

export default App
