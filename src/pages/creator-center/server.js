import { sethandleHeaders } from '@utils/headers'

const config = window.CONFIG

const params = sethandleHeaders(config)
export const getCreatorCenterData = () =>
  fetch(`/api/creator-center/rcmd/creative/page?pageVersion=&count`, {
    method: 'get',
    headers: params,
  }).then((res) => res.json())
