import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imgConfig, thirdPhaseAnchorData } from '../../constants'
import 'swiper/css'
import 'swiper/css/navigation'
const ThirdPhase = () => {
  return (
    <div className='rule-box'>
      <div className='rule-box__title'>
        <img src={imgConfig.title1} />
      </div>
      <div className='rule-box__time'>
        <img src={imgConfig.time3} />
      </div>
      <div className='rule-box__title'>
        <img src={imgConfig.title2} />
      </div>
      <div className='rule-box__kuang'>
        <div className='topbg'></div>
        <ul className='rule-box__content'>
          <li>
            <span>1、</span>
            <p>主播收集活动专属礼物累积巅峰值，10钻石=1巅峰值；</p>
          </li>
          <li>
            <span>2、</span>
            <p>
              本阶段开启小时榜主播荣耀加成，本阶段每晚20点-23点开启小时榜，小时榜开启阶段，每小时榜单前5名主播在下一个小时可以获得巅峰值BUFF加成。（21，22，23点诞生的小时榜前5名，在下1小时享受巅峰值BUFF加成）
              <br />
              小时榜第1名：巅峰值1.5倍加成
              <br />
              小时榜第2-3名：巅峰值1.3倍加成
              <br />
              小时榜第4-5名：巅峰值1.1倍加成
            </p>
          </li>
          <li>
            <span>3、</span>
            <p>
              本赛段分为3轮，分别为4、3、2天，每轮间隔1天：
              <br />
              第一轮（12月09日00:00～12月12日23:59）
              <br />
              第二轮（12月14日00:00～12月16日23:59）
              <br />
              第三轮（12月18日00:00～12月19日23:59）
            </p>
          </li>
          <li>
            <span>4、</span>
            <p>第一轮结束，未晋级主播巅峰值乘以0.3计入第二轮；第二轮结束，未晋级主播巅峰值乘以0.2计入第三轮；</p>
          </li>
          <li>
            <span>5、</span>
            <p>
              当主播累计收集活动专属礼物满11111钻石时可以开启一个宝箱，直播间内观众摇一摇，可获得直播间专属特权，最高可获得30天进场动画使用权，特权获得天数可以叠加；
            </p>
          </li>
          <li>
            <span>6、</span>
            <p>
              本赛段将直接选拔10位年度主播晋级总决赛，第一轮3名、第二轮3名、第三轮4名； <br />
              《逐梦星光岛》冠军——【大姨二姨】 <br />
              《F-Star C位争夺战》冠军——【由甲&露西】 <br />
              占据2席直通名额，故其他主播争夺剩余8个席位；
            </p>
          </li>
          <li>
            <span>7、</span>
            <p>主播在每一轮比赛皆按照巅峰值由高到低进行排名；</p>
          </li>
          <li>
            <span>8、</span>
            <p>本阶段成功晋级决赛主播在该阶段收获的活动专属礼物钻石数×0.3直接计入【冠军加冕夜】做为初始巅峰值；</p>
          </li>
          <li>
            <span>9、</span>
            <p>11月01日后临时组合的主播在本阶段晋级，晋级奖励按单人进行发放；盛典期间环节均为晋级账号拥有者所有；</p>
          </li>
          <li>⁣⁣注：临时组合指组合内任意一位主播在11月1日之前无其他直播账号累积直播时长大于等于二十小时。</li>
        </ul>
        <div className='gift-titel'>
          <img src={imgConfig.giftIcon1} />
        </div>
        <div className='card-img'>
          <img src={imgConfig.ruleThreeIcon1} />
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
          {thirdPhaseAnchorData[0].list.map((listItem, index) => (
            <SwiperSlide key={index}>
              <img src={listItem.img} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ul className='rule-box__content'>
          <li>
            <span>1、</span>
            <p>
              第一轮3位：全站首次开播广播30天，「年度主播」主页勋章365天，主页头像框90天，本轮累计活动收益额外增加5%作为奖励，本轮累计活动礼物收益钻石的5%返还给主播由主播自由分配给给任意十名观众；
            </p>
          </li>
          <li>
            <span>2、</span>
            <p>
              第二轮3位：全站首次开播广播15天，「年度主播」主页勋章180天，主页头像框60天，本轮累计活动收益额外增加3%作为奖励，本轮累计活动礼物收益钻石的4%返还给主播由主播自由分配给任意十名观众；
            </p>
          </li>
          <li>
            <span>3、</span>
            <p>
              第三轮4位：全站首次开播广播7天，「年度主播」主页勋章90天，主页头像框30天，本轮累计活动收益额外增加1%作为奖励，本轮累计活动礼物收益钻石的3%返还给主播由主播自由分配给任意十名观众；
            </p>
          </li>
        </ul>
        <div className='gift-titel top30'>
          <img src={imgConfig.giftIcon4} />
        </div>
        <div className='rule-box__wen'>
          <span>大姨二姨、由甲&露西</span>
          年度盛典前哨站：《逐梦星光岛》《F-Star C位争夺战》冠军
          <br />
          额外奖励： <br />
          以上两位主播在本阶段参加比赛并抢位成功，除去原有奖励；第一轮占位成功冠军加冕夜初始巅峰值额外增加10000，本轮累计活动礼物收益钻石返还额外增加4%作为奖励；第二轮占位成功冠军加冕夜初始巅峰值额外增加5000；本轮累计活动礼物收益钻石返还额外增加2%作为奖励。
          <br /> <br />
          注：累积收益奖励仅计算主播晋级成为年度主播所在轮累积活动收益奖励，主播晋级后累积收入不计入累计收益奖励中，如主播在第二轮晋级年度主播，则只计算主播在第二轮活动时间内（12月14日00:00～12月16日23:59）的累积活动收益作为奖励基数，累计收益奖励会在本阶段结束后的五个工作日内自动下发至可提现余额中；
          <br />
          主播自由分配钻石会在年度盛典结束后的10个工作日内进行统计和下发至主播提供的观众名单内，观众获得返钻后有效使用期为30天，30天后未使用部分会自动清空。
        </div>
        <div className='gift-titel'>
          <img src={imgConfig.giftIcon3} />
        </div>
        <Swiper autoHeight={true} navigation>
          {thirdPhaseAnchorData[1].list.map((listItem, index) => (
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

export default ThirdPhase
