import React from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'

import './index.scss'

const config = window.CONFIG || {}

const App = () => {
  return (
    <Layout>
      <div className='agreement'>
        <h2>信息授权协议</h2>
        <div className='agreement-content'>
          <p>1.</p>
          <p>
            为了生成您的年度使用报告，翻咔将根据您的授权使用您账号中2021年1月1日至2021年12月27日期间的以下信息：注册时间、注册至今天数、您的头像和昵称、访问及被访问记录、关注及粉丝的相关信息、匹配记录、内容发布记录、点赞记录及获赞记录、个人主页的用户资料等公开信息，并据此进行汇总统计，以用于本活动页面向您展示。
          </p>
        </div>
        <div className='agreement-content'>
          <p>2.</p>
          <p>您的年度报告根据您的个人数据生成，每个人都会有所差异，翻咔无法保证每个人的绝对准确性和有效性。</p>
        </div>
        <div className='agreement-content'>
          <p>3.</p>
          <p>活动页面包含您的个人信息，当您选择向其他人转发活动页面截图时，其他人将会看到上述信息。</p>
        </div>
      </div>
    </Layout>
  )
}
render(<App {...config} />, document.querySelector('#app'))

export default App
