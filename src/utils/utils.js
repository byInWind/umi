// import isPro from './is-pro'
const isPro = false
import moment from 'moment'
import { useEffect, useRef, useCallback } from 'react'
// import placeImg from '@images/common/placeImg.png'

export const collectEvent = (eventName, params) => {
  return {}
  window.collectEvent(eventName, params)
}

export const secondFormat = (second) => {
  const day = moment.duration(second, 'seconds').days()
  const hours = moment.duration(second, 'seconds').hours()
  const minutes = moment.duration(second, 'seconds').minutes()
  // const seconds = moment.duration(second, 'seconds').seconds()

  return `${day * 24 + hours}小时${minutes}分`
}

export const queryString = (params) => {
  let str = ''
  Object.keys(params).forEach((key) => {
    str += `${key}=${params[key]}&`
  })

  return str.substr(0, str.length - 1)
}

export const getQueryValue = (queryName) =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get(queryName)

export const baseUrl = isPro ? 'https://www.finka.cn' : 'https://finka-www.wowkaka.cn'

export const appUrlScheme = 'finka2020'

export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export const handleUnits = (num) => {
  let value = num
  if (num >= 100000) {
    const result = parseInt((num / 10000) * 100, 10) / 100
    value = `${result}万`
  }
  return value || num
}

/**
 * 判断当前版本是否大于等于某个版本
 * false: 小于目标版本老版本不能用,
 * true: 大于等于目标版本
 * 参数说明：
 * @param {String} currentVersion //当前客户端传入版本,
 * @param {String} targetVersion //需要限制的版本号,
 * 使用方式：
 * greaterThanCurrentVersion(config.version, '5.9.20')
 */
export const greaterThanCurrentVersion = function (currentVersion, targetVersion) {
  return null
  if (!currentVersion || !targetVersion) return
  currentVersion = currentVersion
    .replace(/[^0-9]/gi, ',')
    .split(',')
    .filter((str) => !!str)
  targetVersion = targetVersion
    .replace(/[^0-9]/gi, ',')
    .split(',')
    .filter((str) => !!str)
  console.log(currentVersion, targetVersion)
  if (currentVersion.join() == targetVersion.join()) {
    return true
  }
  for (let i = 0; i < targetVersion.length; i++) {
    currentVersion[i] = Number(currentVersion[i])
    targetVersion[i] = Number(targetVersion[i])
    if (currentVersion[i] > targetVersion[i]) {
      return true
    } else if (currentVersion[i] < targetVersion[i]) {
      return false
    } else if (currentVersion[i] == targetVersion[i]) {
      continue
    }
  }
}

// export const imageUrl = (url) => {
//   if (!url) return placeImg

//   let result = ''
//   const arr = url?.split('?')

//   if (arr.length > 1) {
//     result = arr[0]
//   } else {
//     result = placeImg
//   }

//   return result
// }

const ua = navigator.userAgent.toLowerCase()

export const isWeibo = () => {
  const key = ua.match(/Weibo/i)?.toString() || ''

  return key.includes('weibo')
}

export const isQQ = () => {
  return /qq/.test(JSON.stringify(ua))
}

export const isWeiXin = () => {
  return /micromessenger/.test(JSON.stringify(ua))
}

export const isAndroid = () => {
  return /android/.test(JSON.stringify(ua))
}

export const userAgent = () => {
  var ua = navigator.userAgent
  // alert(ua)
  const obj = {
    webApp: ua.indexOf('Safari') == -1, // 是否web应用程序，没有头部与底部
    QQbrw: ua.indexOf('MQQBrowser') > -1, // QQ浏览器(手机上的)
    weiXin: isWeiXin, // 微信
    QQ: isQQ(), // QQ App内置浏览器（需要配合使用）
    weiBo: isWeibo, // 微博
  }

  let userAgent = ''

  Object.keys(obj).forEach((item) => {
    if (obj[item]) {
      userAgent = item
    }
  })

  return userAgent
}

export const getVersion = (str) => {
  if (!str) return false

  return Number(str.replace(/[^0-9]/gi, ''))
}

/**
 * 倒计时
 * 参数说明：
 * @param {Number} endTime 毫秒值(把时间转换成毫秒传过来)
 * @param {Number} timer 接收setIntreval()返回值，用来清除定时器
 * 使用方式：
 * let timer = null // 定义一个变量,用来清除定时器
 * timer = setInterval(function () {
 *  let dataTime = handlCountDown(endTime, timer) //每次返回新的时间对象
 * }, 1000)
 */
