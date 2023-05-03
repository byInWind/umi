import { sethandleHeaders } from '@utils/headers'

const config = window.CONFIG

const params = sethandleHeaders(config)
export const getUserNumber = () =>
  fetch(`/api/2021/sticker/usedNumber`, {
    method: 'get',
    headers: params,
  }).then((res) => res.json())
