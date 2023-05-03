import React from 'react'
import { handleUnits } from '@utils/utils'
import { toClient, isShowLastWeekList } from '../../util'
import { imgConfig } from '../../constants'
import './index.scss'

const variety = (dataSource, concurrentMode) => {
  const { varietyCandidateList = [], varietyTopList = [], lastWeekVarietyTopList = [] } = dataSource

  const showLastWeekList = isShowLastWeekList()

  const currentList = showLastWeekList ? lastWeekVarietyTopList : varietyCandidateList

  return (
    <>
      {concurrentMode === 'num0' ? (
        <>
          {!varietyTopList.length && <div className='advertise__star-empty'>— 暂无排行榜 —</div>}
          <div className='variety'>
            {varietyTopList.map((item, index) => (
              <div key={index} className='variety__list'>
                <div className='variety__list-item'>
                  <div className='variety__list-index'>{index + 1}</div>
                  <div className='variety__list-avatar'>
                    <div
                      className='variety__list-avatar-img'
                      onClick={() => {
                        toClient(item?.userId)
                      }}
                    >
                      <img className='variety__list-avatar-user' src={item.avatar} />
                      {item?.liveShowId && <img className='variety__list-avatar-play' src={imgConfig.play} />}
                    </div>
                  </div>
                  <div className='variety__list-info'>
                    <div className='variety__list-info-name'>{item.varietyName}</div>
                    <div className='variety__list-info-tip'>{`主持人:${item.userName}`}</div>
                    <div className='variety__list-info-tip'>{`直播时间:${item.liveShowTime}`}</div>
                  </div>
                  <div className='talent__list-diamonds'>
                    <div>{handleUnits(item.diamonds)}</div>
                    <div>钻石</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {currentList.length ? (
            !showLastWeekList && <div className='advertise__star-name'>— 下周一00:00进入排行榜 —</div>
          ) : (
            <div className='advertise__star-empty'>— 暂无排行榜 —</div>
          )}
          <div className='variety'>
            {currentList.map((item, index) => (
              <div key={index} className='variety__list'>
                <div className='variety__list-item'>
                  <div className='variety__list-avatar'>
                    <div
                      className='variety__list-avatar-img'
                      onClick={() => {
                        toClient(item?.userId)
                      }}
                    >
                      <img className='variety__list-avatar-user' src={item.avatar} />
                      {item?.liveShowId && <img className='variety__list-avatar-play' src={imgConfig.play} />}
                    </div>
                  </div>
                  <div className='variety__list-new'>
                    <div className='variety__list-new-name'>{item.varietyName}</div>
                    <div className='variety__list-new-tip'>{`主持人：${item.userName}`}</div>
                    <div className='variety__list-new-tip'>{`直播时间：${item.liveShowTime}`}</div>
                  </div>
                  {showLastWeekList ? (
                    <div className='talent__list-diamonds'>
                      <div>{handleUnits(item.diamonds)}</div>
                      <div>钻石</div>
                    </div>
                  ) : (
                    <div className='variety__list-menu'>
                      <div>新节目</div>
                      <div>筹备中</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default variety
