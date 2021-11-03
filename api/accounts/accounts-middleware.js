const db = require('../../data/db-config')
const Accounts = require('../accounts/accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  try {
    if (req.body.name === undefined) {
      next({ status: 400, message: 'name and budget are required' })
    } else if (typeof req.body.name !== 'string') {
      next({ status: 400, message: 'name of account must be a string' })
    } else if (req.body.name.trim().length < 3) {
      next({ status: 400, message: 'name of account must be between 3 and 100' })
    } else if (req.body.name.trim().length > 100) {
      next({ status: 400, message: 'name of account must be between 3 and 100' })
    } else if (req.body.budget === undefined) {
      next({ status: 400, message: 'name and budget are required' })
    } else if (typeof req.body.budget !== 'number') {
      next({ status: 400, message: 'budget of account must be a number' })
    } else if (req.body.budget < 0) {
      next({ status: 400, message: 'budget of account is too large or too small' })
    } else if (req.body.budget > 1000000) {
      next({ status: 400, message: 'budget of account is too large or too small' })
    }
    // else {
    // if (id) {
    //   req.account = { id, "name": name.trim(), budget };
    // } else {
    //   req.account = { "name": name.trim(), budget };
    // }
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts')
      .where('name', req.body.name.trim())
      .first()

    if (existing) {
      next({ status: 400, message: 'that name is taken' })
    } else {
      // req.trimmedName = req.body.name.trim()
      // console.log(trimmedName)
      next()
    }
    // const result = await Accounts.create(req.account);
    // req.newAccountID = result;
    // next();
  } catch (err) {
    next(err)
    // res.status(400).json({ message: "that name is taken" });
  }
}

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(accountId => {
      if (!accountId) {
        res.status(404).json({ message: "account not found" })
      } else {
        next()
      }
    })
}
