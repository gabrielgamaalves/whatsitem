import express from 'express'
const app = express()

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

app.listen(3000, () => {
    console.log('Server is running at 3000')
})