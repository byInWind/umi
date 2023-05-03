import React from 'react'

const datas = [
  { name: '综艺排行榜', value: '综艺津贴' },
  { name: 'TOP1', value: '1888元' },
  { name: 'TOP2', value: '888元' },
  { name: 'TOP3', value: '500元' },
]

const VarietyRule = (concurrentMode, imgConfig) => (
  <>
    {concurrentMode === 'num0' && (
      <>
        <div className='advertise__content-titleImg'>
          <img src={imgConfig.title3} />
        </div>
        <div>
          <span>全站主播皆可申报直播综艺节目</span>
        </div>
        <div>
          <span>进入排行榜每周都有机会赢取综艺津贴</span>
        </div>
        <div className='advertise__content-title'>
          <img src={imgConfig.mode} />
          <span>活动时间</span>
        </div>
        <div>报名期：9月6日18:00-10月28日23:59</div>
        <div>排行期：9月13日00:00-11月7日23:59</div>
        <div className='advertise__content-title'>
          <img src={imgConfig.mode} />
          <span>活动规则</span>
        </div>
        <div className='advertise__content-font'>1.报名期间点击报名按键，上传个人信息及节目内容完成报名</div>
        <div className='advertise__content-font'>
          2.每周四23:59前报名的节目，小咔根据节目内容审核入选综艺节目资格，并在每周五18:00更新
          <span>新综艺节目名单</span>
        </div>
        <div className='advertise__content-font'>
          3.入选新综艺名单将在下一个自然周（周一00:00-周日23:59）计入<span>综艺排行榜</span>
        </div>
        <div className='advertise__content-font'>4.排行榜根据每周节目直播间流水从高到低进行排名</div>
        <div className='advertise__content-font'>5.本活动期内，翻咔有权终止、修改或延续本活动</div>
        <div className='advertise__content-font'>6.本活动最终解释权归翻咔直播官方所有</div>
        <div className='advertise__content-weight'>节目审核内容：节目时长、节目环节数量、节目流程、节目类型</div>
      </>
    )}

    {concurrentMode === 'num1' && (
      <>
        <div>每周四根据上周综艺排行榜最终排行发放对接津贴至绑定的银行账户</div>
        <div className='advertise__content-small'>
          (实际到账时间以绑定的银行到账时间为准。下发时将扣除服务费，服务费为津贴的11.72%)
        </div>
        <ul className='advertise__content-grid'>
          {datas.map((item, index) => (
            <li className='advertise__content-grid-li' key={index}>
              <div>{item.name}</div>
              <div>{item.value}</div>
            </li>
          ))}
        </ul>
      </>
    )}
  </>
)

export default VarietyRule
