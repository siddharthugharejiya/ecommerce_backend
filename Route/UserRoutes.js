const express = require('express')
const { Form, login, login_Get } = require('../Controller/UserController')
const UserRoute = express.Router()
UserRoute.post("/form",Form)
UserRoute.post("/login",login)
UserRoute.get("/login",login_Get)

module.exports=UserRoute