import React from 'react'
import PropType from 'prop-types'

const RankMedal = ({ rankMedalData, title, setRankMedalVisible, setrivilegeVisible }) => {
  const handleClickHide = () => {
    setRankMedalVisible(false)
    setrivilegeVisible(true)
  }
  return (
    <div className='template'>
      <div className='template-title' onClick={() => handleClickHide()}>
        <div className='template-title__arrow'></div>
        {title}
      </div>
      <div className='medal'>
        {rankMedalData?.map((item, index) => (
          <div className='medal-list' key={index}>
            <div className='medal-title'>{item.stage}</div>
            <div className='medal-item'>
              {item.privilegePojos?.map((childItem, index) => (
                <div className='medal-item__list' key={index}>
                  <img src={childItem.url} className={`medal-item__img ${childItem.isLight == 0 ? 'gray' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

RankMedal.propTypes = {
  rankMedalData: PropType.any,
  title: PropType.string,
  setRankMedalVisible: PropType.func,
  setrivilegeVisible: PropType.func,
}

export default RankMedal
