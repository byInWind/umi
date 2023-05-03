import React, { useState } from 'react'
import { Button } from 'antd-mobile'
import { render } from 'react-dom'
import Layout from '@components/layout'

import './index.scss'

const config = window.CONFIG || {}

const App = () => {
  const [index, setIndex] = useState(0)

  const handleClick = () => {
    console.log('handleCli0000ckww')
    setIndex(index + 1)
  }

  return (
    <div className='wrapper'>
      <Layout>
        <div className='demo'>
          <img src='http://thirdwx.qlogo.cn/mmopen/vi_32/kBHicOia4GJeUkhlNrrJzAzTwaZxEzYhGXl013OrYibia3aZBHV8ZSEP2CqshOiaXicTLzBIyYLbm3FJJHY4VO6GEpmQ/132' />
          <h1>Hello Demo!</h1>
          <p>Welcome to Demo!</p>
          <div className='click'>
            You clicked
            <span>{index}</span>
            times
          </div>
          <Button type='button' onClick={handleClick}>
            Click me
          </Button>
        </div>
      </Layout>
    </div>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
