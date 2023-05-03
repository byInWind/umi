import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Qs from 'qs'
import Layout from '@components/layout'
import { Toast } from 'antd-mobile'
import { sethandleHeaders } from '@utils/headers'

import comingSoon from '@images/anchor/comingSoon.png'
import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)
const userInfo = Qs.parse(window.location.search, { ignoreQueryPrefix: true })

const App = () => {
  const [levelDetails, setLevelDetails] = useState({})
  const [privilegesList, setPrivilegesList] = useState([])
  const [anchorTaskList, setAnchorTaskList] = useState([])
  const [userImage, setUserImage] = useState({})

  const getTaskDetails = () => {
    fetch(`/api/anchor/task/details?userId=${userInfo?.userId || ''}`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        setUserImage(data.userImage[0])
        setLevelDetails(data.levelDetails.progressBar)
        setPrivilegesList(data.levelDetails.privileges)
        setAnchorTaskList(data.levelDetails.anchorTaskList)
      })
  }

  const comingSoonFun = () => {
    return (
      <div className='details-box__list-item'>
        <img src={comingSoon} />
        <p>敬请期待</p>
      </div>
    )
  }
  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getTaskDetails()
  }, [])

  return (
    <Layout>
      <div className='details'>
        <div className='details-head'>
          <div className='details-head__user' style={{ backgroundImage: `url(${userImage.url})` }}></div>
          <a href={`/hd/anchor/anchor-exp-details?userId=${userInfo?.userId}`} className='details-head__link'>
            经验值明细
          </a>
          <div className='details-head__progress'>
            <div className='details-head__progress-left'>Lv.{levelDetails.currentLevel}</div>
            <div className='details-head__progress-right'>
              {levelDetails.expPercent > 0 ? (
                <>
                  <div
                    className='details-head__progress-bar'
                    style={{ width: levelDetails.expPercent * 100 + '%' }}
                  ></div>
                </>
              ) : null}
            </div>
          </div>
          <div className='details-head__value'>
            {levelDetails.fullLevel ? (
              <>恭喜，已达到最高等级！</>
            ) : (
              <>
                距升级还差<span>{levelDetails.diffExperience}</span>经验
              </>
            )}
          </div>
        </div>
        <div className='details-box'>
          <div className='details-box__head'>
            <p>等级特权</p>
            <a href='/hd/anchor/anchor-privilege-details'>特权详情</a>
          </div>
          <div className='details-box__list'>
            {privilegesList?.map((item, index) => (
              <div className='details-box__list-item' key={index}>
                <img src={item.url} className={item.isLight === 0 ? 'gray' : ''} />
                <p>{item.privilegesName}</p>
              </div>
            ))}
            {comingSoonFun()}
          </div>
        </div>
        <div className='details-box'>
          <div className='details-box__head'>
            <p>主播任务</p>
            <a href='/hd/anchor/anchor-task-details'>任务详情</a>
          </div>
          <div className='details-box__list'>
            {anchorTaskList?.map((item, index) => (
              <div className='details-box__list-item' key={index}>
                <img src={item.url} className={item.isLight === 0 ? 'gray' : ''} />
                <p>{item.taskName}</p>
              </div>
            ))}
            {comingSoonFun()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
