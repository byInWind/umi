import React, { useRef, useEffect, useState } from 'react'
// import QRCode from 'qrcode.react'
import html2canvas from 'html2canvas'
import { render } from 'react-dom'
import { Toast } from 'antd-mobile'
import Layout from '@components/layout'
import {
  queryString,
  imageUrl,
  appUrlScheme,
  collectEvent,
  isWeibo,
  isQQ,
  isAndroid,
  isWeiXin,
  greaterThanCurrentVersion,
  // getQueryValue,
} from '@utils/utils'
import { sethandleHeaders } from '@utils/headers'
import { imgConfig, mp3Url, questionsMap, resultMap } from './constants'
import { getQuestionData } from './server'
import './index.scss'
const config = window.CONFIG || {}
// config.userId = config.userId || 'gWZ68VoW4kM'
const headersParams = sethandleHeaders(config)

const url = window.location.href
const weibo = isWeibo()
const qq = isQQ()
const weixin = isWeiXin()
const android = isAndroid()
let version = config.IOS ? true : !greaterThanCurrentVersion(config.version, '1.5.7')

let buttonPressTimer = null

const initUrl = config.nodeEnv === 'production' ? 'https://finka-h5.finkapp.cn' : 'https://finka-h5.wowkaka.cn'

const App = () => {
  const [isPlay, setIsPlay] = useState(false)
  const [loading, setLoading] = useState(true)
  const [first, setFirst] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [subjectInfo, setSubjectInfo] = useState({})
  const [options, setOptions] = useState([])
  const [testResultKey, setTestResultKey] = useState('')
  const [testResult, setTestResult] = useState({})
  const [saveImg, setSaveImg] = useState(null)
  const [hideSaveBtn, setHideSaveBtn] = useState(false)
  const [hideShareBtn, setHideShareBtn] = useState(false)
  const [isShare, setIsShare] = useState(false)
  const [musicImg, setMusicImg] = useState(imgConfig.music4)
  const [showUser, setShowUser] = useState(false)
  const [weiboBrowser, setWeiboBrowser] = useState(false)
  const [shareToken, setShareToken] = useState('')
  const audioRef = useRef(null)

  const handlerPlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlay) {
      audio.pause()
      activeIndex === 9 ? setMusicImg(imgConfig.music3) : setMusicImg(imgConfig.music4)
    } else {
      audio.play()
      activeIndex === 9 ? setMusicImg(imgConfig.music2) : setMusicImg(imgConfig.music1)
    }
    setIsPlay(!isPlay)
  }

  const handlerStart = () => {
    setActiveIndex(activeIndex + 1)
  }

  const handleBrowser = () => {
    collectEvent('WebClick', {
      element_content: '打开App',
      title: `我的荷尔蒙味道${testResultKey}`,
      url,
    })
    let downloader

    const yybUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cupidapp.live&ckey=CK1507226084937&android_schema=' // 应用宝地址
    const pageUrl = 'finka2020://webview/openNew'
    if (android) {
      if (weibo) {
        setWeiboBrowser(true)
        return
      }
      if (qq || weixin) {
        window.location.href = yybUrl + encodeURIComponent(pageUrl)
      } else {
        window.location.href = pageUrl
        downloader = setTimeout(function () {
          window.location.href = 'https://datarangers.finkapp.cn/s/lU8PVD9R'
        }, 3000)
      }
      //判断安卓是否安装app
      document.addEventListener('visibilitychange webkitvisibilitychange', function () {
        // 如果页面隐藏，推测打开scheme成功，清除下载任务
        if (document.hidden || document.webkitHidden) {
          clearTimeout(downloader)
        }
      })
      window.addEventListener('pagehide', function () {
        clearTimeout(downloader)
      })
    } else {
      if (weibo || qq) return setWeiboBrowser(true)

      window.location.href = `${initUrl}/openApp`
    }
  }

  const handleButtonPress = () => {
    buttonPressTimer = setTimeout(() => {
      Toast.info('保存到相册')
      collectEvent('WebClick', {
        element_content: '保存到相册',
        title: `我的荷尔蒙味道${testResultKey}`,
        url,
      })
    }, 1500)
  }

  const handleButtonRelease = () => {
    clearTimeout(buttonPressTimer)
  }

  const handlerShare = () => {
    fetch(`/api/2021/activity/mbti/subject/share`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString({
        userId: config?.userId || '',
        recordId: testResult?.analysisResult?.recordId || '',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        Toast.hide()
        const { status } = res
        if (status === 200) {
          setShowUser(true)
          setTimeout(() => {
            setHideShareBtn(false)
            if (config?.userId) {
              Toast.success('您已成功解锁最匹配用户')
            }
          }, 1000)
        } else {
          Toast.fail(res.message, 4)
        }
      })
  }

  const copyText = (text) => {
    try {
      // 数字没有 .length 不能执行selectText 需要转化成字符串
      const textString = text.toString()
      let input = document.querySelector('#copyUrl2')

      if (!input) {
        input = document.createElement('input')
        input.id = '#copyUrl2'
        input.readOnly = 'readOnly' // 防止ios聚焦触发键盘事件
        input.style.position = 'absolute'
        input.style.left = '-1000px'
        input.style.zIndex = '-1000'
        document.body.appendChild(input)
      }

      input.value = textString
      // ios必须先选中文字且不支持 input.select();
      selectText(input, 0, textString.length)
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        // alert('已复制到粘贴板')
      } else {
        console.log('不兼容')
      }
      input.blur()
      // Toast.info('复制成功')
    } catch (e) {
      Toast.info('复制失败')
      console.log('复制失败')
    }

    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    function selectText(textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) {
        //ie
        const range = textbox.createTextRange()
        range.collapse(true)
        range.moveStart('character', startIndex) //起始光标
        range.moveEnd('character', stopIndex - startIndex) //结束光标
        range.select() //不兼容苹果
      } else {
        //firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex)
        textbox.focus()
      }
    }
  }

  const handlerSubmit = (optionsId) => {
    Toast.info('正在提交,请稍后')

    fetch(`/api/2021/activity/mbti/subject/submit`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString({
        userId: config?.userId || '',
        optionIds: optionsId || '',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        Toast.hide()
        const { status, data = {} } = res
        if (status === 200) {
          const key = data?.analysisResult?.testResult || ''
          localStorage.setItem('testResult', JSON.stringify(data))
          setTestResult(data)
          setTestResultKey(key)
          // setShareToken(data?.analysisResult?.shareToken || 'copy')
          collectEvent('predefine_pageview', {
            title: `我的荷尔蒙味道${key}`,
            url,
          })
          setActiveIndex(activeIndex + 1)
          if (!config?.userId) {
            setHideSaveBtn(true)
          }
        } else {
          Toast.fail(res.message, 4)
        }
      })
  }

  // 提交答题
  const handlerQuestion = (item) => {
    const question = subjectInfo[activeIndex - 1]

    collectEvent('WebClick', {
      title: question?.subjectName || '',
      element_content: item.optionText || '',
      url,
    })

    const optionsId = [...options, item.optionId]

    if (optionsId.length === 8) {
      handlerSubmit(optionsId)
    } else {
      setActiveIndex(activeIndex + 1)

      const question = subjectInfo[activeIndex]

      collectEvent('predefine_pageview', {
        title: question?.subjectName || '',
        url,
      })
    }
    setOptions(optionsId)
  }

  // 保存图片
  const handlerSaveImg = () => {
    // alert('handlerSaveImg')
    Toast.loading('正在生成测试结果...', 60)
    const ele = document.querySelector('#app')
    const height = document.getElementById('hormone__vizibility').offsetTop

    html2canvas(ele, {
      useCORS: true,
      background: '#ffffff',
      width: document.body.scrollWidth,
      height: height > 1170 ? height : 1170,
      scale: 4, // 8
      dpi: 2, // 2
    }).then((canvas) => {
      const blobFile = canvas.toDataURL('image/jpeg', 1)
      setSaveImg(blobFile)

      Toast.hide()
    })
  }

  // 渲染结果页
  const renderResult = (key) => {
    const result = resultMap[key]
    console.log(testResult)

    return (
      <div key={key}>
        <div
          style={{ backgroundImage: 'url(' + result.bg + ')' }}
          loading={loading}
          className='hormoneResult hormone__result'
        >
          {/* <div></div>
            <img className='hormone__result-bg' src={result.bg} />
          </div> */}

          {weiboBrowser && (
            <div
              onClick={() => {
                setWeiboBrowser(false)
              }}
              className='hormone__brower am-modal-mask'
            >
              <img className='hormone__plane' src={imgConfig.arrow} />
              <div>点击右上角，打开浏览器查看更多</div>
            </div>
          )}
          <div className='hormone__result-user'>
            {testResult?.userId && (
              <span className='hormone__result-avatar-box'>
                <img className='hormone__result-avatar' src={imageUrl(testResult?.avatarImage || '')} />
              </span>
            )}
            <span className='hormone__result-nickname'>{testResult?.nickname || ''}</span>
          </div>
          <img className='hormone__result-bg' src={result.header} />
          <img src={result.content} />
          <img src={result.users} />
          <div className='hormone__result-footerResult'>
            <img src={imgConfig.footerResult} />
            <img className='QRCode' src={config.nodeEnv === 'production' ? imgConfig.qcCodeONline : imgConfig.qcCode} />
          </div>

          {!loading && (
            <>
              {/* <QRCode
                value={
                  config?.nodeEnv === 'production'
                    ? `https://hrm.fk-abc1.com/hd/2021/hormone?showShareButton=true`
                    : window.location.href
                }
              /> */}
              {/* <img
                className='QRCode'
                src={config.nodeEnv === 'production' ? imgConfig.qcCodeONline : imgConfig.qcCode}
              /> */}
              {/* <div className='hormone__result-code'>扫一扫参与活动</div> */}
              {config?.userId ? (
                <>
                  <div className={`hormone__result-share ${!hideShareBtn ? '' : 'hormone__result-share-hide'}`}>
                    {/* <div className={`${!hideShareBtn ? 'hormone__result-share' : 'hormone__result-share'}`}> */}
                    {/* 站内操作 */}
                    {!showUser && <span className='hormone__clock'>解锁</span>}

                    <div
                      className={`hormone__result-share-avatar ${!showUser ? 'hormone__result-share-avatar-blur' : ''}`}
                      onClick={() => {
                        if (showUser) {
                          location.href =
                            appUrlScheme + '://user/' + testResult?.mysteryMen?.userId || config.userId || ''
                        } else {
                          collectEvent('WebClick', {
                            element_content: '保存并分享',
                            title: `我的荷尔蒙味道${testResultKey}`,
                            url,
                          })

                          handlerShare()
                          setHideShareBtn(true)
                          setIsShare(true)
                        }
                      }}
                    >
                      <img src={imageUrl(testResult?.mysteryMen?.avatarImage || '')} />
                    </div>
                    <div className='hormone__result-share-right'>
                      <div
                        onClick={() => {
                          collectEvent('WebClick', {
                            element_content: '保存并分享',
                            title: `我的荷尔蒙味道${testResultKey}`,
                            url,
                          })

                          handlerShare()
                          setHideShareBtn(true)
                          setIsShare(true)

                          // location.href = `finka2020://pasteboardCopy?content=${testResult?.analysisResult?.shareToken}`
                        }}
                        className='hormone__result-share-title'
                      >
                        {version ? (isShare ? '分享图片' : '分享解锁你最匹配的他') : '保存图片'}
                      </div>
                      {isShare && version && (
                        <div className='hormone__result-share-desc'>点击左侧头像查看最匹配的他</div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* 站外操作 */}
                  {/* {!hideSaveBtn && isWeibo && (
                    <>
                      <div
                        onClick={() => {
                          collectEvent('WebClick', {
                            title: '保存到相册',
                            element_content: `我的荷尔蒙味道${testResultKey}`,
                            url,
                          })
                          setHideSaveBtn(true)
                        }}
                        className='hormone__result-saveImg'
                      >
                        {weibo ? '手动截图分享测试结果' : '点击生成结果海报'}
                      </div>
                    </>
                  )} */}
                </>
              )}
            </>
          )}
          {!config?.userId && <div id='hormone__vizibility'>454</div>}
        </div>
      </div>
    )
  }

  // 渲染问题页面
  const renderQuestion = (list) => {
    const question = questionsMap[`question${activeIndex}`]

    const item = list[activeIndex - 1] || {}

    return (
      <div key={item.subjectId}>
        <div className='hormone__question'>
          <img src={question.bg} />
        </div>
        <div loading={loading} className='hormone__content'>
          <img src={question.question} />
          {/* <img className='hormone__content-header' src={question.question1} />
          <img className='hormone__content-question' src={question.question2} /> */}
          <div
            className={`hormone__content-questionBox hormone__content-${activeIndex}A`}
            onClick={() => {
              handlerQuestion(item.options[0])
            }}
          ></div>
          <div
            className={`hormone__content-questionBox hormone__content-${activeIndex}B`}
            onClick={() => {
              handlerQuestion(item.options[1])
            }}
          ></div>
        </div>

        <div className='hormone__content-footer1'>
          <img src={imgConfig.footer1} />
        </div>
      </div>
    )
  }

  useEffect(() => {
    let agent = '其他浏览器'

    if (weibo) {
      agent = '微博'
    }
    if (qq) {
      agent = 'QQ'
    }
    if (weixin) {
      agent = '微信'
    }

    const param = {
      title: '测测你的荷尔蒙味道',
      url,
      alo_refer: agent,
    }

    if (config?.userId) {
      delete param.alo_refer
    }

    collectEvent('predefine_pageview', param)
    getQuestionData().then((res) => {
      const { success, data } = res
      if (!success) return Toast.fail('服务器错误')

      setSubjectInfo(data?.subjectInfo || [])
      setShareToken(
        data?.shareToken || '3http://finka.cn##r87@hyNlmwlGYdBKs9tqNHZGEq7M2U4bhroONhreCmhlH8Tn03PVVYhbna7CgNMbubU4##'
      )
      setLoading(false)
      Toast.hide()

      const question = data?.subjectInfo[0] || {}
      collectEvent('predefine_pageview', {
        title: question?.subjectName || '',
        url,
      })
    })

    document.addEventListener('visibilitychange', () => {
      if (isPlay) {
        if (document.hidden) {
          setIsPlay(!isPlay)
        }
      }
    })

    // document.addEventListener('longpress', () => {})
  }, [])

  useEffect(() => {
    if (hideSaveBtn) {
      handlerSaveImg(options)

      setTimeout(() => {
        setHideSaveBtn(false)
      }, 2000)
    }
  }, [hideSaveBtn])

  useEffect(() => {
    if (hideShareBtn) {
      location.href = 'finka2020://webview/snapWebContent?album=1&callback=finish'
    }
  }, [hideShareBtn])

  useEffect(() => {
    if (activeIndex === 9) {
      isPlay ? setMusicImg(imgConfig.music2) : setMusicImg(imgConfig.music3)
    }
  }, [activeIndex])

  return (
    <div className='wrapper'>
      <Layout>
        <div
          className='hormone'
          id='resultPage'
          onClick={() => {
            if (first) {
              const audio = audioRef.current
              audio.play()
              setFirst(false)
              setMusicImg(imgConfig.music1)
            }
          }}
        >
          <div className='hormone__video'>
            <audio ref={audioRef} autoPlay loop controls preload='auto' src={mp3Url} />
            <input readOnly id='copyUrl2' value={shareToken || 'copy'} />
          </div>
          {!hideSaveBtn && (
            <>
              <div
                className='hormone__play'
                onClick={() => {
                  handlerPlay()
                }}
              >
                <img src={musicImg} />
              </div>
              {!config?.userId && activeIndex === 9 && (
                <>
                  <img
                    onClick={() => {
                      handleBrowser()
                    }}
                    className='hormone__openApp'
                    src={imgConfig.openFankaApp}
                  />
                  {!weibo && <div className='hormone__longPress'>长按保存图片</div>}
                </>
              )}
            </>
          )}

          {/* 首页 */}
          {activeIndex === 0 && (
            <div>
              <div className='hormone__video'>
                <img src={imgConfig.gif} />
              </div>
              <div loading={loading} className='hormone__content'>
                <img src={imgConfig.bg} />
              </div>
              {/* <button
                style={{ zIndex: 9999999, background: '#f00', position: 'absolute' }}
                onClick={copyText('h5实现一键复制到粘贴板 兼容ios,shawanyi')}
              >
                复制
              </button> */}
              <div
                className='hormone-start'
                onClick={() => {
                  collectEvent('WebClick', {
                    title: '测测你的荷尔蒙味道',
                    element_content: '点击开始',
                    url,
                  })

                  if (first) {
                    const audio = audioRef.current
                    audio.play()
                    setFirst(false)
                  }

                  copyText(shareToken)

                  handlerStart()
                }}
              ></div>
              <div className='hormone__content-footer'>
                <img src={imgConfig.footer} />
              </div>
            </div>
          )}

          {activeIndex > 0 && activeIndex < 9 && renderQuestion(subjectInfo)}
          {activeIndex === 9 && renderResult(testResultKey || '苹果花+纸莎草')}
          {/* {activeIndex === 9 && renderResult('苹果花+纸莎草' || '小苍兰+琥珀木')} */}
          <div
            className='hormone__content'
            // onClick={() => {
            //   copyText(shareToken)
            // }}
          >
            <img onTouchStart={handleButtonPress} onTouchEnd={handleButtonRelease} className='music' src={saveImg} />
          </div>
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
