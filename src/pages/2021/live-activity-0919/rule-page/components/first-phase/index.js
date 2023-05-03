import React from 'react'
import { imgConfig, firsPhaseData } from '../../constants'

const FirstPhase = () => {
  return (
    <div className='rule-box'>
      <div className='rule-box__title'>
        <img src={imgConfig.title1} />
      </div>
      <div className='rule-box__time'>9月19日 12:00 - 9月20日 23:59</div>
      <div className='rule-box__title'>
        <img src={imgConfig.title2} />
      </div>
      <ul className='rule-box__content'>
        <li>
          <span>1. </span>
          <p>主播收集活动礼物【点赞】，满122个直接晋级下一阶段，主播收集【点赞】个数无上限要求；</p>
        </li>
        <li>
          <span>2. </span>
          <p>
            每位观众每天可通过完成指定任务获得免费的【点赞】，具体任务如下:
            <div className='spot_main'>
              <span>·</span> <span>每日登录即可获得3个免费【点赞】（每日上限3个）</span>
            </div>
            <div className='spot_main'>
              <span>·</span> <span>每日首次充值任意金额即可获得10个免费【点赞】（每日上限10个）</span>
            </div>
            <div className='spot_main'>
              <span>·</span> <span>在直播间发言超过10句即可获得5个免费【点赞】（每日上限5个）</span>
            </div>
            <div className='spot_main'>
              <span>·</span>
              <span>在直播间内新关注三位用户即可获得2个免费【点赞】（每日上限2个）</span>
            </div>
            <div className='spot_main'>
              <span>·</span> <span>有效分享一次直播即可获得1个免费【点赞】（每日上限5个）</span>
            </div>
          </p>
        </li>
        <li>
          <span>3. </span>
          <p>主播榜单按照主播收集【点赞】数量由高到低进行排名，榜单取前100名主播进行展示；</p>
        </li>
        <li>
          <span>4. </span>
          <p>
            本阶段晋级主播数量无限制。
            <br />
            本阶段活动专属礼物：【点赞】
          </p>
        </li>
      </ul>
      <div className='rule-box__title'>
        <img src={imgConfig.title3} />
      </div>
      {firsPhaseData.map((item, index) => (
        <div className='reward' key={index}>
          <div className='reward-title' style={{ backgroundImage: 'url(' + imgConfig.rewardicon + ')' }}>
            {item.title}
          </div>
          <div className='reward-content'> {item.content}</div>
          <div className='reward-img'>
            <img src={item.img} />
          </div>
          <div className='reward-name'> {item.name}</div>
        </div>
      ))}
    </div>
  )
}

export default FirstPhase
