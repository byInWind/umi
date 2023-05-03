import React, { useState, useEffect } from 'react'
import { Toast } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { sethandleHeaders } from '@utils/headers'
import { collectEvent } from '@utils/utils'
import Empty from '@components/empty'

import './index.scss'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const App = () => {
  const [wonList, setWonList] = useState([])
  const getWonList = () => {
    fetch(`/api/activity/daydreamer-2021/won_awards_list`, {
      method: 'get',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/json' }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        Toast.hide()
        setWonList(data.userWonAwardsTeamsView)
      })
  }
  useEffect(() => {
    Toast.loading('Loading...', 60 * 10)
    getWonList()
    collectEvent('predefine_pageview', {
      title: '白日梦想家活动',
    })
    console.log(9)
  }, [])

  return (
    <div className='wrapper'>
      <Layout>
        {wonList?.length > 0 ? (
          <>
            <ul className='wonlist'>
              {wonList.map((item, index) => (
                <li key={index}>
                  <div className='wonlist-left'>
                    <p>
                      <img
                        src={`${
                          item.userAvatarImage?.avatarImage?.imageId == 'g-Xf-T63ZWBqRPIj7cLlMQ'
                            ? 'https://up-a.finkapp.cn/i/g-Xf-T63ZWBqRPIj7cLlMQ'
                            : 'https://pic.finkapp.cn/' + item.userAvatarImage?.avatarImage?.imageId
                        }`}
                        onClick={() => {
                          collectEvent('WebClick', {
                            title: '白日梦想家活动',
                            element_content: '用户头像',
                          })
                          location.href = `finka2020://user/${item.userAvatarImage.userId}`
                        }}
                      />
                    </p>
                    <p>
                      <img
                        src={`${
                          item.recvUserAvatarImage?.avatarImage?.imageId == 'g-Xf-T63ZWBqRPIj7cLlMQ'
                            ? 'https://up-a.finkapp.cn/i/g-Xf-T63ZWBqRPIj7cLlMQ'
                            : 'https://pic.finkapp.cn/' + item.recvUserAvatarImage?.avatarImage?.imageId
                        }`}
                        onClick={() => {
                          collectEvent('WebClick', {
                            title: '白日梦想家活动',
                            element_content: '用户头像',
                          })
                          location.href = `finka2020://user/${item.recvUserAvatarImage.userId}`
                        }}
                      />
                    </p>
                  </div>
                  <div className='wonlist-right'>
                    <p>抽奖码</p>
                    <p>{item?.teamId}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Empty />
        )}
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
