import React from 'react'
import PropType from 'prop-types'
import moment from 'moment'

const ThirdPage = ({ pagetype3, listData }) => {
  let year = moment(parseInt(listData?.fansBreakDate)).format('YYYY')
  let month = moment(parseInt(listData?.fansBreakDate)).format('MM')
  let day = moment(parseInt(listData?.fansBreakDate)).format('DD')
  const labelFun = () => {
    return (
      <p className='margin5'>
        {listData?.aloMostHeight && listData?.aloMostHeight !== 0 ? <em>{listData?.aloMostHeight}CM</em> : ''}
        {listData?.aloMostWeight && listData?.aloMostWeight !== 0 ? <em>{listData?.aloMostWeight}KG</em> : ''}
        {listData?.aloMostConstellation && <em>{listData?.aloMostConstellation}</em>}
        {listData?.aloMostJob && <em>{listData?.aloMostJob}</em>}
      </p>
    )
  }

  const textFun = () => {
    return (
      <p>
        2021年的新粉丝中
        <br />
        交替着<span>{listData?.aloTopNum}</span>个1，<span>{listData?.aloBotNum}</span>个0
        <br />
        <span className='noleft'>{listData?.aloUnknowNum}</span>个未知需要你亲自开封
      </p>
    )
  }

  return (
    <div className='thirdpage'>
      {pagetype3 === 4 ? (
        <div className='thirdpage-title'>
          <p>
            罐头是在1810年
            <br />
            发明出来的
            <br />
            而开罐器却在1858年
            <br />
            才被发明出来
          </p>
          <p>很奇怪吧</p>
        </div>
      ) : (
        <div className='thirdpage-title'>
          <p>
            罐头是在1810年
            <br />
            发明出来的
            <br />
            而开罐器却在1858年
            <br />
            才被发明出来
          </p>
          <p>
            可能越是重要
            <br />
            越要等一下
          </p>
        </div>
      )}

      {pagetype3 === 0 && (
        <div className='thirdpage-subtitle'>
          <p>
            而你也是在<span>{year}</span>年<span>{month}</span>月<span>{day}</span>日
            <br />
            终于迎来了你的10000个粉丝
          </p>
          {(listData?.aloTopNum && listData?.aloTopNum !== 0) || (listData?.aloBotNum && listData?.aloBotNum !== 0) ? (
            textFun()
          ) : (
            <p>
              你收获了<span>{listData?.aloUnknowNum}</span>个罐头，需要亲自开封才能品尝味道
            </p>
          )}
          {(listData?.aloMostHeight !== 0 && listData?.aloMostHeight) ||
          (listData?.aloMostWeight !== 0 && listData?.aloMostWeight) ||
          listData?.aloMostConstellation ||
          listData?.aloMostJob ? (
            <>
              <p>在这其中，收获最多的口味类型是</p>
              {labelFun()}
            </>
          ) : (
            ''
          )}
        </div>
      )}
      {pagetype3 === 1 && (
        <div className='thirdpage-subtitle'>
          <p>
            私藏心动 2021年有<span>{listData?.aloedNum}</span>个男生
            <br />
            将心动传递给了你
            <br />
            时至今日已成为了<span>{listData?.fansRankCity}</span>城市中
            <br />
            人气排名<span>{listData?.fansRank}</span>的男生
          </p>
          {(listData?.aloTopNum && listData?.aloTopNum !== 0) || (listData?.aloBotNum && listData?.aloBotNum !== 0) ? (
            textFun()
          ) : (
            <p>
              你收获了<span>{listData?.aloUnknowNum}</span>个罐头，需要亲自开封才能品尝味道
            </p>
          )}
          {(listData?.aloMostHeight !== 0 && listData?.aloMostHeight) ||
          (listData?.aloMostWeight !== 0 && listData?.aloMostWeight) ||
          listData?.aloMostConstellation ||
          listData?.aloMostJob ? (
            <>
              <p>在这其中，收获最多的口味类型是</p>
              {labelFun()}
            </>
          ) : (
            ''
          )}
        </div>
      )}
      {pagetype3 === 2 && (
        <div className='thirdpage-subtitle'>
          <p>
            2021年
            <br />有<span>{listData?.aloedNum}</span>个男生将心动传递给了你
          </p>
          {(listData?.aloTopNum && listData?.aloTopNum !== 0) || (listData?.aloBotNum && listData?.aloBotNum !== 0) ? (
            textFun()
          ) : (
            <p>
              你收获了<span>{listData?.aloUnknowNum}</span>个罐头，需要亲自开封才能品尝味道
            </p>
          )}

          {(listData?.aloMostHeight !== 0 && listData?.aloMostHeight) ||
          (listData?.aloMostWeight !== 0 && listData?.aloMostWeight) ||
          listData?.aloMostConstellation ||
          listData?.aloMostJob ? (
            <>
              <p>在这其中，收获最多的口味类型是</p>
              {labelFun()}
            </>
          ) : (
            ''
          )}
        </div>
      )}
      {pagetype3 === 3 && (
        <div className='thirdpage-subtitle'>
          <p>
            2021年
            <br />
            你收到过<span>{listData?.aloedNum}</span>罐封装的心动
          </p>
          {(listData?.aloTopNum && listData?.aloTopNum !== 0) || (listData?.aloBotNum && listData?.aloBotNum !== 0) ? (
            textFun()
          ) : (
            <p>
              你收获了<span>{listData?.aloUnknowNum}</span>个罐头，需要亲自开封才能品尝味道
            </p>
          )}
          {(listData?.aloMostHeight !== 0 && listData?.aloMostHeight) ||
          (listData?.aloMostWeight !== 0 && listData?.aloMostWeight) ||
          listData?.aloMostConstellation ||
          listData?.aloMostJob ? (
            <>
              <p>在这其中，收获最多的口味类型是</p>
              {labelFun()}
            </>
          ) : (
            ''
          )}
        </div>
      )}
      {pagetype3 === 4 && (
        <div className='thirdpage-subtitle bottom40 left70'>
          <p className='margin60'>
            可是 有时候就是这样的
            <br />
            重要的东西有时也会迟来一步
            <br />
            无论是爱情还是生活
            <br />
            再等等
            <br />
            才能遇见那个不期而遇
          </p>
        </div>
      )}
    </div>
  )
}
ThirdPage.propTypes = {
  listData: PropType.array,
  pagetype3: PropType.number,
}
export default ThirdPage
