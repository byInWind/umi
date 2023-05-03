import React, { useState, useEffect } from 'react'
import { Popover, Toast } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { collectEvent } from '@utils/utils'
import { imgConfig } from './constants'
import { handlerData } from './utils'
import { getCreatorCenterData } from './server'
import LoadingMore from './components/loadmore'
const Item = Popover.Item

const config = window.CONFIG || {}

import './index.scss'

const renderCumulativeData = (data) =>
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
    <div>
      <span className='font-bold'>曝光：</span>本条动态的全部曝光量
    </div>
    <div>
      <span className='font-bold'>推荐曝光：</span>在话题发布被官方推荐的曝光量
    </div>
    <div>
      <span className='font-bold'>点赞：</span>本条动态的全部点赞量
    </div>
    <div>
      <span className='font-bold'>评论：</span>本条动态的全部评论量
    </div>
    <div className='creator-popover__content-tips'>
      tips：动态数据为离线数据，可能存在数据延迟或少许偏差，但不会对数据分析造成影响；如出现“计算中”的情况，是因为正在校准新发布动态的内容数据，请稍后查看。
    </div>
  </div>
)

const App = () => {
  const [visible, setVisible] = useState(false)
  const [showErrorPage, setShowErrorPage] = useState(true)
  const [dataSource1, setDataSource1] = useState({})
  const [loading, setLoading] = useState(true)
  const handleVisibleChange = (visible) => setVisible(visible)
  const [nextCursorId, setNextCursorId] = useState()
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    setLoading(true)
    Toast.loading('Loading...', 60 * 10)
    getCreatorCenterData().then((res) => {
      const {
        success,
        data: { creativeCenter = {}, showErrorPage, list = [], nextCursorId = '' },
      } = res

      if (!success) return Toast.error('服务器错误')

      setLoading(false)
      setShowErrorPage(showErrorPage)
      setDataSource1(creativeCenter)
      setNextCursorId(nextCursorId)
      setDataList(list)

      Toast.hide()
    })

    collectEvent('predine_pageview', {
      os_name: config?.android ? 'android' : 'ios',
      title: '“创作者中心”',
    })
  }, [])

  const { cumulativeData = [], interactUp = [], interactDown = [], avatar = '', name } = handlerData(dataSource1) || {}

  return (
    <div className='wrapper'>
      <Layout>
        {showErrorPage && !loading && (
          <div className='creator-error'>
            <img alt='avatar' src={imgConfig.nodata2} />
            <div className='creator-error__content'>你还未发布过笔记内容，</div>
            <div className='creator-error__content'>暂时无法为你生成创作数据看板</div>
          </div>
        )}
        {!showErrorPage && !loading && (
          <div className='creator'>
            <div className='creator__header'>
              <div
                className='creator__header-avatar'
                style={{
                  backgroundImage: `url(${avatar})`,
                }}
              ></div>
              <div className='creator__header-title'>
                <span className='creator__header-user'>{name}</span>的创作数据总览
                <p className='creator__header-tips'>(每日12:00更新前一天数据)</p>
              </div>
            </div>
            <div className='creator__count'>
              <p className='creator__count-title'>累计发布数据</p>
              <div className='creator__count-contentBox'>{renderCumulativeData(cumulativeData)}</div>
            </div>
            <img
              className='creator__jumpImg'
              onClick={() => {
                location.href = 'https://mp.weixin.qq.com/s/6-KK__By42hOM95UcB-beA'
              }}
              src={imgConfig.jumpImg}
            ></img>
            <div className='creator__panel'>
              <div className='creator__content-title'>
                互动数据
                <span>(最近30天数据)</span>
              </div>
              <div className='creator__content'>{renderInteract(interactUp, 'up')}</div>
              <div className='creator__content'>{renderInteract(interactDown, 'down')}</div>
            </div>
            <div className='creator__dynamic'>
              <p className='creator__dynamic-title'>
                动态数据
                <Popover
                  visible={visible}
                  placement='bottomLeft'
                  onVisibleChange={handleVisibleChange}
                  overlayClassName='fortest'
                  overlay={[
                    <Item key='6' style={{ width: 210, margin: 0 }}>
                      <div>{renderPopover()}</div>
                    </Item>,
                  ]}
                >
                  <img className='creator__dynamic-Popover' src={visible ? imgConfig.question2 : imgConfig.question1} />
                </Popover>
              </p>
              {dataList.length > 0 ? (
                <div>
                  <LoadingMore nextCursorId={nextCursorId} dataList={dataList} />
                  <div className='creator__dynamic-footer'>仅统计最近30天发布的动态数据</div>
                </div>
              ) : (
                <div className='creator__emptyData'>
                  <img className='creator__emptyData-img' src={imgConfig.nodata3} />
                  <p className='creator__emptyData-title'>暂无数据</p>
                  <p className='creator__emptyData-text'>最近30天还没有发布动态或关联话题投稿</p>
                  <a href='finka2020://publishFeed' className='creator__emptyData-btn'>
                    去发布
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
