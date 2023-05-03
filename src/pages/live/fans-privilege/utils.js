import placeImg from '@images/common/placeImg.png'
export const handleGetReceived = (profile, list = []) => {
  const { level } = profile || {}
  const received = []
  const willReceived = []

  list.forEach((ele) => {
    if (ele.level <= level) {
      received.push(ele)
      ele.state = '生效中'
    } else if (ele.level === level + 4) {
      ele.state = '即将解锁'
      willReceived.push(ele)
    } else if (ele.level === level + 5) {
      ele.state = '即将解锁'
      willReceived.push(ele)
    } else {
      ele.state = '未解锁'
      willReceived.push(ele)
    }
  })

  return {
    received,
    willReceived,
  }
}

export const imgFac = (imgObj = {}) => {
  let img = ''

  try {
    const { variants = [] } = imgObj
    img = variants[0]?.url
  } catch {
    img = placeImg
  }
  return img
}

export const handleProgress = (profile = {}) => {
  const { familiarScore, nextLevelScore } = profile
  const progress = (Number(familiarScore) / Number(nextLevelScore)) * 100

  return `${progress > 100 ? 100 : progress}%`
}
