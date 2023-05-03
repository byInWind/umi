/**
 * 把文件转成Blob
 * @param {String} data 文件
 */
export default (data) => {
  let byteString = []

  if (data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(data.split(',')[1])
  } else {
    byteString = unescape(data.split(',')[1])
  }

  const mimeString = data.split(',')[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], {
    type: mimeString,
  })
}
