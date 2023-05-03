import React from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'

import './index.scss'

const config = window.CONFIG || {}
const App = () => {
  return (
    <Layout>
      <div className='task'>
        <h2>经验值获得方式</h2>
        <div className='task-box'>
          <h3>1.连续有效开播可获得对应经验值：（有效开播：单场开播时长≥15分钟）</h3>
          <p>
            连续有效开播第1天+40
            <br />
            连续有效开播第2天+50 <br />
            连续有效开播第3天+60 <br />
            连续有效开播第4天+70 <br />
            连续有效开播第5天+80 <br />
            连续有效开播第6天+90 <br />
            连续有效开播第7天+100
            <br />
            当连续有效开播≥7天时，每天可获得100经验值
            <br />
            如果断播一天，连续天数从下次直播起重新累计
            <br />
          </p>
        </div>
        <div className='task-box'>
          <h3>2.当场直播累计收益获得对应经验值</h3>
          <p>主播在直播中获得礼物，1饭票=0.02经验值</p>
          <p>主播在直播中获得前10个主播等级专属礼物，1饭票=0.04经验值；第11个起恢复1饭票=0.02经验值</p>
        </div>
        <div className='task-box'>
          <h3>3.新增粉丝数</h3>
          <p>当主播在直播中每获得一个新增关注时+5经验，每日最多可获得500经验值 </p>
        </div>
        <div className='task-box'>
          <h3>4.每日直播时长增加经验值</h3>
          <p>主播每日累计开播时长达到1小时+10经验值</p>
          <p>当主播每日累计开播时长达到2小时+30经验值</p>
        </div>
        <div className='task-box'>
          <h3>5.连续3日未开播</h3>
          <p>每连续3日未开播，若主播等级≥10，则从第三天后每日扣除60经验值 </p>
          <p>每日00:00:00计算每位主播关于【连续3天未开播】的经验值扣除情况</p>
        </div>
        <div className='task-box'>
          <h3>6.满级达成 </h3>
          <p>*当主播等级达到满级，经验值持续累计，但等级展示保持Lv.99+不变</p>
        </div>
      </div>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
