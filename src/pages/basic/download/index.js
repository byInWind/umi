import React, { useState, useReducer, useEffect, useLayoutEffect, useRef } from 'react'
import { render } from 'react-dom'
import './index.scss'

const App = () => {
  const [inputVal, setInputVal] = useState('')
  const [index, setIndex] = useState(1)
  const [items, setItems] = useState([])
  const [readyNum, setReadyNum] = useState(0)
  const [nullNum, setNullNum] = useState(0)
  const addFun = () => {
    if (!inputVal) {
      alert('老实点，输入东西')
      return
    }
    items.push({
      id: items.length,
      state: false,
      content: inputVal
    })
    setItems([...items])
    localStorage.setItem('items', JSON.stringify([...items]))
    setInputVal('')
  }
  const clearFun = () => {
    setItems([])
    localStorage.setItem('items', JSON.stringify([]))
  }
  let closeFun = (id) => {
    console.log(111, id)
    items.splice(id, 1)
    setItems([...items])
    localStorage.setItem('items', JSON.stringify([...items]))
  }
  const readyFun = (id) => {
    items.map(function (item) {
      if (item.id == id) {
        item.state = !item.state
        if (item.state) {
          setReadyNum(readyNum + 1)
        } else {
          setReadyNum(readyNum - 1)
        }
      }
    })
    localStorage.setItem('items', JSON.stringify([...items]))
  }
  const changeIndex = () => {

    console.log(111, index, ref)
    setIndex(2)
    console.log(222, index, ref)
    setTimeout(function () {
      console.log(333, index, ref)
    }, 0)
  }

  const ref = useRef()
  ref.current = index

  useEffect(() => {
    changeIndex()
    if (localStorage.getItem('items')) {
      let itemsVal = JSON.parse(localStorage.getItem('items'))
      setItems(itemsVal)
      items.map(function (item) {
        if (item.state) {
          setReadyNum(readyNum + 1)
        }
      })
    }
  }, [])
  return (
    <div className="center">
      <h1 className="h1">todos</h1>
      <div className="todo-box">
        <div className="flex">
          <input className="input" placeholder="今天要做什么？" value={inputVal} onChange={(e) => { setInputVal(e.target.value) }} />
          <div className="add" onClick={() => { addFun() }}>添加</div>
        </div>
        <div className="list">
          <div>
            {items?.map((item, index) => (
              <div className="item" key={index}>
                <p className="ready" onClick={() => { readyFun(item.id) }}> <span className={`tick ${item.state ? '' : 'none'}`}>✅</span></p>
                {item.id} {item.content}
                <span className="close" onClick={() => {
                  closeFun(item.id)
                }}>X</span>
              </div>
            ))}
          </div>

          <div className="count-box">
            <div>总记: <span className="allCount">{items.length}</span> 个</div>
            <div className="count">已完成: <span className="readyCount">{readyNum}</span>个</div>
            <div className="clear" onClick={() => { clearFun() }}>清空</div>
          </div>
        </div>

      </div>
    </div >
  )
}
render(<App />, document.querySelector('#app'))
export default App
