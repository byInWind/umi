import taskTitle1 from '@images/2021/live-activity-0919/taskTitle1.png'
import taskTitle2 from '@images/2021/live-activity-0919/taskTitle2.png'
import taskIcon1 from '@images/2021/live-activity-0919/taskIcon1.png'
import taskIcon2 from '@images/2021/live-activity-0919/taskIcon2.png'
import taskIcon3 from '@images/2021/live-activity-0919/taskIcon3.png'
import taskIcon4 from '@images/2021/live-activity-0919/taskIcon4.png'
import taskIcon5 from '@images/2021/live-activity-0919/taskIcon5.png'
import taskIcon6 from '@images/2021/live-activity-0919/taskIcon6.png'
import taskName1 from '@images/2021/live-activity-0919/taskName1.png'
import taskName2 from '@images/2021/live-activity-0919/taskName2.png'
import taskName3 from '@images/2021/live-activity-0919/taskName3.png'
import taskName4 from '@images/2021/live-activity-0919/taskName4.png'
import taskName5 from '@images/2021/live-activity-0919/taskName5.png'
import taskName6 from '@images/2021/live-activity-0919/taskName6.png'
import taskName7 from '@images/2021/live-activity-0919/taskName7.png'
import stateImg1 from '@images/2021/live-activity-0919/stateImg1.png'
import stateImg2 from '@images/2021/live-activity-0919/stateImg2.png'
import stateImg3 from '@images/2021/live-activity-0919/stateImg3.png'
import stateImg4 from '@images/2021/live-activity-0919/stateImg4.png'

export const imgConfig = {
  taskTitle1,
  taskTitle2,
  taskIcon1,
  taskIcon2,
  taskIcon3,
  taskIcon4,
  taskIcon5,
  taskIcon6,
  taskName1,
  taskName2,
  taskName3,
  taskName4,
  taskName5,
  taskName6,
  taskName7,
  stateImg1,
  stateImg2,
  stateImg3,
  stateImg4,
  emptyIcon: 'https://pic.finkapp.cn/xja9BxFqJ01qRPIj7cLlMQ',
}

export const taskFirstList = [
  {
    icon: taskIcon1,
    title: taskName1,
    content: '每日登录即可获得3个【点赞】（每日上限3个）',
    isStatus: false,
    taskType: 1,
  },
  {
    icon: taskIcon2,
    title: taskName2,
    content: '每日首次充值任意金额即可获得10个【点赞】（每日上限10个）',
    isStatus: false,
    taskType: 2,
  },
  {
    icon: taskIcon3,
    title: taskName3,
    content: '在一个直播间观看直播5分钟即可获得5个【点赞】',
    isStatus: false,
    taskType: 3,
  },
  {
    icon: taskIcon4,
    title: taskName4,
    content: '在直播间发言超过10句即可获得5个免费【点赞】（每日上限5个）',
    isStatus: true,
    taskType: 4,
  },
  {
    icon: taskIcon5,
    title: taskName5,
    content: '在直播间内新关注三位用户即可获得2个【点赞】（每日上限2个）',
    isStatus: true,
    taskType: 5,
  },
  {
    icon: taskIcon6,
    title: taskName6,
    content: '有效分享一次直播即可获得1个【点赞】（每日上限5个）',
    isStatus: true,
    taskType: 6,
  },
]

export const taskSecondList = [
  {
    icon: taskIcon2,
    title: taskName2,
    content: '每日首次充值任意金额即可获得2个礼【花束】（每日上限2个）',
    isStatus: false,
    taskType: 7,
  },
  {
    icon: taskIcon2,
    title: taskName7,
    content: '连续4天均有充值即可获得15个【花束】（每日上限15个）',
    isStatus: true,
    taskType: 8,
  },
  {
    icon: taskIcon3,
    title: taskName3,
    content: '在一个直播间观看直播5分钟即可获得5个【花束】（每日上限5个）',
    isStatus: false,
    taskType: 9,
  },
  {
    icon: taskIcon4,
    title: taskName4,
    content: '在直播间发言超过10句即可获得5个【花束】（每日上限5个）',
    isStatus: true,
    taskType: 10,
  },
]
