const axios = require('axios')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const pool = require('../../sql/connection')
const { handleSQLError } = require('../../sql/error')

const login = (req, res) => {
  const { username, password } = req.body

  axios(`${process.env.AUTH0_DOMAIN}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data: {
      grant_type: 'client_credentials',
      username: username,
      password: password,
      audience: process.env.AUTH0_IDENTITY,
      // connection: 'Username-Password-Authentication',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET
    }
  })
  .then(response => {
    const { access_token } = response.data
    res.json({
      access_token
    })
  })
  .catch(e => {
    console.log(e)
    res.send(e)
  })
}

module.exports = {
  login
}