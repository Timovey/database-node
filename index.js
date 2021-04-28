const express = require('express')
const app = express()

const ComponentRouter = require('./routes/route.component')

const port = 8000

app.use(express.json())
app.use('/api', ComponentRouter)

app.listen(port, () => {
    console.log(`Server starder on port ${port}`)
});
