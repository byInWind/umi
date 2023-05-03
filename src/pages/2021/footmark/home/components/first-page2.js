import React from 'react'
import PropType from 'prop-types'
import moment from 'moment'

const FirstPage2 = ({ listData }) => {
  let year = moment(parseInt(listData?.registTime)).format('YYYY')
  let month = moment(parseInt(listData?.registTime)).format('MM')
  let day = moment(parseInt(listData?.registTime)).format('DD')
  return (
    <div className='firstpage2'>
      <p>
        “在这个世界上，
        <br />
        还有什么东西是不会过期的？”
      </p>
      <p>
        我没有答案
        <br />
        但我会希望<span>{listData?.registedDays}</span>天的记忆不会过期
        <br />从<span>{year}</span>年<span>{month}</span>月<span>{day}</span>日<br />
        遇见你的第一秒开始
        <br />
      </p>
    </div>
  )
}
FirstPage2.propTypes = {
  listData: PropType.array,
}

export default FirstPage2
