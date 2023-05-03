import React, { useEffect, useState, useRef } from 'react'
import { Toast } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { collectEvent, greaterThanCurrentVersion, bluedCollectEvent } from '@utils/utils'
import VersionUpdate from '@components/version-update'
import DownloadApp from '@components/Download-app'
import { imgConfig } from './constants'
import { getUserNumber } from './api'
import './index.scss'

const config = window.CONFIG || {}

const isShow = config.IOS
  ? !greaterThanCurrentVersion(config.version, '5.9.23')
  : !greaterThanCurrentVersion(config.version, '1.7.4')

const App = () => {
  const [maskShow, setMaskShow] = useState(false)
  const [usedNumber, setUsedNumber] = useState(0)
  const downappRef = useRef()

  const initUrl = config.nodeEnv === 'production' ? 'https://finka-h5.finkapp.cn' : 'https://finka-h5.wowkaka.cn'
  const url = {
    // 应用宝地址
    yybUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cupidapp.live&ckey=CK1507226084937&android_schema=',
    // 页面地址
    pageUrl: 'finka2020://webview/openNew?url=' + initUrl + '/hd/2021/paster?showShareButton=true',
    // 安卓下载地址
    androidDownUrl: 'https://datarangers.finkapp.cn/s/lU8PVD9R',
    // ios地址
    iosUrl: 'https://finkapp.cn/native/universal-link-fi?url=' + initUrl + '/hd/2021/paster?showShareButton=true',
  }

  useEffect(() => {
    collectEvent('predefine_pageview', {
      title: '2022虎虎生威',
    })
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: '2022_NEW_YEAR_STICKER',
    })

    if (config?.userId) {
      setMaskShow(isShow)
    }

    getUserNumber().then((res) => {
      const { success, data } = res

      if (!success) return Toast.fail('服务器错误')

      setUsedNumber(data.number || 10086)
    })
  }, [])

  const btnStyle = {
    width: '7.036145rem',
    height: '1.108434rem',
    fontSize: '0.385542rem',
  }

  return (
    <div className='wrapper'>
      <Layout>
        <div className='drainage'>
          <div className='drainage__content'>
            <div className='drainage__content-title'>翻咔·2022新年企划</div>
            <div className='drainage__content-imgBg'>
              <img src={imgConfig.bg} />

              <div className='drainage__content-handle'>
                <div
                  onClick={() => {
                    collectEvent('WebClick', {
                      title: '2022虎虎生威',
                      element_content: '开始创作',
                    })
                    bluedCollectEvent({
                      event: 'H5_BTN_CLICK',
                      name: '2022_NEW_YEAR_STICKER_BEGIN_CREATE',
                    })

                    if (config?.userId) {
                      if (isShow) {
                        setMaskShow(isShow)
                      } else {
                        location.href = `finka2020://paster?source=web&title=2022虎虎生威&tagName=${
                          config?.nodeEnv === 'production' ? '2022虎虎生威' : '新年贴纸'
                        }&tagId=${
                          config?.nodeEnv === 'production' ? 'poiddO1JXAumoNCLmGsFLg' : 'ObR37dHdGqymoNCLmGsFLg'
                        }`
                      }
                    } else {
                      downappRef.current.downloadApp()
                    }
                  }}
                  id='downloadButton'
                  className='drainage__content-btn'
                ></div>
                <div className='drainage__content-count'>
                  已有
                  <span>{usedNumber}</span>
                  人进行了模板创作
                </div>
                <div className='drainage__content-tip'>选择比例为 3:4 的长方形照片呈现效果最佳</div>
              </div>
            </div>

            {/* <div className='drainage__content-imgContent'>
              <img src={imgConfig.content} />
            </div> */}

            <DownloadApp ref={downappRef} url={url} />
          </div>
        </div>
        {maskShow && (
          <div className='mask'>
            <div className='mask__version'>
              <div className='mask__version-title'>版本需更新哦</div>
              <div className='mask__version-tip'>当前翻咔版本过低，暂时无法使用创作功能</div>
              <VersionUpdate name='去更新' btnStyle={btnStyle} />
              <div
                className='mask__version-cancel'
                onClick={() => {
                  setMaskShow(false)
                  collectEvent('WebClick', {
                    title: '2022虎虎生威',
                    element_content: '去更新',
                  })
                  bluedCollectEvent({
                    event: 'H5_BTN_CLICK',
                    name: '2022_NEW_YEAR_STICKER_GO_TO_UPDATE',
                  })
                }}
              >
                暂不
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
