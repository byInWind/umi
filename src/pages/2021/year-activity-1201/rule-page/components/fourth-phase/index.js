import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imgConfig, fourthPhaseAnchorData } from '../../constants'
import 'swiper/css'
import 'swiper/css/navigation'
const FourthPhase = () => {
  return (
    <div className='rule-box'>
      <div className='rule-box__title'>
        <img src={imgConfig.title1} />
      </div>
      <div className='rule-box__time'>
        <img src={imgConfig.time4} />
      </div>
      <div className='rule-box__title'>
        <img src={imgConfig.title2} />
      </div>
      <div className='rule-box__kuang'>
        <div className='topbg'></div>
        <ul className='rule-box__content'>
          <li>
            <span>1、</span>
            <p>主播按照晋级阶段的专属钻石数*0.3作为本阶段的初始巅峰值；</p>
          </li>
          <li>
            <span>2、</span>
            <p>主播收集活动专属礼物，积累巅峰值进行排名，10钻石=1巅峰值；</p>
          </li>
          <li>
            <span>3、</span>
            <p>
              主播收集人气礼物专属礼物进行数量统计，最终按照主播收集人气专属礼物个数由高到低进行排名，最终角逐出人气主播个人奖一名；
            </p>
          </li>
          <li>
            <span>4、</span>
            <p>最终榜单将会决出冠、亚、季军三名主播和人气主播个人奖一名；</p>
          </li>
          <li>
            <span>5、</span>
            <p>当人气主播个人奖和冠亚季军出现重合时，按照最高奖励进行发放，人气主播个人奖按照排序顺延。</p>
          </li>
        </ul>
        <div className='gift-titel'>
          <img src={imgConfig.giftIcon1} />
        </div>
        <div className='card-img'>
          <img src={imgConfig.ruleFourthIcon1} />
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
        <Swiper autoHeight={true} navigation>
          {fourthPhaseAnchorData[0].list.map((listItem, index) => (
            <SwiperSlide key={index}>
              <img src={listItem.img} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ul className='rule-box__content'>
          <li>1、冠军主播:</li>
          <li className='top0 pl35'>
            <p>
              全站首次开播广播90天、「年度盛典冠军主播」主页勋章365天、冠军专属主页头像框365天、冠军专属直播封面365天、本阶段累计活动收益额外增加5%作为奖励、本阶段累计活动礼物收益钻石的7%返还给主播由主播自由分配给给任意十名观众；
            </p>
          </li>
          <li>2、亚军主播:</li>
          <li className='top0 pl35'>
            <p>
              全站首次开播广播60天、「年度盛典亚军主播」主页勋章365天、主页头像框365天、亚军专属直播封面365天、本阶段累计活动收益额外增加4%作为奖励、本阶段累计活动礼物收益钻石的5%返还给主播由主播自由分配给给任意十名观众；
            </p>
          </li>
          <li>3、季军主播:</li>
          <li className='top0 pl35'>
            <p>
              全站首次开播广播30天、「年度盛典季军主播」主页勋章365天、主页头像框365天、季军专属直播封面365天、本阶段累计活动收益额外增加3%作为奖励、本阶段累计活动礼物收益钻石的3%返还给主播由主播自由分配给给任意十名观众；
            </p>
          </li>
          <li>4、人气主播:</li>
          <li className='top0 pl35'>
            <p>
              全站首次开播广播15天、「年度盛典人气主播」主页勋章365天、主页头像框365天、本阶段累计活动收益额外增加1%作为奖励、本阶段累计活动礼物收益钻石的1%返还给主播由主播自由分配给给任意十名观众；
            </p>
          </li>
          <li>
            注：累计收益奖励会在本阶段结束后的五个工作日内自动下发至主播可提现余额中；主播自由分配钻石会在年度盛典结束后的10个工作日内进行统计和下发至主播提供的观众名单内，观众获得返钻后有效使用期为30天，30天后未使用部分会自动清空。
          </li>
        </ul>
        <div className='gift-titel'>
          <img src={imgConfig.giftIcon3} />
        </div>
        <Swiper autoHeight={true} navigation>
          {fourthPhaseAnchorData[1].list.map((listItem, index) => (
            <SwiperSlide key={index}>
              <img src={listItem.img} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='notes'>（注：观众特权不可转让或赠送）</div>
        <Swiper autoHeight={true} navigation>
          {fourthPhaseAnchorData[2].list.map((listItem, index) => (
            <SwiperSlide key={index}>
              <img src={listItem.img} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='notes'>（注：观众特权不可转让或赠送）</div>
        <div className='bottombg'></div>
      </div>
    </div>
  )
}

export default FourthPhase
