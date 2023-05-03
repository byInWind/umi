export const handlerData = (data) => {
  const {
    totalNoteCount = 0,
    validNoteCount = 0,
    recommendedNoteCount = 0,
    rcmdCount = 0,
    rcmdIncreasedCount = 0,
    clickedCount = 0,
    clickedRate = 0,
    commentedCount = 0,
    sharedCount = 0,
    sharedIncreasedCount = 0,
    likedCount = 0,
    clickedIncreasedCount = 0,
    commentedIncreasedCount = 0,
    likedIncreasedCount = 0,
    user,
  } = data

  const dataCont = [
    {
      num: totalNoteCount,
      desc: '累计笔记发布',
    },
    {
      num: validNoteCount,
      desc: '累计收录笔记',
    },
    {
      num: recommendedNoteCount,
      desc: '累计推荐笔记',
    },
  ]

  const interactUp = [
    {
      num: rcmdCount,
      desc: '笔记曝光量',
      trem: rcmdIncreasedCount,
    },
    {
      num: clickedCount,
      desc: '笔记点击量',
      trem: clickedIncreasedCount,
    },
    {
      num: clickedRate,
      desc: '笔记点击率',
      trem: 'none',
    },
  ]

  const interactDown = [
    {
      num: commentedCount,
      desc: '笔记评论量',
      trem: commentedIncreasedCount,
    },
    {
      num: sharedCount,
      desc: '笔记转发量',
      trem: sharedIncreasedCount,
    },
    {
      num: likedCount,
      desc: '笔记点赞量',
      trem: likedIncreasedCount,
    },
  ]

  const avatar = user?.avatarImage?.variants[0]?.url || ''

  return {
    dataCont,
    interactUp,
    interactDown,
    avatar,
  }
}
