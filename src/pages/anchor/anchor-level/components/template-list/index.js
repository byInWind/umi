import React from 'react'
import PropType from 'prop-types'
import { appUrlScheme } from '@utils/utils'

const TemplateList = ({ templateListDate, title, setTemplateListVisible, setrivilegeVisible }) => {
  const handleClickHide = () => {
    setTemplateListVisible(false)
    setrivilegeVisible(true)
  }
  //privilegesType = 3 是装饰贴纸  5是专属礼物
  const handleClickSticker = (item) => {
    window.location.href = appUrlScheme + '://liveShow/sticker?privilegesName=' + item.privilegesName
  }

  return (
    <div className='template'>
      <div className='template-title' onClick={() => handleClickHide()}>
        <div className='template-title__arrow'></div>
        {title}
      </div>
      {templateListDate?.map((item, index) => (
        <div
          className='privilege-item'
          key={index}
          onClick={item.privilegesType === 3 && item.isLight === 1 ? () => handleClickSticker(item) : null}
        >
          <img src={item.url} className={`privilege-item__img ${item.isLight === 0 ? 'gray' : ''}`} />
          <p className='privilege-item__name'>{item.privilegesName}</p>
          {item.privilegesType === 5 && item.isLight === 0 && (
            <p className='privilege-item__level'>Lv.{item.triggerLevel}解锁</p>
          )}
        </div>
      ))}
    </div>
  )
}

TemplateList.propTypes = {
  templateListDate: PropType.array,
  title: PropType.string,
  setTemplateListVisible: PropType.func,
  setrivilegeVisible: PropType.func,
}

export default TemplateList
