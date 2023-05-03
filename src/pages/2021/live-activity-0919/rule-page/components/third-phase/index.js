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
      <div className='rule-box__time'>9月25日 12:00 - 9月26日 23:59</div>
      <div className='rule-box__title'>
        <img src={imgConfig.title2} />
      </div>
      <ul className='rule-box__content'>
        <li>
          <span>1. </span>
          <p>第二阶段所有晋级主播在本阶段争夺冠军名额；</p>
        </li>
        <li>
          <span>2. </span>
          <p>所有主播收集活动专属礼物累计Star值，并按照Star值由高至低进行排名；</p>
        </li>
        <li>
          <span>3. </span>
          <p>
            本阶段开启飙升榜主播荣耀加成，活动期间每日20点-23点开启飙升榜，飙升榜开启阶段，每小时榜单前25名主播在下一个小时可以获得Star值BUFF加成。（21，22，23点诞生的飙升榜前25名，在下1小时享受活动数值BUFF加成）
            <br />
            飙升榜第1-3名：Star值1.5倍加成
            <br />
            飙升榜第4-10名：Star值1.3倍加成
            <br />
            飙升榜第11-25名：Star值1.1倍加成
            <br />
            例：主播在19:00-20:00时累计活动收益排名为第十名，20:00-21:00时累计活动收益为第三名，则主播飙升7名，最终会根据所有主播飙升名次进行降序排名，从而获得加成奖励。当主播飙升名次相同时，按照活动累计收益进行优先排名。
          </p>
        </li>
        <li>
          <span>4. </span>
          <p>
            年度主播【大姨二姨】在本阶段以挑战者的身份空降本环节进行挑战
            <br />
            若大姨二姨在本阶段Star值高于最终冠军主播，即可享受年度盛典冠军奖励再加码；大姨二姨本阶段最终排名对本次年度主播的诞生无影响
          </p>
        </li>
        <li>
          <span>5. </span>
          <p>
            6小时，我们共同见证年度主播的诞生。
            <br />
            本阶段活动专属礼物
            <br />
            【点赞】【应援气球】【F炮弹】【钻石雨】【星耀彩虹车】【星绽潘多拉】【真我绽放】
            <br />
            <br />
            1钻石=1Star值
          </p>
        </li>
      </ul>
      <div className='rule-box__title'>
        <img src={imgConfig.title3} />
      </div>
      <div className='reward third-reward'>
        <div className='reward-title' style={{ backgroundImage: 'url(' + imgConfig.rewardicon + ')' }}>
          {thirdPhaseAnchorData[0].title}
        </div>
        <Swiper navigation>
          {thirdPhaseAnchorData[0].list.map((listItem, index) => (
            <SwiperSlide key={index}>
              <img src={listItem.img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='rule-box__wen'>
        若大姨二姨挑战成功：
        <br />
        奖励为：十位观众盛典决赛住宿两晚+最强骑士团亮相盛典红毯+盛典拍摄、真我绽放三场、本次活动礼物指定使用权一年、挑战成功宣传banner5天、全站开播提醒30天、资料页活动头像背景30天、主播专属定制聊天气泡，进场座驾，漂浮座驾20人三十天使用权；
      </div>
      <div className='reward third-reward'>
        <div className='reward-title' style={{ backgroundImage: 'url(' + imgConfig.rewardicon + ')' }}>
          {thirdPhaseAnchorData[1].title}
        </div>
        <Swiper navigation>
          {thirdPhaseAnchorData[1].list.map((listItem, index) => (
            <SwiperSlide key={index}>
              <img src={listItem.img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ThirdPhase
