import React from 'react'
import { imgConfig } from '../constants'

const FirstPage1 = () => {
  return (
    <div className='firstpage1'>
      <p>
        “Poooooh——”
        <br />
        罐头被打开
      </p>
      <p>
        从这一秒钟开始
        <br />
        记忆 开始 灌装
        <br /> 丰沛的记忆才足够可口
        <br /> 念恋不忘也是回味的充要条件
        <br /> 多点故事 下次再见。
      </p>
      <img src={imgConfig.pot} />
    </div>
  )
}

export default FirstPage1
