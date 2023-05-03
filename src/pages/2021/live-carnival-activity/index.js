import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Modal, InputItem, Toast, Icon } from 'antd-mobile'
import { sethandleHeaders } from '@utils/headers'
import Layout from '@components/layout'
import { collectEvent, isWeibo } from '@utils/utils'
import Star from './components/star'
import Talent from './components/talent'
import Variety from './components/variety'
import Actor from './components/actor'
import TalentRule from './components/talentRule'
import VarietyRule from './components/varietyRule'
import { imgConfig, tab, BLUED_COLLECT_EVENT, activeMap1, activeMap2, active } from './constants'
import { bluedCollectEvent, getEventCarnival, toClient, isShowLastWeekList } from './util'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const showLastWeekList = isShowLastWeekList()

import './index.scss'

const weibo = isWeibo()
export const queryString = (params) => {
  let str = ''
  Object.keys(params).forEach((key) => {
    str += `${key}=${params[key]}&`
  })

  return str.substr(0, str.length - 1)
}

const tabData = [{ name: '全民星探' }, { name: '才艺招募令' }, { name: '综艺排行榜' }]
const talentData = showLastWeekList
  ? [{ name: '本周才艺新秀榜' }, { name: '上周排行榜' }]
  : [{ name: '本周才艺新秀榜' }, { name: '入选才艺新秀' }]
const varietyData = showLastWeekList
  ? [{ name: '本周综艺榜' }, { name: '上周排行榜' }]
  : [{ name: '本周综艺榜' }, { name: '新综艺节目' }]
const activeData = [{ name: '活动规则' }, { name: '活动奖励' }]

