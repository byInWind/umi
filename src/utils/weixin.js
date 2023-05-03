import { Toast } from 'antd-mobile-v2'
import req, { GET } from '@utils/req'
import { getQueryValue } from '@utils/utils'

function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toGMTString()}`
  document.cookie = `${cname}=${cvalue}; ${expires}`
}

const config = window.CONFIG
export const authorize = async () => {
  const result = {
    success: false,
  }
  const code = getQueryValue('code')

  if (!config.weiXin) {
    Toast.fail('请在微信客户端中打开')

    return
  }

  if (!code) {
    const params = window.location.href.includes('actH52022') ? '' : '/actH52022'

    const url =
      config.nodeEnv === 'production'
        ? window.location.href.replace('finka-h5.finkapp.cn', `www.finka.cn${params}`)
        : window.location.href.replace('finka-h5.wowkaka.cn', `finka-www.wowkaka.cn${params}`)

    const redirectUri = encodeURIComponent(url)
    const appId = 'wxc384153c2644a722'
    const state = '1594795801'
    const initUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    window.location.href = initUrl
    return result
  } else {
    await req({
      endpoint: `/actH52022/api/2022/weixin/unionid?code=${code}`,
      method: GET,
    }).then((res) => {
      const { msg, code, data } = res
      if (code === 200) {
        // 设置cookie，防止后面页面不刷新取不到哈
        setCookie('_mp_openid', data, 1)
        window.CONFIG.wxInfo = data
        document.cookie = `_mp_openid=${data}`

        result.data = res
        result.success = true
      } else {
        Toast.fail(msg)
      }
    })
    return result
  }
}
