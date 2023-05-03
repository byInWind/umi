import React from 'react'
import { handleUnits } from '@utils/utils'
import { toClient, isShowLastWeekList } from '../../util'
import { imgConfig } from '../../constants'
import './index.scss'

const Talent = (dataSource, concurrentMode) => {
  const { talentCandidateList = [], talentTopList = [], lastWeekTalentTopList = [] } = dataSource

  const showLastWeekList = isShowLastWeekList()

  const currentList = showLastWeekList ? lastWeekTalentTopList : talentCandidateList
  return (
    <>
      {concurrentMode === 'num0' ? (
        <>
          {!talentTopList.length && <div className='advertise__star-empty'>— 暂无排行榜 —</div>}
          <div className='talent'>
            {talentTopList.map((item, index) => (
              <div key={index} className='talent__list'>
                <div className='talent__list-item'>
                  <div className='talent__list-index'>{index + 1}</div>
                  <div className='talent__list-avatar'>
                    <div
                      className='talent__list-avatar-img'
                      onClick={() => {
                        toClient(item?.userId)
                      }}
                    >
                      <img className='talent__list-avatar-user' src={item.avatar} />
                      {item?.liveShowId && <img className='talent__list-avatar-play' src={imgConfig.play} />}
                    </div>
                  </div>
                  <div className='talent__list-info'>
                    <div className='talent__list-info-name'>{item.userName}</div>
                    <div className='talent__list-info-tip'>{`才艺:${item.talentName}`}</div>
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
          <div className='talent'>
            {currentList.map((item, index) => (
              <div key={index} className='talent__list'>
                <div className='talent__list-item'>
                  <div className='talent__list-avatar'>
                    <div
                      className='talent__list-avatar-img'
                      onClick={() => {
                        toClient(item?.userId)
                      }}
                    >
                      <img className='talent__list-avatar-user' src={item.avatar} />
                      {item?.liveShowId && <img className='talent__list-avatar-play' src={imgConfig.play} />}
                    </div>
                  </div>
                  <div className='talent__list-info'>
                    <div className='talent__list-info-name'>{item.userName}</div>
                    <div className='talent__list-info-tip'>{`才艺:${item.talentName}`}</div>
                  </div>
                  {showLastWeekList ? (
                    <div className='talent__list-diamonds'>
                      <div>{handleUnits(item.diamonds)}</div>
                      <div>钻石</div>
                    </div>
                  ) : (
                    <div className='talent__list-diamonds'>新人备战中</div>
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

export default Talent