const App = () => {
  // console.log(isShowLastWeekList())
  const common = {
    os_name: config.IOS ? 'ios' : 'android',
    title: '直播嘉年华',
  }

  // 键盘处理
  const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
  let moneyKeyboardWrapProps
  if (isIPhone) {
    moneyKeyboardWrapProps = {
      onTouchStart: (e) => e.preventDefault(),
    }
  }

  const type = {
    tab2: 'allTip',
    tab1: 'caiyiTip',
    tab0: 'bingTip',
  }

  const [starDetectiveList, setStarDetective] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [userName, setUserName] = useState('')
  const [mobile, setMobile] = useState('')
  const [visible, setVisible] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [currentTab, setCurrentTab] = useState('tab0')
  const [concurrentMode, setCurrentMode] = useState('num0')
  const [currentType, setCurrentType] = useState('ruleTip')
  const [currentPage, setCurrentPage] = useState('rule')
  const [current, setCurrent] = useState('first')
  const [KOLPopImgInfo, setKOLPopImgInfo] = useState({})
  const [KOLPopImgVisible, setKOLPopImgVisible] = useState(false)
  const [outsideStation, setOutsideStation] = useState(false)
  const [weiboBrowser, setWeiboBrowser] = useState(false)

  const handleClick = (item, activeIndex) => {
    setCurrentTab(`tab${activeIndex}`)
    setCurrentMode(`num0`)
    collectEvent('WebClick', {
      ...common,
      element_content: item.name,
    })

    bluedCollectEvent({
      name: BLUED_COLLECT_EVENT[item.name],
    })
  }

  const handleCheckMobile = (mobile) => {
    if (mobile.length === 0) {
      Toast.fail('输入内容无效，请重新输入', 2)
      return false
    }

    if (mobile.substr(0, 1) !== '1' || mobile?.length !== 13) {
      Toast.fail('手机号码错误，请重新输入', 2)

      return false
    }
    return true
  }

  const handleClickSignUp = () => {
    collectEvent('WebClick', {
      ...common,
      element_content: '立即报名',
    })

    bluedCollectEvent({
      name: BLUED_COLLECT_EVENT.立即报名,
    })
    window.location.href =
      currentTab === 'tab1' ? 'https://wj.qq.com/s2/8970044/1c1e/' : 'https://wj.qq.com/s2/8970351/f963/'
  }

  const handleClickBind = () => {
    collectEvent('WebClick', {
      ...common,
      element_content: '立即绑定',
    })

    bluedCollectEvent({
      name: BLUED_COLLECT_EVENT.立即绑定,
    })

    setVisible(true)
  }

  const handleStarDetective = () => {
    collectEvent('WebClick', {
      ...common,
      element_content: '提交',
    })
    bluedCollectEvent({
      name: BLUED_COLLECT_EVENT.提交,
    })

    if (userName.length === 0) return Toast.fail(`主播名称不能为空`, 2)

    if (!handleCheckMobile(mobile)) return

    const params = {
      userName,
      mobile: mobile.replace(/\s+/g, ''),
    }

    fetch(`/api/2021/live-carnival/event/carnival-2021/star-detective/request-bind`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        setVisible(false)
        if (res.status === 200) {
          setVisibleSuccess(true)
        } else {
          Toast.fail(res.message, 4)
        }
      })
  }

  const handleGetEventCarnival = (pageview) => {
    Toast.loading('Loading...', 60 * 10)
    getEventCarnival()
      .then((res) => {
        Toast.hide()
        const { status, data = {}, message = '' } = res
        if (status !== 200) return Toast.fail(message || '获取数据异常', 2)

        setDataSource(data)

        const { starDetective = [], KOLInfo = {} } = data

        setStarDetective(starDetective)
        setKOLPopImgInfo(KOLInfo)
        const KOLCount = localStorage.getItem('KOLCount') || 0
        if (pageview && KOLInfo?.userId && KOLCount <= 2) {
          setKOLPopImgVisible(true)
          localStorage.setItem('KOLCount', Number(KOLCount) + 1)
        }
      })
      .catch(() => {
        setOutsideStation(true)
        Toast.hide()
      })
  }

  const handleBrowser = () => {
    window.location.href = `https://finkapp.cn/native?url=${
      config.nodeEnv === 'production' ? 'https://finka-h5.finka.cn' : 'https://finka-h5.wowkaka.cn'
    }/hd/2021/live-carnival-activity`
  }

  const handleClickMode = (item, activeIndex) => {
    setCurrentMode(`num${activeIndex}`)
    collectEvent('WebClick', {
      ...common,
      element_content: item.name,
    })

    bluedCollectEvent({
      name: BLUED_COLLECT_EVENT[item.name],
    })
  }

  const renderHeader = (activeMap, concurrentMode, activeData) => {
    return (
      <div className='advertise__mode-bg'>
        <img className='advertise__header-bg' src={activeMap[concurrentMode]} />
        <div className='advertise__mode-item'>
          {activeData.map((item, index) => (
            <div key={index} onClick={() => handleClickMode(item, index)}></div>
          ))}
        </div>
      </div>
    )
  }

  // const handleScroll = (e) => {
  //   // todo
  //   console.log(5666666)
  // }

  useEffect(() => {
    handleGetEventCarnival('pageview')
    collectEvent('predefine_pageview', common)
    bluedCollectEvent({
      name: BLUED_COLLECT_EVENT.活动页,
      event: 'H5_PAGE_SHOW',
    })

    // window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='wrapper'>
      <Layout>
        {current === 'first' && (
          <div className='advertise'>
            <div className='advertise__link'>
              <div
                className='advertise__link-star'
                onClick={() => {
                  collectEvent('WebClick', {
                    ...common,
                    element_content: '立即参与-全民星探',
                  })

                  bluedCollectEvent({
                    name: 'LIVE_CARNIVAL_JOIN_ALL_STARTS',
                  })

                  if (outsideStation) return handleBrowser()

                  setCurrent('second')
                  setCurrentTab(`tab0`)
                }}
              ></div>
              <div
                className='advertise__link-caiyi'
                onClick={() => {
                  collectEvent('WebClick', {
                    ...common,
                    element_content: '立即参与-才艺新秀招募令',
                  })
                  bluedCollectEvent({
                    name: 'LIVE_CARNIVAL_JOIN_FIND_TALENT_AND_SKILL',
                  })
                  if (outsideStation) return handleBrowser()

                  setCurrent('second')
                  setCurrentTab(`tab1`)
                }}
              ></div>
              <div
                className='advertise__link-all'
                onClick={() => {
                  collectEvent('WebClick', {
                    ...common,
                    element_content: '立即参与-综艺排行榜',
                  })
                  bluedCollectEvent({
                    name: 'LIVE_CARNIVAL_JOIN_VARIETY_RANK',
                  })
                  if (outsideStation) return handleBrowser()

                  setCurrent('second')
                  setCurrentTab(`tab2`)
                }}
              ></div>
              {weiboBrowser && (
                <div className='advertise__link-brower'>
                  <img className='advertise__plane' src={imgConfig.arrow} />
                  点击右上角，打开浏览器查看更多
                </div>
              )}
              {outsideStation && (
                <div
                  className='advertise__link-open'
                  onClick={() => {
                    if (weibo) return setWeiboBrowser(true)

                    handleBrowser()
                  }}
                >
                  <img className='advertise__plane' src={imgConfig.openFankaApp} />
                </div>
              )}
            </div>
            {weibo && <div className='am-modal-mask'></div>}

            <img className='advertise__plane' src={imgConfig.banner} />
          </div>
        )}
        {current !== 'first' && (
          <div className='advertise'>
            <div className='advertise__header'>
              <img className='advertise__header-bg' src={imgConfig.topImg} />
              {/* <div className='advertise__header-date'>9月6日-11月28日</div> */}
              <div
                className='advertise__header-jump'
                onClick={() => {
                  const key = type[currentTab]
                  bluedCollectEvent({
                    name: BLUED_COLLECT_EVENT.活动规则,
                  })
                  if (currentType === 'ruleTip') {
                    setCurrentPage('other')
                    setCurrentType(key)
                  } else {
                    setCurrentType('ruleTip')
                    setCurrentPage('rule')
                  }
                }}
              >
                <img src={imgConfig[currentPage === 'rule' ? type[currentTab] : 'ruleTip']} />
              </div>
            </div>
            <div className='advertise__tab'>
              <div className='advertise__tab-bg'>
                <img className='advertise__header-bg' src={tab[currentTab]} />
                <div className='advertise__tab-item'>
                  {tabData.map((item, index) => (
                    <div key={index} onClick={() => handleClick(item, index)}></div>
                  ))}
                </div>
              </div>
            </div>
            {currentType === 'ruleTip' && (
              <>
                <div className='advertise__mode'>
                  <div className='advertise__mode-bg'>
                    <img className='advertise__header-bg' src={active[concurrentMode]} />
                    <div className='advertise__mode-item'>
                      {activeData.map((item, index) => (
                        <div key={index} onClick={() => handleClickMode(item, index)}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='advertise__content'>
                  {currentTab === 'tab0' && Actor(concurrentMode, imgConfig)}
                  {currentTab === 'tab1' && TalentRule(concurrentMode, imgConfig)}
                  {currentTab === 'tab2' && VarietyRule(concurrentMode, imgConfig)}
                </div>
              </>
            )}

            {currentType !== 'ruleTip' && (
              <>
                <div className='advertise__mode'>
                  {currentTab === 'tab1' && renderHeader(activeMap1, concurrentMode, talentData)}
                  {currentTab === 'tab2' && renderHeader(activeMap2, concurrentMode, varietyData)}
                </div>
                {currentTab === 'tab0' && currentType !== 'ruleTip' && (
                  <div className='advertise__star'>{Star(starDetectiveList)}</div>
                )}
                {currentTab !== 'tab0' && currentType !== 'ruleTip' && (
                  <div className='advertise__content'>
                    {currentTab === 'tab1' && Talent(dataSource, concurrentMode)}
                    {currentTab === 'tab2' && Variety(dataSource, concurrentMode)}
                  </div>
                )}
              </>
            )}

            <div className='advertise__footer'>
              <img src={imgConfig.footer} />
            </div>
            {current !== 'first' && (
              <>
                {currentTab === 'tab0' ? (
                  <div className='advertise__signup' onClick={() => handleClickBind()}>
                    <img src={imgConfig.bind} />
                  </div>
                ) : (
                  <div className='advertise__signup' onClick={() => handleClickSignUp()}>
                    <img src={imgConfig.signup} />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        <Modal
          visible={KOLPopImgVisible}
          transparent
          maskClosable={false}
          onClose={() => {
            setVisibleSuccess(false)
          }}
          title={null}
          footer={[]}
        >
          <div className='modelKOLImg'>
            <div
              onClick={() => {
                toClient(KOLPopImgInfo?.userId || '')
              }}
            >
              <img src={KOLPopImgInfo?.img || ''} />
            </div>
            <div
              className='modelKOLImg__btn'
              onClick={() => {
                setKOLPopImgVisible(false)
              }}
            >
              <Icon type='cross' size='lg' />
            </div>
          </div>
        </Modal>

        <Modal
          visible={visibleSuccess}
          transparent
          maskClosable={false}
          onClose={() => {
            setVisibleSuccess(false)
          }}
          title={null}
          footer={[]}
        >
          <div className='modelSuccess'>
            <div
              className='modelSuccess__btn'
              onClick={() => {
                handleGetEventCarnival()
                setVisibleSuccess(false)
                collectEvent('WebClick', {
                  ...common,
                  element_content: '确认',
                })
                bluedCollectEvent({
                  name: BLUED_COLLECT_EVENT.确认,
                })
              }}
            ></div>
          </div>
        </Modal>
        <Modal
          visible={visible}
          transparent
          maskClosable={false}
          onClose={() => {
            setVisible(false)
          }}
          title={null}
          footer={[]}
        >
          <div className='model'>
            <div className='model__inputT'>
              <InputItem
                type='text'
                clear
                onChange={(v) => {
                  setUserName(v)
                  console.log('onChange', v)
                }}
                moneyKeyboardAlign='left'
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              ></InputItem>
            </div>

            <div className='model__inputB'>
              <InputItem
                type='phone'
                onChange={(v) => {
                  setMobile(v)
                  console.log('onChange', v)
                }}
              ></InputItem>
            </div>
            <div className='model__btn'>
              <span
                onClick={() => {
                  setVisible(false)
                  collectEvent('WebClick', {
                    ...common,
                    element_content: '关闭',
                  })

                  bluedCollectEvent({
                    name: BLUED_COLLECT_EVENT.关闭,
                  })
                }}
              ></span>
              <span
                className='model__btn-r'
                onClick={() => {
                  handleStarDetective()
                }}
              ></span>
            </div>
          </div>
        </Modal>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
