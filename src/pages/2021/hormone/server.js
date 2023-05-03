import { sethandleHeaders } from '@utils/headers'

const config = window.CONFIG

const params = sethandleHeaders(config)
export const getQuestionData = () =>
  fetch(`/api/2021/activity/mbti/subject/list`, {
    method: 'get',
    headers: params,
  }).then((res) => res.json())
