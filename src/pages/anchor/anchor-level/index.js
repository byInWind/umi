import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Tabs, Toast } from 'antd-mobile'
import Qs from 'qs'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'

import MyTask from './components/my-task'
import TemplateItem from './components/template-item'
import TemplateList from './components/template-list'
import RankMedal from './components/rank-medal'
import LiveProp from './components/live-prop'
import HotCard from './components/hot-card'

import { tabs, privilegeItem, imgConfig } from './constants'

import './index.scss'
const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const userInfo = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [title, setTitle] = useState('') // 特权标题
  const [footerVisible, setFooterVisible] = useState(true) // 我的特权是否显示
  const [privilegeVisible, setrivilegeVisible] = useState(true) // 我的特权是否显示
  const [templateItemVisible, setTemplateItemVisible] = useState(false) // 单个特权组件是否显示
  const [templateListVisible, setTemplateListVisible] = useState(false) // 列表特权组件是否显示
  const [livePropVisible, setLivePropVisible] = useState(false) // 直播道具是否显示
  const [hotCardVisible, setHotCardVisible] = useState(false) // 热门推荐是否显示
  const [rankMedalVisible, setRankMedalVisible] = useState(false) // 等级勋章是否显示
  const [privilege, setPrivilege] = useState() // 我的特权列表数据
  const [singleItem, setSingleItem] = useState({}) // 超级曝光、直播封面徽章、升级全站广播单个数据
  const [templateListDate, setTemplateListDate] = useState([]) // 列表特权组件数据
  const [rankMedalData, setRankMedalData] = useState([]) // 列表特权组件数据
  const [livePropDate, setlivePropDate] = useState([]) // 直播道具组件数据
  const [hotCardDate, setHotCardDate] = useState([]) // 推荐热门卡片数据
  const [missionInfoData, setMissionInfoData] = useState({}) // 我的任务数据

  const handleClickPrivilepe = (item) => {
    if (item.privilegesType === 2) {
      //专属头像框
      loadingShow()
      getTemplateList(item)
      initWebClick({ title: '主播特权', content: '专属头像框' })
    } else if (item.privilegesType === 1) {
      //等级徽章
      loadingShow()
      getBadgeList(item)
      initWebClick({ title: '主播特权', content: '等级勋章' })
    } else if (item.privilegesType === 3) {
      // 装饰贴纸
      loadingShow()
      getTemplateList(item)
      initWebClick({ title: '主播特权', content: '装饰贴纸' })
    } else if (item.privilegesType === 4) {
      // 新星主播
      setSingleItem(privilegeItem[0])
      handlePrivilepe(item.privilegesName)
      initWebClick({ title: '主播特权', content: '新星主播' })
    } else if (item.privilegesType === 5) {
      // 专属礼物
      loadingShow()
      getTemplateList(item)
      initWebClick({ title: '主播特权', content: '专属礼物' })
    } else if (item.privilegesType === 6) {
      // 热门推荐卡
      loadingShow()
      getHotCardList(item)
      initWebClick({ title: '主播特权', content: '热门推荐卡' })
    } else if (item.privilegesType === 7) {
      // 直播封面徽章
      loadingShow()
      getTemplateList(item)
      initWebClick({ title: '主播特权', content: '直播封面徽章' })
    } else if (item.privilegesType === 8) {
      // 升级全站广播
      setSingleItem(privilegeItem[1])
      handlePrivilepe(item.privilegesName)
      initWebClick({ title: '主播特权', content: '升级全站广播' })
    } else if (item.privilegesType === 9) {
      // 开播全站广播
      loadingShow()
      getlivePropList(item)
      initWebClick({ title: '主播特权', content: '开播全站广播' })
    }
  }

  const handlePrivilepe = (name) => {
    setTitle(name)
    setrivilegeVisible(false)
    setTemplateItemVisible(true)
    Toast.hide()
  }

  const handleTemplateList = (name) => {
    setTitle(name)
    setrivilegeVisible(false)
    setTemplateListVisible(true)
    Toast.hide()
  }

  const handleLivePropList = (name) => {
    setTitle(name)
    setrivilegeVisible(false)
    setLivePropVisible(true)
    Toast.hide()
  }

  const resetLivePropList = (itme) => {
    getlivePropList(itme)
  }

  const resetHotCardList = (itme) => {
    getHotCardList(itme)
  }

  const loadingShow = () => {
    Toast.loading('Loading...', 60 * 10)
  }

  const handleFooterVisible = (item) => {
    if (item.sub === '1') {
      setFooterVisible(true)
      initPageView('主播任务')
    } else {
      setFooterVisible(false)
      initPageView('主播特权')
    }
  }

  // 我的特权列表数据
  const getPrivilegeList = () => {
    fetch(`/api/anchor/myPrerogative/list?userId=${userInfo?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setPrivilege(data.lightenPrivileges)
      })
  }

  // 我的任务列表数据
  const getMissionInfo = () => {
    fetch(`/api/anchor/myMission/info?userId=${userInfo?.userId || ''}&liveShowId=${userInfo?.liveShowId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setMissionInfoData(data.anchorTaskInfo)
        Toast.hide()
      })
  }

  // 等级徽章列表数据
  const getBadgeList = (item) => {
    fetch(`/api/anchor/badge/list?userId=${userInfo?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setRankMedalData(data.anchorLightenBadge)
        setTitle(item.privilegesName)
        setrivilegeVisible(false)
        setRankMedalVisible(true)
        Toast.hide()
      })
  }

  // 公共组件列表接口
  const getTemplateList = (item) => {
    fetch(`/api/anchor/template/list?userId=${userInfo?.userId || ''}&privilegeType=${item.privilegesType}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setTemplateListDate(data.lightenChildPrivilege)
        handleTemplateList(item.privilegesName)
      })
  }

  // 全站广播列表接口
  const getlivePropList = (item) => {
    fetch(`/api/anchor/liveProp/list?userId=${userInfo?.userId || ''}&privilegeType=${item.privilegesType}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setlivePropDate(data.propCardList)
        handleLivePropList(item.privilegesName)
      })
  }

  // 推荐热门卡列表接口
  const getHotCardList = (item) => {
    fetch(`/api/anchor/hotCard/list?userId=${userInfo?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setHotCardDate(data.propCardList)
        setTitle(item.privilegesName)
        setrivilegeVisible(false)
        setHotCardVisible(true)
        Toast.hide()
      })
  }

  // 初始化埋点
  const initPageView = (title) => {
    collectEvent('predefine_pageview', {
      title: title,
    })
  }

  // 点击埋点
  const initWebClick = (item) => {
    collectEvent('WebClick', {
      title: item.title,
      element_content: item.content,
    })
  }

  const footerFun = () => {
    return (
      <div className={`${footerVisible ? 'show' : 'hide'} task-footer`}>
        <div className='task-footer__box'>
          <img src={imgConfig.exp} className='task-footer__img' />
          <div className='task-footer__content'>
            <p>
              专属礼物经验：
              <span>{missionInfoData.exclusiveGiftIncome}</span>
            </p>
            <p>
              本场收益经验：
              <span>{missionInfoData.liveIncome}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    loadingShow()
    getPrivilegeList()
    getMissionInfo()
    initPageView('主播任务')
  }, [])

  return (
    <div className='tabs-main'>
      <Layout>
        <Tabs
          tabs={tabs}
          initialPage={0}
          swipeable={false}
          onTabClick={(item) => {
            handleFooterVisible(item)
          }}
          tabBarBackgroundColor=''
        >
          <MyTask missionInfoData={missionInfoData} />

          <div className='privilege'>
            <div className={`${privilegeVisible ? 'show' : 'hide'} privilege-list`}>
              {privilege?.map((item, index) => (
                <div
                  className='privilege-item'
                  key={index}
                  onClick={item.isLight === 1 ? () => handleClickPrivilepe(item) : null}
                >
                  <img src={item.url} className={`privilege-item__img ${item.isLight === 0 ? 'gray' : ''}`} />
                  <p className='privilege-item__name'>{item.privilegesName}</p>
                </div>
              ))}
            </div>
            <div className={`${templateItemVisible ? 'show' : 'hide'} privilege-list`}>
              <TemplateItem
                singleItem={singleItem}
                title={title}
                setTemplateItemVisible={setTemplateItemVisible}
                setrivilegeVisible={setrivilegeVisible}
              />
            </div>
            <div className={`${templateListVisible ? 'show' : 'hide'} privilege-list`}>
              <TemplateList
                templateListDate={templateListDate}
                title={title}
                setTemplateListVisible={setTemplateListVisible}
                setrivilegeVisible={setrivilegeVisible}
              />
            </div>
            <div className={`${rankMedalVisible ? 'show' : 'hide'} privilege-list`}>
              <RankMedal
                rankMedalData={rankMedalData}
                title={title}
                setRankMedalVisible={setRankMedalVisible}
                setrivilegeVisible={setrivilegeVisible}
              />
            </div>
            <div className={`${livePropVisible ? 'show' : 'hide'} privilege-list`}>
              <LiveProp
                livePropDate={livePropDate}
                title={title}
                setLivePropVisible={setLivePropVisible}
                setrivilegeVisible={setrivilegeVisible}
                resetLivePropList={resetLivePropList}
                userInfo={userInfo}
              />
            </div>
            <div className={`${hotCardVisible ? 'show' : 'hide'} privilege-list`}>
              <HotCard
                hotCardDate={hotCardDate}
                title={title}
                setHotCardVisible={setHotCardVisible}
                setrivilegeVisible={setrivilegeVisible}
                resetHotCardList={resetHotCardList}
                userInfo={userInfo}
              />
            </div>
          </div>
        </Tabs>
        {footerFun()}
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
