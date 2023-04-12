const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const shortenGen=require('./shortener_ generator')
const urlData=require('./models/url')
const url = require('./models/url')
require('./config/mongoose')

const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.render('index')
})



//取得form的內容
app.post('/',(req,res)=>{

  if(!req.body.ori_url){return res.render('/')}

  const ori_url=req.body.ori_url
  const short_url=shortenGen(5)
  console.log(short_url)
  
  urlData.findOne({originalUrl:ori_url})
  .then(url=>{
    if(url){
     res.render('index',{origin:url.originalUrl,short:url.shortenerUrl,})
    }else{//假如找不到對應的URL，就創造一組新的URL跟短網址
      urlData.create({shortenerUrl:`${short_url}`,originalUrl:`${ori_url}`})
      .then(url=>{
        res.render('index',{origin:url.originalUrl,short:url.shortenerUrl,})
      })
    }
  })
  .catch(error => console.error(error))

})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})