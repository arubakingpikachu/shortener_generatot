const express=require('express')
const urlData = require('../../models/url')
const shortenGen = require('../../shortener_ generator')

const router=express.Router()

// 取得form的內容並render
router.post('/', (req, res) => {
  if (!req.body.ori_url) { return res.render('/') }

  const ori_url = req.body.ori_url
  const short_url = shortenGen(5)

  urlData.findOne({ originalUrl: ori_url })
    .then(url => {
      if (url) {
        res.render('index', { origin: url.originalUrl, short: url.shortenerUrl })
        //若有找到對應的原url，就找出對應的短url並輸出，讓輸入相同網址時，會產生一樣的縮址
      } else { 
        urlData.create({ shortenerUrl: `${short_url}`, originalUrl: `${ori_url}` })
          .then(url => {
            res.render('index', { origin: url.originalUrl, short: url.shortenerUrl })

          })// 假如找不到對應的URL，就創造一組新的url跟短url並輸出
      }
    })
    .catch(error => console.error(error))
})

// 用redirect讓短網址發揮作用
router.get('/:path', (req, res) => {
  const { path } = req.params

  urlData.findOne({ shortenerUrl: path })
    .then(url => {
      if (!url) {
        return res.render('error', { error_message: 'Can not find the URL', error_url: req.headers.host + '/' + `${path}` })
      } else {
        res.redirect(url.originalUrl)
      }
    })
    . catch((error) => console.log(error))
})


module.exports = router