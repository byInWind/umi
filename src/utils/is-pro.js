const NODE_ENV = () => {
  try {
    return process.env.NODE_ENV === 'production'
  } catch (e) {
    return false
  }
}

export default NODE_ENV()
