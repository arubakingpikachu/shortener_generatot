//產生5位亂數path
const element = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

module.exports = (shortener_length) => {
  let result = ''
  for (let i = 0; i < shortener_length; i++) {
    const index = Math.floor(Math.random() * 62) // 取元素表中的index
    const chooseElement = element[index]
    result += chooseElement
  }
  return result
}
