import React, { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'

import { sethandleHeaders } from '@utils/headers'
import Layout from '@components/layout'
import { collectEvent, bluedCollectEvent } from '@utils/utils'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Mousewheel, EffectFade } from 'swiper'
SwiperCore.use([Mousewheel])
import { imgConfig, mp3Url, newBuryTextMap, oldBuryTextMap, commonTitle, newInsideMap, oldInsideMap } from './constants'

import Qrcode from './components/qrcode.js'
import Progress from './components/progress.js'
import LastPage from './components/last-page.js'
import HomePage from './components/home-page.js'
import FirstPage1 from './components/first-page1.js'
import FirstPage2 from './components/first-page2.js'
import SecondPage from './components/second-page.js'
import ThirdPage from './components/third-page.js'
import FourthPage from './components/fourth-page.js'
import FivePage from './components/five-page.js'

import 'swiper/css'
import 'swiper/css/effect-fade'
import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [isPlay, setIsPlay] = useState(false) // 开启音乐开关
  const [isAudioBut, setIsAudioBut] = useState(false) // 判断音乐开关是否现实
  const [isSwiping, setIsSwiping] = useState(false) // 第一页是否可以滑动
  const [isOpenCan, setIsOpenCan] = useState(false) //
  const [listData, setListData] = useState({}) // 接口数据
  const [isProgress, setIsProgress] = useState(true) // 是否现实进度条
  const [pagetype2, setPagetype2] = useState() // 第二页type
  const [pagetype3, setPagetype3] = useState() // 第三页type
  const [pagetype4, setPagetype4] = useState() // 第四页type
  const [pagetype5, setPagetype5] = useState() // 第五页type
  const [isUser, setisUser] = useState(false) // 判断用户是否新人
  const [isAgreement, setIsAgreement] = useState(false) // 判断协议图片
  const [isAgreementPop, setIsAgreementPop] = useState(false) // 判断协议弹框

  const pagetype1 = !isUser ? '1' : '0'
  const audioRef = useRef(null)
  const mySwiperRef = useRef(null)

  // 处理音频开关
  const handleAudio = (type) => {
    const audio = audioRef.current
    if (type === 'open') {
      audio.play()
      setIsPlay(true)
    } else {
      audio.pause()
      setIsPlay(false)
    }
  }

  //点击动画开启进入下一页面
  const handlePageFun = () => {
    if (isAgreement) {
      setIsAgreementPop(false)
      handlePageFunCent()
    } else {
      setIsAgreementPop(true)
    }
  }
  const handleGo = () => {
    window.location.href = '/hd/2021/footmark/agreement'
  }
  // 字节初始化埋点
  const handlePageFunCent = () => {
    document.title = '我的原初记忆'
    const audio = audioRef.current
    audio.play()
    setIsOpenCan(true)
    setTimeout(function () {
      const mySwiper = mySwiperRef.current
      mySwiper.swiper.slideTo(1, 1000, false)
      setIsAudioBut(true)
      setIsPlay(true)
    }, 1000)

    collectEvent('WebClick', {
      element_content: '点击开启',
      title: commonTitle + '-首页',
      os_name: config?.android ? 'android' : 'ios',
    })

    bluedCollectEvent({
      event: 'H5_BTN_CLICK',
      page_name: '2021_MEMORY_CAN_HOME_PAGE',
      name: '2021_MEMORY_CAN_OPEN_CAN',
    })
  }

  const handleOkAgree = () => {
    setIsAgreementPop(false)
    setIsAgreement(true)
    handlePageFunCent()
  }
  const handleNoAgree = () => {
    setIsAgreementPop(false)
  }

  // 字节初始化埋点
  const initCollectEvent = (title) => {
    collectEvent('predefine_pageview', {
      title: title,
      os_name: config?.android ? 'android' : 'ios',
    })
  }

  // 中台初始化埋点
  const initBluedCollectEvent = (name) => {
    bluedCollectEvent({
      event: 'H5_PAGE_SHOW',
      name: name,
    })
  }

  // 页面埋点
  const pageCollectEvent = (index) => {
    console.log(index)
    let title
    let name
    if (!isUser) {
      if (index === 0) {
        document.title = '我的原初记忆'
        title = oldBuryTextMap[index] + pagetype1
        name = oldInsideMap[index] + pagetype1
      } else if (index === 1) {
        document.title = '我的访客记忆'
        title = oldBuryTextMap[index] + pagetype2
        name = oldInsideMap[index] + pagetype2
      } else if (index === 2) {
        document.title = '我的心动记忆'
        title = oldBuryTextMap[index] + pagetype3
        name = oldInsideMap[index] + pagetype3
      } else if (index === 3) {
        document.title = '我的匹配记忆'
        title = oldBuryTextMap[index] + pagetype4
        name = oldInsideMap[index] + pagetype4
      } else if (index === 4) {
        document.title = '我的光阴记忆'
        title = oldBuryTextMap[index] + pagetype5
        name = oldInsideMap[index] + pagetype5
      } else {
        document.title = '我的专属记忆罐头'
        title = oldBuryTextMap[index]
        name = oldInsideMap[index]
      }
    } else {
      if (index === 0) {
        document.title = '我的原初记忆'
        title = newBuryTextMap[index] + pagetype1
        name = newInsideMap[index] + pagetype1
      } else if (index === 1) {
        document.title = '我的专属记忆罐头'
        title = newBuryTextMap[index]
        name = newInsideMap[index]
      }
    }

    console.log(title)
    console.log(name)
    initCollectEvent(title)
    initBluedCollectEvent(name)
  }

  // 首页埋点
  const homeCollectEvent = (index) => {
    if (index === 0) {
      document.title = '我的2021专属记忆罐头'
    }
    if (index === 1) {
      setIsSwiping(true)
      document.title = '我的原初记忆'
    }
    const title =
      index === 0 ? commonTitle + '-首页' : !isUser ? newBuryTextMap[0] + pagetype1 : newBuryTextMap[0] + pagetype1
    const name =
      index === 0 ? '2021_MEMORY_CAN_HOME_PAGE' : !isUser ? newInsideMap[0] + pagetype1 : newInsideMap[0] + pagetype1
    initCollectEvent(title)
    initBluedCollectEvent(name)
    console.log(title)
    console.log(name)
  }

  // 列表数据
  const getQuestionList = () => {
    fetch(`/api/2021/activity/footmark/list`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setListData(res.data.result)
          setPagetype2(res.data.result.visitorRange)
          setPagetype3(res.data.result.fansRange)
          setPagetype4(res.data.result.matchType)
          setPagetype5(res.data.result.postRange)
          setisUser(res.data.result.isFresh)
          // set!isUser(false)
          Toast.hide()
        } else {
          Toast.fail('服务器错误', 3)
        }
        console.log(res)
      })
  }

  useEffect(() => {
    if (config?.userId === undefined) {
      window.location.href = '/hd/2021/footmark/download'
      return
    }
    Toast.loading('Loading...', 60 * 10)
    getQuestionList()
    homeCollectEvent(0)
    // 监听到播放结束后的操作
    audioRef.current.loop = false
    audioRef.current.addEventListener(
      'ended',
      function () {
        console.log('视频结束')
        setIsPlay(false)
      },
      false
    )
  }, [])
  return (
    <Layout>
      {!isUser ? (
        <Swiper
          navigation={true}
          direction={'vertical'} // 竖屏
          slidesPerView={1} // 设置SwiperSlide容器每页数量
          spaceBetween={0} // 每页之间距离
          modules={[EffectFade]}
          effect='fade'
          onSlideChange={(swiper) => homeCollectEvent(swiper.realIndex)}
          ref={mySwiperRef}
        >
          <SwiperSlide className={`homeBg ${!isSwiping ? 'swiper-no-swiping' : ''}`}>
            <HomePage
              handlePageFun={handlePageFun}
              isOpenCan={isOpenCan}
              listData={listData}
              isAgreement={isAgreement}
              setIsAgreement={setIsAgreement}
              setIsAgreementPop={setIsAgreementPop}
              isSwiping={isSwiping}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Swiper
              direction={'vertical'} // 竖屏
              slidesPerView={1} // 设置SwiperSlide容器每页数量
              spaceBetween={0} // 每页之间距离
              mousewheel={true} // 开启鼠标滚轮控制
              speed={500}
              onSlideChange={(swiper) => pageCollectEvent(swiper.realIndex)}
            >
              <SwiperSlide className='firstBg2'>
                <FirstPage2 listData={listData} />
                <Qrcode />
              </SwiperSlide>
              <SwiperSlide className='secondBg'>
                <SecondPage pagetype2={pagetype2} listData={listData} />
                <Qrcode />
              </SwiperSlide>
              <SwiperSlide className='thirdBg'>
                <ThirdPage pagetype3={pagetype3} listData={listData} />
                <Qrcode />
              </SwiperSlide>
              <SwiperSlide className='fourthBg'>
                <FourthPage pagetype4={pagetype4} listData={listData} />
                <Qrcode />
              </SwiperSlide>
              <SwiperSlide className='fiveBg'>
                <FivePage pagetype5={pagetype5} listData={listData} />
                <Qrcode />
              </SwiperSlide>
              <SwiperSlide className='lastBg'>
                <LastPage listData={listData} setIsAudioBut={setIsAudioBut} />
              </SwiperSlide>
            </Swiper>
          </SwiperSlide>
        </Swiper>
      ) : (
        <Swiper
          navigation={true}
          direction={'vertical'} // 竖屏
          slidesPerView={1} // 设置SwiperSlide容器每页数量
          spaceBetween={0} // 每页之间距离
          modules={[EffectFade]}
          effect='fade'
          onSlideChange={(swiper) => homeCollectEvent(swiper.realIndex)}
          ref={mySwiperRef}
        >
          <SwiperSlide className={`homeBg ${!isSwiping ? 'swiper-no-swiping' : ''}`}>
            <HomePage
              handlePageFun={handlePageFun}
              isOpenCan={isOpenCan}
              listData={listData}
              isAgreement={isAgreement}
              setIsAgreement={setIsAgreement}
              setIsAgreementPop={setIsAgreementPop}
              isSwiping={isSwiping}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Swiper
              direction={'vertical'} // 竖屏
              slidesPerView={1} // 设置SwiperSlide容器每页数量
              spaceBetween={0} // 每页之间距离
              mousewheel={true} // 开启鼠标滚轮控制
              speed={500}
              onSlideChange={(swiper) => pageCollectEvent(swiper.realIndex)}
            >
              <SwiperSlide className='firstBg1'>
                <FirstPage1 />
                <Qrcode />
              </SwiperSlide>
              <SwiperSlide className='lastBg'>
                <LastPage listData={listData} setIsAudioBut={setIsAudioBut} />
              </SwiperSlide>
            </Swiper>
          </SwiperSlide>
        </Swiper>
      )}
      <div className={`audio ${!isAudioBut ? 'hide' : 'show'}`}>
        {isPlay ? (
          <img src={imgConfig.musicOpen} className='audio-img' onClick={() => handleAudio('close')} />
        ) : (
          <img src={imgConfig.musicClose} onClick={() => handleAudio('open')} />
        )}
        <audio ref={audioRef} autoPlay controls preload='auto' src={mp3Url} className='audio-item' />
      </div>
      {isProgress && <Progress setIsProgress={setIsProgress} />}
      {isAgreementPop && (
        <div className='popup'>
          <div className='popup-box'>
            <div className='popup-box__title'>
              <span>已阅读并同意 </span>
              <span onClick={() => handleGo()}>
                《翻咔2021年度报告
                <br />
                授权协议》
              </span>
            </div>
            <div className='popup-box__buttom'>
              <span onClick={() => handleNoAgree()}>取消</span>
              <span onClick={() => handleOkAgree()}>同意</span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
