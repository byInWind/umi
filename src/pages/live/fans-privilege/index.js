import React, { useEffect, useState } from 'react'
import { Toast, Modal } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { getQueryValue, queryString, collectEvent, bluedCollectEvent } from '@utils/utils'
import { sethandleHeaders } from '@utils/headers'
import { imgConfig, handleLevel, badgeWidth } from './constants'
import { getMyPrivileges } from './server'
import { handleGetReceived, imgFac, handleProgress } from './utils'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const anchorId = getQueryValue('anchorId') || 'WaYlwf4GG4s'
  const [myPrivileges, setMyPrivileges] = useState({})
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleOut, setVisibleOut] = useState(false)

  useEffect(() => {
    Toast.loading('loading')

    getMyPrivileges(anchorId).then((res) => {
      Toast.hide()
      const { success, data } = res

      setMyPrivileges(data)
      if (!success) return Toast.fail('服务器错误')
    })

    collectEvent('predefine_pageview', {
      title: '我的粉丝团专属特权',
      url: window.location.href,
    })

    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'ANCHOR_FANS_GROUP_MY_PRIVILEGE',
    })
  }, [])

  const handlerQuit = () => {
    fetch(`/api/live/fanclub/exit`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString({
        anchorId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setVisibleOut(false)
        if (res.status === 200) {
          Toast.success('您已退出该粉丝团!')

          setTimeout(() => {
            location.href = 'finka2020://liveShow/exitFanClub'
          }, 1000)
        } else {
          Toast.fail(res.message, 4)
        }
      })
  }

  const { privileges, profile } = myPrivileges || {}

  const { received = [], willReceived = [] } = handleGetReceived(profile, privileges)

  const renderWillReceive = (willReceived) =>
    willReceived?.map((ele, index) => (
      <li key={index} className={`${ele.state === '即将解锁' ? 'privilege__list-item' : 'privilege__list-item-gray'}`}>
        <img className='privilege__list-item--icon' src={imgFac(ele?.icon)} />
        <div className='privilege__list-item--badge'>
          <div className='name'>{ele?.name}</div>
          <div className='tip'>{ele?.categoryTitle}</div>
        </div>
        <div className='privilege__list-item--level'>
          <div className='level'>LV.{ele.level}</div>
          <div className='level'>{ele.state}</div>
        </div>
      </li>
    ))

  const renderReceived = (received, status) =>
    received?.map((ele, index) => (
      <li key={index} className={`${status === 4 ? 'privilege__list-item-lose' : 'privilege__list-item-hover'}`}>
        <img className='privilege__list-item--icon' src={imgFac(ele?.icon)} />
        <div className='privilege__list-item--badge'>
          <div className='name'>{ele?.name}</div>
          <div className='tip'>{ele?.categoryTitle}</div>
        </div>
        <div className='privilege__list-item--level'>
          <div className='level'>LV.{ele.level}</div>
          <div className='level'>{ele.state}</div>
        </div>
      </li>
    ))

  return (
    <div className='wrapper'>
      <Layout>
        <div className='privilege'>
          <div className={`${profile?.status === 4 ? 'privilege__header-gray' : 'privilege__header'}`}>
            <div className='privilege__header-top'>
              <span
                onClick={() => {
                  window.location.href = 'finka2020://webview/close'
                }}
              >
                <img src={imgConfig.back} />
              </span>
              <span className='privilege__header-top--level'>我的等级权益</span>
              <span
                onClick={() => {
                  setVisibleSuccess(true)
                  collectEvent('WebClick', {
                    title: '我的粉丝团专属特权',
                    element_content: '更多',
                  })
                  bluedCollectEvent({
                    event: 'H5_BTN_CLICK',
                    name: 'ANCHOR_FANS_GROUP_MORE',
                  })
                }}
              >
                <img src={imgConfig.more} />
              </span>
            </div>
            <div className={`privilege__header-content ${profile?.status === 4 ? 'changeGray' : ''}`}>
              <div
                className='privilege__header-content--badge'
                style={{ width: profile?.badgeName?.length >= 3 ? badgeWidth[profile?.badgeName?.length] : '' }}
              >
                <div className='privilege__header-content--badge-level'>{profile?.level || '1'}</div>
                <span className='privilege-badge' style={{ background: handleLevel(profile?.badgeBgColor) || '' }}>
                  {profile?.badgeName || ''}
                </span>
                {profile?.badgeIcon?.variants[0]?.url ? (
                  <img src={profile?.badgeIcon?.variants[0]?.url} />
                ) : (
                  <div
                    className='privilege__header-content--badge-place'
                    style={{ background: profile?.badgeBgColor[0] || '#FCBE04' }}
                  ></div>
                )}
              </div>

              {profile?.status === 2 && (
                <>
                  <div className='privilege__header-content--progress'>
                    <span style={{ width: handleProgress(profile) }}></span>
                  </div>

                  <div className='privilege__header-content--value'>
                    {profile?.scoreToNextLevel}
                    {profile?.level >= 30 ? '' : `至LV.${profile?.level + 1}`}
                    <span
                      onClick={() => {
                        collectEvent('WebClick', {
                          title: '我的粉丝团专属特权',
                          element_content: '自动点亮',
                        })

                        bluedCollectEvent({
                          event: 'H5_BTN_CLICK',
                          name: 'ANCHOR_FANS_GROUP_AUTO_LIGHT_UP',
                        })

                        window.location.href = 'finka2020://liveShow/autoLightUp'
                      }}
                    >
                      自动点亮
                    </span>
                    <img src={imgConfig.right} />
                  </div>
                </>
              )}
            </div>
            {profile?.status === 4 && (
              <div className='privilege__header-value'>
                <div>你的专属特权已经失效</div>
                <div>
                  {profile?.scoreToNextLevel}
                  {profile?.level >= 30 ? '' : `至LV.${profile?.level + 1}`}
                </div>
                <div>
                  <span
                    onClick={() => {
                      collectEvent('WebClick', {
                        title: '我的粉丝团专属特权',
                        element_content: '自动点亮',
                      })

                      bluedCollectEvent({
                        event: 'H5_BTN_CLICK',
                        name: 'ANCHOR_FANS_GROUP_AUTO_LIGHT_UP',
                      })

                      window.location.href = 'finka2020://liveShow/autoLightUp'
                    }}
                  >
                    自动点亮
                  </span>
                  <img src={imgConfig.right} />
                </div>
              </div>
            )}
          </div>
          <ul className='privilege__list'>
            {/* 未接解锁特权 */}
            {renderWillReceive(willReceived)}
            {received?.length > 0 && (
              <div className='privilege__have'>
                <span className='privilege__have-line'>———</span>
                <span className='privilege__have-title'>
                  已获得
                  <span className='privilege__have-number'>{received.length}项</span>特权
                </span>
                <span className='privilege__have-line'>———</span>
              </div>
            )}

            {/* 已解锁特权 */}
            {renderReceived(received, profile?.status)}
          </ul>
        </div>
        {visibleSuccess && (
          <div className='mask'>
            <div className='mask__model'>
              <div className='mask__action'>
                <div
                  onClick={() => {
                    collectEvent('WebClick', {
                      title: '我的粉丝团专属特权',
                      element_content: '查看规则',
                    })
                    bluedCollectEvent({
                      event: 'H5_BTN_CLICK',
                      name: 'ANCHOR_FANS_GROUP_READ_RULE',
                    })
                    window.location.href = `/hd/live/fans-rule?source=web&anchorId=${anchorId}`
                  }}
                >
                  查看规则
                </div>
                <div
                  className='mask__action-out'
                  onClick={() => {
                    setVisibleSuccess(false)
                    setVisibleOut(true)
                    collectEvent('WebClick', {
                      title: '我的粉丝团专属特权',
                      element_content: '退出粉丝团',
                    })
                    bluedCollectEvent({
                      event: 'H5_BTN_CLICK',
                      name: 'ANCHOR_FANS_GROUP_QUIT_GROUP',
                    })
                  }}
                >
                  退出粉丝团
                </div>
              </div>
              <div
                onClick={() => {
                  setVisibleSuccess(false)
                  collectEvent('WebClick', {
                    title: '我的粉丝团专属特权',
                    element_content: '取消',
                  })

                  bluedCollectEvent({
                    event: 'H5_BTN_CLICK',
                    name: 'ANCHOR_FANS_GROUP_CANCEL',
                  })
                }}
                className='mask__cancel'
              >
                取消
              </div>
            </div>
          </div>
        )}

        <Modal
          visible={visibleOut}
          transparent
          maskClosable={false}
          onClose={() => {
            setVisibleOut(false)
          }}
          title={null}
          footer={[]}
        >
          <div className='modelOut'>
            <div className='modelOut__tip'>退出当前主播粉丝团，所属亲密值和权益将会重置哦，确定退出吗？</div>

            <div>
              <span
                className='modelOut__cancel'
                onClick={() => {
                  setVisibleOut(false)
                }}
              >
                取消
              </span>
              <span
                className='modelOut__submit'
                onClick={() => {
                  setVisibleOut(false)
                  handlerQuit()
                }}
              >
                确认
              </span>
            </div>
          </div>
        </Modal>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
