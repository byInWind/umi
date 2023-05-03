import React from 'react'
import PropType from 'prop-types'
import { imgConfig } from '../constants'
import moment from 'moment'

const FivePage = ({ pagetype5, listData }) => {
  let time = moment(parseInt(listData?.postMostCommentDate)).format('YYYY年MM月DD日')

  return (
    <div className='fivepage'>
      <div className='fivepage-boxbg'>
        <img src={imgConfig.fivebg} />
      </div>
      <div className={`fivepage-title ${pagetype5 === 2 || pagetype5 === 3 ? 'fivepage-title1' : ''}`}>
        <p>
          重复的罐头可以有千千万万个
          <br />
          但我知道
          <br />
          罐头里专属于你的回忆故事
          <br />
          绝无仅有
          <br />
          珍稀如孤本
        </p>
      </div>
      {(pagetype5 === 0 || pagetype5 === 1) && (
        <div>
          <div className='fivepage-user'>
            <div
              className='fivepage-user-img'
              style={{ backgroundImage: 'url(' + listData?.postMostImageUrl + ')' }}
            ></div>
            <div className='fivepage-user-wen'>
              <p>{time}</p>
              <p>
                <img src={imgConfig.zan} />
                {listData?.postMostCommentNum}
              </p>
            </div>
          </div>
          <div className='fivepage-subtitle paddingTop0'>
            <p>
              你将<span>{listData?.postNum}</span>条记忆记录为动态
              <br />
              贮藏在这个小小的密封金属盒中
              <br />
              收获了<span>{listData?.postCommentNum}</span>次称赞的声音
            </p>
          </div>
        </div>
      )}
      {pagetype5 === 2 && (
        <div className='fivepage-subtitle bottom40'>
          <p>
            你将<span>{listData?.postNum}</span>条记忆记录为动态
            <br />
            贮藏在这个小小的密封金属盒中
            <br />
            每一条都如此闪耀
          </p>
        </div>
      )}
      {pagetype5 === 3 && (
        <div className='fivepage-subtitle bottom50'>
          <p>
            如此珍稀的回忆
            <br />
            要等待你分享给愿意倾听你的人
          </p>
        </div>
      )}
    </div>
  )
}
FivePage.propTypes = {
  listData: PropType.array,
  pagetype5: PropType.number,
}
export default FivePage
