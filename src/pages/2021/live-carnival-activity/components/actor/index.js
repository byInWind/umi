import React from 'react'

const datas = [
  // { name: '被招募主播完成任务', value: '星探佣金（每周）奖励不累计，以最高奖励下发' },
  { name: '基础任务：周开播时长满12小时且直播天数≥3天', value: '100元' },
  { name: '完成基础任务，周流水≥1500元', value: '200元' },
  { name: '完成基础任务，周流水≥5000元', value: '300元' },
  { name: '完成基础任务，周流水≥10000元', value: '500元' },
]

const Actor = (concurrentMode, imgConfig) => (
  <>
    {concurrentMode === 'num0' && (
      <>
        <div className='advertise__content-titleImg'>
          <img src={imgConfig.title1} />
        </div>
        <div>
          <span>活动期间翻咔全站主播+用户皆可成为星探进行主播招募</span>
        </div>
        <div>招募目标:</div>
        <div>①未在翻咔直播过的用户</div>
        <div>
          ②<span>90天</span>以上未在翻咔直播的主播
        </div>
        <div>
          招募的主播每周完成阶梯直播任务，其<span>星探可获对应佣金</span>（至活动结束最后一周）
        </div>
        <div className='advertise__content-title'>
          <img src={imgConfig.mode} />
          <span>活动时间</span>
        </div>
        <div>报名期：9月6日18:00-10月31日23:59</div>
        <div>绑定期：9月13日00:00-11月7日23:59</div>
        <div className='advertise__content-title'>
          <img src={imgConfig.mode} />
          <span>活动规则</span>
        </div>
        <div className='advertise__content-font'>
          1.报名期点击下方报名按键，输入绑定主播信息。符合招募要求的主播会收到确认绑定私信，24小时内点击确认最终绑定成功，超时未确认则绑定失败。
        </div>
        <div className='advertise__content-font'>
          2.<span>招募的新主播需开通直播权限后才能绑定 (开通后请在绑定成功后再开启直播，否则绑定失败)</span>
        </div>
        <div className='advertise__content-font'>3.小咔会以主播的直播注册身份证信息为依据，判断是否符合招募目标</div>
        <div className='advertise__content-font'>
          4.每周日23:59前绑定成功的主播将在下一个自然周（周一00:00-周日23:59）开始统计招募任务完成进度
        </div>
        <div className='advertise__content-font'>5.每位招募主播只可绑定一位星探，绑定后不可更换</div>
        <div className='advertise__content-font'>
          6.活动期间出现挂播、多平台同时直播及违规直播等行为将取消该主播后续奖励及活动资格（官方私信通知为主）
        </div>
        <div className='advertise__content-font'>7.本活动期内，翻咔有权终止、修改或延续本活动</div>
        <div className='advertise__content-font'>8.本活动最终解释权归翻咔直播官方所有</div>
      </>
    )}

    {concurrentMode === 'num1' && (
      <>
        <div>请星探提前开通直播权限绑定身份证信息及银行卡用于佣金下发</div>
        <div>每周四根据绑定主播阶梯任务完成情况自动下发星探上周佣金至绑定的银行账户</div>
        <div className='advertise__content-small'>
          (实际到账时间以绑定的银行到账时间为准。下发时将扣除服务费，服务费为佣金的11.72%)
        </div>
        <ul className='advertise__content-grid'>
          <li className='advertise__content-grid-li' key={9}>
            <div>被招募主播完成任务</div>
            <div className='advertise__content-grid-tip'>
              <span>星探佣金（每周）</span>
              <span>奖励不累计，以最高奖励下发</span>
            </div>
          </li>
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

export default Actor
