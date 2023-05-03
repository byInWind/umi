const config = window.CONFIG
import { Toast } from 'antd-mobile'
import { sethandleHeaders } from '@utils/headers'
import { appUrlScheme, collectEvent } from '@utils/utils'
import { BLUED_COLLECT_EVENT } from './constants'
import moment from 'moment'

const getVersion = (value, IOS) => {
  if (IOS) {
    const val = value.match(/(?:CPU\siphone\s)(\S+\s*\S+)/i)
    return val?.length > 1 ? `i${val[1]}`.replace(/_/g, '.') : 'ipad'
  } else {
    const val = value.match(/(?:Android\s)(\S+)/i)
    return val?.length > 1 ? `Android ${val[1]}` : 'Android'
  }
}

export const isShowLastWeekList = () => {
  const day = moment().isoWeekday()

  return day >= 1 && day <= 4 ? true : false
}

export const bluedCollectEvent = (extra) => {
  const { userId, location, screenWidth, screenHeight, userAgent, version, IOS, androidStore = '' } = config || {}
  const lat = location?.split(',')[0] || ''
  const lon = location?.split(',')[1] || ''

  const app_version = version || ''
  const os_version = getVersion(userAgent, IOS) || ''

  const params = {
    common: {
      uid_str: userId,
      client_time: new Date().getTime(),
      lat,
      lon,
      channel: androidStore || 'appStore',
      platform: IOS ? 'ios_china' : 'android_china',
      app_version,
      os_version,
      screen_width: Number(screenWidth),
      screen_high: Number(screenHeight),
      url: document.URL,
      referrer: document.referrer,
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

  return fetch(`/api/2021/live-carnival-blued-collect`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }).then((res) => res.json())
}

export const starDetective = (params) => {
  return fetch(`/api/2021/live-carnival/event/carnival-2021/star-detective/request-bind`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }).then((res) => res.json())
}

const headers = sethandleHeaders(config)

export const getEventCarnival = () =>
  fetch(`/api/2021/live-carnival/event/carnival-2021`, {
    method: 'get',
    headers,
  }).then((res) => res.json())

export const toClient = (userId = '') => {
  const common = {
    os_name: config.IOS ? 'ios' : 'android',
    title: '直播嘉年华',
  }

  collectEvent('WebClick', {
    ...common,
    element_content: '用户头像',
  })
  bluedCollectEvent({
    name: BLUED_COLLECT_EVENT.头像,
    target_uid: userId,
  })

  if (!config?.device) return alert('在客户端打开才可以点击哦')

  if (userId) {
    window.location.href = `${appUrlScheme}://user/${userId}`
  }

  Toast.loading('正在跳转，请稍后...', 2)
}
