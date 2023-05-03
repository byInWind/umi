import React from 'react'
import { imgConfig } from '../../constants'

const FirstPhase = () => {
  return (
    <div className='rule-box'>
      <ul className='rule-box__content'>
        <li>
          <span>1、</span>
          <p>礼物栏上线5档价值的红包盲盒</p>
        </li>
        <li>
          <span>2、</span>
          <p>赠送红包盲盒可随机打开对应的礼物特效惊喜</p>
        </li>
        <li>
          <span>3、</span>
          <p>主播收益以红包价值为准</p>
        </li>
        <li>
          <span>4、</span>
          <p>主播和观众均可用礼物特效的积分参与排行榜</p>
        </li>
        <li>
          <span>5、</span>
          <p>活动结束后根据排行可获取对应奖品</p>
        </li>
      </ul>
      <div className='rule-box__img'>
        <img src={imgConfig.ruleOneIcon1} />
      </div>
      <ul className='rule-box__content'>
        <li className='title'>注意事项：</li>
        <li>
          <span>1、</span>
          <p>以上所有榜单奖励在本次活动结束后7个工作日内统计结果，私信通知获奖用户并下发奖励；</p>
        </li>
        <li>
          <span>2、</span>
          <p>活动奖励如有漏发情况,请及时联系客服,我们将在核实后补发； </p>
        </li>
        <li>
          <span>3、</span>
          <p> 主播直播需遵守《翻咔用户协议》和《直播文明公约》，如违反相应条款，平台有权解除相应奖励；</p>
        </li>
        <li>
          <span>4、</span>
          <p>本活动最终解释权归翻咔直播官方所有。</p>
        </li>
      </ul>
    </div>
  )
}

export default FirstPhase
