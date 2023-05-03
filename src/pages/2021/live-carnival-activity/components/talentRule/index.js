import React from 'react'

const TalentRule = (concurrentMode, imgConfig) => (
  <>
    {concurrentMode === 'num0' && (
      <>
        <div className='advertise__content-titleImg'>
          <img src={imgConfig.title2} />
        </div>
        <div>
          <span>来翻咔直播才艺每周500元津贴等你来拿！</span>
        </div>
        <div className='advertise__content-title'>
          <img src={imgConfig.mode} />
          <span>活动时间</span>
        </div>
        <div>报名期：9月6日18:00-10月28日23:59</div>
        <div>活动期：9月13日00:00-11月7日23:59</div>
        <div className='advertise__content-title'>
          <img src={imgConfig.mode} />
          <span>活动规则</span>
        </div>
        <div className='advertise__content-font'>1.招募对象：在2021年1月1日00:00之后开通直播权限的主播</div>
        <div className='advertise__content-font'>2.报名期间点击报名按键，上传个人信息完成报名</div>
        <div className='advertise__content-font'>
          3.每周四23:59前报名的主播小咔根据报名信息审核<span>入选才艺新秀</span>
          主播资格，并在每周五18:00上传至入选才艺新秀并获得才艺新秀标识
        </div>
        <div className='advertise__content-font'>
          4.入选才艺新秀主播将在下一个自然周（周一00:00-周日23:59）进入才艺新秀排行榜。
        </div>
        <div className='advertise__content-font'>
          5.才艺新秀排行榜主播按<span>申领条件</span>直播即可获取<span>500元津贴</span>
        </div>
        <div className='advertise__content-font'>
          6.活动期间出现挂播、多平台同时直播及违规直播等行为将取消该主播后续奖励及活动资格（官方私信通知为主）
        </div>
        <div className='advertise__content-font'>
          7.小咔会在每周四根据主播直播表现进行淘汰并挑选优秀报名主播计入新才艺主播列表
        </div>
        <div className='advertise__content-font'>8.本活动期内，翻咔有权终止、修改或延续本活动</div>
        <div className='advertise__content-font'>9.本活动最终解释权归翻咔直播官方所有</div>

        <div className='advertise__content-weight'>才艺新秀主播申领条件（需人工审核通过，每周定额定量）</div>
        <div className='advertise__content-font'>1.提供露脸1分钟的三段才艺视频</div>
        <div className='advertise__content-font'>2.在直播间展示才艺：唱歌、舞蹈、乐器</div>
        <div className='advertise__content-font'>3.每周直播5天，每天23:59前直播时长不少于2小时</div>
        <div className='advertise__content-font'>4.直播期间50%以上时段为才艺表演</div>
      </>
    )}

    {concurrentMode === 'num1' && (
      <>
        <div>
          按申领条件直播的才艺主播每<span>周四自动下发500元才艺津贴至绑定的银行账户</span>
        </div>
        <div className='advertise__content-small'>
          (实际到账时间以绑定的银行到账时间为准。下发时将扣除服务费，服务费为津贴的11.72%)
        </div>
      </>
    )}
  </>
)

export default TalentRule
