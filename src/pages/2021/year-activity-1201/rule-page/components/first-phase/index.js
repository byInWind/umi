import React from 'react'
import { imgConfig } from '../../constants'

const FirstPhase = () => {
  return (
    <div className='rule-box'>
      <div className='rule-box__title'>
        <img src={imgConfig.title1} />
      </div>
      <div className='rule-box__time'>
        <img src={imgConfig.time1} />
      </div>
      <div className='rule-box__title'>
        <img src={imgConfig.title2} />
      </div>
      <div className='rule-box__kuang'>
        <div className='topbg'></div>
        <ul className='rule-box__content'>
          <li>
            <span>1、</span>
            <p>盛典开启，主播收集166个【盛典入场券】顺利晋级下一赛段；</p>
          </li>
          <li>
            <span>2、</span>
            <p>
              每位观众每天可通过完成指定任务获得免费的【盛典入场券】，具体任务如下
              <div className='spot_main'>
                <span>- </span> <span>每日登录即可获得2个免费【盛典入场券】（每日上限2个）</span>
              </div>
              <div className='spot_main'>
                <span>- </span> <span>每日首次充值任意金额即可获得5个免费【盛典入场券】（每日上限5个）</span>
              </div>
              <div className='spot_main'>
                <span>- </span> <span>在直播间发言超过10句即可获得3个免费【盛典入场券】（每日上限3个） </span>
              </div>
              <div className='spot_main'>
                <span>- </span>
                <span>有效分享一次直播即可获得1个免费【盛典入场券】（每日上限5个）</span>
              </div>
            </p>
          </li>
          <li>
            <span>3、</span>
            <p>主播榜单按照主播收集【盛典入场券】数量由高到低进行排名，榜单取前80名主播进行展示；</p>
          </li>
          <li>
            <span>4、</span>
            <p>本阶段观众每日赠送主播【盛典入场券】无数量限制；</p>
          </li>
          <li>
            <span>5、</span>
            <p>本阶段晋级主播数量无限制。</p>
          </li>
        </ul>
        <div className='gift-titel'>
          <img src={imgConfig.giftIcon1} />
        </div>
        <div className='card-img'>
          <img src={imgConfig.ruleOneIcon1} />
        </div>
        <div className='bottombg'></div>
      </div>

      <div className='rule-box__title'>
        <img src={imgConfig.title4} />
      </div>
      <div className='rule-box__kuang'>
        <div className='topbg'></div>
        <div className='gift-titel top30'>
          <img src={imgConfig.giftIcon2} />
        </div>
        <div className='card-img'>
          <img src={imgConfig.ruleOneIcon2} />
        </div>
        <ul className='rule-box__content'>
          <li className='top0'>1、晋级奖励</li>
          <li className='top0 pl35'>
            <p>
              成功收集166个【盛典入场券】晋级的主播，将获得直播间封面挂件至下一赛段，本阶段累计活动礼物收益额外增加1%作为奖励；
            </p>
          </li>
          <li>2、排名奖励</li>
          <li className='top0 pl35'>
            <p>
              （1）收集【盛典入场券】排名第1-30名的主播，将获得「万众瞩目」主页勋章15天，本阶段累计活动礼物收益额外增加3%作为奖励；
            </p>
          </li>
          <li className='top0 pl35'>
            <p>
              （2）收集【盛典入场券】排名第31-80名的主播，将获得「万众瞩目」主页勋章7天，本阶段累计活动礼物收益额外增加2%作为奖励；
            </p>
          </li>
          <li>
            注：排名奖励与晋级奖励不叠加，主播奖励按照可获得最高奖励计算；累计收益会在本阶段结束后的五个工作日内自动下发至可提现余额中；
          </li>
        </ul>
        <div className='gift-titel'>
          <img src={imgConfig.giftIcon3} />
        </div>
        <div className='card-img'>
          <img src={imgConfig.ruleOneIcon3} />
        </div>
        <div className='head-wen'>成功送出166个【盛典入场券】（含免费）的观众，将获得「盛典发起人」主页勋章15天；</div>
        <div className='bottombg'></div>
      </div>
    </div>
  )
}

export default FirstPhase
