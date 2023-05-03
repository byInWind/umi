import React, { useRef, useEffect, useState } from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { Toast } from 'antd-mobile'
import { sethandleHeaders } from '@utils/headers'
import { queryString } from '@utils/utils'
import { LuckyWheel } from '@lucky-canvas/react'
import TextLoop from 'react-text-loop'
import DownloadApp from '@components/Download-app'
import { blocks, prizes, buttons, imgConfig, drawList } from './constants'
import './index.scss'
const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const myLucky = useRef()
  const downappRef = useRef()
  const [ownRecordList, setOwnRecordList] = useState([]) // 个人中奖记录
  const [allRecordList, setAllRecordList] = useState([]) // 全部人中奖记录
  const [isToastVisible, setIsToastVisible] = useState(false) // 抽奖弹框
  const [isFrameVisible, setIsFrameVisible] = useState(false) // 中奖记录弹框
  const [isClickBut, setIsClickBut] = useState(true)
  const [luckDrawNum, setLuckDrawNum] = useState(0) // 抽奖次数
  const [recordList, setRecordList] = useState([]) // 抽奖返回list
  const initUrl = config.nodeEnv === 'production' ? 'https://finka-h5.finkapp.cn' : 'https://finka-h5-qa.wowkaka.cn'
  const url = {
    // 应用宝地址
    yybUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cupidapp.live&ckey=CK1507226084937&android_schema=',
    // 页面地址
    pageUrl: 'finka2020://webview/openNew?url=' + initUrl + '/hd/2021/turntable',
    // 安卓下载地址
    androidDownUrl: 'https://datarangers.finkapp.cn/s/lU8PVD9R',
    // ios地址
    iosUrl: 'https://finkapp.cn/native/universal-link-fi?url=' + initUrl + '/hd/2021/turntable',
  }

  //获取抽奖次数
  const getDrawCount = async () => {
    fetch(`/api/draw-count`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setLuckDrawNum(data?.count || 0)
      })
  }

  //个人中奖记录
  const getDrawRecord = async () => {
    fetch(`/api/draw-record`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setOwnRecordList(data?.list || [])
      })
  }

  // 全部人中奖记录
  const getDrawList = async () => {
    fetch(`/api/draw-list`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setAllRecordList(data?.list || [])
      })
  }

  // 抽奖接口
  const handLeLuckDraw = async (num) => {
    if (typeof config?.userId == 'undefined') {
      downappRef.current.downloadApp()
      return
    }
    const params = {
      count: num,
    }
    fetch(`/api/lottery-draw`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          if (res.data.error) {
            Toast.info(res.data.error, 1)
            return
          }
          // 调用抽奖组件的play方法开始游戏
          myLucky.current.play()
          // 调用stop停止旋转并传递中奖索引
          setRecordList(res.data.list)
          setLuckDrawNum(res.data.remainCnt)
          myLucky.current.stop(res.data.pointer)
          setIsClickBut(false)
        } else {
          Toast.info('服务器错误', 1)
        }
      })
  }

  // 处理中奖记录按钮
  const handleRecordBut = () => {
    getDrawRecord()
    setIsFrameVisible(true)
  }

  // 处理关闭弹框按钮
  const handleRecordClose = () => {
    setIsFrameVisible(false)
  }

  useEffect(() => {
    getDrawCount()
    getDrawList()
  }, [])

  return (
    <Layout>
      <div className={`turntable ${isFrameVisible ? 'fixed' : ''}`}>
        <div className='turntable-header'></div>
        <div className='turntable-content'>
          <div className='turntable-content__frequency'>剩余抽奖机会：{luckDrawNum} 次</div>
          <div className='turntable-content__wheel'>
            <LuckyWheel
              ref={myLucky}
              width='10rem'
              height='10rem'
              blocks={blocks}
              prizes={prizes}
              buttons={buttons}
              onStart={() => handLeLuckDraw(1)}
              onEnd={() => {
                // 抽奖结束会触发end回调
                setIsToastVisible(true)
                getDrawList()
                setTimeout(() => {
                  setIsToastVisible(false)
                  setIsClickBut(true)
                }, 2000)
              }}
            ></LuckyWheel>
          </div>
          <div className='turntable-text'>
            {allRecordList.length > 0 ? (
              <TextLoop
                springConfig={{ stiffness: 340, damping: 30 }}
                mask={true}
                fade={true}
                adjustingSpeed={0}
                delay={1000}
                interval={2000}
              >
                {allRecordList?.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </TextLoop>
            ) : (
              <TextLoop
                springConfig={{ stiffness: 340, damping: 30 }}
                mask={true}
                fade={true}
                adjustingSpeed={0}
                delay={1000}
                interval={2000}
              >
                {drawList?.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </TextLoop>
            )}
          </div>
          <div className='turntable-button' onClick={() => (isClickBut ? handLeLuckDraw(10) : null)}>
            <img src={imgConfig.butIcon} />
          </div>
        </div>
        <div className='turntable-footer'>
          <div className='turntable-footer__title'>
            <img src={imgConfig.title} />
          </div>
          <div className='turntable-footer__box'>
            <ul className='boxul'>
              <li>
                <p>1、</p>
                <p>
                  活动期间<span>每累计充值999钻石即可获得一次抽奖机会</span>进行抽奖(配置十连抽)
                </p>
              </li>
              <li>
                <p>2、</p>
                <p>抽奖活动所有奖品及奖品天数均可累计</p>
              </li>
              <li>
                <p>3、</p>
                <p>指定特价礼物5天（选择一款礼物在心仪的主播直播间打5折）</p>
              </li>
              <li>
                <p>4、</p>
                <p>奖品中的钻石有效期为10天</p>
              </li>
              <li>
                <p>5、</p>
                <p>抽奖获得的奖品将在活动结束后15个工作日内发放</p>
              </li>
            </ul>
            <div className='boximg'>
              <div className='boximg_title'>抽奖礼物</div>
              <img className='boximg_img' src={imgConfig.prizeImg} />
            </div>
            <ul className='boxul'>
              <li>
                <p className='wen'>附加奖：</p>
                <p>
                  <span>充值金额≥88888钻石 可获得 指定-进场动画 7天（12款人气进场动画任你挑选）</span>
                </p>
              </li>
              <li className='marginTop20'>*活动最终解释权归翻咔直播官方所有</li>
              <li>*所有活动奖品与苹果公司无关</li>
            </ul>
            <div className='turntable-footer__boxtop'>
              <img src={imgConfig.topBg} />
            </div>
            <div className='turntable-footer__boxbottom'>
              <img src={imgConfig.bottomBg} />
            </div>
          </div>
        </div>
      </div>
      <div className='record' onClick={() => handleRecordBut()}>
        <img src={imgConfig.record} />
      </div>
      {isFrameVisible && (
        <div className='record-frame'>
          <div className='record-frame-box'>
            <div className='record-frame-box__content'>
              <div className='record-frame__title'>中奖记录</div>
              {ownRecordList.length > 0 ? (
                <div className='record-frame__list'>
                  {ownRecordList.map((item, index) => (
                    <p key={index}>
                      <span>{index + 1}、</span>
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                <div className='record-frame__nolist'>暂无中奖</div>
              )}
              <div className='record-frame__close' onClick={() => handleRecordClose()}>
                <img src={imgConfig.close} />
              </div>
              <div className='record-frame__boxtop'>
                <img src={imgConfig.topBg} />
              </div>
              <div className='record-frame__boxbottom'>
                <img src={imgConfig.bottomBg} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isToastVisible && (
        <div className='toast'>
          <div className='toastmain'>
            <div className='toastmain-title'>恭喜你抽中</div>
            <div className='toastmain-centent'>{recordList.join('、')}</div>
          </div>
        </div>
      )}
      <DownloadApp ref={downappRef} url={url} />
    </Layout>
  )
}
render(<App {...config} />, document.querySelector('#app'))

export default App
