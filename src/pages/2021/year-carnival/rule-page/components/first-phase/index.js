import React from 'react'
import { imgConfig } from '../../constants'

const FirstPhase = () => {
  return (
    <div className='rule-box'>
      <div className='rule-box__title'>
        <img src={imgConfig.title1} />
      </div>
      <div className='rule-box__kuang'>
        <div className='topbg'></div>
        <ul className='rule-box__content'>
          <li>
            <span>1、</span>
            <p>活动期间所有非2022年年度主播均可参加本次狂欢活动；</p>
          </li>
          <li>
            <span>2、</span>
            <p>主播收集年度盛典活动专属礼物累积活动值，1钻石=1狂欢值；</p>
          </li>
          <li>
            <span>3、</span>
            <p>主播按狂欢值进行排名，榜单取前15名主播进行展示；</p>
          </li>
          <li>
            <span>4、</span>
            <p>最终前十名主播将会获得活动奖励</p>
          </li>
        </ul>

        <div className='gift-titel'>
          <img src={imgConfig.title3} />
        </div>
        <div className='card-img'>
          <img src={imgConfig.ruleThreeIcon1} />
        </div>
        <div className='gift-titel'>
          <img src={imgConfig.title4} />
        </div>
        <ul className='rule-box__content'>
          <li>
            <span>1、</span>
            <p>排名第一名主播，活动期间累计活动收益额外增加5%作为奖励，主播推荐一次；</p>
          </li>
          <li>
            <span>2、</span>
            <p>排名第二～三名主播，活动期间累计活动收益额外增加3%作为奖励；</p>
          </li>
          <li>
            <span>3、</span>
            <p>排名第四～十名主播，活动期间累计活动收益额外增加1%作为奖励；</p>
          </li>
          <li>
            <p>注：累计收益奖励会在本活动结束后的五个工作日内自动下发至主播可提现余额内；</p>
          </li>
        </ul>
        <div className='bottombg'></div>
      </div>
    </div>
  )
}

export default FirstPhase
