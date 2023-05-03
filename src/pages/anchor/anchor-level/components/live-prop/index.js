import React from 'react'
import PropType from 'prop-types'
import Empty from '@components/empty'
import { Modal, Toast } from 'antd-mobile'
import { sethandleHeaders } from '@utils/headers'
import { queryString } from '@utils/utils'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const alert = Modal.alert

const LiveProp = ({ livePropDate, title, setLivePropVisible, setrivilegeVisible, resetLivePropList, userInfo }) => {
  const handleClickHide = () => {
    setLivePropVisible(false)
    setrivilegeVisible(true)
  }

  const showAlert = (item) => {
    alert(item.title, item.content, [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      {
        text: '立即使用',
        onPress: () => {
          handleClickBroadcast(item.type)
        },
      },
    ])
  }

  const handleClickBroadcast = async (type) => {
    const params = {
      userId: userInfo.userId,
      liveShowId: userInfo.liveShowId,
    }

    fetch(`/api/anchor/openBroadcast`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.data?.useStatus) {
          resetLivePropList({ privilegesName: title, privilegesType: type })
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
      {livePropDate.length > 0 ? (
        <>
          {livePropDate?.map((item, index) => (
            <div
              className='privilege-item'
              key={index}
              onClick={() =>
                showAlert({
                  title: '全站广播',
                  content: '使用后可立即向全站用户发送开播通知哦',
                  type: item.propCardType,
                })
              }
            >
              <div className='privilege-item__box'>
                <img src={item.url} className='privilege-item__img' />
                <div className='privilege-item__num'>
                  <span>x</span>
                  <span>{item.propCardNum}</span>
                </div>
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

LiveProp.propTypes = {
  livePropDate: PropType.array,
  title: PropType.string,
  setLivePropVisible: PropType.func,
  setrivilegeVisible: PropType.func,
  resetLivePropList: PropType.func,
  userInfo: PropType.any,
}

export default LiveProp
