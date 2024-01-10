import express from 'express'
const app = express.Router()

app.use(express.json())

import { JSONFilePreset } from 'lowdb/node'
import dialogs from '../database/index.js'

const db = await JSONFilePreset('./src/database/database.json', [])

app.use((res, req, next) => {
    db.read().then(() => {
        next()
    })
}); 

app.get("/json", (req, res) => {
    res.json(db.data)
})

app.get("/messages", (req, res) => {
    res.json(db.data.messages)
})
app.get("/messages/:id", (req, res) => {
    const api = dialogs(db).messages.find(req.params.id)
    res.json(api)
})

app.get("/chamadas/", (req, res) => {
    const api = dialogs(db).chamadas
    res.json(api)
})

export default app