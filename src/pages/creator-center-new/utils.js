export const handlerData = (data) => {
  const {
    exposeAll = 0,
    exposeAllIncr = 0,
    exposeRcmd = 0,
    officialRcmdCount = 0,
    likeAll = 0,
    officialRcmdCountIncr = 0,
    commentAll = 0,
    commentAllIncr = 0,
    shareAll = 0,
    exposeRcmdIncr = 0,
    likeAllIncr = 0,
    shareAllIncr = 0,
    postCount = 0,
    hashtagPostCount = 0,
    officialRcmdAllCount = 0,
  } = data?.model || {}

  const transformationNum = (num) => {
    return num >= 10000 ? (num / 10000).toFixed(1) + '万' : num == 0 ? '0' : num
  }
  const cumulativeData = [
    {
      num: transformationNum(postCount),
      desc: '动态发布',
    },
    {
      num: transformationNum(hashtagPostCount),
      desc: '话题投稿',
    },
    {
      num: transformationNum(officialRcmdAllCount),
      desc: '官方推荐',
    },
  ]

  const interactUp = [
    {
      num: transformationNum(exposeAll),
      desc: '动态曝光量',
      trem: transformationNum(exposeAllIncr),
    },
    {
      num: transformationNum(exposeRcmd),
      desc: '推荐曝光量',
      trem: transformationNum(exposeRcmdIncr),
    },
    {
      num: transformationNum(officialRcmdCount),
      desc: '官方推荐次数',
      trem: transformationNum(officialRcmdCountIncr),
    },
  ]

  const interactDown = [
    {
      num: transformationNum(likeAll),
      desc: '动态点赞量',
      trem: transformationNum(likeAllIncr),
    },
    {
      num: transformationNum(commentAll),
      desc: '动态评论量',
      trem: transformationNum(commentAllIncr),
    },
    {
      num: transformationNum(shareAll),
      desc: '动态分享量',
      trem: transformationNum(shareAllIncr),
    },
  ]

  const avatar = data.user?.avatarImage?.variants[0]?.url || ''
  const name = data.user?.name || ''

  return {
    cumulativeData,
    interactUp,
    interactDown,
    avatar,
    name,
  }
}
