import React from 'react'
import PropType from 'prop-types'
import { imgConfig } from '../constants'

const HomePage = ({ handlePageFun, isOpenCan, listData, isAgreement, setIsAgreement, isSwiping }) => {
  const handlePage = () => {
    handlePageFun()
  }
  const handleAgreementOk = () => {
    setIsAgreement(false)
  }
  const handleAgreementNo = () => {
    setIsAgreement(true)
  }
  const handleGo = () => {
    window.location.href = '/hd/2021/footmark/agreement'
  }
  return (
    <div className='homepage'>
      <img src={imgConfig.homeTitle1} className='homepage-title' />
      <img src={imgConfig.homeTitle3} className='homepage-title' />
      <div className={`homepage-can ${isOpenCan ? 'show' : 'hide'}`}>
        <img src={imgConfig.homeCanOpen} />
      </div>
      <div className={`homepage-can ${isOpenCan ? 'hide' : 'show'}`}>
        <img src={imgConfig.homeCan} />
        <img src={imgConfig.homeBut} className='homepage-button' onClick={() => handlePage()} />
        <div className='circleBox' onClick={() => handlePage()}>
          <div className='circle1'></div>
          <div className='circle2'></div>
          <div className='circle3'></div>
          <div className='circle4'></div>
          <div className='circle5'></div>
        </div>
      </div>

      <div className='homepage-wen'>
        <p>
          <span>{listData?.actVisitNum}</span>
        </p>
        <img src={imgConfig.homeTitle2} />
      </div>
      <div className='agreement-text'>
        {isAgreement ? (
          <div className='agreement-img' onClick={() => (!isSwiping ? handleAgreementOk() : null)}>
            <img src={imgConfig.agree2} />
          </div>
        ) : (
          <div className='agreement-img' onClick={() => (!isSwiping ? handleAgreementNo() : null)}>
            <img src={imgConfig.agree1} />
          </div>
        )}
        <p>
          同意翻咔查询并统计我的使用数据,查看<span onClick={() => handleGo()}>授权协议</span>
        </p>
      </div>
    </div>
  )
}

HomePage.propTypes = {
  isAgreement: PropType.bool,
  isSwiping: PropType.bool,
  listData: PropType.array,
  isOpenCan: PropType.bool,
  handlePageFun: PropType.func,
  setIsAgreement: PropType.func,
}

export default HomePage
