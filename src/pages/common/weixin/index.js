import React from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'

import './index.scss'

const config = window.CONFIG || {}

const App = () => {
  return (
    <div className='wrapper'>
      <Layout>
        <div className='weixin'>
          <div className='weixin__icon'>i</div>
          <h1>请在微信客户端打开链接</h1>
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
