const express = require('express')
const app = express()

const ComponentRouter = require('./routes/route.component')
const PageRouter = require('./routes/route.page')
const SellerRouter = require('./routes/route.seller')
const CustomerRouter = require('./routes/route.customer')
const port = 8000

app.use(express.json())
app.use('/api', ComponentRouter)
app.use('/api', SellerRouter)
app.use('/api', CustomerRouter)
app.use('/page', PageRouter)

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })
   
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(port, () => {
    console.log(`Server starder on port ${port}`)
});
