import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { imgConfig, secondPhaseListData } from '../../constants'
import 'swiper/css'
import 'swiper/css/navigation'
const SecondPhase = () => {
  return (
    <div className='rule-box'>
      <div className='rule-box__title'>
        <img src={imgConfig.title1} />
      </div>
      <div className='rule-box__time'>
        <img src={imgConfig.time2} />
      </div>
      <div className='rule-box__title'>
        <img src={imgConfig.title2} />
      </div>
      <div className='rule-box__kuang'>
        <div className='topbg'></div>
        <ul className='rule-box__content'>
          <li>
            <span>1、</span>
            <p>
              主播收集活动专属礼物，每满【666】钻石即可成功开启一个勋章，主播通过收集四个不同勋章即可合成一枚徽章，获得10功勋值；
            </p>
          </li>
          <li>
            <span>2、</span>
            <p>当主播功勋值相同时，则按照剩余勋章个数由高到低进行排名；</p>
          </li>
          <li>
            <span>3、</span>
            <p>主播按功勋值进行排名，此阶段功勋值没有达到10的主播将直接淘汰，榜单取前60名主播进行展示；</p>
          </li>
          <li>
            <span>4、</span>
            <p>
              12月07日晚20:00会公布一组幸运排名，在活动截止时排名处于幸运排名上的主播除去正常奖励外，会获得额外加成奖励；
            </p>
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
          <img src={imgConfig.ruleTowIcon1} />
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
          <img src={imgConfig.ruleTowIcon2} />
        </div>
        <ul className='rule-box__content'>
          <li className='top0'>1、晋级奖励</li>
          <li className='top0 pl35'>
            <p>此阶段功勋值达到10晋级的主播，将获得直播间封面挂件至下一赛段，本阶段累计活动收益额外增加2%作为奖励；</p>
          </li>
          <li>2、排名奖励</li>
          <li className='top0 pl35'>
            <p>（1）功勋值排名第一名主播，第三阶段第一轮活动数值增加5000，本阶段累计活动礼物收益额外增加5%作为奖励；</p>
          </li>
          <li className='top0 pl35'>
            <p>
              （2）功勋值排名第二，三名主播，第三阶段第一轮活动数值增加3000，本阶段累计活动礼物收益额外增加4%作为奖励；
            </p>
          </li>
          <li className='top0 pl35'>
            <p>
              （3）功勋值排名第四～十名主播，第三阶段第一轮活动数值增加1000，本阶段累计活动礼物收益额外增加3%作为奖励
            </p>
          </li>
          <li className='top0 pl35'>
            <p>（4）功勋值排名第十一～二十名主播，本阶段累计活动收益额外增加3%作为奖励；</p>
          </li>
          <li>
            注：排名奖励与晋级奖励不叠加，主播奖励按照可获得最高奖励计算；累计收益会在本阶段结束后的五个工作日内自动下发至可提现余额中；
          </li>
        </ul>
        <div className='gift-titel'>
          <img src={imgConfig.giftIcon3} />
        </div>
        {secondPhaseListData.map((item, index) => (
          <div className='reward' key={index}>
            <Swiper autoHeight={true} modules={[Navigation]} navigation>
              {item.list.map((listItem, index) => (
                <SwiperSlide key={index}>
                  <img src={listItem.img} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
        <div className='notes'>（注：观众特权不可转让或赠送）</div>
        <div className='bottombg'></div>
      </div>
    </div>
  )
}

export default SecondPhase
