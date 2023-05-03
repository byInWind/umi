import { getQueryValue } from './utils'

const KEY = 'ticket'

const getToken = () => {
  return global.localStorage.getItem(KEY)
}

const getUserId = () => {
  return global.localStorage.getItem('userId')
}

export const sethandleHeaders = (params) => {

  return {}
  const getLocalStorageTicket = getToken() || getQueryValue('t') || getQueryValue('ticket') || ''
  const getLocalStorageUserId = getUserId() || getQueryValue('userId') || ''

  if (window.CONFIG && window.CONFIG.nodeEnv === 'local') {
    window.CONFIG.userId = getLocalStorageUserId
  }

  const {
    userAgent,
    ticket,
    version,
    GUID,
    deviceType,
    userId,
    assid,
    wifi,
    deviceName,
    location,
    test,
    testReuestId,
    packages,
    DUId,
    screenWidth,
    screenHeight,
    digest,
    encoding,
    language,
    androidStore,
  } = params

  const header = {
    'X-App-Auth': ticket || getLocalStorageTicket || '',
    'X-App-Package': packages || 'Finka0i',
    'User-Agent': userAgent || '',
    'X-App-Version': version || '',
    'X-App-GUID': GUID || '',
    'X-App-Device': deviceType || '',
    'X-App-User': userId || getLocalStorageUserId || '',
    'X-App-Assid': assid || '',
    'X-App-WiFi': wifi || '',
    'X-App-DeviceName': deviceName || '',
    'X-App-Location': location || '',
    'X-App-Test': test || '',
    'X-App-RequestTrace': testReuestId || '',
    'X-App-DigitalAlliance-Id': DUId || '',
    'X-Screen-Width': screenWidth || '',
    'X-Screen-Height': screenHeight || '',
    Digest: digest || '',
    'Accept-Encoding': encoding || '',
    'Accept-Language': language || '',
    'Android-Store': androidStore || 'appstore',
  }
  Object.keys(header).forEach((key) => {
    if (!header[key]) {
      delete header[key]
    }
  })

  return header
}
