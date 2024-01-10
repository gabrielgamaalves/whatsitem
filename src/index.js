import express from 'express'
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.use(express.json())

import routes from './routes/index.routes.js'
app.use(routes)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/editor/:id", (req, res) => {
    // res.render("", )
})

app.listen(port, () => {
    console.log('Server is running at', port)
})