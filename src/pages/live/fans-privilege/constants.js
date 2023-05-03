import back from '@images/live/fans-privilege/back.png'
import right from '@images/live/fans-privilege/right.png'
import more from '@images/live/fans-privilege/more.png'
import ten from '@images/live/fans-privilege/10.png'
import icon1 from '@images/live/fans-privilege/icon1.png'
import placeImg from '@images/common/placeImg.png'

export const imgConfig = {
  topImg: 'https://pic.finkapp.cn/hDdqCZ5fN9ZqRPIj7cLlMQ',
  back,
  more,
  ten,
  icon1,
  right,
  placeImg,
}

const one = 'linear-gradient(131deg, #fcbe04 4%, #ff985a 100%)'
const tenth = 'linear-gradient(131deg,#ff6373 4%, #ff84d6 100%)'
const twenty = 'linear-gradient(131deg,#ac3fff 4%, #d784ff 100%)'
const thirty = 'linear-gradient(131deg,#ed2828 4%, #ff8e68 100%)'

export const levelList = {
  1: {
    backgroundColor: one,
  },
}

export const handleLevel = (colors) => {
  const colorList = colors?.split(',') || []

  return `linear-gradient(131deg, ${colorList[0]} 4%, ${colorList[1]} 100%)`
}

export const handleLevelNumber = (level) => {
  if (level < 10) {
    return one
  } else if (level >= 10 && level < 20) {
    return tenth
  } else if (level >= 20 && level < 30) {
    return twenty
  } else if (level >= 30 && level < 40) {
    return thirty
  }
}

export const badgeWidth = {
  3: '3.1rem',
  4: '3.58rem',
  5: '4rem',
}
