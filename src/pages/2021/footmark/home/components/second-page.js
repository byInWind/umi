import React from 'react'
import PropType from 'prop-types'
import { imgConfig } from '../constants'

const SecondPage = ({ pagetype2, listData }) => {
  return (
    <div className='scondpage'>
      {pagetype2 !== 3 ? (
        <div className='scondpage-title'>
          <p>
            罐头可爱
            <br />
            在于“恰当地”陪伴
            <br />
            较零食正式
            <br />
            又较正餐随意
          </p>
          <p>“访问”亦是如此</p>
        </div>
      ) : (
        <div className='scondpage-title'>
          <p>如何选择一款口味绝妙的罐头？</p>
          <p>
            包装的样式、
            <br />
            口味的诱人程度、
            <br />
            宣传语的新奇独特
            <br />
            ……
          </p>
        </div>
      )}
      {pagetype2 === 0 && (
        <div className='scondpage-subtitle'>
          <p>
            不在多 而在可靠
            <br />
            365天，53周，收获了<span>{listData?.visitorNum}</span>次的访问关切
          </p>
          <p>
            你将眷顾访问留给了他
            <br />
            殷切关注着他点点滴滴的动态
          </p>
          <div className='scondpage-user'>
            <p
              style={{
                backgroundImage: `url(${
                  listData?.mostVisitImageUrl ? listData?.mostVisitImageUrl : imgConfig.defaultAvatar
                }`,
              }}
            ></p>
            <p className='texthidden'>{listData?.mostVisitNickName}</p>
          </div>
        </div>
      )}
      {pagetype2 === 1 && (
        <div className='scondpage-subtitle'>
          <p>
            较轻轻略过关切 较聊天互动轻松
            <br />
            365天，53周，收获了<span>{listData?.visitorNum}</span>次的访问关切
          </p>
          <div className='scondpage-box'>
            <div className='scondpage-box-item'>
              <p>
                其中有他
                <br />
                对你最为热切
              </p>
              <div className='scondpage-user'>
                <p
                  style={{
                    backgroundImage: `url(${
                      listData?.visitMostImageUrl ? listData?.visitMostImageUrl : imgConfig.defaultAvatar
                    }`,
                  }}
                ></p>
                <p className='texthidden'>{listData?.visitMostNickName}</p>
              </div>
            </div>
            <div className='scondpage-box-item'>
              <p>
                而你则是对
                <br />
                他的味道情有独钟
              </p>
              <div className='scondpage-user'>
                <p
                  style={{
                    backgroundImage: `url(${
                      listData?.mostVisitImageUrl ? listData?.mostVisitImageUrl : imgConfig.defaultAvatar
                    }`,
                  }}
                ></p>
                <p className='texthidden'>{listData?.mostVisitNickName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {pagetype2 === 2 && (
        <div className='scondpage-subtitle'>
          <p>在这一年之中</p>
          <div className='scondpage-box'>
            <div className='scondpage-box-item'>
              <p>
                有人对你如此痴恋
                <br />
                <b>他对你访问最多</b>
              </p>
              <div className='scondpage-user'>
                <p
                  style={{
                    backgroundImage: `url(${
                      listData?.visitMostImageUrl ? listData?.visitMostImageUrl : imgConfig.defaultAvatar
                    }`,
                  }}
                ></p>
                <p className='texthidden'>{listData?.visitMostNickName}</p>
              </div>
            </div>
            <div className='scondpage-box-item'>
              <p style={{ marginTop: '1rem' }}>
                一点一滴
                <br />
                今年已经收获了
                <br />
                <span className='noleft'>{listData?.visitorNum}</span>
                <b>人的访问</b>
              </p>
            </div>
          </div>
        </div>
      )}
      {pagetype2 === 3 && (
        <div className='scondpage-subtitle bottom40 left70'>
          在这个罐子没有启封之前 <br />
          在还没有真的品尝到你的味道之前
          <br />
          多些展示自己
          <br />
          会吸引更多的停驻
        </div>
      )}
    </div>
  )
}
SecondPage.propTypes = {
  listData: PropType.array,
  pagetype2: PropType.number,
}
export default SecondPage
