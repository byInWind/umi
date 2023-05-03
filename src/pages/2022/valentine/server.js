import { Toast } from 'antd-mobile'
import { sethandleHeaders } from '@utils/headers'
import { clearParams, queryString } from '@utils/utils'

const config = window.CONFIG

const params = sethandleHeaders(config)

export const getFirstPageData = (param) => {
  const result = param ? queryString(clearParams(param)) : ''
  return fetch(`/api/act/valentine-2021/first-page?${result}`, {
    method: 'get',
    headers: params,
  }).then((res) => res.json())
}

export const getQuestionData = (nopeQuestionIds = '') =>
  fetch(`/api/act/valentine-2021/get-questions?nopeQuestionIds=${nopeQuestionIds}`, {
    method: 'get',
    headers: params,
  }).then((res) => res.json())

export const getRewardPoolList = (param) => {
  return fetch(`/api/act/valentine-2021/get-rewards`, {
    method: 'post',
    credentials: 'include',
    headers: Object.assign({}, params, { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }),
    body: queryString(clearParams(param)),
  }).then((res) => res.json())
}

//答题
export const getRewardQuestionData = (rewardUserId = '') => {
  const storage = localStorage.getItem('wxInfo')
  const wx = JSON.parse(storage)

  const openId = window.CONFIG?.wxInfo?.openid || wx?.openid || ''
  const param = {
    rewardUserId,
    openId,
  }

  if (!openId && !config?.userId) {
    Toast.fail('请先登录或授权后重试')
  }
  const result = queryString(clearParams(param))
  return fetch(`/actH52022/api/act/valentine-2021/get-reward-info?${result}`, {
    method: 'get',
    headers: params,
  }).then((res) => res.json())
}
