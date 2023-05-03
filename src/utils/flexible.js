// 此文件用于templates/index.hbs
// 达到适配手机与电脑的目的

function flexible(window, document) {
  // const { device } = window.CONFIG
  const docElement = document.documentElement
  let screenWidth = docElement.clientWidth

  function setPhoneRem() {
    // console.log(screenWidth)
    // if (screenWidth > 425) {
    //   screenWidth = 425
    // }
    //37.5  50
    // docElement.style.fontSize = `${(screenWidth / 750) * 100}px`
    docElement.style.fontSize = `${screenWidth / 10}px`
  }

  // function setComputerRem() {
  //   if (screenWidth > 1366) {
  //     screenWidth = 1366
  //   }
  //   docElement.style.fontSize = `${screenWidth / 13.66}px`
  // }

  // if (device) {
  //   document.body.style.minWidth = `980px`

  //   setComputerRem()

  //   // reset rem unit on page resize
  //   window.addEventListener('resize', setComputerRem)
  //   window.addEventListener('pageshow', e => {
  //     if (e.persisted) {
  //       setComputerRem()
  //     }
  //   })

  //   return false
  // }

  // document.body.style.maxWidth = `1024px`

  setPhoneRem()

  // reset rem unit on page resize
  window.addEventListener('resize', setPhoneRem)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      setPhoneRem()
    }
  })
}

export default flexible
