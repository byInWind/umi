import React from 'react'
import { collectEvent } from '@utils/utils'
import { imgConfig } from '../../constants'
const config = window.CONFIG || {}

const list3view = (list) => (
  <>
    {list.map((item, index) => (
      <div className='user-info' key={index}>
        <div className='user-info__avatar'>
          <div className='user-info__ranking'>{index + 11}</div>
          <a
            href='javascript:void(0)'
            onClick={() => {
              collectEvent('WebClick', {
                title: '潮流生活大玩家榜单',
                element_content: '用户头像',
              })
              location.href = `finka2020://user/${item.user.id}`
            }}
            className='user-info__img avatar'
            style={{
              backgroundImage: `url(https://pic.finkapp.cn/${config?.nodeEnv === 'production' ? '' : 't/'}${
                item.user?.avatarImage?.imageId
              })`,
            }}
          ></a>
          <img className='img' src={imgConfig.ava3Img} alt='' />
        </div>
        <p className='limit_length user-info__name'>{item.user?.name}</p>
        <p className='user-info__count-box'>
          <img src={imgConfig.ava3CountImg} alt='' />
          <span className='user-info__count-box__count limit_length'>{item?.score}</span>
        </p>
      </div>
    ))}
  </>
)

export default list3view
