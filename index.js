require('dotenv').config()
const express = require("express");
const usersRouter = require('./server/routers/users');
const budgetRouter = require('./server/routers/budget')
const expensesRouter = require('./server/routers/expenses')
const incomesRouter = require('./server/routers/income')
const authRouter = require('./server/routers/auth');
const app = express();
const port = process.env.PORT || 4001;

app.use(express.json())
app.use('/users', usersRouter)
app.use('/budget', budgetRouter)
app.use('/expenses', expensesRouter)
app.use('/income', incomesRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Welcome to our server!')
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});