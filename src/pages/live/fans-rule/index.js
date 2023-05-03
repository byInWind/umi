import React, { useEffect } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { levelList, RuleList } from './constants'
import { getQueryValue, collectEvent, bluedCollectEvent } from '@utils/utils'
import { imgConfig } from '../fans-privilege/constants'

import './index.scss'

const renderLevel = (list) =>
  list.map((item) => (
    <li key={item.level} className='rule__content-box'>
      <span className='rule__content-box--level'>Lv.{item.level}</span>
      <span className='rule__content-box--gift'>
        {item.tip}
        <span>{item.gift}</span>
      </span>
    </li>
  ))

const renderRule = (list) =>
  list.map((item) => (
    <li key={item.level} className='rule__level-box'>
      <span className='rule__level-box--title'>{item.level}</span>
      <span className='rule__level-box--title'>
        <span>{item.score}</span>
      </span>
    </li>
  ))

const config = window.CONFIG || {}

const App = () => {
  const source = getQueryValue('source') || ''
  const anchorId = getQueryValue('anchorId') || ''

  useEffect(() => {
    collectEvent('predefine_pageview', {
      title: '粉丝团规则',
    })

    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: 'ANCHOR_FANS_GROUP_RULE',
    })
  }, [])

  return (
    <div className='wrapper'>
      <Layout>
        <div className='rule'>
          <div className='rule__header-top'>
            <span
              onClick={() => {
                window.location.href =
                  source === 'web' ? `/hd/live/fans-privilege?anchorId=${anchorId}` : 'finka2020://webview/close'
              }}
            >
              <img src={imgConfig.back} />
            </span>
            <span className='rule__header-top--level'>粉丝团规则</span>
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>什么是粉丝团</span>
          </div>
          <div className='rule__content'>
            粉丝团是主播和粉丝共同组成的真爱团体，是见证主播和粉丝关系的重要功能，加入主播粉丝团将会收到主播的更多关注
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>加入粉丝团规则</span>
          </div>
          <div className='rule__content'>
            赠送主播一个“粉丝灯牌”礼物即可加入该主播粉丝团，观众可以加入任意粉丝团，不设上限
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>粉丝团成员升降级规则</span>
          </div>
          <div className='rule__content'>
            1. 粉丝团成员完成任务即可获得相应积分 <br />
            2. 粉丝赠送主播礼物时，可获得相应积分，1钻石=1积分 <br />
            3.
            若连续3天无亲密值提升，第4天开始粉丝团勋章将会熄灭，勋章熄灭后亲密值每天下降当前等级升至下一级所需亲密值的10%，下降至0亲密度时不再进行扣除，赠送粉丝灯牌或开启自动点亮功能可恢复当前粉丝团等级特权
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>粉丝团特权级奖励</span>
          </div>
          <div className='rule__content'>
            <ul className='rule__content-list'>
              <li className='rule__content-box'>
                <span className='rule__content-box--level'>Lv.1</span>
                <span className='rule__content-box--gift-first'>
                  解锁粉丝团<span>专属聊天气泡</span>
                  <br />
                  解锁粉丝团专属礼物<span>【粉丝团灯牌】</span>
                </span>
              </li>
              {renderLevel(levelList)}
            </ul>
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>用户每日亲密值上限规则</span>
          </div>
          <div className='rule__level'>
            <ul className='rule__level-list'>
              <li className='rule__level-box'>
                <span className='rule__level-box--title' style={{ fontWeight: 'bold' }}>
                  粉丝团成员等级
                </span>
                <span className='rule__level-box--title' style={{ fontWeight: 'bold' }}>
                  每日亲密值上限
                </span>
              </li>
              {renderRule(RuleList)}
            </ul>
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>主播开通粉丝团规则</span>
          </div>
          <div className='rule__content'>
            开通主播权限后会自动获得以自己为团长的粉丝团，每个主播拥有一个粉丝团，暂不支持解散粉丝团
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>粉丝团命名规则</span>
          </div>
          <div className='rule__content'>
            “主播昵称”的粉丝团为默认团名，团长90天可修改一次。团名会经过人工审核，不可包含涉黄、涉政等敏感词汇，不可使用官方名词
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>退出粉丝团规则</span>
          </div>
          <div className='rule__content'>
            用户可随时退出主播粉丝团，若退出主播的粉丝团则取消在该主播直播间的全部粉丝团特权
          </div>
          <div className='rule__title'>
            <span className='rule__title-tip'></span>
            <span className='rule__title-name'>主播停播规则</span>
          </div>
          <div className='rule__content'>
            如果主播注销或被封禁，平台有权停止向用户继续提供该主播的粉丝团服务，自动点亮服务将会关闭
          </div>
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
