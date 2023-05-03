import { sethandleHeaders } from '../../../utils/headers'

const config = window.CONFIG

const params = sethandleHeaders(config)
export const getVipData = () =>
  fetch(`/api/2021/vip-buy-ios/billing/vip/vipOption-list`, {
    method: 'get',
    headers: params,
  }).then((res) => res.json())
