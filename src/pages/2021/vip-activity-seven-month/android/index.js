import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { Base64 } from 'js-base64'
import { Icon, Modal, NoticeBar, Toast } from 'antd-mobile'
import { queryString, collectEvent } from '@utils/utils'
import VipTab from './components/vip-tab'
import { imgConfig, PAY_TYPE, PAY_TYPE_KEY } from './constants'
const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

import './index.scss'

const App = () => {
  const [payType, setPayType] = useState(PAY_TYPE_KEY.Alipay)
  const [timeText, setTimeText] = useState()
  const [isShow, setIsShow] = useState(true)
  const [index, setIndex] = useState(0)
  const [priceList, setPriceList] = useState([]) //商品列表
  const [leftCount, setLeftCount] = useState([]) //是否还有助力中的活动,0代表没有
  const [recentText, setRecentText] = useState() //抽奖结果轮播文案
  const [currentPrice, setCurrentPrice] = useState({})
  const [assistedCount, setAssistedCount] = useState(0) //已助力数
  const [assisteTotalNum, setAssisteTotalNum] = useState(4) //需要助力总数
  const [userStatus, setUserStatus] = useState(3) //助力状态
  const [orderId, setOrderId] = useState() //订单id
  const [showResultBox, setShowResultBox] = useState(false) //展示盲盒结果toast
  const [boxResultText, setBoxResultText] = useState() //展示盲盒结果文案
  const [boxResultImg, setBoxResultImg] = useState() //展示盲盒结果图片
  const [skuId, setSkuId] = useState() //展示盲盒结果图片
  const alert = Modal.operation
  const params = sethandleHeaders(config)
  const activityCode = 'bLJPOu50zYP2bT-iKTZbxA'
  let payPageTemer
  let failTimes = 0
  let expireTime
  const domainUrl = config?.nodeEnv === 'production' ? 'https://www.finkapp.cn/' : 'https://finka-www.wowkaka.cn'
  let shareUrl = `${domainUrl}/activityBoost/v2/assist?payCode=${orderId}&skuId=${skuId}&act=${activityCode}&user=${config.userId}&`
  let inviteUrl = `${domainUrl}/activityBoost/v2/invite?payCode=${orderId}&skuId=${skuId}&act=${activityCode}&user=${config.userId}&`

  const renderPayType = ({ img, title }) => {
    return (
      <div className='vip-buy__payModel clearfix'>
        <div className='vip-buy__payModel-type'>
          <img src={img} />
        </div>
        <div className='vip-buy__payModel-type'>{title}</div>
        <div className='vip-buy__payModel-item'>
          <Icon type='right' />
        </div>
      </div>
    )
  }
  const loadingToast = () => {
    Toast.loading('正在请求支付,时间较长请耐心等候', 60 * 60 * 1)
  }

  const getFetchDate = () => {
    fetch(
      `/api/activity-boost/status?activityCode=${activityCode}&ownerUserId=${config.userId}&user=${config.userId}`,
      {
        method: 'get',
        headers: params,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) return
        //活动商品列表
        setPriceList(res.data.actProductList)
        setCurrentPrice(res.data.actProductList[1])
        //已助力数
        setAssistedCount(res.data.assistedCount || 0)
        //需要助力总数
        setAssisteTotalNum(res.data.assisteCount || 4)
        setUserStatus(res.data.status)
        setSkuId(res.data.skuId)
        setOrderId(res.data.payCode)
        setLeftCount(res.data.leftCount)
        expireTime = res.data.expireTime
        changeTimeHandle()
      })
    fetch('/api/activity-boost/recent-result', {
      method: 'get',
      headers: params,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) return
        //文案
        let assistResult = res.data.assistResult
        const result = assistResult.map((item, index) => {
          return (
            <span key={index} className='broadcast_text_span'>
              {item}
            </span>
          )
        })
        setRecentText(result)
      })
  }

  const changeTimeHandle = () => {
    setInterval(function () {
      let now = new Date().getTime()
      let end = expireTime
      /*两个时间相减,得到的是毫秒ms,变成秒*/
      let result = Math.floor(end - now) / 1000
      result = result > 0 ? result : 0
      let minute = Math.floor((result / 60) % 60) //计算分 ，换算有多少分，取余，余出多少秒
      let hour = Math.floor((result / 3600) % 24) //计算小时，换算有多少小时，取余，24小时制除以24，余出多少小时
      let day = Math.floor(result / (3600 * 24)) //计算天 ，换算有多少天

      if (minute < 10) {
        minute = '0' + minute
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (day < 10) {
        day = '0' + day
      }
      setTimeText(day + '天' + hour + '小时' + minute + '分')
    }, 1000)
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
  useEffect(() => {
    const flag = 1
    if (flag) {
      Toast.fail('活动已下线', 3)
      return true
    }
    let refer
    switch (getQueryVariable('refer')) {
      case 'FeedBanner':
        refer = '动态页Banner'
        break
      case 'FeedCard':
        refer = '动态页置顶Feed'
        break
      case 'StartUp':
        refer = '开机图'
        break
      case 'VipWeb':
        refer = 'VIP会员页'
        break
      case 'Message':
        refer = '聊天详情页'
        break
      case 'Nearby':
        refer = '身边页'
        break
      case 'MatchFilter':
        refer = '筛选页'
        break
      case 'PrivacySetting':
        refer = '隐私设定页'
        break
      case 'EditProfile':
        refer = '编辑资料页'
        break
    }
    collectEvent('VipActivityPageViewScreen', {
      os_name: 'android',
      title: '2021会员6.1折活动页',
      operation_source: refer,
    })
    let now = new Date().getTime()
    let end = expireTime
    if (now > end) {
      Toast.fail('活动已下线', 3)
      return
    }
    getFetchDate()
  }, [])

  const handleCheck = async (orderId) => {
    if (!orderId) return Toast.fail('创建订单失败', 2.5)

    await fetch(`/api/2021/vip-buy-android/billingv2/check-pay-result?payCode=${orderId}`, {
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
        } else if (res.data.status === 'Close') {
          Toast.hide()
          Toast.fail('交易取消', 2)
          window.clearInterval(payPageTemer)
          payPageTemer = null
          window.location.reload()
        } else {
          failTimes = failTimes + 1

          Toast.loading('正在确认支付结果...', 60 * 60 * 1)

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
    const flag = 1
    if (flag) {
      Toast.fail('活动已下线', 3)
      return true
    }
    collectEvent('WebClick', {
      os_name: 'android',
      title: '2021会员6.1折活动页',
      element_content: '购买',
    })
    loadingToast()

    const {
      id = '',
      skuCode = '',
      title = '',
      actCodes = '',
      productType,
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
      actCodes: actCodes,
      promoCodes,
      ownerUserId: config.userId,
      productId: id,
      count: 1,
      channel: 1,
    }

    if (!params.promoCodes) {
      delete params.promoCodes
    }

    //如果助力中不能买12个月会员
    if (userStatus == 0 && month == 12) {
      Toast.fail('暂时无法购买，请您完成助力并开启盲盒后再进行购买操作', 2.5)
      return
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
            setOrderId(res.data.orderId)
            handleCheck(res.data.orderId)
          }, 2000)
          window.location.href = res?.data?.url.toString() //需要调用toString()
        } else {
          Toast.fail(res.message, 2.5)
        }
      })

    setIndex(index + 1)
  }

  //开启盲盒结果
  const getActAssistResult = async (payCode, skuId, activityCode) => {
    const params = {
      payCode: payCode,
      skuId: skuId,
      activityCode: activityCode,
    }
    await fetch('/api/activity-boost/result', {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) return
        let category = res.data.skus[0].category
        let title = res.data.skus[0].title
        let quantity = res.data.skus[0].quantity
        const vipImgMap = {
          1: imgConfig.vip1MonthImg,
          3: imgConfig.vip3MonthImg,
          12: imgConfig.vip12MonthImg,
        }
        const visitorImgMap = {
          1: imgConfig.visitor1MonthImg,
          3: imgConfig.visitor3MonthImg,
          12: imgConfig.visitor12MonthImg,
        }
        //category：1会员，3访客
        if (category == 1) {
          setBoxResultImg(vipImgMap[quantity])
          title = `${title}会员`
        } else if (category == 3) {
          setBoxResultImg(visitorImgMap[quantity])
          title = `${title}访客`
        }
        setBoxResultText(title)
        setShowResultBox(true)
        getFetchDate()
      })
  }

  const shareToWechat = () => {
    let params = {
      url: shareUrl,
      title: '哥哥，帮我助力一下',
      description: '翻咔会员限时6.1折，还可以免费抽取1年会员',
      thumbUrl: 'https://pic.finkapp.cn/E-ysZyQmAcJqRPIj7cLlMQ',
    }
    params = JSON.stringify(params)
    let url =
      'finka2020://webview/shareToPlatform?params=' + encodeURIComponent(Base64.encode(params)) + '&platform=Wechat'
    location.href = url
  }

  const shareToWechatMoments = () => {
    let params = {
      url: shareUrl,
      title: '哥哥，帮我助力一下! ',
      description: '翻咔会员限时6.1折，还可以免费抽取1年会员',
      thumbUrl: 'https://pic.finkapp.cn/E-ysZyQmAcJqRPIj7cLlMQ',
    }
    params = JSON.stringify(params)
    let url =
      'finka2020://webview/shareToPlatform?params=' +
      encodeURIComponent(Base64.encode(params)) +
      '&platform=WechatMoments'
    location.href = url
  }

  return (
    <div>
      <Layout>
        <img src={imgConfig.mainImg}></img>
        <NoticeBar className='broadcast_text' icon={null} marqueeProps={{ loop: true }}>
          {recentText}
        </NoticeBar>
        <div
          className={`progress_box ${userStatus !== 3 ? 'active' : 'none'} `}
          onClick={() => {
            collectEvent('WebClick', {
              os_name: 'android',
              title: '2021会员6.1折活动页',
              element_content: '助力进度',
            })
            setTimeout(() => {
              location.href = inviteUrl
            }, 300)
          }}
        >
          <img src={imgConfig.progressImg} />
          <p className='progress_text'>
            助力进度 {assistedCount}/{assisteTotalNum}
          </p>
        </div>
        <div className='center'>
          <div className='center_box'>
            <VipTab priceList={priceList} setCurrentPrice={setCurrentPrice}></VipTab>
            <div
              className='vip-buy__pay clearfix'
              onClick={() => {
                return alert([
                  {
                    text: <div className='vip-buy__pay-title'>选择支付方式</div>,
                    onPress: () => setPayType(PAY_TYPE_KEY.Alipay),
                  },
                  {
                    text: renderPayType({ img: imgConfig.alipay, title: '支付宝' }),
                    onPress: () => setPayType(PAY_TYPE_KEY.Alipay),
                  },
                  {
                    text: renderPayType({ img: imgConfig.wechart, title: '微信支付' }),
                    onPress: () => setPayType(PAY_TYPE_KEY.WeixinOpen),
                  },
                ])
              }}
            >
              <div className='vip-buy__pay-type'>支付方式:</div>

              <div className='vip-buy__pay-item'>
                <Icon type='right' />
              </div>
              <div className='vip-buy__pay-item'>{PAY_TYPE[payType]}</div>
            </div>

            <img onClick={() => handleClick()} className='btn_buy' src={imgConfig.buyBtnImg} />
            <p className='time_text'>距活动结束倒计时: {timeText}</p>
            <img className='centerBg' src={imgConfig.centerBg} />
          </div>
        </div>
        <div className='footer'>
          <div className='toggle_btn_box'>
            <div
              className='toggle_btn'
              onClick={() => {
                setIsShow(!isShow)
                if (isShow == true) {
                  collectEvent('WebClick', {
                    os_name: 'ios',
                    title: '2021会员6.1折活动页',
                    element_content: '展开活动规则',
                  })
                }
              }}
            ></div>
            <img className={isShow ? 'active' : 'none'} src={imgConfig.footerStartImg} />
            <img className={isShow ? 'none' : 'active'} src={imgConfig.footerClickedImg} />
          </div>
          <img src={imgConfig.footerImg} />
        </div>
        <div className={`toast ${leftCount != 0 && userStatus == 1 ? 'active_flex' : ''} `}>
          <div className='toast-img-box'>
            <div
              className='openBtn'
              onClick={() => {
                getActAssistResult(orderId, skuId, activityCode)
                collectEvent('WebClick', {
                  os_name: 'android',
                  title: '2021会员6.1折活动页',
                  element_content: '开启',
                })
              }}
            ></div>
            <img src={imgConfig.toastBox1Img} />
          </div>
        </div>
        <div className={`toast ${showResultBox ? 'active_flex' : ''} `}>
          <div className='toast-img-box'>
            <div
              className='clostBtn'
              onClick={() => {
                setShowResultBox(false)
                collectEvent('WebClick', {
                  os_name: 'android',
                  title: '2021会员6.1折活动页',
                  element_content: '开启',
                })
              }}
            ></div>
            <div
              className='inviteToWechatBox'
              onClick={() => {
                collectEvent('WebClick', {
                  os_name: 'android',
                  title: '2021会员6.1折活动页',
                  element_content: '邀请好友',
                })
                setShowResultBox(false)
                shareToWechat()
              }}
            ></div>
            <img
              src={imgConfig.shareWechatImg}
              className='inviteToWechatBtn'
              onClick={() => {
                collectEvent('WebClick', {
                  os_name: 'android',
                  title: '2021会员6.1折活动页',
                  element_content: '邀请好友',
                })
                setShowResultBox(false)
                shareToWechat()
              }}
            />
            <img
              src={imgConfig.shareWechatCircleImg}
              className='inviteToWechatMomentsBtn'
              onClick={() => {
                collectEvent('WebClick', {
                  os_name: 'android',
                  title: '2021会员6.1折活动页',
                  element_content: '分享到朋友圈',
                })
                setShowResultBox(false)
                shareToWechatMoments()
              }}
            />
            <div className='boxResultText'>
              恭喜您抽到了
              <p>{boxResultText}</p>
            </div>
            <img className='boxResultImg' src={boxResultImg} />
            <img src={imgConfig.toastBox2Img} />
          </div>
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
