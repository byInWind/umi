const config = window.CONFIG

const getVersion = (value, IOS) => {
  if (IOS) {
    const val = value.match(/(?:CPU\siphone\s)(\S+\s*\S+)/i)
    return val?.length > 1 ? `i${val[1]}`.replace(/_/g, '.') : 'ipad'
  } else {
    const val = value.match(/(?:Android\s)(\S+)/i)
    return val?.length > 1 ? `Android ${val[1]}` : 'Android'
  }
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
