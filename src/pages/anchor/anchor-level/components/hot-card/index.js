import React from 'react'
import PropType from 'prop-types'
import Empty from '@components/empty'

import { Modal, Toast } from 'antd-mobile'
import { sethandleHeaders } from '@utils/headers'
import { queryString } from '@utils/utils'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const alert = Modal.alert

const HotCatd = ({ hotCardDate, title, setHotCardVisible, setrivilegeVisible, resetHotCardList, userInfo }) => {
  const handleClickHide = () => {
    setHotCardVisible(false)
    setrivilegeVisible(true)
  }

  const showAlert = (item) => {
    alert('热门推荐卡', item.content, [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      {
        text: '立即使用',
        onPress: () => {
          openHotCard(item.id)
        },
      },
    ])
  }

  //推荐卡是否可以使用接口
  const handleClickCard = async (item) => {
    const params = {
      userId: userInfo.userId,
      privilegeRecordId: item.privilegesRecordId,
    }

    fetch(`/api/anchor/hotCard/isCheck`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data
        if (data?.status === 0) {
          showAlert({
            content: '使用后立即生效，在热门页第一位展示',
            id: item.privilegesRecordId,
          })
        } else if (data?.status === 1) {
          Toast.info('道具已过期', 1)
        } else if (data?.status === 3) {
          showAlert({
            content: '您前方还有' + data.waitingNum + '人在排队使用该功能哦，是否立即使用',
            id: item.privilegesRecordId,
          })
        } else {
          Toast.info('使用失败，请稍后重试', 1)
        }
      })
  }

  // 推荐卡是使用接口
  const openHotCard = async (privilegeRecordId) => {
    const params = {
      userId: userInfo.userId,
      liveShowId: userInfo.liveShowId,
      privilegeRecordId: privilegeRecordId,
    }

    fetch(`/api/anchor/hotCard/open`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data
        if (data?.useStatus) {
          resetHotCardList({ privilegesName: title })
        } else {
          Toast.info('使用失败，请稍后重试', 1)
        }
      })
  }

  return (
    <div className='template'>
      <div className='template-title' onClick={() => handleClickHide()}>
        <div className='template-title__arrow'></div>
        {title}
      </div>
      {hotCardDate.length > 0 ? (
        <>
          {hotCardDate?.map((item, index) => (
            <div className='privilege-item' key={index} onClick={() => handleClickCard(item)}>
              <div className='privilege-item__box'>
                <img src={item.url} className='privilege-item__img' />
              </div>
              <p className='privilege-item__name'>{item.time}到期</p>
            </div>
          ))}
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

HotCatd.propTypes = {
  hotCardDate: PropType.array,
  title: PropType.string,
  setHotCardVisible: PropType.func,
  setrivilegeVisible: PropType.func,
  resetHotCardList: PropType.func,
  userInfo: PropType.any,
}

export default HotCatd
