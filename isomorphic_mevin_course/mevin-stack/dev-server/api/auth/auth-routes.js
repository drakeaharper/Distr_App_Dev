import express from 'express'
import * as controller from './auth-controller.js'
const router = express.Router()

router.post('/auth', controller.index)


export default router