import React from 'react'
import PropType from 'prop-types'

const FourthPage = ({ pagetype4, listData }) => {
  return (
    <div className='fourthpage'>
      {pagetype4 === 0 || pagetype4 === 1 ? (
        <div className='fourthpage-title'>
          <p>
            “啪”是罐头被打开的声音 <br />
            “扑通”是心跳的声音 <br />
          </p>
          <p>
            每一次 打开 <br />
            每一次 心动 <br />
          </p>
        </div>
      ) : (
        <div className='fourthpage-title'>
          <p>
            地铁 公交 出租车 <br />
            好像是一条条流水线
            <br />
          </p>
          <p>
            我们把自己塞进去
            <br />
            挤得好像橘子罐头 金枪鱼罐头
            <br />
          </p>
        </div>
      )}
      {pagetype4 === 0 && (
        <div className='fourthpage-subtitle'>
          <p>
            在这一年中
            <br />
            你曾与<span>{listData?.matchNum}</span>个新朋友相遇
            <br />
            他们在全球范围内
            <br />
            <span>{listData?.matchProvNum}</span>个省份（州）、
            <span>{listData?.matchCityNum}</span>
            个城市
            <br />
            见证这一份心动
            <br />
          </p>
        </div>
      )}
      {pagetype4 === 1 && (
        <div className='fourthpage-subtitle'>
          <p>
            钢铁森林之中
            <br />
            能与<span>{listData?.matchNum}</span>个好友相遇
            <br />
            好幸运
            <br />
          </p>
        </div>
      )}
      {pagetype4 === 2 && (
        <div className='fourthpage-subtitle'>
          <p>
            也庆祝
            <br />
            纷纷之中
            <br />
            能在<span>{listData?.lastActivePlace}</span>同城遇见<span>{listData?.matchNum}</span>个好友
            <br />
            感谢温暖
          </p>
        </div>
      )}
      {pagetype4 === 3 && (
        <div className='fourthpage-subtitle'>
          <p>
            相遇心动是件并不容易的事情
            <br />
            但在翻咔还有
            <br />
            <span>98</span>个国家、<span>34</span>个省份、<span>661</span>个城市
            <br />
            的男孩等着你去发现
          </p>
        </div>
      )}
    </div>
  )
}
FourthPage.propTypes = {
  listData: PropType.array,
  pagetype4: PropType.number,
}
export default FourthPage
