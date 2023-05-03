import React from 'react'
import { render } from 'react-dom'
import Layout from '@components/layout'
import { privilegelist } from './constants'

import './index.scss'

const config = window.CONFIG || {}
const App = () => {
  return (
    <Layout>
      <ul className='privilege'>
        {privilegelist?.map((item, index) => (
          <li className='privilege-item' key={index}>
            <img src={item.icon} className='privilege-item__img' />
            <p className='privilege-item__p'>
              <span>{item.name}</span>
              {item.centen}
            </p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

render(<App {...config} />, document.querySelector('#app'))

export default App