export const handlCountDown = (endTime, timer) => {
  let nowTime = new Date().getTime() // 获取当前时间转换成毫秒数
  let countdownTime = Math.floor(endTime - nowTime) / 1000 //两个时间相减,得到的是毫秒ms,变成秒
  countdownTime = countdownTime > 0 ? countdownTime : 0
  let day = moment.duration(countdownTime, 'seconds').days()
  let hour = moment.duration(countdownTime, 'seconds').hours()
  let minute = moment.duration(countdownTime, 'seconds').minutes()
  let second = moment.duration(countdownTime, 'seconds').seconds()
  if (second < 10) {
    second = '0' + second
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (day < 10) {
    day = '0' + day
  }
  if (countdownTime === 0) {
    clearInterval(timer)
  }
  return { day, hour, minute, second }
}

/**
 * 站外复制内容到剪切板
 * 参数说明：
 * @param {String} text //内容
 * 使用方式：
 * copyText('你想复制的内容') // token
 */

export const copyText = (text) => {
  try {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    const textString = text.toString()
    let input = document.querySelector('#copyUrl2')

    if (!input) {
      input = document.createElement('input')
      input.id = '#copyUrl2'
      input.readOnly = 'readOnly' // 防止ios聚焦触发键盘事件
      input.style.position = 'absolute'
      input.style.left = '-1000px'
      input.style.zIndex = '-1000'
      document.body.appendChild(input)
    }

    input.value = textString
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length)
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      // alert('已复制到粘贴板')
    } else {
      console.log('不兼容')
    }
    input.blur()
    // Toast.info('复制成功')
  } catch (e) {
    console.log('复制失败')
  }

  // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
  // 选择文本。createTextRange(setSelectionRange)是input方法
  function selectText(textbox, startIndex, stopIndex) {
    if (textbox.createTextRange) {
      //ie
      const range = textbox.createTextRange()
      range.collapse(true)
      range.moveStart('character', startIndex) //起始光标
      range.moveEnd('character', stopIndex - startIndex) //结束光标
      range.select() //不兼容苹果
    } else {
      //firefox/chrome
      textbox.setSelectionRange(startIndex, stopIndex)
      textbox.focus()
    }
  }
}

const config = window.CONFIG

const getAPPVersion = (value, IOS) => {
  return null
  if (IOS) {
    const val = value.match(/(?:CPU\siphone\s)(\S+\s*\S+)/i)
    return val?.length > 1 ? `i${val[1]}`.replace(/_/g, '.') : 'ipad'
  } else {
    const val = value.match(/(?:Android\s)(\S+)/i)
    return val?.length > 1 ? `Android ${val[1]}` : 'Android'
  }
}

export const bluedCollectEvent = (extra) => {
  return {}
  const { userId, location, screenWidth, screenHeight, userAgent, version, IOS, androidStore = '' } = config || {}
  const lat = location?.split(',')[0] || ''
  const lon = location?.split(',')[1] || ''

  const app_version = version || ''
  const os_version = getAPPVersion(userAgent, IOS) || ''

  const params = {
    common: {
      uid_str: userId || '',
      client_time: new Date().getTime(),
      lat,
      lon,
      channel: androidStore || 'appStore',
      platform: IOS ? 'ios_china' : 'android_china',
      app_version,
      os_version,
      screen_width: Number(screenWidth) || 0,
      screen_high: Number(screenHeight) || 0,
      url: document.URL || '',
      referrer: document.referrer || '',
    },
    extra: {
      event: 'H5_BTN_CLICK',
      target_uid: '',
      ...extra,
    },
  }
  if (params.extra.event === 'H5_PAGE_SHOW') {
    delete params.extra.target_uid
  }

  const path = window.location.href.includes('actH52022') ? '/actH52022' : ''

  return fetch(`${path}/api/2021/live-carnival-blued-collect`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }).then((res) => res.json())
}

export const clearParams = (params) => {
  Object.keys(params).forEach((key) => {
    if (params[key] === '' || params[key] === undefined || params[key] === null) {
      delete params[key]
    }
  })

  return params
}
//节流函数
export const useThrottle = (fn, delay, dep = []) => {
  const { current } = useRef({ fn, timer: null })
  useEffect(
    function () {
      current.fn = fn
    },
    [fn]
  )

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn.call(this, ...args)
    }
  }, dep)
}
