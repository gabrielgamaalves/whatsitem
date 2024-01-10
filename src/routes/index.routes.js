import express from 'express'
const app = express.Router()

import api from './api.js'
app.use("/api/", api)

import auth from './auth.js'
app.use("/auth/", auth)

export default app