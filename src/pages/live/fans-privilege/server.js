import { sethandleHeaders } from '@utils/headers'

const config = window.CONFIG

const params = sethandleHeaders(config)

export const getMemberDashboard = () =>
  fetch(`/api/live/fanclub/member-dashboard`, {
    method: 'get',
    headers: params,
  }).then((res) => res.json())

export const getMyPrivileges = (anchorId) =>
  fetch(`/api/live/fanclub/my-privileges?anchorId=${anchorId}`, {
    method: 'get',
    headers: Object.assign({}, params, { 'Content-Type': 'application/json' }),
  }).then((res) => res.json())
