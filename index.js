const express = require('express')
const app = express()

const ComponentRouter = require('./routes/route.component')
const PageRouter = require('./routes/route.page')

const port = 8000



app.use(express.json())
app.use('/api', ComponentRouter)

app.use('/page', PageRouter)

app.listen(port, () => {
    console.log(`Server starder on port ${port}`)
});
