import React from 'react'
import PropType from 'prop-types'
import { imgConfig } from '../../constants'

import './index.scss'

const myTask = ({ missionInfoData }) => {
  let data = missionInfoData
  const isLiveDay = data.continuousDay > data.maxContinuousDay ? true : false
  let liveWidth
  let liveWidthArr = ['0%', '16.5%', '28%', '46.4%', '57.7%', '68.7%', '79.7%']
  data.continuousDay >= 7
    ? (liveWidth = '100%')
    : liveWidthArr.map((item, index) => {
        if (data.continuousDay === index) {
          liveWidth = item
        }
      })

  return (
    <div className='task'>
      <ul className='task-ul'>
        <li className='task-li'>
          <div className='task-title'>
            <img src={imgConfig.liveDay} className='task-title__img' />
            <div className='task-title__name'>连续有效开播天数</div>
          </div>
          <div className='task-progress task-livetime-progress colo-red'>
            <div
              className={`progress-bar progress-livebar ${
                data.continuousDay > 0 ? 'colo-red__activebg animation' : ''
              }`}
              style={{
                width: liveWidth,
              }}
            >
              {data.continuousDay > 0 && (
                <>
                  <div className='progress-bar__value progress-bar__red color-red__active'>
                    +{data.continuousExpIncome}经验
                  </div>
                  {data.continuousDay < 7 && (
                    <>
                      <div className='progress-bar__num'>{data.continuousDay}天</div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className='task-time task-livetime'>
            <span>0天</span>
            <span className={data.continuousDay >= 7 ? 'color-black' : ''}>{isLiveDay ? <>7+</> : '7天'}</span>
          </div>
        </li>
        <li className='task-li'>
          <div className='task-title'>
            <img src={imgConfig.liveTime} className='task-title__img' />
            <div className='task-title__name'>今日直播时长</div>
          </div>
          <div className='task-progress color-pink'>
            <div
              className={`progress-bar ${data.accumulativeHours > 0 ? 'color-pink__active animation' : ''}`}
              style={{ width: data.accumulativePercent * 100 + '%' }}
            >
              {data.accumulativeHours > 0 && (
                <>
                  <div className='progress-bar__value  progress-bar__pink color-pink__active'>
                    +{data.accumulativeExpIncome}经验
                  </div>
                </>
              )}
              <div className='progress-bar__dot color-pink__active'></div>
            </div>
          </div>
          <div className='task-time'>
            <span>0h</span>
            <span className={data.accumulativeHours === 1 ? 'color-black' : ''}>1h</span>
            <span className={data.accumulativeHours === 2 ? 'color-black' : ''}>2h</span>
          </div>
        </li>
        <li className='task-li'>
          <div className='task-title'>
            <img src={imgConfig.fansNum} className='task-title__img' />
            <div className='task-title__name'>今日新增粉丝数</div>
          </div>
          <div className='task-progress color-violet'>
            <div
              className={`progress-bar ${data.fansPercent > 0 ? 'color-violet__active animation' : ''}`}
              style={data.fansCount > 50 ? { width: data.fansPercent * 100 + '%' } : { width: '17%' }}
            >
              {data.fansCount > 0 && (
                <>
                  <div className='progress-bar__value progress-bar__pinkvalue color-violet__active'>
                    +{data.fansExpIncome}经验
                  </div>
                  {data.fansCount < data.maxFansCount && (
                    <>
                      <div className='progress-bar__num'>{data.fansCount}个</div>
                    </>
                  )}
                </>
              )}
              <div className='progress-bar__dot color-violet__active'></div>
            </div>
          </div>
          <div className='task-time'>
            <span>0个</span>
            <span className={data.fansCount >= data.maxFansCount ? 'color-black' : ''}>{data.maxFansCount}个</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

myTask.propTypes = {
  missionInfoData: PropType.any,
}

export default myTask
