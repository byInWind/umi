import React from 'react'
import { secondFormat, handleUnits } from '@utils/utils'
import { toClient } from '../../util'
import { imgConfig } from '../../constants'
import './index.scss'

const Star = (data) => (
  <>
    {data.length > 0 ? (
      <div className='advertise__star-name'>— 绑定主播本周数据 —</div>
    ) : (
      <div className='advertise__star-empty'>— 暂无主播绑定 —</div>
    )}
    <div className='star'>
      {data.map((item, index) => (
        <div key={index} className='star__list'>
          <div className='star__list-item'>
            <div className='star__list-avatar'>
              <div
                className='star__list-avatar-img'
                onClick={() => {
                  toClient(item?.userId)
                }}
              >
                <img className='star__list-avatar-user' src={item.avatar} />
                {item?.liveShowId && <img className='star__list-avatar-play' src={imgConfig.play} />}
              </div>
              <div className='star__list-avatar-name'>{item.userName}</div>
            </div>
            <div className='star__list-info'>
              <div className='star__list-info-item'>{`直播天数：${item.liveShowDays}天`}</div>
              <div className='star__list-info-item'>{`直播时长：${secondFormat(item.liveShowDuration)}`}</div>
              <div className='star__list-info-item'>{`流水：${handleUnits(item.diamonds)}钻石`}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)

export default Star
