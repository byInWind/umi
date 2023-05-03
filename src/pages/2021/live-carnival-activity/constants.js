import moment from 'moment'
import tab0 from '@images/2021/live-carnival/tab1.png'
import footer from '@images/2021/live-carnival/footer.png'
import tab1 from '@images/2021/live-carnival/tab2.png'
import tab2 from '@images/2021/live-carnival/tab3.png'
import active0 from '@images/2021/live-carnival/active1.png'
import active1 from '@images/2021/live-carnival/active2.png'
import mode from '@images/2021/live-carnival/mode.png'
import signup from '@images/2021/live-carnival/signup.png'
import bind from '@images/2021/live-carnival/bind.png'
import anchorBg from '@images/2021/live-carnival/anchor-bg.png'
import avatar from '@images/2021/live-carnival/avatar.png'
import model from '@images/2021/live-carnival/model.png'
import submitSuccess from '@images/2021/live-carnival/submitSuccess.png'
import num0 from '@images/2021/live-carnival/0.png'
import num1 from '@images/2021/live-carnival/1.png'
import num2 from '@images/2021/live-carnival/2.png'
import num3 from '@images/2021/live-carnival/3.png'
import num01 from '@images/2021/live-carnival/0-1.png'
import num11 from '@images/2021/live-carnival/1-1.png'
import num21 from '@images/2021/live-carnival/2-1.png'
import num31 from '@images/2021/live-carnival/3-1.png'
import back from '@images/2021/live-carnival/back.png'
import rule from '@images/2021/live-carnival/rule.png'
import play from '@images/2021/live-carnival/play.png'
import ruleTip from '@images/2021/live-carnival/ruleTip.png'
import allTip from '@images/2021/live-carnival/allTip.png'
import caiyiTip from '@images/2021/live-carnival/caiyiTip.png'
import bingTip from '@images/2021/live-carnival/bingTip.png'
import title1 from '@images/2021/live-carnival/title1.png'
import title2 from '@images/2021/live-carnival/title2.png'
import title3 from '@images/2021/live-carnival/title3.png'
import openFankaApp from '@images/common/openFinkaApp.png'
import arrow from '@images/common/arrow.png'

const isShowLastWeekList = () => {
  const day = moment().isoWeekday()

  return day >= 1 && day <= 4 ? true : false
}

// 周一到周四显示上周列表,周五到周天显示新排行榜
const showLastWeek = isShowLastWeekList && isShowLastWeekList()

// oAxnPFj0QidqRPIj7cLlMQ

export const imgConfig = {
  topImg: 'https://pic.finkapp.cn/oAxnPFj0QidqRPIj7cLlMQ',
  banner: 'https://pic.finkapp.cn/PaXkND_5p0RqRPIj7cLlMQ',
  vipImg: 'https://pic.finkapp.cn/LLPRVcP5hvdqRPIj7cLlMQ',
  vipLose: 'https://pic.finkapp.cn/cZuKiGVIxF9qRPIj7cLlMQ',
  footer,
  mode,
  signup,
  bind,
  anchorBg,
  avatar,
  model,
  submitSuccess,
  back,
  rule,
  play,
  caiyiTip,
  ruleTip,
  allTip,
  bingTip,
  title1,
  title2,
  title3,
  openFankaApp,
  arrow,
}

export const tab = {
  tab0,
  tab1,
  tab2,
}

export const active = {
  num0: active0,
  num1: active1,
}

export const activeMap1 = {
  num0: showLastWeek ? num01 : num0,
  num1: showLastWeek ? num11 : num1,
}

export const activeMap2 = {
  num0: showLastWeek ? num21 : num2,
  num1: showLastWeek ? num31 : num3,
}

export const BLUED_COLLECT_EVENT = {
  直播嘉年华: 'LIVE_CARNIVAL_LEAFLET',
  活动页: 'LIVE_CARNIVAL_ACTIVE',
  全民星探: 'LIVE_CARNIVAL_ALL_STARTS',
  才艺招募令: 'LIVE_CARNIVAL_FIND_TALENT_AND_SKILL',
  本周综艺榜: 'LIVE_CARNIVAL_THIS_WEEK_VARIETY_RANK',
  立即绑定: 'LIVE_CARNIVAL_BINDING_RIGHT_NOW',
  活动规则: 'LIVE_CARNIVAL_ACTIVE_ROLE',
  返回榜单: 'LIVE_CARNIVAL_RETURN_RANK',
  活动奖励: 'LIVE_CARNIVAL_ACTIVE_REWARD',
  立即报名: 'LIVE_CARNIVAL_SIGN_IP_RIGN_NOW',
  本周才艺新秀榜: 'LIVE_CARNIVAL_THIS_WEEK_NEW_SKILL_ANCHOR',
  入选才艺新秀: 'LIVE_CARNIVAL_BE_SELECTED_NEW_SKILL_ANCHOR',
  新综艺节目: 'LIVE_CARNIVAL_NEW_VARIETY',
  提交: 'LIVE_CARNIVAL_SUBMIT',
  确认: 'LIVE_CARNIVAL_CONFIRM',
  头像: 'LIVE_CARNIVAL_AVATAR',
  关闭: 'LIVE_CARNIVAL_CLOSE',
}
