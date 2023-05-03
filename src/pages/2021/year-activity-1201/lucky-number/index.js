import React from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'

import './index.scss'
import luckyTitle from '@images/2021/year-activity-1201/luckyTitle.png'

const config = window.CONFIG || {}

const App = () => {
  return (
    <div className='hour'>
      <Layout>
        <div className='hour-title'>
          <img src={luckyTitle} />
        </div>
        <div className='hour-main'>
          <p>本阶段活动结束时，最终排名在幸运排名上的主播，会额外获得额外加成奖励：</p>
          <p>
            第六名：第三阶段第一轮活动数值增加1000
            <br />
            第十二名：第三阶段第一轮活动数值增加800
            <br />
            第十五名：第三阶段第一轮活动数值增加600
            <br />
            第十八名：第三阶段第一轮活动数值增加300
          </p>
        </div>
        <div className='hour-footer'>
          本次活动及所有奖品与苹果公司（APPLE INC）无关
          <br />
          All Rights Reserved Finka
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
