import React from 'react'
import PropType from 'prop-types'

const TemplateItem = ({ singleItem, title, setTemplateItemVisible, setrivilegeVisible }) => {
  const handleClickHide = () => {
    setTemplateItemVisible(false)
    setrivilegeVisible(true)
  }

  return (
    <div className='template'>
      <div className='template-title' onClick={() => handleClickHide()}>
        <div className='template-title__arrow'></div>
        {title}
      </div>
      <div className='template-content'>
        <img src={singleItem.url} className='template-content__img' />
        <p className='template-content__name'>{singleItem.privilegesName}</p>
      </div>
    </div>
  )
}

TemplateItem.propTypes = {
  singleItem: PropType.any,
  title: PropType.string,
  setTemplateItemVisible: PropType.func,
  setrivilegeVisible: PropType.func,
}

export default TemplateItem
