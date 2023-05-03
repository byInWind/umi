/**
 * Send request
 *
 * @param  {String} endpoint
 * @param  {String} method {GET/POST} Default GET
 * @param  {Object} data request body {Object/FormData}
 * @return {Promise}
 *
 */
import checkType from './check-type'
import obj2qs from './obj-to-querystring'

export const GET = 'GET'
export const POST = 'POST'

export default ({ endpoint, method = GET, data = {}, option = {} } = {}) => {
  if (!endpoint) {
    throw new Error('{endpoint} must be specified.')
  }
  if ([GET, POST].indexOf(method) === -1) {
    throw new Error(`{method} must be ${GET} or ${POST}.`)
  }

  if (!checkType(data, 'Object')) {
    throw new Error('{data} must be a Object.')
  }

  const fetchOpts = Object.assign({}, { method, credentials: 'same-origin' }, option)

  if (method === GET) {
    const querystring = obj2qs(data)
    if (querystring) {
      endpoint += `?${querystring}`
    }
  } else {
    // POST FormData
    const fd = new FormData()
    Object.keys(data).map((k) => fd.append(k, data[k]))

    fetchOpts.body = fd
  }
  return new Promise((resolve, reject) => {
    fetch(endpoint, fetchOpts)
      .then((res) => res.json())
      .then(resolve)
      .catch((err) => {
        alert(err)
        console.error(err)
        reject(err)
      })
  })
}
