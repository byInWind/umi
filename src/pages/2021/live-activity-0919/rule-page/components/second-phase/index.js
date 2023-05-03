import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { imgConfig, secondPhaseData, secondPhaseListData } from '../../constants'
import 'swiper/css'
import 'swiper/css/navigation'
const SecondPhase = () => {
  return (
    <div className='rule-box'>
      <div className='rule-box__title'>
        <img src={imgConfig.title1} />
      </div>
      <div className='rule-box__time'>9月21日 12:00 - 9月24日 23:59</div>
      <div className='rule-box__title'>
        <img src={imgConfig.title2} />
      </div>
      <ul className='rule-box__content'>
        <li>
          <span>1. </span>
          <p>
            本阶段开启三个普通赛道和一个人气赛道，【吉他】【化妆镜】【麦克风】【花束】礼物
            分别对应【才艺赛道】【颜值赛道】【魔音赛道】三大赛道和人气赛道；
          </p>
        </li>
        <li>
          <span>2. </span>
          <p>
            主播收集赛道礼物，按最高赛道礼物数值选定对应榜单；累计收集活动礼物获得Star值由高到低在该赛道榜单进行排序；
          </p>
        </li>
        <li>
          <span>3. </span>
          <p>
            赛道更换：主播只需要新赛道对应礼物数超过原赛道礼物数即可，累计活动礼物所获得的Star值不清空重新计入新榜单；
          </p>
        </li>
        <li className='mt10'>
          <p>
            <img src={imgConfig.tableImg1} />
          </p>
        </li>
        <li className='p5'>单笔充值钻石数对应【花束】数量如下：</li>
        <li className='mb10'>
          <p>
            <img src={imgConfig.tableImg2} />
          </p>
        </li>
        <li>
          <span>4. </span>
          <p>人气赛道专属赛道礼物获得方式</p>
        </li>
        <li>
          <span>5. </span>
          <p>
            赛道淘汰：
            <br />
            三大赛道：将累计榜单下所有主播的Star值计算总数，最终确定榜单排名并进行淘汰：总数第一赛道，榜单十五名主播全部晋级，前十名主播获得奖励
            <br />
            总数第二赛道，榜单展示末尾3人淘汰；一，二，三名获得奖励
            <br />
            总数第三赛道，榜单展示末尾5人淘汰；一，二，三名获得奖励
            <br />
            人气赛道：
            <br />
            前五名主播晋级下一阶段；一，二，三名获得奖励
            <br />
            <br />
            本阶段活动专属礼物
            <br />
            【点赞】【吉他】【化妆镜】【麦克风】【花束】 【应援气球】【F炮弹】【钻石雨】【星耀彩虹车】【星绽潘多拉】
            <br />
            1钻石=1Star值
          </p>
        </li>
      </ul>
      <div className='rule-box__title'>
        <img src={imgConfig.title3} />
      </div>
      {secondPhaseListData.map((item, index) => (
        <div className='reward' key={index}>
          <div className='reward-title' style={{ backgroundImage: 'url(' + imgConfig.rewardicon + ')' }}>
            {item.title}
          </div>
          <Swiper modules={[Navigation]} navigation>
            {item.list.map((listItem, index) => (
              <SwiperSlide key={index}>
                <img src={listItem.img} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
      {secondPhaseData.map((item, index) => (
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

export default SecondPhase
