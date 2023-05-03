import React, { useState } from 'react'
import PropType from 'prop-types'
import moment from 'moment'

import { Toast } from 'antd-mobile'
import { collectEvent, bluedCollectEvent, appUrlScheme } from '@utils/utils'
import { commonTitle, imgConfig } from '../constants'

const config = window.CONFIG || {}

const LastPage = ({ listData, setIsAudioBut }) => {
  const [isButton, setIsButton] = useState(true) // 按钮隐藏
  const [isCommentary, setIsCommentary] = useState(false) // 判断是否解锁
  let time = moment(parseInt(listData?.registTime)).format('YYYY年MM月DD日')
  const tableList = listData?.increaseInfos || []
  const userList = listData?.closeUserInfos || []
  const userList2 = [1, 2, 3]
  // 点击截图分享
  const handleShare = () => {
    setIsButton(false)
    handlEcollectEvent('分享')
    setIsAudioBut(false)
    handlBluedCollectEvent('2021_MEMORY_CAN_RESULT', '2021_MEMORY_CAN_SHARE')
    setTimeout(function () {
      setIsCommentary(true)
      setIsAudioBut(true)
    }, 500)
    location.href = 'finka2020://webview/snapWebContent?album=1&callback=callbackShare'
  }
  // eslint-disable-next-line no-unused-vars
  const callbackShare = () => {
    Toast.info('解锁成功')
  }
  const handleReload = () => {
    handlEcollectEvent('再看一次')
    handlBluedCollectEvent('2021_MEMORY_CAN_RESULT', '2021_MEMORY_CAN_LOOK_AGAIN')
    location.reload()
  }

  //埋点
  const handlEcollectEvent = (content) => {
    console.log(commonTitle)
    collectEvent('WebClick', {
      element_content: content,
      title: commonTitle + '-结果',
      os_name: config?.android ? 'android' : 'ios',
    })
  }

  const handlBluedCollectEvent = (pageNmae, name) => {
    bluedCollectEvent({
      event: 'H5_BTN_CLICK',
      page_name: pageNmae,
      name: name,
    })
  }
  return (
    <div className='lastpage'>
      <div className='lastpage-text'>根据2021年使用数据生成</div>
      <div className='lastpage-box'>
        <div className='lastpage-box__content'>
          <div className='userinfo'>
            <p style={{ backgroundImage: 'url(' + imgConfig.userBg + ')' }}>
              <span
                style={{
                  backgroundImage: `url(${listData?.userImageUrl ? listData?.userImageUrl : imgConfig.defaultAvatar}`,
                }}
              ></span>
            </p>
            <p>
              <span>{listData?.userNickName}</span>
              <span>{listData?.canName}</span>
            </p>
          </div>
          <div className='batching'>
            <div className='batching-item'>
              <p>
                <img src={imgConfig.lastTitle1} />
              </p>
              <p>{time}</p>
            </div>
            <div className='batching-item'>
              <p>
                <img src={imgConfig.lastTitle2} />
              </p>
              <p className='overflow2'>
                <span>{listData?.ingredient1}</span>
                <span>{listData?.ingredient2}</span>
                <span>{listData?.ingredient3}</span>
              </p>
            </div>
            <div className='batching-item'>
              <p>
                <img src={imgConfig.lastTitle3} />
              </p>
              <p className='overflow3'>{listData?.canDes}</p>
            </div>
          </div>
          <div className='component'>
            <div className='component-title'>
              <img src={imgConfig.lastTitle4} />
            </div>
            {tableList.length > 0 ? (
              <div className='component-ul'>
                {tableList.map((item, index) => (
                  <div className='component-li' key={index}>
                    <div className='component-li__item'>
                      <p>
                        {item?.type === 0 ? (
                          <img src={imgConfig.icon0} />
                        ) : item?.type === 1 ? (
                          <img src={imgConfig.icon1} />
                        ) : item?.type === 2 ? (
                          <img src={imgConfig.icon2} />
                        ) : item?.type === 3 ? (
                          <img src={imgConfig.icon3} />
                        ) : item?.type === 4 ? (
                          <img src={imgConfig.icon4} />
                        ) : item?.type === 5 ? (
                          <img src={imgConfig.icon5} />
                        ) : item?.type === 6 ? (
                          <img src={imgConfig.icon6} />
                        ) : (
                          ''
                        )}
                        <span>
                          {item?.type === 0
                            ? '人气'
                            : item?.type === 1
                            ? '访客'
                            : item?.type === 2
                            ? '新增1粉'
                            : item?.type === 3
                            ? '新增0粉'
                            : item?.type === 4
                            ? '动态'
                            : item?.type === 5
                            ? '获赞'
                            : item?.type === 6
                            ? '喜欢'
                            : ''}
                        </span>
                      </p>
                      <p>
                        {item?.increasePercent >= 0 ? <img src={imgConfig.iconUp} /> : <img src={imgConfig.iconDown} />}
                        <span>{Math.abs(item?.increasePercent)}%</span>
                      </p>
                    </div>
                    <div className='component-li__num'>{item?.annualNum}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='no-data'>找不到你的任何数据呢，明年要加把劲哦</div>
            )}
          </div>
        </div>
      </div>
      <div className='lastpage-fotter'>
        {isButton && (
          <div className='share'>
            <img src={imgConfig.button1} onClick={() => handleReload()} />
            <img src={imgConfig.button2} onClick={() => handleShare()} />
          </div>
        )}
        {isCommentary && (
          <div className='friend'>
            <div className='friend-title'>
              <img src={imgConfig.top3} />
            </div>
            {userList.length > 0 ? (
              <div className='friend-box'>
                {userList.map((item, index) => (
                  <div className='friend-box__item' key={index}>
                    <p
                      style={{
                        backgroundImage: `url(${
                          item?.closeTopUserImageUrl ? item?.closeTopUserImageUrl : imgConfig.defaultAvatar
                        }`,
                      }}
                      onClick={() => {
                        location.href = appUrlScheme + '://user/' + item?.closeTopUserId || config.userId || ''
                      }}
                    ></p>
                    <p className='texthidden'>{item?.closeTopUserNickName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className='friend-box'>
                {userList2.map((index) => (
                  <div className='friend-box__item' key={index}>
                    <p
                      style={{
                        backgroundImage: `url(${imgConfig.defaultAvatar}`,
                      }}
                    ></p>
                    <p className='texthidden'>虚位以待</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div className='qrCode2'>
        <img src={imgConfig.qrCode} />
      </div>
      <div className='logo'>
        <img src={imgConfig.logo} />
      </div> */}
    </div>
  )
}

LastPage.propTypes = {
  listData: PropType.any,
  setIsAudioBut: PropType.bool,
}

export default LastPage
