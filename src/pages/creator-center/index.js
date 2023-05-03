import React, { useState, useEffect } from 'react'
import { Popover, Toast } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { collectEvent } from '@utils/utils'
import { imgConfig } from './constants'
import { handlerData } from './utils'

import { getCreatorCenterData } from './server'

const Item = Popover.Item

const config = window.CONFIG || {}

import './index.scss'

const renderCount = (data) =>
  data.map(({ num, desc }, index) => (
    <div key={index} className='creator__count-content'>
      <div className='creator__count-num'>{num}</div>
      <div className='creator__count-desc'>{desc}</div>
    </div>
  ))
const renderInteract = (data, type) =>
  data.map(({ num, desc, trem }, index) => (
    <div key={index} className={`creator__content-center ${type === 'down' ? 'creator__content-top' : ''}`}>
      <div className='creator__content-desc'>{desc}</div>
      <div className='creator__content-num'>{num}</div>
      {trem !== 'none' && trem !== '0' && trem !== 0 && (
        <div className='creator__content-trem'>
          <img src={imgConfig.arrow} />+{trem}
        </div>
      )}
      {trem == 0 && <div className='creator__content-trem creator__content-grey'>-</div>}
    </div>
  ))
const renderPopover = () => (
  <div className='creator-popover__content'>
    <div>1.以下所有数据均为笔记的推荐数据总量，不包含来源“翻咔匹配”与“关注人动态”的曝光/互动数据；</div>
    <div>2.每日12:00更新，可能存在误差，但不影响数据分析；</div>
    <div>3.如遇问题，请联系客服团队。</div>
  </div>
)

const App = () => {
  const [visible, setVisible] = useState(false)
  const [showErrorPage, setShowErrorPage] = useState(true)
  const [dataSource, setDataSource] = useState({})
  const [loading, setLoading] = useState(true)
  const handleVisibleChange = (visible) => setVisible(visible)

  useEffect(() => {
    setLoading(true)
    Toast.loading('Loading...', 60 * 10)
    getCreatorCenterData().then((res) => {
      const {
        success,
        data: { creativeCenter = {}, showErrorPage },
      } = res

      if (!success) return Toast.error('服务器错误')

      setLoading(false)

      setShowErrorPage(showErrorPage)
      setDataSource(creativeCenter)

      Toast.hide()
    })

    collectEvent('predine_pageview', {
      os_name: config?.android ? 'android' : 'ios',
      title: '“创作者中心”',
    })
  }, [])

  const { dataCont = [], interactUp = [], interactDown = [], avatar = '' } = handlerData(dataSource) || {}

  return (
    <div className='wrapper'>
      <Layout>
        {showErrorPage && !loading && (
          <div className='creator-error'>
            <img alt='avatar' src={imgConfig.nodata} />
            <div className='creator-error__content'>你还未发布过笔记内容，</div>
            <div className='creator-error__content'>暂时无法为你生成创作数据看板</div>
          </div>
        )}
        {!showErrorPage && !loading && (
          <div className='creator'>
            <div className='creator__header'>
              <div className='creator__header-avatar'>
                <img src={avatar ? avatar : imgConfig.placeImg} />
              </div>
              <div className='creator__header-title'>
                <div className='creator__header-name'>
                  创作数据总览
                  <Popover
                    visible={visible}
                    placement='bottomLeft'
                    onVisibleChange={handleVisibleChange}
                    overlayClassName='fortest'
                    overlay={[
                      <Item key='6' style={{ height: 209, width: 173, margin: 0 }}>
                        <span>{renderPopover()}</span>
                      </Item>,
                    ]}
                  >
                    <img src={visible ? imgConfig.question2 : imgConfig.question1} />
                  </Popover>
                </div>
                <div className='creator__header-tip'>(每日12:00更新前一日数据)</div>
              </div>
            </div>
            <div className='creator__count'>{renderCount(dataCont)}</div>
            <div className='creator__panel'>
              <div className='creator__content-title'>
                互动总览
                <span>(较昨日的数据变化)</span>
              </div>
              <div className='creator__content'>{renderInteract(interactUp, 'up')}</div>
              <div className='creator__content'>{renderInteract(interactDown, 'down')}</div>
              <div className='creator__message'>
                <img src={imgConfig.emoje} />
                <span className='creator__message-text'>丰富图文提升笔记点击率，你的笔记将推荐给更多人查看。</span>
              </div>
            </div>
            <div className='creator__more'>
              <div className='creator__more-tip'>
                <img src={imgConfig.banner} />
              </div>
              <div className='creator__more-font creator__more-title'>真诚创作：</div>
              <div className='creator__more-font'>
                发布原创且对其他用户有价值的内容，配上精美的封面图和标题，引起读者共鸣，能有效提高笔记点击率，获得更多推荐流量，让你的粉丝暴涨噢。
              </div>
              <div className='creator__more-font creator__more-title'>积极互动：</div>
              <div className='creator__more-font'>
                在内容创作时引导读者粉丝互动，积极参与互动的作者，能有效提升互动率，你的内容将获得优先推荐。
              </div>
              <div className='creator__more-line'></div>
              <div className='creator__more-font creator__more-title'>举例说明：</div>
              <div className='creator__more-font'>👔 穿搭类内容：两套穿搭你觉得哪套比较好看？欢迎评论区提问！</div>
              <div className='creator__more-font'>✈️ 攻略向内容：还有一些细节不在这里赘述了，评论区答疑！</div>
              <div className='creator__more-font'>🎙️ 话题向内容：对于此事，你怎么看？</div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
