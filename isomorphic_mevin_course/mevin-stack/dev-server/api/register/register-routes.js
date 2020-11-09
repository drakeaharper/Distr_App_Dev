import express from 'express'
import * as controller from './register.controller.js'

const router = express.Router()

router.post('/register', controller.index)


export default router