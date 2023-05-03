import React from 'react'
import { imgConfig } from '../../constants'
import { queryString } from '@utils/utils'
import { sethandleHeaders } from '@utils/headers'
import PropType from 'prop-types'

const config = window.CONFIG || {}
const headersParams = sethandleHeaders(config)

const FirstPhase = ({ taskFirstListData, resetDataList }) => {
  // 领取任务奖励
  const getUserTakeTask = async (item) => {
    const params = {
      taskId: item.taskIdList[0],
    }

    fetch(`/api/liveAct202109/userTakeTask`, {
      method: 'post',
      credentials: 'include',
      headers: Object.assign({}, headersParams, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
      body: queryString(params),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          resetDataList()
        }
      })
  }
  return (
    <div className='rule-box'>
      <div className='rule-box__center'>
        {taskFirstListData?.map((item, index) => (
          <div className='tasklist' key={index}>
            <div className='tasklist-left'>
              <img src={item.icon} />
            </div>
            <div className='tasklist-right'>
              <div className='tasklist-right__wen'>
                <img src={item.title} />
                <p>
                  {item.content} <span>{item.taskType === 6 && item.extra.count + '/' + item.extra.max}</span>
                </p>
              </div>
              {item.isStatus ? (
                <>
                  <div
                    onClick={item.status === 1 ? () => getUserTakeTask(item) : null}
                    className={`${
                      item.status === 0
                        ? 'tasklist-right__status1'
                        : item.status === 1
                        ? 'tasklist-right__status2'
                        : 'tasklist-right__status3'
                    }`}
                  >
                    {item.status === 0 && item.extra.count + '/' + item.extra.max}
                  </div>
                </>
              ) : (
                <div className='tasklist-right__status'>
                  <img
                    onClick={item.status === 1 ? () => getUserTakeTask(item) : null}
                    src={
                      item.status === 0
                        ? imgConfig.stateImg1
                        : item.status === 1
                        ? imgConfig.stateImg2
                        : imgConfig.stateImg3
                    }
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

FirstPhase.propTypes = {
  taskFirstListData: PropType.array,
  resetDataList: PropType.func,
}

export default FirstPhase
